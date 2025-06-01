import { layer } from "./konva-init";

// MOUSE EVENT HANDLERS

// stage.on("mousemove", () => {
//   document.querySelector("#debug1").innerHTML = Object.values(stagle.getPointerPosition());
// });

// if users clicks on a node, select it and add a transformer

stage.on("pointerclick", (e) => {
  // always get pointer position
  const pos = stage.getPointerPosition();
  pos.x = isGridOn ? Math.round(pos.x / 10) * 10 : pos.x;
  pos.y = isGridOn ? Math.round(pos.y / 10) * 10 : pos.y;

  // if transformer has been destroyed, create a new one
  if (!tr) {
    tr = initTransformer();
  }

  switch (editMode) {
    case "select":
      if (e.target === stage) {
        tr.nodes([]);
        layer.draw(); // Removed 'xxxxx'
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


// Use event delegation for hover effects and drag snapping
layer.on("mouseover", (evt) => {
  const shape = evt.target;
  // Ensure it's a shape and not the layer/stage, and not part of the transformer
  if (shape && shape !== layer && shape !== stage && shape !== tr) {
    stage.container().style.cursor = "pointer";
    if (shape.getClassName() === "Text") {
      shape.fill("red"); // Store original fill to revert if not always black
    } else {
      shape.stroke("red"); // Store original stroke
    }
    layer.batchDraw();
  }
});

layer.on("mouseout", (evt) => {
  const shape = evt.target;
  if (shape && shape !== layer && shape !== stage && shape !== tr) {
    stage.container().style.cursor = "default";
    if (shape.getClassName() === "Text") {
      shape.fill("black"); // Revert to original fill
    } else {
      shape.stroke("black"); // Revert to original stroke
    }
    layer.batchDraw();
  }
});

// Snap to grid while dragging for all draggable shapes on the layer
layer.on("dragmove", (evt) => { // dragend is also an option if you only want to snap at the end
  const shape = evt.target;
  if (isGridOn && shape.draggable()) { // Ensure shape is draggable
    const snappedPos = snapToGrid(shape.x(), shape.y()); // Use your utility
    shape.position(snappedPos);
  }
});

// If you only want to snap at the end of the drag:
// layer.on("dragend", (evt) => {
//   const shape = evt.target;
//   if (isGridOn && shape.draggable()) {
//     const snappedPos = snapToGrid(shape.x(), shape.y());
//     shape.position(snappedPos);
//     layer.batchDraw(); // Redraw after final position set
//   }
// });

// TEST SECTION //
