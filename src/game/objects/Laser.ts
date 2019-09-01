import {GameObject, GameObjectOptions, ObjectTexture} from "../Object";

import HeroStill0Img from '../../assets/traviso/map/objects/o_lab_laser0.png';
import {Game} from "../../Game";
import {InspectableGameObject} from "../InspectableObject";

export interface LaserOptions extends GameObjectOptions {

}

export class Laser extends InspectableGameObject<LaserOptions> {

    isInteractive(): boolean {
        return false;
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
}