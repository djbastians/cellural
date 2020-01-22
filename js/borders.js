// ----------- Borders -----------
$("#showBorders").click(() => {
  // console.log("showBorders click");
  drawMicrostructureToCanvas(microstructure);
  refresNeighbourhood(microstructure);
  const matrix = microstructure.matrix;

  if (clickedCells.length > 0) {
    const grainsOnBorder = findClickedGrainBorders();
    drawBorders(grainsOnBorder);
    return;
  }

  const grainsOnBorder = findGrainsBorders(matrix);
  drawBorders(grainsOnBorder);
});

$("#onlyBorders").click(() => {
  // console.log("showBorders click");
  refresNeighbourhood(microstructure);
  const matrix = microstructure.matrix;

  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (clickedCells.length > 0) {
    const grainsOnBorder = findClickedGrainBorders();
    drawBorders(grainsOnBorder, "#000");
    return;
  }

  const grainsOnBorder = findGrainsBorders(matrix);
  drawBorders(grainsOnBorder, "#000");
});

function drawBorders(grainsOnBorder, color = "#fff") {
  // console.log("drawBorders");
  const cellSize = microstructure.cellSize;

  const cellsOnBorderAmount = grainsOnBorder.length;
  const cellsAmount = microstructure.cellsAmount;
  const bordersAmount = "Amount: " + cellsOnBorderAmount + "/" + cellsAmount;
  const bordersPercentage = Math.round(
    (cellsOnBorderAmount / cellsAmount) * 100
  );
  const bordersPercentageText = "Percentage: " + bordersPercentage + "%";
  $("#bordersAmount").text(bordersAmount);
  $("#bordersPercentage").text(bordersPercentageText);

  grainsOnBorder.forEach(cell => {
    const x = cell.x * cellSize - cellSize;
    const y = cell.y * cellSize - cellSize;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, cellSize, cellSize);
  });
}

function findClickedGrainBorders() {
  // console.log("findClickedGrainBorders()");
  const matrix = microstructure.matrix;
  const grainsOnBorder = [];

  clickedCells.forEach(cell => {
    let neighbourhood = matrix[cell.y][cell.x].neighbourhood;
    neighbourhood = _.remove(cell.neighbourhood, id => id > 0);
    const uniqNeighbourhood = _.uniq(neighbourhood);
    if (uniqNeighbourhood.length > 1) {
      grainsOnBorder.push(cell);
    }
  });

  return grainsOnBorder;
}
