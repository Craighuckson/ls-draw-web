import { Scene } from './Scene';
import { Editor } from './Editor';

document.addEventListener('DOMContentLoaded', () => {
    const scene = new Scene('container', 800, 800);
    new Editor(scene);
});
