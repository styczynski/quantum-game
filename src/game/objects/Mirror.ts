import { ObjectFactory, GameObjectSpec } from "../Object";

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

export interface MirrorOptions {
    x: number;
    y: number;
    type: MirrorType;
}

export class Mirror extends ObjectFactory<MirrorOptions> {

    getImagePath({ type }: MirrorOptions): string {
        switch(type) {
            case MirrorType.NE: return LabMirrorImg0;
            case MirrorType.NW: return LabMirrorImg1;
            case MirrorType.SW: return LabMirrorImg2;
            case MirrorType.SE: return LabMirrorImg3;

        }
    }

    createObject(options: MirrorOptions): GameObjectSpec {
        return {
            type: "OBJECT",
            position: {
                x: options.x,
                y: options.y,
            },
            onSelect(obj) {
              console.log(obj);
            },

            "movable": false, "interactive": true, "rowSpan": 1, "columnSpan": 1, "noTransparency": false, "floor": false,
                "visuals": { "idle": { "frames": [ { "path": this.getImagePath(options) } ] } }
        };
    }
}

export const Mirrors = new Mirror();