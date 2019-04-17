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

// Building the store-grid:
let gridAcross = 3;
let gridDown = 2;
let grid;
let cellSize;

// Displayed inventory stats:
let fontSize = 35;
let playerMoney;
let inventoryList = ["object 1", "object 2", "object 3"];


function setup() {
  if (windowWidth > windowHeight) {
    createCanvas(windowHeight, windowHeight);
  }
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }

  grid = create2DArray(gridDown, gridAcross);
  cellSize = width/gridAcross;

  textSize(fontSize);
  playerMoney = 1000;
}


function draw() {
  background(220);
  displayGrid();

  // Instructions and stats displayed on-screen for inventory:
  fill(0);
  text("Click on item to buy!", 25, cellSize*2+fontSize);
  text("Money: $" + playerMoney, 25, cellSize*2+fontSize*3);
  text("Inventory: " + inventoryList, 25, cellSize*2+fontSize*4);
}


function displayGrid() {
  for (let y = 0; y < gridDown; y++) {                             // columns?
    for (let x = 0; x < gridAcross; x++) {                           // rows?
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


function update() {
  let nextTurn = create2DArray(gridDown, gridAcross);

  for (let y = 0; y < gridDown; y++) {
    for (let x = 0; x < gridAcross; x++) {
      let neighbors = 0;

      // look at the 3 by 3 grid around th euctrent location 
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (y+i >= 0 && y+1 < gridDown && x+j >= 0 && x+j < gridAcross) {
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



function mousePressed() {
  let xcoord = floor(mouseX / cellSize);
  let ycoord = floor(mouseY / cellSize);

  if (grid[ycoord][xcoord] === 1) {
    grid[ycoord][xcoord] = 0;
    if (playerMoney > 0){                 // As long as player has more than $0, let player shop (subtract money and add to inventory).
      playerMoney -= 50; 
      inventoryList.push("another object");
      console.log(inventoryList);
    }
  }
  else {
    grid[ycoord][xcoord] = 1;
  }

  //if (grid[ycoord][xcoord]) // check position in the grid
}