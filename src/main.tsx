import React from 'react';
import ReactDOM from 'react-dom';

import * as PIXI from 'pixi.js';
import { TRAVISO } from './traviso.js';

import HeroImg from './assets/traviso/characters/hero_stand_se_0001.png';

import TileImg1 from './assets/traviso/map/tiles/t_1.png';
import TileImg2 from './assets/traviso/map/tiles/t_2.png';

import TileImgS1 from './assets/traviso/map/tiles/t_s_1.png';
import TileImgS2 from './assets/traviso/map/tiles/t_s_2.png';
import TileImgS3 from './assets/traviso/map/tiles/t_s_3.png';
import TileImgS4 from './assets/traviso/map/tiles/t_s_4.png';
import TileImgS5 from './assets/traviso/map/tiles/t_s_5.png';
import TileImgS6 from './assets/traviso/map/tiles/t_s_6.png';

import ObjectImg1 from './assets/traviso/map/objects/o_1.png';
import ObjectImg2 from './assets/traviso/map/objects/o_2.png';

import ObjectImg5 from './assets/traviso/map/objects/o_5.png';
import ObjectImg6 from './assets/traviso/map/objects/o_6.png';
import ObjectImg7 from './assets/traviso/map/objects/o_7.png';
import ObjectImg8 from './assets/traviso/map/objects/o_8.png';
import ObjectImg9 from './assets/traviso/map/objects/o_9.png';

import ObjectFlagImg0 from './assets/traviso/map/objects/o_flag_0.png';
import ObjectTreeImg0 from './assets/traviso/map/objects/o_tree_0.png';
import ObjectBoxesImg0 from './assets/traviso/map/objects/o_boxes_0.png';

import TileHighlightImg from './assets/traviso/map/tiles/tileHighlight.png';

const mapData = {
    "tiles": {
        "1":  { "movable": true,  "path": TileImg1 },
        "2":  { "movable": true,  "path": TileImg2 },
        "11": { "movable": false, "path": TileImgS1 },
        "12": { "movable": false, "path": TileImgS2 },
        "13": { "movable": false, "path": TileImgS3 },
        "14": { "movable": false, "path": TileImgS4 },
        "15": { "movable": false, "path": TileImgS5 },
        "16": { "movable": false, "path": TileImgS6 }
    },
    "objects": {
        "1": {
            "movable": false, "interactive": false, "rowSpan": 1, "columnSpan": 1, "noTransparency": false, "floor": false,
            "visuals": { "idle": { "frames": [ { "path": ObjectImg1 } ] } }
        },
        "2": {
            "movable": false, "interactive": false, "rowSpan": 1, "columnSpan": 1, "noTransparency": false, "floor": false,
            "visuals": { "idle": { "frames": [ { "path": ObjectImg2 } ] } }
        },
        "3": {
            "movable": true,  "interactive": false, "rowSpan": 1, "columnSpan": 1, "noTransparency": true,  "floor": false,
            "visuals": {
                "idle": {
                    "frames": [
                        { "path": HeroImg },
                    ]
                },
                "idle_s": {
                    "frames": [
                        { "path": HeroImg },
                    ]
                },
                "idle_sw": { "path": HeroImg, "startIndex": 1, "numberOfFrames": 1, "extension": "png" },
                "flip": {
                    "frames": [
                        { "path": HeroImg}
                    ]
                }
            }
        },
        "5": {
            "movable": false, "interactive": false, "rowSpan": 1, "columnSpan": 1, "noTransparency": false, "floor": false,
            "visuals": { "idle": { "frames": [ { "path": ObjectImg5 } ] } }
        },
        "6": {
            "movable": false, "interactive": false, "rowSpan": 1, "columnSpan": 1, "noTransparency": false, "floor": false,
            "visuals": { "idle": { "frames": [ { "path": ObjectImg6 } ] } }
        },
        "7": {
            "movable": true,  "interactive": false, "rowSpan": 1, "columnSpan": 1, "noTransparency": false, "floor": false,
            "visuals": { "idle": { "frames": [ { "path": ObjectImg7 } ] } }
        },
        "8": {
            "movable": false, "interactive": false, "rowSpan": 1, "columnSpan": 1, "noTransparency": false, "floor": false,
            "visuals": { "idle": { "frames": [ { "path": ObjectImg8 } ] } }
        },
        "9": {
            "movable": false, "interactive": false, "rowSpan": 1, "columnSpan": 1, "noTransparency": false, "floor": false,
            "visuals": { "idle": { "frames": [ { "path": ObjectImg8 } ] } }
        },
        "10": {
            "movable": true,  "interactive": true,  "rowSpan": 1, "columnSpan": 1, "noTransparency": false, "floor": false,
            "visuals": { "idle": { "frames": [ { "path": ObjectFlagImg0 } ] } }
        },
        "11": {
            "movable": false, "interactive": false, "rowSpan": 1, "columnSpan": 1, "noTransparency": false, "floor": false,
            "visuals": { "idle": { "frames": [ { "path": ObjectTreeImg0 } ] } }
        },
        "12": {
            "movable": true,  "interactive": false, "rowSpan": 1, "columnSpan": 1, "noTransparency": false, "floor": false,
            "visuals": { "idle": { "frames": [ { "path": ObjectBoxesImg0 } ] } }
        }
    },
    "initialControllableLocation": { "columnIndex": 5, "rowIndex": 10, "controllableId": "3" },
    "tileHighlightImage": { "path": TileHighlightImg },
    "groundMap": [
        { "row": "0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,11,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2" },
        { "row": "0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,14,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,1 ,1 ,1 ,1 ,1 ,2" },
        { "row": "0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,14,2 ,2 ,2 ,13,2 ,15,15,15,13,2 ,15,13,2 ,1 ,1 ,1 ,1 ,1 ,2" },
        { "row": "0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,14,2 ,2 ,2 ,14,2 ,0 ,0 ,0 ,14,2 ,0 ,14,2 ,1 ,1 ,1 ,1 ,1 ,2" },
        { "row": "0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,14,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,1 ,1 ,1 ,1 ,1 ,2" },
        { "row": "0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,14,2 ,2 ,2 ,2 ,2 ,15,15,13,2 ,2 ,2 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,2" },
        { "row": "0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,14,2 ,2 ,2 ,2 ,2 ,0 ,0 ,14,2 ,2 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,2" },
        { "row": "0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,14,2 ,2 ,2 ,2 ,2 ,11,2 ,2 ,2 ,2 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,2" },
        { "row": "11,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,0 ,0 ,0 ,14,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,1 ,1 ,1 ,2 ,2 ,2 ,2 ,2 ,1 ,2" },
        { "row": "14,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,0 ,11,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,1 ,1 ,1 ,1 ,2 ,2 ,2 ,2 ,2 ,2 ,1 ,2" },
        { "row": "14,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,1 ,2" },
        { "row": "14,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,15,13,2 ,2 ,2 ,2 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,2 ,2 ,2 ,2 ,2 ,2 ,1 ,2" },
        { "row": "14,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,16,0 ,12,13,2 ,2 ,2 ,2 ,2 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,2 ,2 ,2 ,2 ,2 ,1 ,2" },
        { "row": "12,15,15,15,15,15,15,15,16,0 ,0 ,0 ,14,2 ,2 ,2 ,2 ,2 ,2 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,2" },
        { "row": "0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,14,2 ,2 ,2 ,2 ,2 ,2 ,1 ,1 ,2 ,2 ,2 ,2 ,2 ,1 ,1 ,2 ,1 ,1 ,2" },
        { "row": "0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,14,2 ,2 ,2 ,2 ,2 ,1 ,1 ,1 ,2 ,15,15,13,2 ,1 ,1 ,2 ,1 ,1 ,2" },
        { "row": "0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,14,2 ,2 ,2 ,2 ,2 ,1 ,1 ,1 ,2 ,14,1 ,14,2 ,1 ,1 ,2 ,1 ,1 ,2" },
        { "row": "0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,14,2 ,2 ,2 ,2 ,2 ,2 ,1 ,1 ,2 ,14,1 ,14,2 ,1 ,1 ,2 ,1 ,1 ,2" },
        { "row": "0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,14,2 ,2 ,2 ,2 ,2 ,2 ,2 ,1 ,2 ,14,1 ,14,2 ,1 ,1 ,2 ,1 ,1 ,2" },
        { "row": "0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,14,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,12,15,14,2 ,1 ,1 ,2 ,1 ,1 ,2" },
        { "row": "0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,14,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2 ,11,2 ,2 ,2 ,2 ,2 ,2 ,2 ,2" },
        { "row": "0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,12,15,15,15,15,15,15,15,15,15,16,12,15,15,15,15,15,15,15,16" }
    ],
    "objectsMap": [
        { "row": "0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,2 ,5 ,2 ,5 ,2 ,5 ,2 ,5 ,2 ,5 ,2 ,5 ,2 ,5 ,2 ,5 ,2 ,1" },
        { "row": "0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,2 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,11,0 ,11,0 ,11,0 ,11,2" },
        { "row": "0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,11,0 ,11,0 ,11,0 ,5" },
        { "row": "0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,2 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,11,0 ,11,0 ,11,2" },
        { "row": "0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,11,0 ,11,0 ,11,0 ,11,0 ,5" },
        { "row": "0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,2 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,11,0 ,11,0 ,11,0 ,11,1" },
        { "row": "0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,11,0 ,11,0 ,11,0 ,5" },
        { "row": "0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1" },
        { "row": "0 ,8 ,2 ,8 ,2 ,8 ,2 ,8 ,2 ,0 ,0 ,0 ,0 ,6 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,6" },
        { "row": "0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,8 ,0 ,0 ,8 ,7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,8 ,0 ,2 ,2 ,2 ,0 ,0 ,6" },
        { "row": "0 ,0 ,0 ,0 ,0 ,3 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,10,2 ,0 ,0 ,6" },
        { "row": "0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,8 ,0 ,0 ,8 ,7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,8 ,0 ,2 ,2 ,2 ,0 ,0 ,6" },
        { "row": "0 ,8 ,2 ,8 ,2 ,8 ,2 ,8 ,2 ,0 ,0 ,0 ,0 ,6 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,6" },
        { "row": "0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1" },
        { "row": "0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5" },
        { "row": "0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,2 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,11,0 ,0 ,1" },
        { "row": "0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,2 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5" },
        { "row": "0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,2 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,11,0 ,0 ,2" },
        { "row": "0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,2 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5" },
        { "row": "0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,2 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,11,0 ,0 ,2" },
        { "row": "0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,2 ,5 ,2 ,5 ,2 ,5 ,2 ,2 ,2 ,0 ,2 ,2 ,2 ,5 ,2 ,5 ,2 ,1" },
        { "row": "0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0" }
    ]
};

window.onload = function () {
    ////// Here, we initialize the pixi application
    var pixiRoot = new PIXI.Application({
        width: 800, height: 600, backgroundColor : 0x6BACDE
    });

    // add the renderer view element to the DOM
    document.body.appendChild(pixiRoot.view);

    ////// Here, we create our traviso instance and add on top of pixi

    // engine-instance configuration object
    var instanceConfig = {
        mapDataPath: mapData, // the path to the json file that defines map data, required
        assetsToLoad: ["grassTile.png", "house.png"] // array of paths to the assets that are desired to be loaded by traviso, no need to use if assets are already loaded to PIXI cache, default null
    };

    var engine = TRAVISO.getEngineInstance(instanceConfig);
    pixiRoot.stage.addChild(engine);
}