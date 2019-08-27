import {Game, GameMapData, GameMapDataVisualsSpec} from "../Game";

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
}

export interface ObjectSpec {
    position: {
        x: number;
        y: number;
    };
    globalMapOptions?: Partial<GameMapData>;
    movable: boolean;
    interactive: boolean;
    rowSpan: number;
    columnSpan: number;
    noTransparency: boolean;
    floor: boolean;
    onSelect?: (obj: TravisoObjectSpec, game: Game) => void;
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
        move_nw?: GameMapDataVisualsSpec;
        move_se?: GameMapDataVisualsSpec;
        move_ne?: GameMapDataVisualsSpec;
        move_sw?: GameMapDataVisualsSpec;
    }
}

export interface GameObjectSpec extends ObjectSpec {
    type: "OBJECT";
}

export abstract class ObjectFactory<OptionsT> {
    abstract createObject(options: OptionsT): GameObjectSpec;
}