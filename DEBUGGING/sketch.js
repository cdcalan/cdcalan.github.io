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

let gridSize = 3;
let grid;
let cellSize;
let autoPlay;

let counter = 0;

////////////////////////////////////////
let cellValue;

let emptyArray = [];


function setup() {
  if (windowWidth > windowHeight) {
    createCanvas(windowHeight, windowHeight);
  }
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }

  grid = create2DArray(gridSize, gridSize);
  cellSize = width/gridSize;
  cellValue = 0; ///////////////////////////////////////////
  
}




function draw() {
  background(220);
  displayGrid();
}




function displayGrid() {
  for (let y = 0; y < gridSize; y++) {                             
    for (let x = 0; x < gridSize; x++) {    

      // If cell is a player 1 value, display a red cell:
      if (grid[y][x] === 1 && mousePressed) {   
        fill(255, 0, 0);
      }

      // If cell is a player 2 value, display a blue cell:
      if (grid[y][x] === 2) {   
        fill(0, 0, 255);
      }

      // If cell value is 0, display an empty cell:
      else {
        fill(255);
      }

      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
}


function create2DArray(gridSize, gridSize) {
  for (let i = 0; i < gridSize; i++) {      
    emptyArray.push([]);
    for (let j = 0; j < gridSize; j++){
      emptyArray[i].push(0);
    }
  }
  console.log(emptyArray);
  return emptyArray;
}


function update() {
  let nextTurn = create2DArray(gridSize, gridSize);

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      let neighbors = 0;

      // look at the 3 by 3 grid around the current location 
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (y+i >= 0 && y+1 < gridSize && x+j >= 0 && x+j < gridSize) {
            neighbors += grid[y+i][x+j];
          }
        }
      }

      //********************** */neighbors -= grid[y][x]; // if dead, takign away 1 doesnt matter. if alive, it'll take away the 1 extra neighbor we do not have/need.
      
      //applying the rules of the game:
      if (grid[y][x] === 1) {     //alive
        if (neighbors === 2 || neighbors === 3) {
          nextTurn[y][x] = 1;
        }
        else {
          nextTurn[y][x] = 0;
        }
      }

    }
  }
  //     if (grid[y][x] === 0) {    //dead
  //       if (neighbors === 3) {
  //         nextTurn[y][x] = 1;
  //       }
  //       else {
  //         nextTurn[y][x] = 0;
  //       }
  //     }
  //   }
  // }

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
  if (key === "a") {                           // auto-play
    autoPlay = window.setInterval(update, 50);
  }
  if (key === "s") {                           // save the current grid. json stands for javascript object notation. 
    saveJSON(grid, "thegrid.json");            // save json          
  }
}


function loadingComplete() {
  loop();
}


function mousePressed() {
  let xcoord = floor(mouseX / cellSize);
  let ycoord = floor(mouseY / cellSize);

  console.log(grid);


  if (grid[ycoord][xcoord] === 0) { // if spot is empty
    grid[ycoord][xcoord] = 1;       // make user click fill the spot
  }
  counter++;
  console.log("Counter " + counter);
  // else {
  //   grid[ycoord][xcoord] = 1;
  // }

  //if (grid[ycoord][xcoord]) // check position in the grid
}



// Check to see for win:
function hasWon() {
  // Horizontal checks:
  if (grid[0][0] !== 0 && grid[0][0] === grid[0][1] && grid[0][1] === grid[0][2]) {
    return true;
  }
  if (grid[1][0] !== 0 && grid[1][0] === grid[1][1] && grid[1][1] === grid[1][2]) {
    return true;
  }
  if (grid[2][0] !== 0 && grid[2][0] === grid[2][1] && grid[2][1] === grid[2][2]) {
    return true;
  }
  // Vertical Checks:
  if (grid[0][0] !== 0 && grid[0][0] === grid[1][0] && grid[1][0] === grid[2][0]) {
    return true;
  }
  if (grid[0][1] !== 0 && grid[0][1] === grid[1][1] && grid[1][1] === grid[2][1]) {
    return true;
  }
  if (grid[0][2] !== 0 && grid[0][2] === grid[1][2] && grid[1][2] === grid[2][2]) {
    return true;
  }
  // Diagonal Checks:
  if (grid[0][0] !== 0 && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
    return true;
  }
  if (grid[0][2] !== 0 && grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
    return true;
  }
  return false; //If none of the checks have been created, hasWon() is false. 
}




////////////MINESWEEPER STUFF:////////////
  // /////*************************************************************************** */

  // // For each level in the y-direction of the grid:
  // let pathX = random(0, gridRows-1);
  // for (let n = gridColumns; n > 0; n--) {
  //   if (pathX === 0) {          // And if the chosen block is on the left-most side:
  //     pathX += random(0, 1);
  //   }         
  //   if (pathX === gridRows-1) { // Or if the chosen block is on the right-most side:
  //     pathX += random(-1, 0);
  //   }
  //   else {
  //     pathX += random(-1, 1); // Otherwise, pick a random block from the three forward to move to:
  //   }
  //   fill(0);
  //   rect(pathX, n, w, w);
  // }
  // /////*************************************************************************** */