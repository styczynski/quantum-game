import {GameObject, GameObjectOptions, ObjectTexture} from "../Object";

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
import {Game} from "../../Game";

export interface PlayerOptions extends GameObjectOptions {}

export class Player extends GameObject<PlayerOptions> {

    isMoveable(): boolean {
        return true;
    }

    hasTransparency(): boolean {
        return false;
    }

    getGlobalOverrides(): any {
        return {
            "initialControllableLocation": { "columnIndex": this.options.position[0], "rowIndex": this.options.position[1], "controllableId": "3" },
        };
    }

    getName(): string {
        return "Player";
    }

    getTextures(): ObjectTexture {
        return {
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