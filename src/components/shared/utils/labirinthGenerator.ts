type Cell = {
  visited: boolean;
  walls: { top: boolean; right: boolean; bottom: boolean; left: boolean };
};

class MazeGenerator {
  private width: number;
  private height: number;
  private grid: Cell[][] = [];
  private stack: [number, number][] = [];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.initGrid();
  }

  // Инициализация пустого лабиринта
  private initGrid() {
    for (let y = 0; y < this.height; y++) {
      const row: Cell[] = [];
      for (let x = 0; x < this.width; x++) {
        row.push({
          visited: false,
          walls: { top: true, right: true, bottom: true, left: true },
        });
      }
      this.grid.push(row);
    }
  }

  // Получаем соседей с учетом границ
  private getUnvisitedNeighbors(
    x: number,
    y: number
  ): [number, number, string][] {
    const neighbors: [number, number, string][] = [];
    if (y > 0 && !this.grid[y - 1][x].visited)
      neighbors.push([x, y - 1, "top"]);
    if (x < this.width - 1 && !this.grid[y][x + 1].visited)
      neighbors.push([x + 1, y, "right"]);
    if (y < this.height - 1 && !this.grid[y + 1][x].visited)
      neighbors.push([x, y + 1, "bottom"]);
    if (x > 0 && !this.grid[y][x - 1].visited)
      neighbors.push([x - 1, y, "left"]);
    return neighbors;
  }

  // Удаляем стену между текущей и соседней ячейкой
  private removeWall(x: number, y: number, direction: string) {
    const current = this.grid[y][x];
    let next: Cell | null = null;
    if (direction === "top") {
      current.walls.top = false;
      next = this.grid[y - 1][x];
      next.walls.bottom = false;
    } else if (direction === "right") {
      current.walls.right = false;
      next = this.grid[y][x + 1];
      next.walls.left = false;
    } else if (direction === "bottom") {
      current.walls.bottom = false;
      next = this.grid[y + 1][x];
      next.walls.top = false;
    } else if (direction === "left") {
      current.walls.left = false;
      next = this.grid[y][x - 1];
      next.walls.right = false;
    }
  }

  // Генерация лабиринта с помощью Backtracking
  public generateMaze(startX: number, startY: number) {
    this.stack.push([startX, startY]);
    this.grid[startY][startX].visited = true;

    while (this.stack.length > 0) {
      const [x, y] = this.stack[this.stack.length - 1];
      const neighbors = this.getUnvisitedNeighbors(x, y);

      if (neighbors.length > 0) {
        const [nextX, nextY, direction] =
          neighbors[Math.floor(Math.random() * neighbors.length)];
        this.removeWall(x, y, direction);
        this.grid[nextY][nextX].visited = true;
        this.stack.push([nextX, nextY]);
      } else {
        this.stack.pop();
      }
    }
  }

  // Пробиваем вход и выходы
  public addEntrancesAndExits() {
    // Вход внизу
    this.grid[this.height - 1][Math.floor(this.width / 2)].walls.bottom = false;

    // Выход сверху
    this.grid[0][Math.floor(this.width / 2)].walls.top = false;

    // Выход слева
    this.grid[Math.floor(this.height / 2)][0].walls.left = false;

    // Выход справа
    this.grid[Math.floor(this.height / 2)][this.width - 1].walls.right = false;
  }

  public getMaze() {
    return this.grid;
  }
}
export default MazeGenerator;
