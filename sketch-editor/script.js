// script.js

//set the coordinate system to turn 600x700 into 60x70
// flag varible to determine current editing mode
let editMode = "select";
let isGridOn = false;

const HEIGHT = 600;
const WIDTH = 700;
// the four values correspond to int values of points on a line (x1,y1,x2,y2)
const ECURB = [WIDTH / 3, HEIGHT * 0.067, WIDTH / 3, HEIGHT * 0.933];
const WCURB = [(WIDTH * 2) / 3, HEIGHT * 0.067, (WIDTH * 2) / 3, HEIGHT * 0.933];
const NCURB = [WIDTH * (1 / WIDTH), (HEIGHT * 2) / 3, (WIDTH * 69) / WIDTH, (HEIGHT * 2) / 3];
const SCURB = [WIDTH * (1 / WIDTH), HEIGHT / 3, WIDTH - 2, HEIGHT / 3];

const HNCURB = [NCURB[0], SCURB[1] + HEIGHT / 15, NCURB[2], SCURB[1] + HEIGHT / 15];
const HSCURB = [SCURB[0], NCURB[1] - HEIGHT / 15, NCURB[2], NCURB[1] - HEIGHT / 15];

// these are x,y (int) coordinates for street text labels
const NSTREET = [WIDTH / 2, (NCURB[1] + HEIGHT) / 2];
const SSTREET = [WIDTH / 2, SCURB[1] / 2];
const WSTREET = [(WCURB[0] + WIDTH) / 2, HEIGHT / 2];
const ESTREET = [ECURB[0] / 2, HEIGHT / 2];
const HSTREET = [WIDTH / 2, HEIGHT / 2];

//curb labels
const HNCURBLABEL = [(65 / 70) * WIDTH, (42 / 60) * HEIGHT, 12]; // x, y , fontsize
const HSCURBLABEL = [(65 / 70) * WIDTH, (18 / 60) * HEIGHT, 12];
const WCURBLABEL = [(40 / 70) * WIDTH, (6 / 60) * HEIGHT, 12];
const ECURBLABEL = [(22 / 70) * WIDTH, (6 / 60) * HEIGHT, 12];

const NBLHOUSE1 = [WIDTH * 0.1, HEIGHT * 0.2, "m"]; // upper left x, upper left y, house size
const NBLHOUSE2 = [WIDTH * 0.8, HEIGHT * 0.2, "m"];
const NWBLHOUSE = [8, 8, "m"];
const NEBLHOUSE = [18, 8, "m"];
const SBLHOUSE1 = [WIDTH * 0.1, HEIGHT * 0.7, "m"];
const SBLHOUSE2 = [WIDTH * 0.8, HEIGHT * 0.7, "m"];
const SWBLHOUSE = [9, 16, "m"];
const SEBLHOUSE = [16, 16, "m"];
const WBLHOUSE1 = [WIDTH * 0.2, HEIGHT * 0.1, "m"];
const WBLHOUSE2 = [WIDTH * 0.2, HEIGHT * 0.8, "m"];
const EBLHOUSE1 = [WIDTH * 0.7, HEIGHT * 0.1, "m"];
const EBLHOUSE2 = [WIDTH * 0.7, HEIGHT * 0.8, "m"];

const NPLTOPL_DIGBOX = [6, 16, 24, 28];
const NWPLTOPL_DIGBOX = [8, 8, 28, 28];
const NEPLTOPL_DIGBOX = [4, 8, 24, 28];
const SPLTOPL_DIGBOX = [6, 2, 24, 14];
const SWPLTOPL_DIGBOX = [9, 3, 27, 22];
const SEPLTOPL_DIGBOX = [3, 3, 22, 22];
const WPLTOPL_DIGBOX = [14, 6, 28, 24];
const EPLTOPL_DIGBOX = [2, 2, 15, 28];

//helper functions


/**
 * Formats a measurement string to include a decimal point and "m" at the end.
 * If the string is one digit long, adds a leading zero.
 * If the string is two digits long, adds a leading zero and separates the digits with a period.
 * If the string is three digits long, separates the first two digits with a period.
 * @param {string} measurement - The measurement string to format.
 * @returns {string} The formatted measurement string.
 */
function formatMeasurement(measurement) {

  if (measurement.length == 1) {
    return "0" + measurement + "m";
  } else if (measurement.length == 2) {
    return "0" + measurement[0] + "." + measurement[1] + "m";
  } else if (measurement.length == 3) {
    return measurement[0] + "." + measurement[1] + measurement[2] + "m";
  }
}

function downloadURI(uri, name) {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Updates the edit mode text on the page.
 */

function updateEditMode(editMode) {
  document.querySelector("#editmode").innerHTML = "Mode: " + editMode;
}

function wipeCanvas() {
  layer.destroyChildren();
  layer.draw();
}

/**
 * Removes the Konva node that intersects with the current mouse position on the stage.
 * If a node is removed, the layer is redrawn.
 */
function erase() {
  const mousePos = stage.getPointerPosition();
  const node = stage.getIntersection(mousePos);
  if (node) {
    node.destroy();
    layer.draw();
  }
}

function drawPoint(x, y, colour) {
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

function initTransformer() {
  const tr = new Konva.Transformer({
    keepRatio: true,
    ignoreStroke: true,
  });
  layer.add(tr);
  return tr;
}

function snapToGrid(x, y) {
  const gridSize = 10;
  const newX = Math.round(x / gridSize) * gridSize;
  const newY = Math.round(y / gridSize) * gridSize;
  return { x: newX, y: newY };
}

//classes

class Line {
  constructor(colour, width, dash) {
    this.colour = colour;
    this.width = width;
    this.dash = dash;
  }

  draw(x1, y1, x2, y2) {
    layer.add(
      new Konva.Line({
        points: [x1, y1, x2, y2],
        stroke: this.colour,
        strokeWidth: this.width,
        draggable: true,
        lineJoin: "round",
        lineCap: "round",
        shadowEnabled: false,
        dash: this.dash,
        hitStrokeWidth: 10,
      })
    );
  }
}

class Road extends Line {
  constructor() {
    super("black", 2), 0;
  }
}

class Cable extends Line {
  constructor() {
    super("black", 2, [7, 7]);
  }
}

class RegLine extends Line {
  constructor() {
    super("black", 1, 0);
  }
}


class RegularArrow extends Line {
  constructor() {
    super("black", 1, 0);
  }

  draw(x1, y1, x2, y2) {
    layer.add(
      new Konva.Arrow({
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

      })
    );
  }
}

class MeasurementArrow extends RegularArrow {

}


class Grid {
  constructor(layer) {
    this.layer = layer;
    this.gridimg = null;
    Konva.Image.fromURL("grid2.png", (img) => {
      this.gridimg = img;
      this.layer.add(this.gridimg);
      this.layer.draw();
      this.gridimg.moveToBottom();
      this.gridimg.visible(false);
    });
  }

  showGrid() {
    if (this.gridimg) {
      this.gridimg.visible(true);
      this.layer.batchDraw();
    } else {
      setTimeout(() => {
        this.showGrid();
      }, 100);
    }
  }

  hideGrid() {
    if (this.gridimg) {
      this.gridimg.visible(false);
    } else {
      setTimeout(() => {
        this.hideGrid();
      }, 100);
    }
  }
}


class Text {
  constructor(fontSize) {
    this.fontSize = fontSize;
  }

  draw(x, y, text) {
    this.text = new Konva.Text({
      x: x,
      y: y,
      text: text,
      fontSize: this.fontSize,
      fontFamily: "Calibri",
      fill: "black",
      draggable: true,
    });
    layer.add(this.text);
  }
}





// boilerplate code to set up the canvas
const container = document.querySelector('#container');
const stage = new Konva.Stage({
  container: container,
  width: WIDTH,
  height: HEIGHT,

});
const layer = new Konva.Layer();
const gridlayer = new Konva.Layer();
stage.add(layer);
stage.add(gridlayer);
// move gridlayer to bottom
gridlayer.moveToBottom();
gridlayer.listening(false);
tr = initTransformer();
let grid = null;
let road = null;
let lineArr = [];



//------EVENT HANDLERS------//

// BUTTON EVENT HANDLERS
document.getElementById("clear").addEventListener("click", wipeCanvas);

document.getElementById("road").addEventListener("click", () => {
  editMode = "road";
  updateEditMode(editMode);
});

document.getElementById("cable").addEventListener("click", () => {
  editMode = "cable";
  updateEditMode(editMode);
});

document.getElementById("line").addEventListener("click", () => {
  editMode = "line";
  updateEditMode(editMode);
});



//add event listener to save button
document.getElementById('save').addEventListener(
  'click',
  () => {
    // make sure the gridlayer is hidden
    grid.hideGrid();
    // save the stage as a png
    var dataURL = stage.toDataURL();
    downloadURI(dataURL, 'stage.png');
  },
  false
);

// KEYBOARD EVENT HANDLERS

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "w":
      wipeCanvas();
      break;
    case "x":
      erase();
      break;
    case "r":
      //change editMode and editmode to road
      editMode = "road";
      break;
    case "c":
      editMode = "cable";
      break;
    case "l":
      editMode = "line";
      break;
    case "s":
    case "Escape":
      editMode = "select";
      break;
    case "g":
      if (!grid) {
        grid = new Grid(gridlayer);
      }
      if (isGridOn) {
        grid.hideGrid();
      } else {
        grid.showGrid();
      }
      isGridOn = !isGridOn;
      document.querySelector("#gridsnap").innerHTML = "Grid: " + isGridOn;
      break;
    default:
      break;
  }
  document.querySelector("#editmode").innerHTML = "Mode: " + editMode;
});

// MOUSE EVENT HANDLERS

// stage.on("mousemove", () => {
//   document.querySelector("#debug1").innerHTML = Object.values(stage.getPointerPosition());
// });


// if users clicks on a node, select it and add a transformer

stage.on("pointerclick", (e) => {

  // always get pointer position
  const pos = stage.getPointerPosition();
  pos.x = isGridOn ? Math.round(pos.x / 10) * 10: pos.x;
  pos.y = isGridOn ? Math.round(pos.y / 10) * 10: pos.y;

  // if transformer has been destroyed, create a new one
  if (!tr) {
    tr = initTransformer();
  }

  switch (editMode) {

    case "select":
      if (e.target === stage) {
        tr.nodes([]);
        layer.draw();
        return;
      }
      tr.nodes([e.target]);
      break;

    case "line":
      lineArr.push(pos.x, pos.y);
      if (lineArr.length === 4) {
        l1.remove();
        line = new RegLine();
        line.draw(lineArr[0], lineArr[1], lineArr[2], lineArr[3]);
        lineArr = [];
      } else {
        l1 = drawPoint(pos.x, pos.y, "blue");
        layer.add(l1);
      }
      break;


    case "road":
      lineArr.push(pos.x, pos.y);
      if (lineArr.length === 4) {
        r1.remove();
        road = new Road();
        road.draw(lineArr[0], lineArr[1], lineArr[2], lineArr[3]);
        lineArr = [];
      } else {
        r1 = drawPoint(pos.x, pos.y, "purple");
        layer.add(r1);
      }
      break;

    case "cable":
      lineArr.push(pos.x, pos.y);
      if (lineArr.length === 4) {
        c1.remove();
        cable = new Cable();
        cable.draw(lineArr[0], lineArr[1], lineArr[2], lineArr[3]);
        lineArr = [];
      } else {
        c1 = drawPoint(pos.x, pos.y, "red");
        layer.add(c1);
      }
      break;

    default:
      break;
  }
  updateEditMode(editMode);
});

stage.on("pointerover", () => {
  const mousePos = stage.getPointerPosition();
  const node = stage.getIntersection(mousePos);
  if (node) {

    // get a reference to node for use in handlers
    const currentnode = node;
    stage.container().style.cursor = "pointer";
    //document.querySelector("#debug1").innerHTML = currentnode.getClassName();
    // change stroke color on hover
    currentnode.on("pointerover", () => {
      if (currentnode.getClassName() === "Text") {
        currentnode.fill("red");
      } else {
      currentnode.stroke("red");
      }
    });
    // change stroke color back on hover out
    currentnode.on("pointerout", () => {
      if (currentnode.getClassName() === "Text") {
        currentnode.fill("black");
      } else {
      currentnode.stroke("black");
      }
    });
    // snap to grid while dragging
    currentnode.on("dragmove dragend", () => {
      currentnode.position({
        x: isGridOn ? Math.round(currentnode.x() / 10) * 10 : currentnode.x(),
        y: isGridOn ? Math.round(currentnode.y() / 10) * 10 : currentnode.y(),
      });
    });

  } else {
    stage.container().style.cursor = "default";
  }
});



// TEST SECTION //





