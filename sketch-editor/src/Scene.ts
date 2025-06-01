import Konva from 'konva';

export class Scene {
    stage: Konva.Stage;
    mainLayer: Konva.Layer;
    gridLayer: Konva.Layer;
    transformer: Konva.Transformer;

    constructor(containerId: string, width: number, height: number) {
        this.stage = new Konva.Stage({ container: containerId, width, height });
        this.mainLayer = new Konva.Layer();
        this.gridLayer = new Konva.Layer();
        this.stage.add(this.gridLayer);
        this.stage.add(this.mainLayer);
        this.gridLayer.moveToBottom();
        this.gridLayer.listening(false);
        this.transformer = this.initTransformer();
    }

    private initTransformer(): Konva.Transformer {
        const tr = new Konva.Transformer({ keepRatio: true, ignoreStroke: true });
        this.mainLayer.add(tr);
        return tr;
    }

    get pointerPosition(): Konva.Vector2d {
        return this.stage.getPointerPosition()!;
    }

    clear(): void {
        this.mainLayer.destroyChildren();
        this.mainLayer.draw();
    }

    addToLayer(node: Konva.Group | Konva.Shape, isGrid: boolean = false): void {
        if (isGrid) {
            this.gridLayer.add(node);
        } else {
            this.mainLayer.add(node);
        }
    }

    draw(): void {
        this.mainLayer.batchDraw();
    }
}
