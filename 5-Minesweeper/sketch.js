// Project Title: Minesweeper (2D Array Assignment)
// Your Name: Alina Sami
// Date: Thursday April 18, 2019
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
// > try making your own shapes (Links to an external site.)Links to an external site.
// > explore how to deal with the user resizing their window (Links to an external site.)Links to an external site. while your sketch is running
// > explore using the mouse wheel (Links to an external site.)Links to an external site. as input
// > play around with the html of your index.html page. You can make it so that your canvas only takes up a portion of your page, or happens "behind" the rest of the content on your webpage.
// > include basic AI / beating a computer mode in your game (could be as simple as an enemy that tries to catch the player, or something more involved, such as a computer opponent in a game like Tic Tac Toe)

let grid;
let gridColumns;
let gridRows;
let w = 20;

// let cellState;  // safe or dangerous (bool)
// let revealedState; // Danger, number, blank. 

///////////////////////////////////////////////
class Cell {
  constructor (x, y, w) {
    this.x;
    this.y;
    this.w;
    this.turtle = true;
    this.visible = true; 
  }
  show() {
    fill(100, 200, 50);
    rect(this.x, this.y, this.w, this.w);
  }
}


function create2DArray (gridColumns, gridRows) {
  let emptyArray = new Array(gridColumns);
  for (let i = 0; i < emptyArray.length; i++) {
    emptyArray[i] = new Array(gridRows);
    // console.log(emptyArray.length); ///////////////////////////////////
    // for (let j = 0; j < gridRows; j++) {
    //   emptyArray[i].push([]); 
    //   console.log(emptyArray);///////////////////////////////
    //}
  }
  return emptyArray;
}


function setup() {
  createCanvas(500, 500); //////////////////////////change to window width and height later, and check for max. 
  gridColumns = floor(width/w);
  gridRows = floor(height/w);
  grid = create2DArray(gridColumns, gridRows); ///////////////////
  for (let i = 0; i < gridColumns; i++) {                             // columns?
    for (let j = 0; j < gridRows; j++) {                           // rows?
      grid[i][j] = new Cell(i*w, j*w, w);   
    }
  }
  console.log("hi");
}


function draw() {
  background(50, 100, 150);
  for (let i = 0; i < gridColumns; i++) {                             // columns?
    for (let j = 0; j < gridRows; j++) {                           // rows?
      grid[i][j].show();   
    }
  }
  console.log("hello");
}
