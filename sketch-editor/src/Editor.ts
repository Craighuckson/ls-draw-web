import { Scene } from './Scene';
import { Grid } from './Grid';
import { ShapeFactory } from './ShapeFactory';
import { ShapeType } from './types';
import Konva from 'konva';

export class Editor {
    private scene: Scene;
    private grid: Grid;
    private editMode: ShapeType | 'select' = 'select';
    private gridEnabled: boolean = false;

    constructor(scene: Scene) {
        this.scene = scene;
        this.grid = new Grid(scene, '../grid2.png');
        this.initEvents();
    }

    setMode(mode: ShapeType | 'select'): void {
        this.editMode = mode;
        document.querySelector('#editmode')!.textContent = `Mode: ${mode}`;
    }

    toggleGrid(): void {
        this.gridEnabled = !this.gridEnabled;
        if (this.gridEnabled) {
            this.grid.show();
        } else {
            this.grid.hide();
        }
        document.querySelector('#gridsnap')!.textContent = `Grid: ${this.gridEnabled}`;
    }

    private initEvents(): void {
        document.getElementById('clear')?.addEventListener('click', () => this.scene.clear());
        document.getElementById('road')?.addEventListener('click', () => this.setMode('Road'));
        document.getElementById('cable')?.addEventListener('click', () => this.setMode('Cable'));
        document.getElementById('line')?.addEventListener('click', () => this.setMode('Line'));
        document.getElementById('save')?.addEventListener('click', () => this.save());

        document.addEventListener('keydown', (e) => this.handleKey(e));
        this.scene.stage.on('pointerclick', (e) => this.handleClick(e));
    }

    private handleKey(e: KeyboardEvent): void {
        switch (e.key) {
            case 'g': this.toggleGrid(); break;
            case 'w': this.scene.clear(); break;
            case 'Escape': this.setMode('select'); break;
        }
    }

    private handleClick(e: Konva.KonvaEventObject<PointerEvent>): void {
        const pos = this.scene.pointerPosition;
        if (this.gridEnabled) {
            pos.x = Math.round(pos.x / 10) * 10;
            pos.y = Math.round(pos.y / 10) * 10;
        }

        if (this.editMode === 'select') {
            this.scene.transformer.nodes(e.target === this.scene.stage ? [] : [e.target]);
            return;
        }

        const tool = ShapeFactory.create(this.editMode as ShapeType);
        tool.draw(this.scene, pos.x - 10, pos.y - 10, pos.x + 10, pos.y + 10);
        this.scene.draw();
    }

    private save(): void {
        this.grid.hide();
        const dataURL = this.scene.stage.toDataURL();
        const link = document.createElement('a');
        link.download = 'stage.png';
        link.href = dataURL;
        link.click();
    }
}
