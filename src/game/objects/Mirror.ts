import {GameObject, GameObjectOptions, ObjectTexture} from "../Object";

import LabMirrorImg0 from '../../assets/traviso/map/objects/o_lab_mirror0.png';
import LabMirrorImg1 from '../../assets/traviso/map/objects/o_lab_mirror1.png';
import LabMirrorImg2 from '../../assets/traviso/map/objects/o_lab_mirror2.png';
import LabMirrorImg3 from '../../assets/traviso/map/objects/o_lab_mirror3.png';

import { Game } from "../../Game";
import ParticleSparkImg from "../../assets/traviso/particle/p_spark.png";

import * as PIXI from 'pixi.js';
import {InspectableGameObject} from "../InspectableObject";

export enum MirrorType {
    NW,
    NE,
    SW,
    SE
}

export interface MirrorOptions extends GameObjectOptions {
    type: MirrorType;
}

export class Mirror extends InspectableGameObject<MirrorOptions> {

    getImagePath({ type }: MirrorOptions): string {
        switch(type) {
            case MirrorType.NE: return LabMirrorImg0;
            case MirrorType.NW: return LabMirrorImg1;
            case MirrorType.SW: return LabMirrorImg2;
            case MirrorType.SE: return LabMirrorImg3;
        }
    }

    private nextMirrorType(type: MirrorType) {
        switch(type) {
            case MirrorType.NE: return MirrorType.NW;
            case MirrorType.NW: return MirrorType.SW;
            case MirrorType.SW: return MirrorType.SE;
            case MirrorType.SE: return MirrorType.NE;
        }
    }

    isInteractive(): boolean {
        return true;
    }

    getName(): string {
        return "Mirror";
    }

    getTextures(): ObjectTexture {
        return { "idle": { "frames": [ { "path": this.getImagePath(this.options) } ] } };
    }

    onSelect(game: Game): void {
        game.removeObject(this);
        game.addObjects([
            new Mirror({
                ...this.options,
                type: this.nextMirrorType(this.options.type),
            })
        ]);
    }
}