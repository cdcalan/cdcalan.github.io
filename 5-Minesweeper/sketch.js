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
let gridColums = 6;
let gridRows = 6;

let cellState;  // safe or dangerous (bool)
let xCell, yCell, wCell, hCell;
let revealedState; // Danger, number, blank. 


class Cell {
  constructor () {
    this.turtle = true;
    this.visible = true; 
  }
}


function create2DArray () {
  let emptyArray = [];
  for (let i = 0; i < gridColums; i++) {
    emptyArray.push([]);
    for (let j = 0; j < gridRows; j++) {
      emptyArray[i].push([]);
    }
  }
  return emptyArray;
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = create2DArray(gridColums, gridRows);

}


function draw() {
  background(150);
  displayGrid();
}


function displayGrid() {
  for (let y = 0; y < gridRows; y++) {                             // columns?
    for (let x = 0; x < gridColumns; x++) {                           // rows?
      grid[y][x] = new Cell();   

    }
  }
}
