export default class Grid {
  constructor(width, height) {
    const grid = []
    for (var i = 0; i < height; i++) {
      grid.push(new Array(width).fill())
    }
    this.grid = grid
  }

  set(x, y, data) {
    this.grid[x][y] = data
  }

  get(x, y) {
    return this.grid[x][y]
  }
  
  getGrid() {
    return this.grid
  }
}
