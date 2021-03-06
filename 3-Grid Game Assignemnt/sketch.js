// Project Title: Grid-Based Game
// Alina Sami
// Date: April 9, 2019
//
//*******************************************************************
// HELP: https://www.khanacademy.org/computing/computer-programming/programming-games-visualizations/memory-game/a/grid-of-tiles
//
/////////memory matching game
//////////store
////////battleship
////////connect 4
////////frogger / cross the road to get somehting and back again without gettin ghit by cars, u have 3 lives
////////tictactoe
//tetrus, bejewled
//catch the blocks (raining down) / catch the correct food for teh recepie.
//maze game with levels that have json files that make more difficult mazes
//sudoku
//********************************************************************
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
// > try making your own shapes (Links to an external site.)Links to an external site.
// > explore how to deal with the user resizing their window (Links to an external site.)Links to an external site. while your sketch is running
// > explore using the mouse wheel (Links to an external site.)Links to an external site. as input
// > play around with the html of your index.html page. You can make it so that your canvas only takes up a portion of your page, or happens "behind" the rest of the content on your webpage.
// > include basic AI / beating a computer mode in your game (could be as simple as an enemy that tries to catch the player, or something more involved, such as a computer opponent in a game like Tic Tac Toe)

let gridSize = 5;
let grid;
let cellSize;
let autoPlay;


function setup() {
  if (windowWidth > windowHeight) {
    createCanvas(windowHeight, windowHeight);
  }
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }

  grid = createRandom2DArray(gridSize, gridSize);
  //grid = create2DArray(gridSize, gridSize);
  cellSize = width/gridSize;
}


function draw() {
  background(220);
  displayGrid();
}


function displayGrid() {
  for (let y = 0; y < gridSize; y++) {                             // columns?
    for (let x = 0; x < gridSize; x++) {                           // rows?
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
        emptyArray[i].push(0);
      }
      else {
        emptyArray[i].push(1);
      }
    }
  }
  return emptyArray;
}


function update() {
  let nextTurn = create2DArray(gridSize, gridSize);

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      let neighbors = 0;

      // look at the 3 by 3 grid around th euctrent location 
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (y+i >= 0 && y+1 < gridSize && x+j >= 0 && x+j < gridSize) {
            neighbors += grid[y+i][x+j];
          }
        }
      }

      neighbors -= grid[y][x]; // if dead, takign away 1 doesnt matter. if alive, it'll take away the 1 extra neighbor we do not have/need.
      
      //applying the rules of the game:
      if (grid[y][x] === 1) {     //alive
        if (neighbors === 2 || neighbors === 3) {
          nextTurn[y][x] = 1;
        }
        else {
          nextTurn[y][x] = 0;
        }
      }


      if (grid[y][x] === 0) {    //dead
        if (neighbors === 3) {
          nextTurn[y][x] = 1;
        }
        else {
          nextTurn[y][x] = 0;
        }
      }
    }
  }

  grid = nextTurn;
}


function keyPressed() {  ///////create a similar mousepressed function for tiles:
  if (key === " ") {
    window.clearInterval(autoPlay);
    update();
  }
  if (key === "c") {                           // clear the grid
    grid = create2DArray(gridSize, gridSize);
  }
  if (key === "r") {                           // reset the grid. (get new grid)
    grid = createRandom2DArray(gridSize, gridSize);
  }
  if (key === "a") {                           // auto-play
    autoPlay = window.setInterval(update, 50);
  }
  if (key === "s") {                           // save the current grid. json stands for javascript object notation. 
    saveJSON(grid, "thegrid.json");            // save json          
  }
  if (key === "g") {
    noLoop();
    grid = loadJSON("assets/thegrid(2).json", loadingComplete);    //load json
  }
}
function mousePressed() {
 // if (mouseX >= gameTiles[i].x && mouseX <= gameTiles[i].x + gameTiles[i].width)
      //image = (...)
      // return image;
}


function loadingComplete() {
  loop();
}


function mousePressed() {
  let xcoord = floor(mouseX / cellSize);
  let ycoord = floor(mouseY / cellSize);

  if (grid[ycoord][xcoord] === 1) {
    grid[ycoord][xcoord] = 0;
  }
  else {
    grid[ycoord][xcoord] = 1;
  }

  //if (grid[ycoord][xcoord]) // check position in the grid
}