import {GameObject, GameObjectOptions, ObjectTexture} from "../Object";

import LabMirrorImg0 from '../../assets/traviso/map/objects/o_lab_mirror0.png';
import LabMirrorImg1 from '../../assets/traviso/map/objects/o_lab_mirror1.png';
import LabMirrorImg2 from '../../assets/traviso/map/objects/o_lab_mirror2.png';
import LabMirrorImg3 from '../../assets/traviso/map/objects/o_lab_mirror3.png';

import { Game } from "../../Game";
import ParticleSparkImg from "../../assets/traviso/particle/p_spark.png";

import * as PIXI from 'pixi.js';

export enum MirrorType {
    NW,
    NE,
    SW,
    SE
}

export interface MirrorOptions extends GameObjectOptions {
    type: MirrorType;
}

export class Mirror extends GameObject<MirrorOptions> {

    getImagePath({ type }: MirrorOptions): string {
        switch(type) {
            case MirrorType.NE: return LabMirrorImg0;
            case MirrorType.NW: return LabMirrorImg1;
            case MirrorType.SW: return LabMirrorImg2;
            case MirrorType.SE: return LabMirrorImg3;

        }
    }

    isInteractive(): boolean {
        return true;
    }

    getFloorTexture(): string {
        return "";
    }

    getGlobalOverrides(): any {
    }

    getName(): string {
        return "Mirror";
    }

    getTextures(): ObjectTexture {
        return { "idle": { "frames": [ { "path": this.getImagePath(this.options) } ] } };
    }

    onPostConstruct(game: Game): void {
    }

    onPreDestruct(game: Game): void {
    }

    onRender(game: Game): void {
    }

    onSelect(game: Game): void {
        console.log(this);
    }
}