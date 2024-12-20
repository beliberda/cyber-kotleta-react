import MazeGenerator from "@/components/shared/utils/labirinthGenerator";
import { FunctionComponent } from "react";

interface LabirinthProps {
  width?: number;
  height?: number;
}

const Labirinth: FunctionComponent<LabirinthProps> = ({
  height = 20,
  width = 20,
}) => {
  const mazeGenerator = new MazeGenerator(height, width);
  mazeGenerator.generateMaze(0, 0); // Стартовая точка
  mazeGenerator.addEntrancesAndExits();
  const maze = mazeGenerator.getMaze();
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${width}, 20px)`,
      }}
    >
      {maze.flatMap((row, y) =>
        row.map((cell, x) => (
          <div
            key={`${x}-${y}`}
            style={{
              width: "20px",
              height: "20px",
              borderTop: cell.walls.top ? "1px solid black" : "none",
              borderRight: cell.walls.right ? "1px solid black" : "none",
              borderBottom: cell.walls.bottom ? "1px solid black" : "none",
              borderLeft: cell.walls.left ? "1px solid black" : "none",
            }}
          />
        ))
      )}
    </div>
  );
};

export default Labirinth;
