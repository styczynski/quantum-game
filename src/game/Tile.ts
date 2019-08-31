import {Game} from "../Game";
import {GameObject, GameObjectOptions, ObjectDimensions, ObjectTexture, TravisoObjectSpec} from "./Object";

export abstract class GameTile<GameObjectOptionsT extends GameObjectOptions> extends GameObject<GameObjectOptionsT> {
    gameObject: TravisoObjectSpec;

    isMoveable(): boolean {
        return true;
    }

    isFloor(): boolean {
        return true;
    }

    getTextures(): ObjectTexture {
        return null;
    }

    getGlobalOverrides(): any {
        return {};
    }

    abstract getFloorTexture(): string;

    abstract getName(): string;
}