import {GameObject, GameObjectOptions, ObjectTexture} from "../Object";

import HeroStill0Img from '../../assets/traviso/map/objects/o_lab_laser0.png';
import {Game} from "../../Game";

export interface LaserOptions extends GameObjectOptions {

}

export class Laser extends GameObject<LaserOptions> {

    isInteractive(): boolean {
        return false;
    }

    getFloorTexture(): string {
        return "";
    }

    getGlobalOverrides(): any {
    }

    getName(): string {
        return "Laser";
    }

    getTextures(): ObjectTexture {
        return  {
            "idle": {
                "frames": [
                    { "path": HeroStill0Img },
                ]
            }
        };
    }

    onPostConstruct(game: Game): void {
    }

    onPreDestruct(game: Game): void {
    }

    onRender(game: Game): void {
    }

    onSelect(game: Game): void {
       //game.engine.moveCurrentControllableToObj();
    }
}