export function getGrid (width, height){
  const grid = []
  for (var i = 0; i < 3; i++) {
    grid.push(new Array(3).fill())
  }
  return grid
}

