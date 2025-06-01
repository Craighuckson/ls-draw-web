import { ShapeType } from './types';
import { Road, Cable, Line, Arrow, TextLabel } from './shapes/index';
import { BaseShape } from './shapes/BaseShape';

export class ShapeFactory {
    static create(type: ShapeType): BaseShape {
        switch (type) {
            case 'Road': return new Road();
            case 'Cable': return new Cable();
            case 'Line': return new Line();
            case 'Arrow': return new Arrow();
            case 'Text': return new TextLabel('Sample Text', 0, 0);
            default: throw new Error(`Unsupported shape type: ${type}`);
        }
    }
}
