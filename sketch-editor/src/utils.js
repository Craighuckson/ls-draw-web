//Utility functions - utils.js

import Konva from './konva.js';

export class Utils {
 static formatMeasurement(measurement) {
        if (measurement.length === 1) {
            return "0" + measurement + "m";
        } else if (measurement.length === 2) {
            return "0" + measurement[0] + "." + measurement[1] + "m";
        } else if (measurement.length === 3) {
            return measurement[0] + "." + measurement[1] + measurement[2] + "m";
        }
    }

  static downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


static snapToGrid(x, y) {
  const gridSize = 10;
  const newX = Math.round(x / gridSize) * gridSize;
  const newY = Math.round(y / gridSize) * gridSize;
  return { x: newX, y: newY };
}

static drawPoint(x, y, colour) {
  return new Konva.Circle({
    x: x,
    y: y,
    radius: 2,
    fill: colour,
    stroke: colour,
    strokeWidth: 1,
    id: "point",
  });
}
}