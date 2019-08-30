import TilePartialNWImg from '../../assets/traviso/map/tiles/t_lab_floor_part0.png';
import TilePartialSEImg from '../../assets/traviso/map/tiles/t_lab_floor_part1.png';
import TilePartialNE_SEImg from '../../assets/traviso/map/tiles/t_lab_floor_part2.png';

import TileImgClean from '../../assets/traviso/map/tiles/t_lab_floor0.png';
import TileImgDirty from '../../assets/traviso/map/tiles/t_lab_floor1.png';
import TileImgCracked from '../../assets/traviso/map/tiles/t_lab_floor2.png';
import TileImgPaperInWater from '../../assets/traviso/map/tiles/t_lab_floor3.png';
import TileImgDrawings from '../../assets/traviso/map/tiles/t_lab_floor4.png';
import { GameTile } from "../Tile";
import {Game} from "../../Game";
import {GameObjectOptions} from "../Object";

export enum FloorTileType {
    CLEAN,
    DIRTY,
    CRACKED,
    PAPER_IN_WATER,
    DRAWINGS,
    PARTIAL_NW,
    PARTIAL_SE,
    PARTIAL_NE_SE,
}

export interface FloorTileOptions extends GameObjectOptions {
    type: FloorTileType;
}

export class FloorTile extends GameTile<FloorTileOptions> {
    getImagePath({ type }: FloorTileOptions): string {
        switch (type) {
            case FloorTileType.CLEAN: return TileImgClean;
            case FloorTileType.DIRTY: return TileImgDirty;
            case FloorTileType.CRACKED: return TileImgCracked;
            case FloorTileType.PAPER_IN_WATER: return TileImgPaperInWater;
            case FloorTileType.DRAWINGS: return TileImgDrawings;
            case FloorTileType.PARTIAL_NW: return TilePartialNWImg;
            case FloorTileType.PARTIAL_SE: return TilePartialSEImg;
            case FloorTileType.PARTIAL_NE_SE: return TilePartialNE_SEImg;
        }
    }

    getFloorTexture(): string {
        return this.getImagePath(this.options);
    }

    getName(): string {
        return "Floor";
    }

    onPostConstruct(game: Game): void {
    }

    onPreDestruct(game: Game): void {
    }

    onRender(game: Game): void {
    }

    onSelect(game: Game): void {
    }
}