import React from 'react';
import ReactDOM from 'react-dom';

import {FloorTile, FloorTileType, Game, Laser, Mirror, MirrorType, Player, Wall, WallType} from './Game';
import {LaserLight} from "./game/objects/LaserLight";

window.onload = () => {
    ReactDOM.render(
        <Game
            entities={[
                new Player({position: [0,1]}),
                // new FloorTile({ position: [0,0], type: FloorTileType.DIRTY, }),
                // new FloorTile({ position: [1,0], type: FloorTileType.DIRTY, }),
                // new FloorTile({ position: [0,1], type: FloorTileType.DIRTY, }),
                // new FloorTile({ position: [1,1], type: FloorTileType.DIRTY, }),
                
                new FloorTile({type: FloorTileType.PARTIAL_NW, position: [0 , 0]}),
                new FloorTile({type: FloorTileType.PARTIAL_NW, position: [1, 0]}),
                new FloorTile({type: FloorTileType.PARTIAL_NW, position: [2, 0]}),
                new FloorTile({type: FloorTileType.PARTIAL_NW, position: [3, 0]}),
                new FloorTile({type: FloorTileType.PARTIAL_NW, position: [4, 0]}),
                new FloorTile({type: FloorTileType.PARTIAL_NW, position: [5, 0]}),
                new FloorTile({type: FloorTileType.CLEAN, position: [5, 2]}),
                new FloorTile({type: FloorTileType.PARTIAL_SE, position: [5, 3]}),

                new FloorTile({type: FloorTileType.DRAWINGS, position: [0, 1]}),
                new FloorTile({type: FloorTileType.CRACKED, position: [1, 1]}),
                new FloorTile({type: FloorTileType.CLEAN, position: [2, 1]}),
                new FloorTile({type: FloorTileType.DIRTY, position: [3, 1]}),
                new FloorTile({type: FloorTileType.PAPER_IN_WATER, position: [4, 1]}),
                new FloorTile({type: FloorTileType.CLEAN, position: [5, 1]}),
                new FloorTile({type: FloorTileType.CLEAN, position: [5, 2]}),
                new FloorTile({type: FloorTileType.CRACKED, position: [4, 2]}),
                new FloorTile({type: FloorTileType.PARTIAL_SE, position: [4, 3]}),

                new FloorTile({type: FloorTileType.CLEAN, position: [0, 2]}),
                new FloorTile({type: FloorTileType.DIRTY, position: [1, 2]}),
                new FloorTile({type: FloorTileType.CLEAN, position: [2, 2]}),
                new FloorTile({type: FloorTileType.CLEAN, position: [2, 3]}),
                new FloorTile({type: FloorTileType.DIRTY, position: [3, 2]}),

                new Laser({position: [2, 3]}),
                new LaserLight({position: [2, 3]}),

                new Mirror({ position: [4, 3], type: MirrorType.SW }),

                new Wall({position: [0, 0], type: WallType.ASC_CABLES }),
                new Wall({position: [1, 0], type: WallType.ASC_CABLES }),
                new Wall({position: [2, 0], type: WallType.ASC_CABLES_TRANSFORMER }),
                new Wall({position: [3, 0], type: WallType.ASC_CABLES_TUNNEL }),
                new Wall({position: [4, 0], type: WallType.ASC }),
                new Wall({position: [5, 0], type: WallType.ASC }),

                new Wall({position: [5, 1], type: WallType.DESC}),
                new Wall({position: [5, 2], type: WallType.DESC}),
            ]}
        />
        , document.getElementById('root'));
};

