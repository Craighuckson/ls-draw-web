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

/**
 * Removes all children from the layer and redraws the layer.
 */
function wipeCanvas() {
  layer.destroyChildren();
  layer.draw();
}

function erase() {
  const mousePos = stage.getPointerPosition();
  const node = stage.getIntersection(mousePos);
  if (node) {
    node.destroy();
    layer.draw();
  }
}

//classes

class Line {
  constructor(colour,width, dash) {
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
        shadowEnabled: false,
        dash: this.dash,
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
    super("black", 2, [10, 10]);
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
    stage.add(layer);

// draw the curb using Road from top of screen to bottom at x = 1/3 of screen width
var r = new Road();
var c = new Cable();
c.draw(WIDTH / 2, 0, WIDTH / 2, HEIGHT);
r.draw(WIDTH / 3, 0, WIDTH / 3, HEIGHT);

//------EVENT HANDLERS------//
//make the value of html element editmode match the value of editMode with event listener




//add event listenter to clear button
document.getElementById("clear").addEventListener("click", wipeCanvas);

//bind wipeCanvas to w key and erase to x key
document.addEventListener("keydown", function (event) {
  if (event.key == "w") {
    wipeCanvas();
  } else if (event.key == "x") {
    erase();
  } else if (event.key == "r") {
    //change editMode and editmode to road
    editMode = "road";
   
  } else if (event.key == "s" || event.key == "Escape") {
    editMode = "select";
  } else if (event.key == "g") {
    isGridOn = !isGridOn;
    document.querySelector("#gridsnap").innerHTML = "Grid: " + isGridOn;
  }
  document.querySelector("#editmode").innerHTML = "Mode: " + editMode;
});

var tr = new Konva.Transformer({
  resizeByCenter: false,
});
layer.add(tr);

// if users clicks on a node, select it and add a transformer

stage.on("pointerclick", function (e) {
  if (e.target === stage) {
    tr.nodes([]);
    layer.draw();
    return;
  }
  tr.nodes([e.target]);
});

stage.on("pointerover", function (e) {
  const mousePos = stage.getPointerPosition();
  const node = stage.getIntersection(mousePos);
  if (node) {
    stage.container().style.cursor = "pointer";
  } else {
    stage.container().style.cursor = "default";
  }
});


// if editmode is road draw a road by dragging
stage.on("dragstart", function (e) {
  if (editMode == "road") {
    const pos = stage.getPointerPosition();
    road(pos.x, pos.y, pos.x, pos.y);
  }
});











