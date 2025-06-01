export interface ShapeOptions {
    stroke?: string;
    strokeWidth?: number;
    dash?: number[];
    draggable?: boolean;
}

export interface SceneOptions {
    containerId: string;
    width: number;
    height: number;
}

export type ShapeType = 'Road' | 'Cable' | 'Line' | 'Arrow' | 'Text' | 'Grid';
