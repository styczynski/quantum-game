import {GameObjectOptions, GameObject, ObjectTexture} from "../Object";

import LabWallImg0 from '../../assets/traviso/map/objects/o_lab_wall1.png';
import LabWallImg1 from '../../assets/traviso/map/objects/o_lab_wall2.png';
import LabWallImg2 from '../../assets/traviso/map/objects/o_lab_wall3.png';
import LabWallImg3 from '../../assets/traviso/map/objects/o_lab_wall4.png';
import LabWallImg4 from '../../assets/traviso/map/objects/o_lab_wall5.png';
import { Game } from "../../Game";
import ParticleSparkImg from "../../assets/traviso/particle/p_spark.png";

import * as PIXI from 'pixi.js';
import {InspectableGameObject} from "../InspectableObject";

export enum WallType {
    ASC_CABLES,
    ASC_CABLES_TRANSFORMER,
    DESC,
    ASC,
    ASC_CABLES_TUNNEL
}

export interface WallOptions extends GameObjectOptions {
    type: WallType;
}

export class Wall extends InspectableGameObject<WallOptions> {

    getImagePath({ type }: WallOptions): string {
        switch(type) {
            case WallType.ASC_CABLES: return LabWallImg0;
            case WallType.ASC_CABLES_TRANSFORMER: return LabWallImg1;
            case WallType.DESC: return LabWallImg2;
            case WallType.ASC: return LabWallImg3;
            case WallType.ASC_CABLES_TUNNEL: return LabWallImg4;

        }
    }

    getName(): string {
        return "Wall";
    }

    getTextures(): ObjectTexture {
        return { "idle": { "frames": [ { "path": this.getImagePath(this.options) } ] } };
    }
}