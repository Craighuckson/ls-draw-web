import { BaseShape } from "./BaseShape";
import { Scene } from "../Scene";
import Konva from "konva";


export class Arrow extends BaseShape {
    draw(scene: Scene, x1: number, y1: number, x2: number, y2: number): void {
        this.shape = new Konva.Arrow({
            points: [x1, y1, x2, y2],
            stroke: this.stroke,
            strokeWidth: this.strokeWidth,
            fill: this.stroke,
            draggable: this.draggable,
            pointerLength: 10,
            pointerWidth: 10,
        });
        this.addTo(scene);
    }
}