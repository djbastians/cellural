// ----------- Grain growth -----------
$("#simulatiion").click(() => {
  startSimulation();
});

function startSimulation() {
  console.log("startSimulation()");
  microstructure = {};

  // Pobranie wartości podanych przez użytkownika
  const width = Number($("#width").val());
  const height = Number($("#height").val());
  const nucleonesNumber = Number($("#nucleonesNumber").val());
  const cellSize = Number($("#cellSize").val());
  const probability = Number($("#probability").val());
  // Inclusions
  const inclusionType = $("select[name=inclusionType]").val();
  const inclusionLocation = $("select[name=inclusionLocation]").val();
  const inclusionSize = Number($("#inclusionSize").val());
  const inclusionAmount = Number($("#inclusionAmount").val());
  // Structure
  const structure = $("select[name=structure]").val();

  microstructure = {
    structure: structure,
    inclusionType: inclusionType,
    inclusionLocation: inclusionLocation,
    inclusionSize: inclusionSize,
    inclusionAmount: inclusionAmount,
    cellSize: cellSize,
    probability: probability,
    width: width,
    height: height,
    cellsAmount: width * height,
    matrix: []
  };

  ctx.canvas.width = microstructure.width * cellSize;
  ctx.canvas.height = microstructure.height * cellSize;

  $("#bordersAmount").text("");
  $("#bordersPercentage").text("");

  generateEmptyMicrostructure();

  if (inclusionLocation === "begenning" && inclusionType !== "false") {
    insertInclusionsAtBegenning();
  }

  insertNucleones(nucleonesNumber);
  refresNeighbourhood();
  let emptyPoints = findEmptyPoints();

  while (emptyPoints.length != 0) {
    emptyPoints = findEmptyPoints();
    growGrains(emptyPoints, microstructure);
    refresNeighbourhood();
  }

  if (inclusionLocation === "onBorder" && inclusionType !== "false") {
    insertInclusionOnBorders();
  }

  if (structure === "substructure") {
    insertSubstructure();
  }

  if (structure === "dualPhase") {
    insertDualPhase();
  }

  if (structure === "false") {
    clickedCells = [];
  }

  drawMicrostructureToCanvas();
}

function generateEmptyMicrostructure() {
  // console.log("generateEmptyMicrostructure");
  const width = Number(microstructure.width) + 2;
  const height = Number(microstructure.height) + 2;

  for (var y = 0; y < height; y++) {
    microstructure.matrix[y] = [];
    for (var x = 0; x < width; x++) {
      const cell = {
        x: x,
        y: y,
        id: 0,
        color: "#fff",
        neighbourhood: []
      };
      microstructure.matrix[y][x] = cell;
    }
  }
}

function insertNucleones(nucleonesNumber) {
  // console.log("insertNucleones");
  let i = 1;
  const maxY = microstructure.matrix.length - 2;
  const maxX = microstructure.matrix[0].length - 2;

  while (nucleonesNumber > i - 1) {
    const positionX = _.random(1, maxX, false);
    const positionY = _.random(1, maxY, false);
    if (microstructure.matrix[positionY][positionX].id === 0) {
      microstructure.matrix[positionY][positionX].id = i;
      microstructure.matrix[positionY][positionX].color = colors[i - 1];
      i += 1;
    }
  }
}

function growGrains(emptyPoints, microstructure) {
  // console.log("growGrains");
  const probability = microstructure.probability;
  emptyPoints.forEach(cell => {
    const neighbourhood = _.remove(cell.neighbourhood, id => id > 0);
    if (neighbourhood.length > 0) {
      var mostCommonId = _.head(
        _(neighbourhood)
          .countBy()
          .entries()
          .maxBy(_.last)
      );
      const randomNumber = _.random(1, 100, false);
      if (randomNumber < probability) {
        microstructure.matrix[cell.y][cell.x].id = Number(mostCommonId);
        microstructure.matrix[cell.y][cell.x].color = colors[mostCommonId - 1];
      }
    }
  });
}

function findEmptyPoints() {
  // console.log("findEmptyPoints");
  const emptyPoints = [];
  microstructure.matrix.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell.id === 0 && cell.neighbourhood.length > 0) {
        emptyPoints.push(cell);
      }
    });
  });
  return emptyPoints;
}
