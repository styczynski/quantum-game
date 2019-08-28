import { VirtualObjectFactory, GameVirtualObjectSpec } from "../VirtualObject";
import * as PIXI from "pixi.js";

export interface LaserLightOptions {

}

export interface LaserLightState {
    p: number;
}

export class LaserLight extends VirtualObjectFactory<LaserLightOptions, LaserLightState> {
    graphics: PIXI.Graphics;

    createObject(options: LaserLightOptions): GameVirtualObjectSpec<LaserLightState> {
        return {
            type: "VIRTUAL_OBJECT",
            name: "LaserLight",
            position: {
                x: 0,
                y: 0,
            },
            onInit: (game) => {
                this.graphics = new PIXI.Graphics();
                game.pixiRoot.stage.addChild(this.graphics);
            },
            onRender: (objs, game) => {
                this.graphics.clear();
                for (const obj of objs) {
                    if (obj.state.p < 1.00)  // while we didn't fully draw the line
                        obj.state.p += 0.01; // increase the "progress" of the animation

                    const points = [
                        [2,3,10,-27],
                        [4,3,10,-27],
                        [4,0,10,-27],
                    ];

                    let lastPoint = points[0];
                    let totalDist = 0;
                    for (const point of points) {
                        totalDist += Math.sqrt((point[0]-lastPoint[0])*(point[0]-lastPoint[0])+(point[1]-lastPoint[1])*(point[1]-lastPoint[1]));
                        lastPoint = point;
                    }

                    lastPoint = points[0];
                    let currentDist = 0;
                    for (const point of points) {
                        const dist = Math.sqrt((point[0]-lastPoint[0])*(point[0]-lastPoint[0])+(point[1]-lastPoint[1])*(point[1]-lastPoint[1]));
                        let pVal = Math.min(1, Math.max(0, (totalDist * obj.state.p - currentDist) / dist));

                        const lineFromX = lastPoint[2] + game.engine.mapContainer.position.x + game.engine.getTilePosXFor(lastPoint[0], lastPoint[1]);
                        const lineFromY = lastPoint[3] + game.engine.mapContainer.position.y - game.engine.getTilePosYFor(lastPoint[0], lastPoint[1]);

                        const lineToX = point[2] + game.engine.mapContainer.position.x + game.engine.getTilePosXFor(point[0], point[1]);
                        const lineToY = point[3] + game.engine.mapContainer.position.y - game.engine.getTilePosYFor(point[0], point[1]);

                        this.graphics.lineStyle(2, 0xCC3333);
                        this.graphics.moveTo(lineFromX, lineFromY);
                        // This is the length of the line. For the x-position, that's 600-30 pixels - so your line was 570 pixels long.
                        // Multiply that by p, making it longer and longer. Finally, it's offset by the 30 pixels from your moveTo above. So, when p is 0, the line moves to 30 (not drawn at all), and when p is 1, the line moves to 600 (where it was for you). For y, it's the same, but with your y values.
                        this.graphics.lineTo(lineFromX + (lineToX - lineFromX)*pVal, lineFromY + (lineToY - lineFromY)*pVal);

                        lastPoint = point;
                        currentDist += dist;
                    }
                }
            },
            state: {
                p: 0,
            },
        }
    }
}

export const LaserLights = new LaserLight();