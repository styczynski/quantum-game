import React from 'react';
import ReactDOM from 'react-dom';

import * as PIXI from 'pixi.js';
import { TRAVISO } from './traviso.js';

import HeroStill0Img from './assets/traviso/hero/hero_still0.png';
import HeroStill0Img_0 from './assets/traviso/hero/hero_still0_0.png';
import HeroStill0Img_1 from './assets/traviso/hero/hero_still0_1.png';
import HeroStill0Img_2 from './assets/traviso/hero/hero_still0_2.png';

import HeroStill1Img from './assets/traviso/hero/hero_still1.png';
import HeroStill1Img_0 from './assets/traviso/hero/hero_still1_0.png';
import HeroStill1Img_1 from './assets/traviso/hero/hero_still1_1.png';
import HeroStill1Img_2 from './assets/traviso/hero/hero_still1_2.png';

import HeroStill2Img from './assets/traviso/hero/hero_still2.png';
import HeroStill2Img_0 from './assets/traviso/hero/hero_still2_0.png';
import HeroStill2Img_1 from './assets/traviso/hero/hero_still2_1.png';

import HeroStill3Img from './assets/traviso/hero/hero_still3.png';
import HeroStill3Img_0 from './assets/traviso/hero/hero_still3_0.png';
import HeroStill3Img_1 from './assets/traviso/hero/hero_still3_1.png';

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

import LabWallImg0 from './assets/traviso/map/objects/o_lab_wall1.png';
import LabWallImg1 from './assets/traviso/map/objects/o_lab_wall2.png';
import LabWallImg2 from './assets/traviso/map/objects/o_lab_wall3.png';
import LabWallImg3 from './assets/traviso/map/objects/o_lab_wall4.png';
import LabWallImg4 from './assets/traviso/map/objects/o_lab_wall5.png';

import TilePartImg0 from './assets/traviso/map/tiles/t_lab_floor_part0.png';
import TilePartImg1 from './assets/traviso/map/tiles/t_lab_floor_part1.png';
import TilePartImg2 from './assets/traviso/map/tiles/t_lab_floor_part2.png';

import TileImg0 from './assets/traviso/map/tiles/t_lab_floor0.png';
import TileImg1 from './assets/traviso/map/tiles/t_lab_floor1.png';
import TileImg2 from './assets/traviso/map/tiles/t_lab_floor2.png';
import TileImg3 from './assets/traviso/map/tiles/t_lab_floor3.png';
import TileImg4 from './assets/traviso/map/tiles/t_lab_floor4.png';


const mapData = {
    "tiles": {
        "1":  { "movable": true,  "path": TileImg0 },
        "2":  { "movable": true,  "path": TileImg1 },
        "3":  { "movable": true,  "path": TileImg2 },
        "4":  { "movable": true,  "path": TileImg3 },
        "5":  { "movable": true,  "path": TileImg4 },
        "6":  { "movable": true, "path": TilePartImg0 },
        "7":  { "movable": true, "path": TilePartImg1 },
        "8":  { "movable": true, "path": TilePartImg2 },
    },
    "objects": {
        "101": {
            "movable": false, "interactive": false, "rowSpan": 1, "columnSpan": 1, "noTransparency": false, "floor": false,
            "visuals": { "idle": { "frames": [ { "path": LabWallImg0 } ] } }
        },
        "102": {
            "movable": false, "interactive": false, "rowSpan": 1, "columnSpan": 1, "noTransparency": false, "floor": false,
            "visuals": { "idle": { "frames": [ { "path": LabWallImg1 } ] } }
        },
        "103": {
            "movable": false, "interactive": false, "rowSpan": 1, "columnSpan": 1, "noTransparency": false, "floor": false,
            "visuals": { "idle": { "frames": [ { "path": LabWallImg2 } ] } }
        },
        "104": {
            "movable": false, "interactive": false, "rowSpan": 1, "columnSpan": 1, "noTransparency": false, "floor": false,
            "visuals": { "idle": { "frames": [ { "path": LabWallImg3 } ] } }
        },
        "105": {
            "movable": false, "interactive": false, "rowSpan": 1, "columnSpan": 1, "noTransparency": false, "floor": false,
            "visuals": { "idle": { "frames": [ { "path": LabWallImg4 } ] } }
        },
        "3": {
            "movable": true,  "interactive": false, "rowSpan": 1, "columnSpan": 1, "noTransparency": true,  "floor": false,
            "visuals": {
                "idle": {
                    "frames": [
                        { "path": HeroStill0Img },
                    ]
                },
                "idle_n": {
                    "frames": [
                        { "path": HeroStill1Img },
                    ]
                },
                "idle_w": {
                    "frames": [
                        { "path": HeroStill1Img },
                    ]
                },
                "idle_e": {
                    "frames": [
                        { "path": HeroStill1Img },
                    ]
                },
                "move_nw": {
                    "frames": [
                        { "path": HeroStill3Img },
                        { "path": HeroStill3Img_0 },
                        { "path": HeroStill3Img_1 },
                    ]
                },
                "move_ne": {
                    "frames": [
                        { "path": HeroStill2Img },
                        { "path": HeroStill2Img_0 },
                        { "path": HeroStill2Img_1 },
                    ]
                },
                "move_sw": {
                    "frames": [
                        { "path": HeroStill0Img },
                        { "path": HeroStill0Img_0 },
                        { "path": HeroStill0Img_1 },
                        { "path": HeroStill0Img_2 },
                    ]
                },
                "move_se": {
                    "frames": [
                        { "path": HeroStill1Img },
                        { "path": HeroStill1Img_0 },
                        { "path": HeroStill1Img_1 },
                        { "path": HeroStill1Img_2 },
                    ]
                },
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
        },
    },
    "initialControllableLocation": { "columnIndex": 2, "rowIndex": 3, "controllableId": "3" },
    "tileHighlightImage": { "path": TileHighlightImg },
    "groundMap": [
        { "row": "6 ,6 ,6 ,6" },
        { "row": "1 ,1 ,2 ,3" },
        { "row": "1 ,2 ,4 ,5" },
        { "row": "7 ,7 ,7 ,8" },
    ],
    "objectsMap": [
        { "row": "101 ,102 ,105 ,104" },
        { "row": "0 ,0 ,0 ,103" },
        { "row": "0 ,0 ,0 ,103" },
        { "row": "0 ,0 ,3 ,103" },
    ]
};

window.onload = function () {
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    PIXI.settings.ROUND_PIXELS = false;

    ////// Here, we initialize the pixi application
    var pixiRoot = new PIXI.Application({
        width: 800,
        height: 600,
        backgroundColor : 0x6BACDE,
        antialias: false,
        resolution: 2,
        transparent: true,
    });

    // add the renderer view element to the DOM
    document.body.appendChild(pixiRoot.view);

    ////// Here, we create our traviso instance and add on top of pixi

    // engine-instance configuration object
    var instanceConfig = {
        mapDataPath: mapData, // the path to the json file that defines map data, required
        assetsToLoad: ["grassTile.png", "house.png"], // array of paths to the assets that are desired to be loaded by traviso, no need to use if assets are already loaded to PIXI cache, default null
        pixiRoot: pixiRoot,
    };

    var engine = TRAVISO.getEngineInstance(instanceConfig);
    pixiRoot.stage.addChild(engine);
}