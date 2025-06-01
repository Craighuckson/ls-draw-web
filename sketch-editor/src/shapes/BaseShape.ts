import Konva from 'konva';
import { ShapeOptions } from '../types';
import { Scene } from '../Scene';

export abstract class BaseShape {
    protected stroke: string;
    protected strokeWidth: number;
    protected dash: number[];
    protected draggable: boolean;
    shape!: Konva.Shape | Konva.Text;

    constructor({ stroke = 'black', strokeWidth = 1, dash = [], draggable = true }: ShapeOptions = {}) {
        this.stroke = stroke;
        this.strokeWidth = strokeWidth;
        this.dash = dash;
        this.draggable = draggable;
    }

    abstract draw(scene: Scene, x1: number, y1: number, x2?: number, y2?: number): void;

    addTo(scene: Scene): void {
        scene.addToLayer(this.shape);
    }

    snapToGrid(gridSize: number = 10): void {
        this.shape.on('dragmove', () => {
            const x = Math.round(this.shape.x() / gridSize) * gridSize;
            const y = Math.round(this.shape.y() / gridSize) * gridSize;
            this.shape.position({ x, y });
        });
    }
}
