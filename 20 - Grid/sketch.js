// Grid Demo
// Your Name
// Monday, April 1, 2019
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let gridSize = 10;
let grid;
let cellSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = createRandom2DArray(gridSize, gridSize);
  cellSize = width/gridSize;
}

function draw() {
  background(220);
  displayGrid();
}


function displayGrid() {
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (grid[y][x] === 0) {   //order matters for [y][x]. 
        fill(255);
      }
      else {
        fill(0);
      }
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
}


function create2DArray(itsColumns, itsRows) {
  //first thing we do is come up with a variable name:
  let emptyArray = [];
  //now create a for loop as second step:
  for (let i = 0; i < itsRows; i++) {      //as we are going "across the array"....
    emptyArray.push([]);
    for (let j = 0; j < itsColumns; j++){
      emptyArray[i].push(0);
    }
  }
  return emptyArray;
}


function createRandom2DArray(itsColumns, itsRows) {
  //first thing we do is come up with a variable name:
  let emptyArray = [];
  //now create a for loop as second step:
  for (let i = 0; i < itsRows; i++) {      //as we are going "across the array"....
    emptyArray.push([]);
    for (let j = 0; j < itsColumns; j++){
      // half the time, push in a 0 value, while half the time push in a 1. 
      if (random(100) < 50) {
        emptyArray.push(0);
      }
      else {
        emptyArray.push(1);
      }
    }
  }
  return emptyArray;
}