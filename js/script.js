let microstructure;
let clickedCells = [];
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const colors = [
  "#69a0fd",
  "#06c509",
  "#0c5774",
  "#2effe5",

  "#5e90e3",
  "#05b108",
  "#0a4e68",
  "#29e5ce",

  "#5480ca",
  "#049d07",
  "#09455c",
  "#24ccb7",

  "#4970b1",
  "#048906",
  "#083c51",
  "#20b2a0",

  "#3f6097",
  "#037605",
  "#073445",
  "#1b9989",

  "#34507e",
  "#036204",
  "#062b3a",
  "#177f72",

  "#c3d9fe",
  "#024e03",
  "#04222e",
  "#12665b",

  "#b4cffe",
  "#9be79c",
  "#9dbbc7",
  "#abfff4",

  "#a5c6fd",
  "#82e284",
  "#85abb9",
  "#96fff2",

  "#96bcfd",
  "#69dc6b",
  "#6d9aab",
  "#81ffef",

  "#87b3fd",
  "#50d652",
  "#54899d",
  "#6cffec",

  "#78a9fd",
  "#37d03a",
  "#3c788f",
  "#57ffea",

  "#69a0fd",
  "#1eca21",
  "#246781",
  "#42ffe7"
];
