export type ShapeType = "circle" | "square" | "triangle" | "star";

export interface ICircleItem {
  color: string;
  type?: ShapeType;
  x: number;
  y: number;
  radius: number;
}
