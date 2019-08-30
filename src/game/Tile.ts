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

    abstract onSelect(game: Game): void;
    abstract onRender(game: Game): void;
    abstract onPostConstruct(game: Game): void;
    abstract onPreDestruct(game: Game): void;
}