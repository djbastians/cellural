canvas.addEventListener(
  "click",
  function(e) {
    refresNeighbourhood();
    const cellSize = Number($("#cellSize").val());
    const x = Math.floor(e.offsetX / cellSize) + 1;
    const y = Math.floor(e.offsetY / cellSize) + 1;
    const clickedCellId = microstructure.matrix[y][x].id;
    microstructure.matrix.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell.id === clickedCellId) {
          clickedCells.push(cell);
        }
      });
    });
  },
  false
);

function refresNeighbourhood() {
  // console.log("refresNeighbourhood");
  const height = microstructure.matrix.length - 1;
  const width = microstructure.matrix[0].length - 1;

  for (var positionY = 1; positionY < height; positionY++) {
    for (var positionX = 1; positionX < width; positionX++) {
      microstructure.matrix[positionY][positionX].neighbourhood = [
        microstructure.matrix[positionY - 1][positionX - 1].id,
        microstructure.matrix[positionY - 1][positionX].id,
        microstructure.matrix[positionY - 1][positionX + 1].id,
        microstructure.matrix[positionY][positionX - 1].id,
        microstructure.matrix[positionY][positionX + 1].id,
        microstructure.matrix[positionY + 1][positionX - 1].id,
        microstructure.matrix[positionY + 1][positionX].id,
        microstructure.matrix[positionY + 1][positionX + 1].id
      ];
    }
  }
}

function drawMicrostructureToCanvas() {
  // console.log("drawMicrostructureToCanvas");
  const cellSize = microstructure.cellSize;
  const height = microstructure.matrix.length - 1;
  const width = microstructure.matrix[0].length - 1;

  for (var positionY = 1; positionY < height; positionY++) {
    for (var positionX = 1; positionX < width; positionX++) {
      const x = positionX * cellSize - cellSize;
      const y = positionY * cellSize - cellSize;
      ctx.fillStyle = microstructure.matrix[positionY][positionX].color;
      ctx.fillRect(x, y, cellSize, cellSize);
    }
  }
}

function findGrainsBorders(matrix) {
  // console.log("findGrainsBorders()");
  const grainsOnBorder = [];
  matrix.forEach((row, y) => {
    row.forEach((cell, x) => {
      const neighbourhood = _.remove(cell.neighbourhood, id => id > 0);
      const uniqNeighbourhood = _.uniq(neighbourhood);
      if (uniqNeighbourhood.length > 1) {
        grainsOnBorder.push(cell);
      }
    });
  });

  return grainsOnBorder;
}
