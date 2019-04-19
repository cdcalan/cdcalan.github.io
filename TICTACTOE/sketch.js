// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// let grid = [[], [], []]
//   [0, 0, 0],
//   [0, 0, 0],
//   [0, 0, 0]
// ]

// let w;

// function setup() {
//   createCanvas(400, 400);
//   w = width / 3;
//   for (let i=0; i<3; i++) {
//     for (let j=0; j<3; j++) {

//     }
//   }
// }

// function draw() {
//   background(220);
// }
/////////////////////////////////
let grid;
let gridWidth = 3;
let w = 100; 

let turn = -1;

class Cell {
  constructor (x, y, w) {
    this.x = x*w;
    this.y = y*w;
    this.w = w;
    this.turtle = true;
    this.visible = true; 
  }
  show() {
    fill(100, 200, 50);
    rect(this.x, this.y, this.w, this.w);
  }
}




function setup() {
  createCanvas(500, 500); //////////////////////////change to window width and height later, and check for max. 
  grid = create2DArray(gridWidth); 
  for (let i = 0; i < gridWidth; i++) {                             
    for (let j = 0; j < gridWidth; j++) {                           
      grid[i][j] = new Cell(i, j, w);   
    }
  }
}



function draw() {
  background(50, 100, 150);
  for (let i = 0; i < gridWidth; i++) {                             
    for (let j = 0; j < gridWidth; j++) {                           
      grid[i][j].show();   
    }
  }
}



function create2DArray (gridWidth) {
  let emptyArray = [];
  for (let i = 0; i < gridWidth; i++) {      //as we are going "across the array"....
    emptyArray.push([]);
    for (let j = 0; j < gridWidth; j++){
      emptyArray[i].push(0);
    }
  }
  return emptyArray;
}




function mousePressed(turn) {
  let xcoord = floor(mouseX / w);
  let ycoord = floor(mouseY / w);

  if (grid[ycoord][xcoord] === 0) {  // If the cell clicked is empty:
    grid[ycoord][xcoord] = turn;
    console.log("clicked!");
    fill(255, 0, 0);
    rect(xcoord*w, ycoord*w, w, w);
  }
  turn *= -1;
}