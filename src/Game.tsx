import React from 'react';
import * as PIXI from 'pixi.js';
// @ts-ignore
import Dust from 'pixi-dust';
import { TRAVISO } from './traviso.js';

import deepClone from 'deep-clone';

import { GameTileSpec } from './game/Tile';
import { GameObjectSpec } from './game/Object';
import { GameVirtualObjectSpec } from './game/VirtualObject';

export * from './game/index';

import ParticleSparkImg from './assets/traviso/particle/p_spark.png';

export type GameEntitySpec = GameTileSpec | GameObjectSpec | GameVirtualObjectSpec<{}>;

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

export interface GameMapDataObjects {
    [name: string]: {
        movable: boolean;
        interactive: boolean;
        rowSpan: number;
        columnSpan: number;
        noTransparency: boolean;
        floor: boolean;
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
    }
};

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
    objects: GameMapDataObjects;
    initialControllableLocation: GameMapDataControllableLocation;
    tileHighlightImage: GameMapDataHighlightImage;
    groundMap: GameMapDataEntityMapping;
    objectsMap: GameMapDataEntityMapping;
}

export interface GameProps {
    entities: GameEntitySpec[];
}

export class Game extends React.Component<GameProps> {

    canvas: HTMLCanvasElement;
    pixiRoot: PIXI.Application;
    engine: any;

    tilesTypeMapping: Map<string, GameTileSpec>;
    objectsTypeMapping: Map<string, GameObjectSpec>;
    virtualObjects: Map<string, Set<GameVirtualObjectSpec<{}>>>;

    constructor(props: GameProps) {
        super(props);
        this.initialize = this.initialize.bind(this);
        this.generateMapData = this.generateMapData.bind(this);
    }

    generateMapData(): GameMapData {

        const protoEntities = (this.props.entities);

        const { maxX, maxY, minX, minY } = protoEntities.reduce<{
            maxX: number,
            maxY: number,
            minX: number,
            minY: number,
        }>(({ maxX, maxY, minX, minY }, tile) => {
            return {
                maxX: Math.max(maxX, tile.position.x),
                maxY: Math.max(maxY, tile.position.y),
                minX: Math.min(minX, tile.position.x),
                minY: Math.min(minY, tile.position.y),
            };
        }, {
            maxX: -1000,
            maxY: -1000,
            minX: 1000,
            minY: 1000,
        });

        const entities: GameEntitySpec[] = protoEntities.map(entity => {
            return {
                ...entity,
                position: {
                    x: entity.position.x - minX,
                    y: entity.position.y - minY,
                },
            };
        });

        const tiles = entities.filter((entity: GameEntitySpec): entity is GameTileSpec => entity.type === "TILE");
        const objects = entities.filter((entity: GameEntitySpec): entity is GameObjectSpec => entity.type === "OBJECT");
        const virtualObjects = entities.filter((entity: GameEntitySpec): entity is GameVirtualObjectSpec<{}> => entity.type === "VIRTUAL_OBJECT");

        this.virtualObjects = new Map();
        for (const obj of virtualObjects) {
            let objGroup = this.virtualObjects.get(obj.name);
            if (!objGroup) {
                objGroup = new Set();
                this.virtualObjects.set(obj.name, objGroup);
            }
            objGroup.add(obj);
        }

        let tileFreeTypeNo = 1;
        let objectFreeTypeNo = 1;

        const tilesSerialTypeMapping: Map<string, {id: number; spec: GameTileSpec}> = new Map();
        const objectsSerialTypeMapping: Map<string, {id: number; spec: GameObjectSpec}> = new Map();

        this.tilesTypeMapping = new Map();
        this.objectsTypeMapping = new Map();

        const tilesQuickMapping: Map<string, GameTileSpec> = new Map();
        const objectsQuickMapping: Map<string, GameObjectSpec> = new Map();

        tiles.forEach(tile => {
           tilesQuickMapping.set(`${tile.position.x}x${tile.position.y}`, tile);
        });

        objects.forEach(obj => {
            console.log(`Add player key = ${obj.position.x}x${obj.position.y}`);
            objectsQuickMapping.set(`${obj.position.x}x${obj.position.y}`, obj);
        });

        const mapW = maxX - minX;
        const mapH = maxY - minY;

        const mapTiles: { row: string }[] = [];
        const mapObjects: { row: string }[] = [];

        for (let y=0;y<=mapH;++y) {
            const rowTilesBuf: string[] = [];
            const rowObjectsBuf: string[] = [];

            for (let x=0;x<=mapW;++x) {
                const key = `${x}x${y}`;

                if (tilesQuickMapping.has(key)) {
                    const specs = tilesQuickMapping.get(key);
                    const specsHash = JSON.stringify({
                        movable: specs.movable,
                        path: specs.path,
                    });
                    let specsID = null;

                    if (tilesSerialTypeMapping.has(specsHash)) {
                        specsID = tilesSerialTypeMapping.get(specsHash).id;
                    } else {
                        specsID = tileFreeTypeNo++;
                        tilesSerialTypeMapping.set(specsHash, {
                            id: specsID,
                            spec: specs,
                        });
                        this.tilesTypeMapping.set(specsID.toString(), specs);
                    }
                    rowTilesBuf.push(specsID.toString());
                } else {
                    rowTilesBuf.push("0");
                }

                if (objectsQuickMapping.has(key)) {
                    console.log(`player match => ${key}`)
                    const specs = objectsQuickMapping.get(key);
                    const specsHash = JSON.stringify({
                        vis: specs.visuals,
                    });
                    let specsID = null;

                    if (objectsSerialTypeMapping.has(specsHash)) {
                        specsID = objectsSerialTypeMapping.get(specsHash).id;
                    } else {
                        specsID = objectFreeTypeNo++;
                        objectsSerialTypeMapping.set(specsHash, {
                            id: specsID,
                            spec: specs,
                        });
                        this.objectsTypeMapping.set(specsID.toString(), specs);
                    }
                    rowObjectsBuf.push(specsID.toString());
                } else {
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


        return [...objectsSerialTypeMapping.entries()].reduce<GameMapData>((acc, [_, {
            spec,
        }]) => {
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
            tiles: [...tilesSerialTypeMapping.entries()].reduce<GameMapDataTiles>((acc, [_, {
                spec,
                id,
            }]) => {
                return {
                    ...acc,
                    [id.toString()]: spec,
                };
            }, {}),
            objects: [...objectsSerialTypeMapping.entries()].reduce<GameMapDataObjects>((acc, [_, {
                spec,
                id,
            }]) => {
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
            mapDataPath: this.generateMapData(), // the path to the json file that defines map data, required
            assetsToLoad: [""], // array of paths to the assets that are desired to be loaded by traviso, no need to use if assets are already loaded to PIXI cache, default null
            pixiRoot: this.pixiRoot,
            objectSelectCallback: (obj: any) => {
                const objSpec = this.objectsTypeMapping.get(obj.type.toString());
                console.log("SELECTED TYPE "+obj.type);
                console.log(objSpec);
                if (objSpec && objSpec.onSelect) {
                    objSpec.onSelect(obj, this);
                }
            },
        };

        console.log(JSON.stringify(this.generateMapData(), null, 2));
        this.engine = TRAVISO.getEngineInstance(instanceConfig);
        this.pixiRoot.stage.addChild(this.engine);


        ///////////////////////////////////////////////////////////////////////////////

        (PIXI as any).particles = {
            ParticleContainer: PIXI.ParticleContainer,
        };
        (window as any).PIXI = PIXI;
        let d = new Dust(PIXI);

        //Create the `ParticleContainer` and add it to the `stage`
        let starContainer = new PIXI.ParticleContainer(
            15000,
            {
                rotation: true,
                uvs: true,
            }
        );
        this.pixiRoot.stage.addChild(starContainer);

        let stars: any[] = [];
        let starStep = 0;
        //Create star particles and add them to the `starContainer`
        const runStars = () => {

            const tx = 3;
            const x = this.engine.getTilePosXFor(tx, -1);
            const y = this.engine.getTilePosYFor(tx, -1);

            console.log({
                x: 25 + x + this.engine.mapContainer.position.x,
                y: 50 + (-y) + this.engine.mapContainer.position.y,
            })
            starStep = 0;
            stars = d.create(
                25 + x + this.engine.mapContainer.position.x,
                50 + (-y) + this.engine.mapContainer.position.y,
                () => PIXI.Sprite.from(ParticleSparkImg),
                starContainer,
                5,
                0.4,
                true,
                -30, -25,
            );

            setTimeout(runStars, 2500);
        };
        setTimeout(runStars, 500);

        for (const [objName, objSpecs] of this.virtualObjects.entries()) {
            const spec = [...objSpecs.values()][0];
            if (spec.onInit) {
                spec.onInit(this);
            }
        }

        const gameLoop = () => {
            requestAnimationFrame(gameLoop);

            for (const [objType, objSpec] of this.objectsTypeMapping.entries()) {
                const objs = [];
                if (objSpec.onRender) {
                    for (const column of this.engine.objArray) {
                        for (const row of column) {
                            if (row) {
                                for (const item of row) {
                                    if (item && item.type && item.type.toString() === objType) objs.push(item);
                                }
                            }
                        }
                    }
                    objSpec.onRender(objs, this);
                }
            }

            for (const [objName, objSpecs] of this.virtualObjects.entries()) {
                const spec = [...objSpecs.values()][0];
                if (spec.onRender) {
                    spec.onRender([...objSpecs], this);
                }
            }

            stars.forEach(star => {
                star.alpha = 1-starStep*0.05;
            });
            ++starStep;

            d.update();
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