import {Game, GameMapData, GameMapDataVisualsSpec} from "../Game";

export interface TravisoMapObjectSpec {
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

export interface TravisoObjectSpec {
    alpha: number;
    columnSpan: number;
    container: any;
    interactive: boolean;
    interactiveChildren: boolean;
    isFloorObject: boolean;
    isInteractive: boolean;
    isMovableTo: boolean;
    isSprite: boolean;
    mapPos: {
        c: number;
        r: number;
    }
    noTransparency: boolean;
    renderable: boolean;
    rowSpan: number;
    sortDirty: boolean;
    sortableChildren: boolean;
    type: number;
    visible: boolean;
    worldAlpha: number;
    origin: GameObject<GameObjectOptions>;
}

export interface ObjectTexture {
    idle: GameMapDataVisualsSpec;
    idle_n?: GameMapDataVisualsSpec;
    idle_w?: GameMapDataVisualsSpec;
    idle_s?: GameMapDataVisualsSpec;
    idle_e?: GameMapDataVisualsSpec;
    idle_nw?: GameMapDataVisualsSpec;
    idle_se?: GameMapDataVisualsSpec;
    idle_ne?: GameMapDataVisualsSpec;
    idle_sw?: GameMapDataVisualsSpec;
    move_nw?: GameMapDataVisualsSpec;
    move_se?: GameMapDataVisualsSpec;
    move_ne?: GameMapDataVisualsSpec;
    move_sw?: GameMapDataVisualsSpec;
}

export interface ObjectDimensions {
    rowSpan: number;
    columnSpan: number;
}

export interface GameObjectOptions {
    position: [number, number];
}

export abstract class GameObject<GameObjectOptionsT extends GameObjectOptions> {
    gameObject: TravisoObjectSpec;
    options: GameObjectOptionsT;

    constructor(options: GameObjectOptionsT) {
        this.options = options;
    }

    getOptions(): GameObjectOptionsT {
        return this.options;
    }

    isVirtual(): boolean {
        return false;
    }

    isMoveable(): boolean {
        return false;
    }

    isInteractive(): boolean {
        return false;
    }

    hasTransparency(): boolean {
        return true;
    }

    isFloor(): boolean {
        return false;
    }

    dimensions(): ObjectDimensions {
        return {
            columnSpan: 1,
            rowSpan: 1,
        };
    }

    abstract getTextures(): ObjectTexture;
    abstract getGlobalOverrides(): any;
    abstract getFloorTexture(): string;

    getInitialPosition(): [number, number] {
        return this.options.position;
    }

    abstract getName(): string;
    abstract onSelect(game: Game): void;
    abstract onRender(game: Game): void;
    abstract onPostConstruct(game: Game): void;
    abstract onPreDestruct(game: Game): void;
}