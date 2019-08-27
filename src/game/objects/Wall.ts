import { ObjectFactory, GameObjectSpec } from "../Object";

import LabWallImg0 from '../../assets/traviso/map/objects/o_lab_wall1.png';
import LabWallImg1 from '../../assets/traviso/map/objects/o_lab_wall2.png';
import LabWallImg2 from '../../assets/traviso/map/objects/o_lab_wall3.png';
import LabWallImg3 from '../../assets/traviso/map/objects/o_lab_wall4.png';
import LabWallImg4 from '../../assets/traviso/map/objects/o_lab_wall5.png';

export enum WallType {
    ASC_CABLES,
    ASC_CABLES_TRANSFORMER,
    DESC,
    ASC,
    ASC_CABLES_TUNNEL
}

export interface WallOptions {
    x: number;
    y: number;
    type: WallType;
}

export class Wall extends ObjectFactory<WallOptions> {

    getImagePath({ type }: WallOptions): string {
        switch(type) {
            case WallType.ASC_CABLES: return LabWallImg0;
            case WallType.ASC_CABLES_TRANSFORMER: return LabWallImg1;
            case WallType.DESC: return LabWallImg2;
            case WallType.ASC: return LabWallImg3;
            case WallType.ASC_CABLES_TUNNEL: return LabWallImg4;

        }
    }

    createObject(options: WallOptions): GameObjectSpec {
        return {
            type: "OBJECT",
            position: {
                x: options.x,
                y: options.y,
            },
            "movable": false, "interactive": false, "rowSpan": 1, "columnSpan": 1, "noTransparency": false, "floor": false,
                "visuals": { "idle": { "frames": [ { "path": this.getImagePath(options) } ] } }
        };
    }
}

export const Walls = new Wall();