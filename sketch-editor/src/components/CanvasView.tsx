/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import { Stage, Layer, Line } from "react-konva";
import { LineEntity, type Point } from "../entities/LineEntity";

type Tool = "select" | "line";

export const CanvasView: React.FC = () => {
  const [tool, setTool] = useState<Tool>("line");
  const [lines, setLines] = useState<LineEntity[]>([]);
  const [currentLine, setCurrentLine] = useState<LineEntity | null>(null);
  const stageRef = useRef<any>(null);

  const handleMouseDown = () => {
    if (tool === "line") {
      const pos = getPointerPosition();
      const newLine = new LineEntity([pos, pos]);
      setCurrentLine(newLine);
    }
  };

  const handleMouseMove = () => {
    if (tool === "line" && currentLine) {
      const pos = getPointerPosition();
      const updatedPoints = [...currentLine.points];
      updatedPoints[updatedPoints.length - 1] = pos;
      currentLine.points = updatedPoints;
      setCurrentLine({ ...currentLine, points: updatedPoints,} as LineEntity);
    }
  };

  const HandleMouseUp = () => {
    if (tool === "line" && currentLine) {
      const pos = getPointerPosition();
      currentLine.points[currentLine.points.length - 1] = pos;
      setLines((prev) => [...prev, currentLine]);
      setCurrentLine(null);
    }
  };

  const getPointerPosition = (): Point => {
    const stage = stageRef.current;
    const pointer = stage.getPointerPosition();
    return { x: pointer.x, y: pointer.y };
  };

  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <button onClick={() => setTool("line")}>Line Tool</button>
      </div>
      <Stage
        width={650}
        height={650}
        ref={stageRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={HandleMouseUp}
        style={{ border: "1px solid black" }}
      >
        <Layer>
          {lines.map((line) => (
            <Line
              key={line.id}
              points={line.toKonvaPoints()}
              stroke={line.stroke}
              strokeWidth={line.strokeWidth}
              dash={line.dash}
            />
          ))}
          {currentLine && (
            <Line
              points={currentLine.toKonvaPoints()}
              stroke={currentLine.stroke}
              strokeWidth={currentLine.strokeWidth}
              dash={currentLine.dash}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};
