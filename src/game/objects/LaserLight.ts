import * as PIXI from "pixi.js";
import {Game, Mirror, MirrorType} from "../../Game";
import {GameObject, GameObjectOptions, ObjectTexture} from "../Object";

export interface LaserLightOptions extends GameObjectOptions {

}

export interface LaserLightState {
    p: number;
}

function getShiftForObject(obj: GameObject<GameObjectOptions>): [number, number] {
    switch (obj.getName()) {
        case "Mirror": {
            switch ((obj as Mirror).getOptions().type) {
                case MirrorType.SW: return [-10, 2];
            }
        }
    }
    return [0, 0];
}

function getDrawPosition({
    p, points, totalDist, game, amplitudes, i,
} : {
    points: [number, number][];
    p: number;
    totalDist: number;
    amplitudes: number[];
    i: number;
    game: Game;
}): {
    point: [number, number];
    normalPoint: [number, number];
    nonNormalPoint: [number, number];
    currentDist: number;
} {
    let lastPoint = points[0];
    let shiftLast: [number, number] = [0, 0];
    let currentDist = 0;
    for (const point of points) {
        const dist = Math.sqrt((point[0] - lastPoint[0]) * (point[0] - lastPoint[0]) + (point[1] - lastPoint[1]) * (point[1] - lastPoint[1]));
        let pVal = Math.min(1, Math.max(0, (totalDist * p - currentDist) / dist));

        let shift: [number, number] = [10, -27];
        const objThere = game.getConcreteObjectAt(point);
        if (objThere) {
            shift[0] += getShiftForObject(objThere)[0];
            shift[1] += getShiftForObject(objThere)[1];
        }

        if (pVal > 0 && pVal < 1) {

            const lineFromX = shiftLast[0] + game.engine.mapContainer.position.x + game.engine.getTilePosXFor(lastPoint[0], lastPoint[1]);
            const lineFromY = shiftLast[1] + game.engine.mapContainer.position.y - game.engine.getTilePosYFor(lastPoint[0], lastPoint[1]);

            const lineToX = shift[0] + game.engine.mapContainer.position.x + game.engine.getTilePosXFor(point[0], point[1]);
            const lineToY = shift[1] + game.engine.mapContainer.position.y - game.engine.getTilePosYFor(point[0], point[1]);

            const currentPoint: [number, number] = [lineFromX + (lineToX - lineFromX) * pVal, lineFromY + (lineToY - lineFromY) * pVal];

            const normalYCoeff = -(lineToX - lineFromX) / (lineToY - lineFromY);

            const tAmp = Math.sin((currentDist + dist * pVal)/100 * Math.PI * 80);
            const dAmp = amplitudes[(tAmp < 0) ? (amplitudes.length - i) : (i)];

            const normalRot = 40;
            const normalXShift = Math.cos(Math.atan(normalYCoeff) + (normalRot / 180 * Math.PI)) * dAmp * tAmp;
            const normalYShift = Math.sin(Math.atan(normalYCoeff) + (normalRot / 180 * Math.PI)) * dAmp * tAmp;

            const nonNormalYCoeff = -(lineToX - lineFromX) / (lineToY - lineFromY);
            const nonNormalRot = -40;
            const nonNormalXShift = -Math.cos(Math.atan(nonNormalYCoeff) + (nonNormalRot / 180 * Math.PI)) * dAmp * tAmp;
            const nonNormalYShift = -Math.sin(Math.atan(nonNormalYCoeff) + (nonNormalRot / 180 * Math.PI)) * dAmp * tAmp;

            return {
                point: currentPoint,
                normalPoint: [currentPoint[0] - normalXShift, currentPoint[1] - normalYShift],
                nonNormalPoint: [currentPoint[0] - nonNormalXShift, currentPoint[1] - nonNormalYShift],
                currentDist: currentDist + dist * pVal,
            };
        }

        lastPoint = point;
        shiftLast = shift;
        currentDist += dist;
    }
    return {
        point: points[0],
        normalPoint: points[0],
        nonNormalPoint: points[0],
        currentDist: 0,
    };
}

export enum LaserDirection {
    NW,
    NE,
    SW,
    SE,
    ABSORBED,
}

function calculateLaserReflection(currentDirection: LaserDirection, obj: GameObject<GameObjectOptions>): LaserDirection {
    switch (obj.getName()) {
        case "Mirror": {
            switch ((obj as Mirror).getOptions().type) {
                case MirrorType.SW: {
                    switch (currentDirection) {
                        case LaserDirection.NE: return LaserDirection.SW;
                    }
                    break;
                }
                case MirrorType.SE: {
                    switch (currentDirection) {
                        case LaserDirection.NE: return LaserDirection.NE;
                    }
                }
                case MirrorType.NW: {
                    switch (currentDirection) {
                        case LaserDirection.NE: return LaserDirection.NE;
                    }
                }
                case MirrorType.NE: {
                    switch (currentDirection) {
                        case LaserDirection.NE: return LaserDirection.SW;
                    }
                    break;
                }
            }
            break;
        }
    }

    return LaserDirection.ABSORBED;
}

function constructLaserPath(game: Game, point: [number, number], direction: LaserDirection): [number, number][] {
    let currentDirection = direction;
    let x = point[0];
    let y = point[1];
    let routePoints: [number, number][] = [];

    const MAX_DIST = 10;

    while (currentDirection != LaserDirection.ABSORBED) {

        if (Math.abs(point[0]-x) + Math.abs(point[1]-y) >= MAX_DIST) break;

        switch (currentDirection) {
            case LaserDirection.SE: ++y; break;
            case LaserDirection.SW: --x; break;
            case LaserDirection.NE: ++x; break;
            case LaserDirection.NW: --y; break;
        }

        const obj = game.getConcreteObjectAt([x, y]);
        if (obj) {
            currentDirection = calculateLaserReflection(currentDirection, obj);
        }

        routePoints.push([x, y]);
    }

    return routePoints;
}

export class LaserLight extends GameObject<LaserLightOptions> {
    graphics: PIXI.Graphics;
    p: number = 0;

    isVirtual(): boolean {
        return true;
    }

    getName(): string {
        return "LaserLight";
    }

    getTextures(): ObjectTexture {
        return null;
    }

    onPostConstruct(game: Game): void {
        this.graphics = new PIXI.Graphics();
        game.pixiRoot.stage.addChild(this.graphics);
    }

    onRender(game: Game): void {
        this.graphics.clear();

        const points: [number, number][] = constructLaserPath(game,[2, 3], LaserDirection.NE);

        let lastPoint = points[0];
        let totalDist = 0;
        for (const point of points) {
            totalDist += Math.sqrt((point[0]-lastPoint[0])*(point[0]-lastPoint[0])+(point[1]-lastPoint[1])*(point[1]-lastPoint[1]));
            lastPoint = point;
        }

        if (this.p < 1.00) { // while we didn't fully draw the line
            this.p += 0.01 / totalDist; // increase the "progress" of the animation
        } else {
            this.p = 0;
        }

        const amps = [
            0,
            1.0673664307580015,
            3.999999999999999,
            5.877852522924732,
            7.431448254773942,
            8.090169943749475,
            9.135454576426008,
            9.781476007338057,
            10,
            9.945218953682733,
            9.781476007338057,
            9.510565162951536,
            9.13545457642601,
            8.660254037844387,
            8.090169943749475,
            7.431448254773945,
            6.691306063588583,
            5.877852522924733,
            4.999999999999999,
            4.067366430758001,
            3.090169943749475,
            2.079116908177593,
            1.0452846326765328,
            0,
        ];

        const l = amps.length;
        for (let i = 0; i <= l; ++i) {
            const { point, normalPoint, nonNormalPoint } = getDrawPosition({
                points,
                p: this.p + (0.01 / totalDist)*i,
                totalDist,
                game,
                i,
                amplitudes: amps,
            });

            this.graphics.lineStyle(1, 0xCC3331 + 0x000009 * 0);
            this.graphics.moveTo(point[0], point[1]);
            this.graphics.lineTo(normalPoint[0], normalPoint[1]);

            this.graphics.lineStyle(1, 0xAA1111+ 0x090000 * 0);
            this.graphics.moveTo(point[0], point[1]);
            this.graphics.lineTo(nonNormalPoint[0], nonNormalPoint[1]);
        }
    }

}