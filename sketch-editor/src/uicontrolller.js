//ui-controller.js
import { stage, layer, getTransformer, gridlayer } from './konva-init.js';
import { Grid } from './shapes.js';
import { downloadURI } from './utils.js';
import { editMode, isGridOn } from './main.js'; // Or pass these as params

export function updateEditModeDisplay(currentEditMode) {
  document.querySelector("#editmode").innerHTML = "Mode: " + currentEditMode;
}

export function wipeCanvasAndUpdate() {
  layer.destroyChildren();
  // If transformer 'tr' is global or accessible, ensure it's handled:
  const tr = getTransformer(); // Get potentially new transformer
  tr.nodes([]); // Clear nodes from transformer
  layer.draw();
}

export function setupUIEventListeners(getEditMode, setEditMode, getIsGridOn, setIsGridOn) {
  document.getElementById("clear").addEventListener("click", wipeCanvasAndUpdate);
  // ... other button listeners, they would call setEditMode(newMode)
  // ... keyboard listener, calling setEditMode, toggleGrid etc.
}
