import Konva from 'konva';
import { BaseShape } from './BaseShape';
import { Scene } from '../Scene';

export class TextLabel extends BaseShape {
    constructor(text: string, x: number, y: number, fontSize: number = 12) {
        super();
        this.shape = new Konva.Text({
            text,
            x,
            y,
            fontSize,
            fontFamily: 'Calibri',
            fill: 'black',
            draggable: true,
        });
    }

    draw(scene: Scene): void {
        this.addTo(scene);
    }
}
