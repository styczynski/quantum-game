import React from 'react';
import styled from 'styled-components';
import {Simulate} from "react-dom/test-utils";
import click = Simulate.click;

export interface FloorTileProps {
    x: number;
    y: number;
    scale: number;
}

export function calculateTilePoisition({x, y, scale, shiftX, shiftY}: {
    x: number;
    y: number;
    scale: number;
    shiftX?: number;
    shiftY?: number;
}): {
    x: number;
    y: number;
} {
    return {
        x: 9.9 + scale * x * 2.8 + scale * y * 0 + scale * (shiftX || 0),
        y: 22.4 - scale * x * 1.6 + scale * y * 3.1 + scale * (shiftY || 0),
    };
}

export const FloorTile = styled.div<FloorTileProps>`
    position: absolute;
    left: ${({x, y, scale}: FloorTileProps) => calculateTilePoisition({x, y, scale}).x+'vw'};
    top: ${({x, y, scale}: FloorTileProps) => calculateTilePoisition({x, y, scale}).y+'vw'};
    width: ${({scale}: FloorTileProps) => (3.88 * scale)+'vw'};
    height: ${({scale}: FloorTileProps) => (3.88 * scale)+'vw'};
    background-color: white;
    transform: rotateZ(120deg) rotateX(39deg) rotateY(223deg);
    border: 0.1vw #aeb2b3 solid;
    
    &:hover {
        background: red;
    }
`;

export interface ObjectTileProps {
    texture: any;
    textureW?: number;
    textureH?: number;
    textureX?: number;
    textureY?: number;
    x: number;
    y: number;
    scale: number;
    clickMap?: string[];
}

interface ObjectTileImage {
    gridX: number;
    gridY: number;
    gridScale: number;
    textureW?: number;
    textureH?: number;
    textureX?: number;
    textureY?: number;
}

const ObjectTileImageWrapper = styled.div<ObjectTileImage>`
    position: absolute;
    left: ${({gridX, gridY, textureX, gridScale}: ObjectTileImage) => calculateTilePoisition({x: gridX, y: gridY, scale: gridScale, shiftX: textureX}).x+'vw'};
    top: ${({gridX, gridY, textureY, gridScale}: ObjectTileImage) => calculateTilePoisition({x: gridX, y: gridY, scale: gridScale, shiftY: textureY}).y+'vw'};
`;

const ObjectTileImage = styled.img<ObjectTileImage>`
    height: ${({textureW, textureH, gridScale}: ObjectTileImage) => (gridScale * (textureW || textureH))+'vw'}
    width: ${({textureW, textureH, gridScale}: ObjectTileImage) => (gridScale * (textureH || textureW))+'vw'}
`;

let uid = 1;

export function ObjectTile({ texture, textureX, textureY, x, y, textureW, textureH, scale, clickMap }: ObjectTileProps) {
    uid = uid+1;

    return <ObjectTileImageWrapper
            textureW={textureW}
            textureH={textureH}
            textureX={textureX}
            textureY={textureY}
            gridX={x}
            gridY={y}
            gridScale={scale}
        >
        <ObjectTileImage
            textureW={textureW}
            textureH={textureH}
            textureX={textureX}
            textureY={textureY}
            src={texture}
            gridX={x}
            gridY={y}
            gridScale={scale}
            useMap={`#Map${uid}`}
        />
        {
            (clickMap) ? (
                <map name={`Map${uid}`} id={`Map${uid}`}>
                    {clickMap.map(coords => <area tabIndex={0} alt="A" title="A" href="www.google.com" shape="poly" coords={coords}/>)}
                </map>
            ) : (null)
        }
    </ObjectTileImageWrapper>
}