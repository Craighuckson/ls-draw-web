import Konva from "konva";
import { WIDTH,HEIGHT } from "./constants.js";

export const stage = new Konva.Stage({
    container: "container",
    width: WIDTH,
    height: HEIGHT,
});

export const layer = new Konva.Layer();
export const gridLayer = new Konva.Layer();

stage.add(layer);
stage.add(gridLayer);
gridLayer.moveToBottom();
gridLayer.listening(false); // Disable interaction with the grid layer

export function initTransformer(attachToLayer = layer) {
    const newTr = new Konva.Transformer({
        keepRatio: true,
        ignoreStroke: true,
    });
    attachToLayer.add(newTr);
    return newTr;
}

export let tr = initTransformer(layer);

export function getTransformer() {
    if (!tr || tr.isDestroyed()) {
        tr = initTransformer(layer);
    }
    return tr;
}