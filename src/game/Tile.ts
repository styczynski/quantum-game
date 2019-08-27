export interface TileSpec {
    path: string;
    movable: boolean;
    position: {
        x: number;
        y: number;
    };
}

export interface GameTileSpec extends TileSpec {
    type: "TILE";
};

export abstract class TileFactory<OptionsT> {
    abstract createTile(options: OptionsT): GameTileSpec;
}