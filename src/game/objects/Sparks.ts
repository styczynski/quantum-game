import * as PIXI from "pixi.js";
import {Game} from "../../Game";
import {GameObject, GameObjectOptions, ObjectTexture} from "../Object";
import ParticleSparkImg from "../../assets/traviso/particle/p_spark.png";

export interface SparksOptions extends GameObjectOptions {
    offset: [number, number];
}

export class Sparks extends GameObject<SparksOptions> {
    starContainer: PIXI.ParticleContainer;
    starStep: number;
    stars: any[];

    constructor(options: SparksOptions) {
        super(options);

        this.runSpread = this.runSpread.bind(this);
    }

    isVirtual(): boolean {
        return true;
    }

    getName(): string {
        return "Sparks";
    }

    getTextures(): ObjectTexture {
        return null;
    }

    onPostConstruct(game: Game): void {
        //Create the `ParticleContainer` and add it to the `stage`
        this.starContainer = new PIXI.ParticleContainer(
            15000,
            {
                rotation: true,
                uvs: true,
            }
        );
        game.pixiRoot.stage.addChild(this.starContainer);

        this.stars = [];
        this.starStep = 0;
        setTimeout(() => this.runSpread(game), 500);
    }

    runSpread(game: Game) {

        const x = game.engine.getTilePosXFor(this.options.position[0], this.options.position[1]);
        const y = game.engine.getTilePosYFor(this.options.position[0], this.options.position[1]);

        console.log({
            x: (this.options.offset[0]) + x + game.engine.mapContainer.position.x,
            y: (this.options.offset[1]) + (-y) + game.engine.mapContainer.position.y,
        })
        this.starStep = 0;
        this.stars = game.dust.create(
            (this.options.offset[0])  + x + game.engine.mapContainer.position.x,
            (this.options.offset[1])  + (-y) + game.engine.mapContainer.position.y,
            () => PIXI.Sprite.from(ParticleSparkImg),
            this.starContainer,
            5,
            0.4,
            true,
            -30, -25,
        );

        setTimeout(() => this.runSpread(game), 2500);
    }

    onRender(game: Game): void {
        if (this.stars) {
            this.stars.forEach((star: any) => {
                star.alpha = 1 - this.starStep * 0.05;
            });
        }
        ++this.starStep;
    }
}