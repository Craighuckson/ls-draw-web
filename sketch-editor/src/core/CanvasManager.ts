import Konva from 'konva';

export class CanvasManager {
    private stage: Konva.Stage;
    private layer: Konva.Layer;
    private shapes: Konva.Shape[];
    constructor(stage:Konva.Stage) {
        this.stage = stage;
        this.layer = new Konva.Layer();
        this.stage.add(this.layer);
        this.shapes = [];
    }

    addShape(shape: Konva.Shape) {
        this.shapes.push(shape);
        this.layer.add(shape);
        this.layer.draw();
    }

    removeShape(shape: Konva.Shape) {
        shape.destroy();
        this.shapes = this.shapes.filter(s => s !== shape);
        this.layer.draw();
    }
    }

