import Konva from "konva";
import { Scene } from './Scene';

export class Grid {
    private scene: Scene;
    private gridImage: Konva.Image | null = null;

    constructor(scene: Scene, imageUrl: string) {
        this.scene = scene;
        Konva.Image.fromURL(imageUrl, (img) => {
            this.gridImage = img;
            this.scene.addToLayer(img, true);
            img.visible(false);
            this.scene.gridLayer.draw();
        });
    }

    show(): void {
        if (this.gridImage) {
            this.gridImage.visible(true);
            this.scene.gridLayer.batchDraw();
        }
    }

    hide(): void {
        if (this.gridImage) {
            this.gridImage.visible(false);
            this.scene.gridLayer.batchDraw();
        }
    }
}
