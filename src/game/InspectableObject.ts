import {Game, GameMapData, GameMapDataVisualsSpec} from "../Game";
import {GameObject, GameObjectMouseEvent, GameObjectOptions} from "./Object";

export abstract class InspectableGameObject<GameObjectOptionsT extends GameObjectOptions> extends GameObject<GameObjectOptionsT> {

    inspectDialogGraphics: PIXI.Graphics;
    inspectDialogText: PIXI.Text;

    onPostConstruct(game: Game): void {
        this.inspectDialogGraphics = new PIXI.Graphics();
        game.pixiRoot.stage.addChild(this.inspectDialogGraphics);

        this.inspectDialogText = new PIXI.Text("Ala ma kota!", {fontSize: 8});
        game.pixiRoot.stage.addChild(this.inspectDialogText);
        this.inspectDialogText.alpha = 0;
    }

    onPreDestruct(game: Game): void {
        game.pixiRoot.stage.removeChild(this.inspectDialogText);
        game.pixiRoot.stage.removeChild(this.inspectDialogGraphics);
    }

    onMouseOut(game: Game): void {
        if (this.inspectDialogGraphics) {
            this.inspectDialogText.visible = false;
            this.inspectDialogText.alpha = 0;
            this.inspectDialogGraphics.clear();
        }
    }

    onMouseOver(game: Game, event: GameObjectMouseEvent): void {
        if (this.inspectDialogGraphics) {
            this.inspectDialogGraphics.clear();
            this.inspectDialogGraphics.lineStyle(5, 0x666666, 1);
            this.inspectDialogGraphics.beginFill(0x333333, 1);
            this.inspectDialogGraphics.drawRect(event.screenPosition[0], event.screenPosition[1] ,100,50);
            this.inspectDialogGraphics.endFill();
            this.inspectDialogGraphics.alpha = 0.5;

            this.inspectDialogText.visible = true;
            this.inspectDialogText.alpha = 1;
            this.inspectDialogText.position.x = event.screenPosition[0]+10;
            this.inspectDialogText.position.y = event.screenPosition[1]+10;

            this.inspectDialogText.text = `${this.getName()}: ${event.position[0]} x ${event.position[1]}` +
                '\n' + Object.entries(this.getOptions()).reduce<string>((acc, [key, val]) => {
                    if (typeof val !== 'object') {
                        return `${acc}${key.toUpperCase()}: ${val}\n`;
                    }
                    return acc;
                }, "");
        }
    }
}