import React from 'react';
import * as PIXI from 'pixi.js';
import { TRAVISO } from './traviso.js';

// @ts-ignore
import Dust from 'pixi-dust';

import deepClone from 'deep-clone';

import {GameObject, GameObjectOptions, TravisoObjectSpec} from './game/Object';

export * from './game/index';

import ParticleSparkImg from './assets/traviso/particle/p_spark.png';

(window as any).PIXI = PIXI;
import 'pixi-layers';

const DEFAULT_GAME_MAP_DATA: GameMapData = {
    tiles: {},
    objects: {},
    initialControllableLocation: { columnIndex: 2, rowIndex: 3, controllableId: "3" },
    tileHighlightImage: { path: "" },
    groundMap: [],
    objectsMap: [],
};

export interface GameMapDataVisualsSpec {
    frames: {
        "path": string;
    }[]
}

export interface GameMapDataTiles {
    [name: string]: {
        movable: boolean;
        path: string;
    }
};

export interface TravisoMapObjectSpec {
    globalMapOptions: any;
    movable: boolean;
    interactive: boolean;
    rowSpan: number;
    columnSpan: number;
    noTransparency: boolean;
    floor: boolean;
    moveable: boolean;
    path: string;
    visuals: {
        idle: GameMapDataVisualsSpec;
        idle_n?: GameMapDataVisualsSpec;
        idle_w?: GameMapDataVisualsSpec;
        idle_s?: GameMapDataVisualsSpec;
        idle_e?: GameMapDataVisualsSpec;
        idle_nw?: GameMapDataVisualsSpec;
        idle_se?: GameMapDataVisualsSpec;
        idle_ne?: GameMapDataVisualsSpec;
        idle_sw?: GameMapDataVisualsSpec;
    }
    origin: GameObject<GameObjectOptions>;
};

export interface TravisoMapObjectSpecMap {
    [key: string]: TravisoMapObjectSpec;
}

export interface GameMapDataControllableLocation {
    columnIndex: number;
    rowIndex: number;
    controllableId: string;
};

export type GameMapDataEntityMapping = { row: string }[];

export interface GameMapDataHighlightImage {
    path: string;
}

export interface GameMapData {
    tiles: GameMapDataTiles;
    objects: TravisoMapObjectSpecMap;
    initialControllableLocation: GameMapDataControllableLocation;
    tileHighlightImage: GameMapDataHighlightImage;
    groundMap: GameMapDataEntityMapping;
    objectsMap: GameMapDataEntityMapping;
}

export interface GameProps {
    entities: GameObject<GameObjectOptions>[];
}

export class Game extends React.Component<GameProps> {

    canvas: HTMLCanvasElement;
    pixiRoot: PIXI.Application;
    engine: any;
    virtualObjects: Map<string, Set<GameObject<GameObjectOptions>>> = new Map();
    objectsPositionMapping: Map<string, Set<GameObject<GameObjectOptions>>> = new Map();
    objectsTypeMapping: Map<string, [number, GameObject<GameObjectOptions>]> = new Map();
    typeTilesMapping: Map<number, TravisoMapObjectSpec> = new Map();
    typeObjectMapping: Map<number, TravisoMapObjectSpec> = new Map();
    nextFreeObjectTypeNumber: number = 1;
    coordsShiftX: number;
    coordsShiftY: number;
    mapW: number;
    mapH: number;
    dust: any;


    constructor(props: GameProps) {
        super(props);
        this.initialize = this.initialize.bind(this);
        this.generateMapData = this.generateMapData.bind(this);
    }

    private getNextFreeTypeObjectID() {
        return this.nextFreeObjectTypeNumber++;
    }

    private generateTravisoSpecsForGameObject(object: GameObject<GameObjectOptions>): TravisoMapObjectSpec {
        return {
            moveable: object.isMoveable(),
            movable: object.isMoveable(),
            interactive: object.isInteractive(),
            rowSpan: object.dimensions().rowSpan,
            columnSpan: object.dimensions().columnSpan,
            noTransparency: !object.hasTransparency,
            floor: object.isFloor(),
            visuals: object.getTextures(),
            globalMapOptions: object.getGlobalOverrides(),
            path: object.getFloorTexture(),
            origin: object,
        };
    }

    private isObjectNewType(a: GameObject<GameObjectOptions>, b: GameObject<GameObjectOptions>) {

        return a.getName() !== b.getName()
            || JSON.stringify(a.getTextures()) !== JSON.stringify(b.getTextures())
            || a.getFloorTexture() !== b.getFloorTexture()
            || a.isVirtual() !== b.isVirtual()
            || a.isMoveable() !== b.isMoveable()
            || a.isInteractive() !== b.isInteractive()
            || a.isFloor() !== b.isFloor()
            || JSON.stringify(a.dimensions()) !== JSON.stringify(b.dimensions())
            || a.hasTransparency() !== b.hasTransparency()
    }

    private getTypeForObjectClass(object: GameObject<GameObjectOptions>) {
        let objSpec = this.objectsTypeMapping.get(object.getName());
        let addNew = false;

        if (objSpec === undefined) {
            addNew = true;
        } else {
            if (this.isObjectNewType(object, objSpec[1])) {
                addNew = true;
                for (const [id, rep] of this.objectsTypeMapping.values()) {
                    if (!this.isObjectNewType(object, rep) && rep.getName() === object.getName()) {
                        return id;
                    }
                }
            }
        }

        let objID: number = 0;
        if (addNew) {
            objID = this.getNextFreeTypeObjectID();
            this.objectsTypeMapping.set(object.getName(), [objID, object]);

            if (!object.isVirtual() && object.isFloor()) {
                this.typeTilesMapping.set(objID, this.generateTravisoSpecsForGameObject(object));
            } else if (!object.isVirtual() && !object.isFloor()) {
                this.typeObjectMapping.set(objID, this.generateTravisoSpecsForGameObject(object));
            }
        } else {
            objID = objSpec[0];
        }
        return objID;
    }

    private getObjectPosHash(obj: {pos: [number, number]}) {
        return `${obj.pos[0]}x${obj.pos[1]}`;
    }

    removeObject(object: GameObject<GameObjectOptions>) {
        if (object.gameObject) {
            this.engine.removeObjectFromLocation(object.gameObject);

            const key = this.getObjectPosHash({ pos: [object.gameObject.mapPos.c, object.gameObject.mapPos.r] });
            this.objectsPositionMapping.delete(key);
        } else {
            throw new Error("Failed to remove not attached game object.");
        }
        object.gameObject = null;
    }

    addObjects(objects: GameObject<GameObjectOptions>[]) {
        const preObjects = objects.map(entity => {
            return {
                obj: entity,
                pos: [
                    entity.getInitialPosition()[0] + this.coordsShiftX,
                    entity.getInitialPosition()[1] + this.coordsShiftY,
                ] as [number, number],
            };
        });

        for (const obj of preObjects) {
            if (obj.obj.isVirtual()) {
                let objGroup = this.virtualObjects.get(obj.obj.getName());
                if (!objGroup) {
                    objGroup = new Set();
                    this.virtualObjects.set(obj.obj.getName(), objGroup);
                }
                objGroup.add(obj.obj);
            }
        }

        preObjects.forEach(obj => {
            let objectsAtPosition = this.objectsPositionMapping.get(this.getObjectPosHash(obj));
            if (objectsAtPosition === undefined) {
                objectsAtPosition = new Set();
                this.objectsPositionMapping.set(this.getObjectPosHash(obj), objectsAtPosition);
            }
            objectsAtPosition.add(obj.obj);
        });

        for (const { obj, pos } of preObjects) {
            const objID = this.getTypeForObjectClass(obj);
            this.engine.mapData.objects[objID.toString()] = this.engine.parseType(this.generateTravisoSpecsForGameObject(obj), objID.toString());
            this.engine.createAndAddObjectToLocation(objID, {
                c: pos[0],
                r: pos[1],
            });

            setTimeout(() => {
                try {
                    obj.gameObject = this.engine.getObjectsAtRowAndColumn(pos[1], pos[0])[0];
                } catch (e) {
                    obj.gameObject = null;
                }
            });
        }

    }

    generateMapData(objects: GameObject<GameObjectOptions>[]): GameMapData {

        let preObjects = objects.map(obj => ({
            pos: obj.getInitialPosition(),
            obj,
        }));

        const { maxX, maxY, minX, minY } = preObjects.reduce<{
            maxX: number,
            maxY: number,
            minX: number,
            minY: number,
        }>(({ maxX, maxY, minX, minY }, {pos}) => {
            return {
                maxX: Math.max(maxX, pos[0]),
                maxY: Math.max(maxY, pos[1]),
                minX: Math.min(minX, pos[0]),
                minY: Math.min(minY, pos[1]),
            };
        }, {
            maxX: -1000,
            maxY: -1000,
            minX: 1000,
            minY: 1000,
        });

        this.coordsShiftX = -minX;
        this.coordsShiftY = -minY;

        preObjects = preObjects.map(entity => {
            return {
                ...entity,
                pos: [
                    entity.pos[0] + this.coordsShiftX,
                    entity.pos[1] + this.coordsShiftY,
                ],
            };
        });

        this.virtualObjects = new Map();
        for (const obj of preObjects) {
            if (obj.obj.isVirtual()) {
                let objGroup = this.virtualObjects.get(obj.obj.getName());
                if (!objGroup) {
                    objGroup = new Set();
                    this.virtualObjects.set(obj.obj.getName(), objGroup);
                }
                objGroup.add(obj.obj);
            }
        }

        this.objectsPositionMapping = new Map();
        preObjects.forEach(obj => {
            let objectsAtPosition = this.objectsPositionMapping.get(this.getObjectPosHash(obj));
            if (objectsAtPosition === undefined) {
                objectsAtPosition = new Set();
                this.objectsPositionMapping.set(this.getObjectPosHash(obj), objectsAtPosition);
            }
            objectsAtPosition.add(obj.obj);
        });

        this.mapW = maxX - minX;
        this.mapH = maxY - minY;

        const mapTiles: { row: string }[] = [];
        const mapObjects: { row: string }[] = [];

        for (let y=0;y<=this.mapH;++y) {
            const rowTilesBuf: string[] = [];
            const rowObjectsBuf: string[] = [];

            for (let x=0;x<=this.mapW;++x) {
                const key = this.getObjectPosHash({pos: [x, y]});
                const objectsAtPosition = this.objectsPositionMapping.get(key);

                if (objectsAtPosition !== undefined) {
                    let hasTile = false;
                    let hasObject = false;
                    for (const obj of objectsAtPosition.values()) {
                        if (!hasTile && obj.isFloor()) {
                            // Is tile
                            const objID = this.getTypeForObjectClass(obj);
                            rowTilesBuf.push(objID.toString());
                            hasTile = true;
                        } else if (!hasObject && !obj.isFloor() && !obj.isVirtual()) {
                            const objID = this.getTypeForObjectClass(obj);
                            rowObjectsBuf.push(objID.toString());
                            hasObject = true;
                        } else {
                            this.getTypeForObjectClass(obj);
                        }
                    }

                    if (!hasTile) {
                        rowTilesBuf.push("0");
                    }

                    if (!hasObject) {
                        rowObjectsBuf.push("0");
                    }
                } else {
                    // Nothing theres - no tiles, no objects
                    rowTilesBuf.push("0");
                    rowObjectsBuf.push("0");
                }

            }

            mapTiles.push({
                row: rowTilesBuf.join(','),
            });

            mapObjects.push({
                row: rowObjectsBuf.join(','),
            });
        }

        return [...this.typeObjectMapping.entries()].reduce<GameMapData>((acc, [_, spec]) => {
            if(spec.globalMapOptions) {

                let extras: Partial<GameMapData> = {
                    ...spec.globalMapOptions,
                }

                if(extras.initialControllableLocation) {
                    if (extras.initialControllableLocation.columnIndex !== undefined) {
                        extras.initialControllableLocation.columnIndex -= minX;
                    }

                    if (extras.initialControllableLocation.rowIndex !== undefined) {
                        extras.initialControllableLocation.rowIndex -= minY;
                    }
                }

                return {
                    ...acc,
                    ...extras,
                };
            }
            return acc;
        }, {
            ...DEFAULT_GAME_MAP_DATA,
            objectsMap: mapObjects,
            groundMap: mapTiles,
            tiles: [...this.typeTilesMapping.entries()].reduce<GameMapDataTiles>((acc, [id, spec]) => {
                return {
                    ...acc,
                    [id.toString()]: spec,
                };
            }, {}),
            objects: [...this.typeObjectMapping.entries()].reduce<TravisoMapObjectSpecMap>((acc, [id, spec]) => {
                return {
                    ...acc,
                    [id.toString()]: spec,
                };
            }, {}),
        });
    }

    initialize(mountPoint: HTMLCanvasElement) {
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        PIXI.settings.ROUND_PIXELS = false;

        ////// Here, we initialize the pixi application
        this.pixiRoot = new PIXI.Application({
            width: 800,
            height: 600,
            backgroundColor : 0x6BACDE,
            antialias: false,
            resolution: 2,
            transparent: true,
            view: mountPoint,
        });

        // add the renderer view element to the DOM
        document.body.appendChild(this.pixiRoot.view);

        ////// Here, we create our traviso instance and add on top of pixi

        // engine-instance configuration object
        const instanceConfig: any = {
            mapDataPath: this.generateMapData(this.props.entities), // the path to the json file that defines map data, required
            assetsToLoad: [""], // array of paths to the assets that are desired to be loaded by traviso, no need to use if assets are already loaded to PIXI cache, default null
            pixiRoot: this.pixiRoot,
            objectSelectCallback: (objSrc: TravisoObjectSpec) => {
                const objsAtLocation = this.objectsPositionMapping.get(this.getObjectPosHash({ pos: [objSrc.mapPos.c, objSrc.mapPos.r] }));
                for (const obj of objsAtLocation) {
                    if (!obj.isVirtual() && !obj.isFloor()) {
                        obj.onSelect(this);
                        return;
                    }
                }
            },
        };

        console.log(JSON.stringify(this.generateMapData(this.props.entities), null, 2));
        this.engine = TRAVISO.getEngineInstance(instanceConfig);
        this.pixiRoot.stage.addChild(this.engine);


        ///////////////////////////////////////////////////////////////////////////////

        (PIXI as any).particles = {
            ParticleContainer: PIXI.ParticleContainer,
        };
        (window as any).PIXI = PIXI;
        this.dust = new Dust(PIXI);


        /*const lighting = new (PIXI as any).display.Layer();
        lighting.on('display', (element: any) => {
            element.blendMode = PIXI.BLEND_MODES.ADD;
        });
        lighting.useRenderTexture = true;
        lighting.clearColor = [0.5, 0.5, 0.5, 1]; // ambient gray
        this.pixiRoot.stage.addChild(lighting);
        const lightingSprite = new PIXI.Sprite(lighting.getRenderTexture());
        lightingSprite.blendMode = PIXI.BLEND_MODES.MULTIPLY;
        this.pixiRoot.stage.addChild(lightingSprite);

        const lightbulb = new PIXI.Graphics();
        const rr = Math.random() * 0x80 | 0;
        const rg = Math.random() * 0x80 | 0;
        const rb = Math.random() * 0x80 | 0;
        const rad = 50 + Math.random() * 20;
        lightbulb.beginFill((rr << 16) + (rg << 8) + rb, 1.0);
        lightbulb.drawCircle(0, 0, rad);
        lightbulb.endFill();
        (lightbulb as any).parentLayer = lighting;// <-- try comment it
        this.pixiRoot.stage.addChild(lightbulb);*/

        for (const [_, objects] of this.objectsPositionMapping.entries()) {
            for (const object of objects) {
                object.onPostConstruct(this);
            }
        }
        setTimeout(() => {
            for (const [_, objects] of this.objectsPositionMapping.entries()) {
                for (const object of objects) {
                    const r = object.getInitialPosition()[0];
                    const c = object.getInitialPosition()[1];
                    try {
                        object.gameObject = this.engine.getObjectsAtRowAndColumn(c, r)[0];
                    } catch (e) {
                        object.gameObject = null;
                    }
                }
            }
        }, 1500);

        const gameLoop = () => {
            requestAnimationFrame(gameLoop);
            //setTimeout(gameLoop, 90);

            for (const [_, objects] of this.objectsPositionMapping.entries()) {
                for (const object of objects) {
                    object.onRender(this);
                }
            }

            this.dust.update();
        }
        gameLoop();
    }

    componentDidMount(): void {
        setTimeout(() => {
            this.initialize(this.canvas);
        }, 500);
    }

    render() {
        return <div>
            <canvas ref={(ref) => {
                this.canvas = ref;
            }} />
        </div>;
    }
}