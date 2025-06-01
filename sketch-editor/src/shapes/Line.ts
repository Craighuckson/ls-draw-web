import Konva from 'konva';
import { BaseShape } from './BaseShape';
import { Scene } from '../Scene';

export class Line extends BaseShape {
    draw(scene: Scene, x1: number, y1: number, x2: number, y2: number): void {
        this.shape = new Konva.Line({
            points: [x1, y1, x2, y2],
            stroke: this.stroke,
            strokeWidth: this.strokeWidth,
            dash: this.dash,
            draggable: this.draggable,
        });
        this.addTo(scene);
    }
}

export class Road extends Line {
    constructor() {
        super({ stroke: 'black', strokeWidth: 2 });
    }
}

export class Cable extends Line {
    constructor() {
        super({ stroke: 'black', strokeWidth: 2, dash: [7, 7] });
    }
}
