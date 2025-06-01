import Konva from "konva";

export class Line {
  colour: string;
  width: number;
  dash?: number[];
  
  constructor(colour: string, width: number, dash?: number[]) {
    this.colour = colour;
    this.width = width;
    this.dash = dash;
  }

  draw(layer:Konva.Layer, x1:number, y1:number, x2:number, y2:number) {
    const line = new Konva.Line({
      points: [x1, y1, x2, y2],
      stroke: this.colour,
      strokeWidth: this.width,
      draggable: true,
      lineJoin: "round",
      lineCap: "round",
      shadowEnabled: false,
      dash: this.dash,
      hitStrokeWidth: 8,
    });
    layer.add(line);
    return line;
  }
}

export class RoadLine extends Line {
  constructor() {
    super("black", 2);
  }
}

export class CableLine extends Line {
  constructor() {
    super("black", 2, [10,10  ]);
  }
}

export class RegLine extends Line {
  constructor() {
    super("black", 1, []);
  }
}

export class RegularArrow extends Line {
  constructor() {
    super("black", 1, 0);
  }

  draw(layer:Konva.Layer, x1, y1, x2, y2) {
    const arrow = new Konva.Arrow({
      points: [x1, y1, x2, y2],
      stroke: this.colour,
      strokeWidth: this.width,
      fill: this.colour,
      draggable: true,
      lineJoin: "round",
      shadowEnabled: false,
      dash: this.dash,
      hitStrokeWidth: 10,
      pointerLength: 10,
      pointerWidth: 10,
      pointerAtBeginning: true,
      pointerAtEnding: false,
    });
    layer.add(arrow);
    return arrow;
  }
}

export class Point {
  x: any;
  y: any;
  colour: any;
  constructor(x, y, colour) {
    this.x = x;
    this.y = y;
    this.colour = colour;
  }
  draw(layer) {
    const point = new Konva.Circle({
      x: this.x,
      y: this.y,
      radius: 2,
      fill: this.colour,
      stroke: this.colour,
      strokeWidth: 1,
      id: "point",
    });
    layer.add(point);
    return point;
  }
}

export class MeasurementArrow extends RegularArrow {}

export class Grid {
  gridLayer: any;
  gridimg: null;
  readyPromise: Promise<unknown>;
  constructor(gridLayer) {
    this.gridLayer = gridLayer;
    this.gridimg = null;
    this.readyPromise = new Promise((resolve, reject) => {
      Konva.Image.fromURL(
        "./grid2.png",
        (img) => { // Success callback
          this.gridimg = img;
          this.gridLayer.add(this.gridimg);
          this.gridimg.moveToBottom();
          this.gridimg.visible(false);
          this.gridLayer.batchDraw();
          resolve(this.gridimg); // Resolve the promise with the image node
        },
        (err) => { // Error callback
          console.error("Failed to load grid image:", err);
          reject(err); // Reject the promise if loading fails
        }
      );
    });
  }

  async showGrid() {
    try {
      await this.readyPromise; // Wait for the image to be ready
      this.gridimg.visible(true);
      this.gridLayer.batchDraw();
    } catch (error) {
      // Image failed to load, error already logged by the promise
      // console.error("Cannot show grid, image loading failed earlier.");
    }
  }

  async hideGrid() {
    try {
      await this.readyPromise; // Wait for the image to be ready
      this.gridimg.visible(false);
      this.gridLayer.batchDraw(); // Ensure the change is rendered
    } catch (error) {
      // Image failed to load, nothing to hide
      // console.error("Cannot hide grid, image loading failed earlier.");
    }
  }
}

export class Text {
  fontSize: any;
  textNode: null;
  constructor(fontSize) {
    this.fontSize = fontSize;
    this.textNode = null; // Initialize text to null
  }

  draw(layer,x, y, text) {
    this.textNode = new Konva.Text({
      x: x,
      y: y,
      text: text,
      fontSize: this.fontSize,
      fontFamily: "Calibri",
      fill: "black",
      draggable: true,
    });
    layer.add(this.textNode);
    return this.textNode;
  }
}
