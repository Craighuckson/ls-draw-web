import {WIDTH, HEIGHT} from './constants.js';
import {stage, layer, gridLayer, getTransformer} from './konva-init.js';
import {Grid, RoadLine, CableLine, RegLine, RegularArrow} from './shapes.js';
import { snapToGrid, drawPoint, downloadURI } from './utils.js';
import { setupStageEventListeners} from './event-handlers.js';
import { setupUIEventListeners } from './uicontrolller.js';

class AppState {
    constructor() {
        this.currentEditMode = "Select";
        this.isGridOn = true;
        this.grid = new Grid();
        this.grid.draw(gridLayer);
        this.stage = stage;
        this.layer = layer;
        this.gridLayer = gridLayer;
        this.tr = getTransformer();
    }
}

