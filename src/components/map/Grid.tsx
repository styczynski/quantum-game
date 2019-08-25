import React from 'react';
import styled from 'styled-components';

import labBlock1 from '../../assets/lab_block1.png';
import labLaser from '../../assets/lab_laser.png';

import { FloorTile, ObjectTile } from './Tile';

export interface GridProps {
    width: number;
    height: number;
}

function LabBlock1({x, y, scale}: {
    x: number;
    y: number;
    scale: number;
}) {
    return <ObjectTile
        texture={labBlock1}
        textureX={-1.8}
        textureY={-7.0}
        textureW={11}
        x={x}
        y={y}
        scale={scale}
        clickMap={[
            "145,299 149,788 317,883 771,622 769,133 598,39 "
        ]}
    />;
}

function LabLaser({x, y, scale}: {
    x: number;
    y: number;
    scale: number;
}) {
    return <ObjectTile
        texture={labLaser}
        textureX={-1.8}
        textureY={-7.5}
        textureW={11}
        x={x}
        y={y}
        scale={scale}
    />;
}


export function Grid({width, height}: GridProps) {

    const scale = 1.1;
    let tileNodes = [];

    for(let x=0;x<width;++x) {
        for(let y=0;y<height;++y) {
            tileNodes.push(
                <FloorTile x={x} y={y} scale={scale}/>
            );
        }
    }

    return <div>
        {tileNodes}

        <LabLaser x={3} y={3} scale={scale} />
        <LabBlock1 x={2} y={5} scale={scale}/>
        <LabBlock1 x={0} y={5} scale={scale} />
    </div>;
};