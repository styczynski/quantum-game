import { ObjectFactory, GameObjectSpec } from "../Object";

import HeroStill0Img from '../../assets/traviso/hero/hero_still0.png';
import HeroStill0Img_0 from '../../assets/traviso/hero/hero_still0_0.png';
import HeroStill0Img_1 from '../../assets/traviso/hero/hero_still0_1.png';
import HeroStill0Img_2 from '../../assets/traviso/hero/hero_still0_2.png';

import HeroStill1Img from '../../assets/traviso/hero/hero_still1.png';
import HeroStill1Img_0 from '../../assets/traviso/hero/hero_still1_0.png';
import HeroStill1Img_1 from '../../assets/traviso/hero/hero_still1_1.png';
import HeroStill1Img_2 from '../../assets/traviso/hero/hero_still1_2.png';

import HeroStill2Img from '../../assets/traviso/hero/hero_still2.png';
import HeroStill2Img_0 from '../../assets/traviso/hero/hero_still2_0.png';
import HeroStill2Img_1 from '../../assets/traviso/hero/hero_still2_1.png';

import HeroStill3Img from '../../assets/traviso/hero/hero_still3.png';
import HeroStill3Img_0 from '../../assets/traviso/hero/hero_still3_0.png';
import HeroStill3Img_1 from '../../assets/traviso/hero/hero_still3_1.png';

export interface PlayerOptions {
    x: number;
    y: number;
}

export class Player extends ObjectFactory<PlayerOptions> {
    createObject(options: PlayerOptions): GameObjectSpec {
        return {
            type: "OBJECT",
            position: {
                x: options.x,
                y: options.y,
            },
            globalMapOptions: {
                "initialControllableLocation": { "columnIndex": options.x, "rowIndex": options.y, "controllableId": "3" },
            },
            "movable": true,
            "interactive": false,
            "rowSpan": 1,
            "columnSpan": 1,
            "noTransparency": true,
            "floor": false,
            "visuals": {
                "idle": {
                    "frames": [
                        { "path": HeroStill0Img },
                    ]
                },
                "idle_n": {
                    "frames": [
                        { "path": HeroStill1Img },
                    ]
                },
                "idle_w": {
                    "frames": [
                        { "path": HeroStill1Img },
                    ]
                },
                "idle_e": {
                    "frames": [
                        { "path": HeroStill1Img },
                    ]
                },
                "move_nw": {
                    "frames": [
                        { "path": HeroStill3Img },
                        { "path": HeroStill3Img_0 },
                        { "path": HeroStill3Img_1 },
                    ]
                },
                "move_ne": {
                    "frames": [
                        { "path": HeroStill2Img },
                        { "path": HeroStill2Img_0 },
                        { "path": HeroStill2Img_1 },
                    ]
                },
                "move_sw": {
                    "frames": [
                        { "path": HeroStill0Img },
                        { "path": HeroStill0Img_0 },
                        { "path": HeroStill0Img_1 },
                        { "path": HeroStill0Img_2 },
                    ]
                },
                "move_se": {
                    "frames": [
                        { "path": HeroStill1Img },
                        { "path": HeroStill1Img_0 },
                        { "path": HeroStill1Img_1 },
                        { "path": HeroStill1Img_2 },
                    ]
                },
            }
        }
    }
}

export const Players = new Player();