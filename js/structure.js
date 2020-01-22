// ----------- Structure -----------
function insertSubstructure() {
  // console.log("insertSubstructure()");
  if (clickedCells.length === 0) {
    console.log("insertSubstructure: No grains clicked!");
    return;
  }
  clickedCells.forEach(cell => {
    microstructure.matrix[cell.y][cell.x].id = cell.id;
    microstructure.matrix[cell.y][cell.x].color = cell.color;
  });
}

function insertDualPhase() {
  // console.log("insertDualPhase()");
  if (clickedCells.length === 0) {
    console.log("insertDualPhase: No grains clicked!");
    return;
  }
  clickedCells.forEach(cell => {
    microstructure.matrix[cell.y][cell.x].id = cell.id;
    microstructure.matrix[cell.y][cell.x].color = "#ff0000";
  });
}
