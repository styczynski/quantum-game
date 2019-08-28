import React from 'react';
import ReactDOM from 'react-dom';

import {Floors, FloorTileType, Game, Players, Walls, WallType, Lasers} from './Game';
import {LaserLights} from "./game/objects/LaserLight";

window.onload = () => {
    ReactDOM.render(
        <Game
            entities={[
                Players.createObject({x: 0, y: 1}),
                Floors.createTile({type: FloorTileType.PARTIAL_NW, x: 0, y: 0}),
                Floors.createTile({type: FloorTileType.PARTIAL_NW, x: 1, y: 0}),
                Floors.createTile({type: FloorTileType.PARTIAL_NW, x: 2, y: 0}),
                Floors.createTile({type: FloorTileType.PARTIAL_NW, x: 3, y: 0}),
                Floors.createTile({type: FloorTileType.PARTIAL_NW, x: 4, y: 0}),
                Floors.createTile({type: FloorTileType.PARTIAL_NW, x: 5, y: 0}),
                Floors.createTile({type: FloorTileType.PARTIAL_SE, x: 5, y: 2}),
                Floors.createTile({type: FloorTileType.PARTIAL_SE, x: 5, y: 3}),

                Floors.createTile({type: FloorTileType.DRAWINGS, x: 0, y: 1}),
                Floors.createTile({type: FloorTileType.CRACKED, x: 1, y: 1}),
                Floors.createTile({type: FloorTileType.CLEAN, x: 2, y: 1}),
                Floors.createTile({type: FloorTileType.DIRTY, x: 3, y: 1}),
                Floors.createTile({type: FloorTileType.PAPER_IN_WATER, x: 4, y: 1}),
                Floors.createTile({type: FloorTileType.CLEAN, x: 5, y: 1}),
                Floors.createTile({type: FloorTileType.CLEAN, x: 5, y: 2}),
                Floors.createTile({type: FloorTileType.CRACKED, x: 4, y: 2}),
                Floors.createTile({type: FloorTileType.PARTIAL_SE, x: 4, y: 3}),

                Floors.createTile({type: FloorTileType.CLEAN, x: 0, y: 2}),
                Floors.createTile({type: FloorTileType.DIRTY, x: 1, y: 2}),
                Floors.createTile({type: FloorTileType.CLEAN, x: 2, y: 2}),
                Floors.createTile({type: FloorTileType.CLEAN, x: 2, y: 3}),
                Floors.createTile({type: FloorTileType.DIRTY, x: 3, y: 2}),

                Lasers.createObject({x: 2, y: 3}),
                LaserLights.createObject({}),

                Walls.createObject({x: 0, y: 0, type: WallType.ASC_CABLES }),
                Walls.createObject({x: 1, y: 0, type: WallType.ASC_CABLES }),
                Walls.createObject({x: 2, y: 0, type: WallType.ASC_CABLES_TRANSFORMER }),
                Walls.createObject({x: 3, y: 0, type: WallType.ASC_CABLES_TUNNEL }),
                Walls.createObject({x: 4, y: 0, type: WallType.ASC }),
                Walls.createObject({x: 5, y: 0, type: WallType.ASC }),

                Walls.createObject({x: 5, y: 1, type: WallType.DESC}),
                Walls.createObject({x: 5, y: 2, type: WallType.DESC}),
            ]}
        />
        , document.getElementById('root'));
};

