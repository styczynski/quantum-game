import {Game, GameMapData, GameMapDataVisualsSpec} from "../Game";

interface VirtualObjectSpec<T> {
    position: {
        x: number;
        y: number;
    };
    name: string;
    onRender?: (obj: VirtualObjectSpec<T>[], game: Game) => void;
    onInit?: (game: Game) => void;
    state: T;
}

export interface GameVirtualObjectSpec<T> extends VirtualObjectSpec<T> {
    type: "VIRTUAL_OBJECT";
}

export abstract class VirtualObjectFactory<OptionsT, StateT> {
    abstract createObject(options: OptionsT): GameVirtualObjectSpec<StateT>;
}