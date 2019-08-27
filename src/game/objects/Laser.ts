import { ObjectFactory, GameObjectSpec } from "../Object";

import HeroStill0Img from '../../assets/traviso/map/objects/o_lab_laser0.png';

export interface LaserOptions {
    x: number;
    y: number;
}

export class Laser extends ObjectFactory<LaserOptions> {
    createObject(options: LaserOptions): GameObjectSpec {
        return {
            type: "OBJECT",
            position: {
                x: options.x,
                y: options.y,
            },
            onSelect: (obj, game) => {
                game.engine.moveCurrentControllableToObj(obj);

            },
            "movable": true,
            "interactive": true,
            "rowSpan": 1,
            "columnSpan": 1,
            "noTransparency": false,
            "floor": false,
            "visuals": {
                "idle": {
                    "frames": [
                        { "path": HeroStill0Img },
                    ]
                },
            }
        }
    }
}

export const Lasers = new Laser();