export interface Point {
    x: number;
  y: number;

}

export class LineEntity {
    id: string;
    points: Point[];
    stroke: string = "#000";
    strokeWidth: number = 1;
    dash: number[] = [];
    
    constructor(points: Point[]) {
        this.id = crypto.randomUUID();
        this.points = points;
        
    }

    toKonvaPoints(): number[] {
        return this.points.flatMap(p => [p.x, p.y]);
    
    }
}