// ----------- Inclusions -----------
function insertInclusionsAtBegenning() {
  // console.log("insertInclusionsAtBegenning");
  const inclusionAmount = microstructure.inclusionAmount;
  const maxY = microstructure.height;
  const maxX = microstructure.width;

  for (let i = 0; i < inclusionAmount; i++) {
    const positionX = _.random(1, maxX, false);
    const positionY = _.random(1, maxY, false);
    microstructure.matrix[positionY][positionX].id = -1;
    microstructure.matrix[positionY][positionX].color = "#000";
  }

  recogniseInclusionType();
}

function insertInclusionOnBorders() {
  console.log("insertInclusionOnBorders");
  const matrix = microstructure.matrix;
  refresNeighbourhood(microstructure);
  const grainsOnBorder = findGrainsBorders(matrix);
  placeInclusionOnBorder(grainsOnBorder);
}

function placeInclusionOnBorder(grainsOnBorder) {
  // console.log("placeInclusionOnBorder");
  const inclusionAmount = microstructure.inclusionAmount;
  const cellsOnBorderAmount = grainsOnBorder.length - 1;

  const inclusions = [];

  for (let i = 0; i < inclusionAmount; i++) {
    const cellOnBorderNumber = _.random(1, cellsOnBorderAmount, false);
    grainsOnBorder[cellOnBorderNumber].id = -1;
    grainsOnBorder[cellOnBorderNumber].color = "#000";
    inclusions.push(grainsOnBorder[cellOnBorderNumber]);
  }

  if (microstructure.inclusionType === "square") {
    growSquareInclusion(inclusions);
  }

  if (microstructure.inclusionType === "circle") {
    growCircleInclusion(inclusions);
  }
}

function recogniseInclusionType(grainsOnBorder) {
  // console.log("recogniseInclusionType");
  const matrix = microstructure.matrix;

  const inclusions = [];

  matrix.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell.id === -1) {
        inclusions.push(cell);
      }
    });
  });

  if (microstructure.inclusionType === "square") {
    growSquareInclusion(inclusions);
  }

  if (microstructure.inclusionType === "circle") {
    growCircleInclusion(inclusions);
  }
}

function growCircleInclusion(inclusions) {
  // console.log("growCircleInclusion");
  const matrix = microstructure.matrix;
  const inclusionSize = microstructure.inclusionSize - 1;
  inclusions.forEach(inclusion => {
    let startX = inclusion.x - inclusionSize;
    let startY = inclusion.y - inclusionSize;
    let stoptX = inclusion.x + inclusionSize;
    let stoptY = inclusion.y + inclusionSize;

    for (let y = startY; y <= stoptY; y++) {
      if (matrix[y]) {
        for (let x = startX; x <= stoptX; x++) {
          if (matrix[y][x]) {
            const diffX = x - inclusion.x;
            const diffY = y - inclusion.y;
            const d = Math.sqrt(diffX * diffX + diffY * diffY);
            if (d <= inclusionSize) {
              matrix[y][x].id = -1;
              matrix[y][x].color = "#000";
            }
          }
        }
      }
    }
  });
}

function growSquareInclusion(inclusions) {
  // console.log("growSquareInclusion");
  const matrix = microstructure.matrix;
  const width = microstructure.width + 1;
  const height = microstructure.height + 1;
  const inclusionSize = microstructure.inclusionSize;

  inclusions.forEach(inclusion => {
    for (let y = 0; y < inclusionSize; y++) {
      for (var x = 0; x < inclusionSize; x++) {
        const posX = inclusion.x + x;
        const posY = inclusion.y + y;
        if (posY <= height && posX <= width) {
          matrix[inclusion.y + y][inclusion.x + x].id = -1;
          matrix[inclusion.y + y][inclusion.x + x].color = "#000";
        }
      }
    }
  });
}
