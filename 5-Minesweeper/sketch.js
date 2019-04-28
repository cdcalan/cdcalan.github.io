// Project Title: Treasure-Hunt 'Minesweeper' (2D Array Assignment)
// Your Name: Alina Sami
// Date: Thursday April 18, 2019
//
//
// INSTRUCTIONS: 
// This is a treasure-hunt game based off of minesweeper, where the goal is to pick up a specified number of 
// coins at each level while avoiding the turtles (mines). Clicking on a cell in the 'pond' (grid) reveals 
// 1 of 3 randomly scattered objects; a coin (that's added to your treasure), a turtle (that subtracts 1 
// of your remaining lives), or a harmless rock (that displays the number of coins that it neighbors). 
// Coins or turtles, or rocks not neighboring any coins will not display any number. 
//
// The "Lives" and "Treasure" counters to the right of the screen display the current number of lives and coins 
// collected. Text below the grid displays the level and goal for that level. 
//
// As soon as the number of coins collected meets the goal, the game automatically upgrades to the next level; 
// generating a new grid, displaying the level on the grid, updating the message below the grid, and 
// augmenting the player "Lives" counter by 3.
//
// The game is played best at full screen or half-screen, because the smaller the window, the smaller the grid
// becomes. Resizing the window during the game will generate a new grid, although the game scores will remain
// as before. 
// 
// 
// Extra for Experts:
// - I explored how to make my game compatible with user resizing the window (which I hadn't tried before). 
// - Added h1 element in index.html file, made my game only take up a portion of the webpage, and learned how 
//   to change the background color of webpage with html.
///////////////////////////////////////////////////////////////////////////////////
// > explore using the mouse wheel (Links to an external site.)Links to an external site. as input
// - used new array



// Sound variables for storing the background music and click-sounds respectively:
let bgMusic, turtleSound, coinSound;

// Image variables for storing the background image for each level. 
let bgLevel1, bgLevel2, bgLevel3;

// Image variables for storing the images for each object hidden in the minesweeper grid:
let rock, coin, turtle;

let grid;   // Stores the grid.
let cellWidth;   // Stores the width of each cell in grid. 
let gridColumns = 11, gridRows = 11;   // Stores the number of grid columns and rows.
let canvasSize;   // Stores the size of the grid.
let canvasHeight = 570;

// Keeps track of "Treasure" and "Lives Left" counters displayed on-screen.
let treasure = 0, lives;

// Track the current level being played. 
let level;

// Stores the number of coins to be collected for each different level.
let goal;



// Preloads all sounds and images.
function preload() {
  bgMusic = loadSound("assets/music-01.mp3");
  coinSound = loadSound("assets/input-03.mp3");
  bgImage = loadImage("assets/bg.jpg");
  bgLevel1 = loadImage("assets/level1.png");
  bgLevel2 = loadImage("assets/level2.png");
  bgLevel3 = loadImage("assets/level3.png");
  turtleSound = loadSound("assets/input-06.mp3");
  rock = loadImage("assets/rock.png");
  coin = loadImage("assets/coin.png");
  turtle = loadImage("assets/turtle.PNG");
}


let canvas; ////////////////////////////////////////////////////////////////

function setup() {
  createCanvas(windowWidth, canvasHeight);////////////////////////
  //canvas.position(0, 80);//////////////////////////////////////////////////
  
  // Compute the grid size, so that the grid only takes up a portion of the canvas:
  canvasSize = canvasHeight*0.85 + 1;

  // The width of each cell in the grid is dependent on the grid size and (pre-set) number of columns.
  cellWidth = floor(canvasSize/gridColumns);

  // Sets volume of loaded sounds:
  turtleSound.setVolume(0.5);
  coinSound.setVolume(0.5);
  bgMusic.setVolume(0.4);

  // Ensures background music plays back-to-back.
  bgMusic.loop();                   
 
  // Program always begins in level 1.
  level = 1;

  // Launches the minesweeper game program.
  newGame();

  // Sets player's initial life to 4.
  lives = 4;
}



function draw() {
  // Loads a background image for canvas.
  image(bgImage, 0, 0, windowWidth, canvasHeight);
  // Overlays a transparent blue 'filter' on top of background image. 
  background(53, 45, 45, 120);

  // Changes mouse cursor to 'hand' when mouse hovers over grid.
  if (mouseX >= 0 && mouseX <= gridColumns*cellWidth && mouseY >= 0 && mouseY <= gridRows*cellWidth) {
    cursor(HAND);
  }
  else {
    cursor(ARROW);
  }
  
  // Displays game screen (with grid) when player life is > 0: 
  if (lives !== 0) { 
    gameScreen();
  }
  // Otherwise, displays game-over screen (without grid):
  else {
    noLoop(); // Prevents the game screen from continuing to run 'under' the game-over screen.
    gameOverScreen();
  }
}



// The screen displayed when game is underway:
function gameScreen() {
  // Update the current level of the game:
  checkForLevel();

  // As long as the goal of the level has not been met:
  if (treasure !== goal) {

    // Display the "Treasure" and "Lives Left" counters (respectively):
    treasureCounter();
    playerLifeCounter()
    
    // Dsiplay the Player Goal:
    fill(255);
    textSize(cellWidth-gridColumns);
    text("Level " + level + ": " + "Find a total of " + goal + " hidden coins.", 0, canvasHeight-cellWidth);

    // Display the grid:
    for (let i = 0; i < gridColumns; i++) {                             
     for (let j = 0; j < gridRows; j++) {                           
        grid[i][j].show();   
      }
    }
  }
}



// The screen displayed when game has ended in a loss:
function gameOverScreen() {
  background(53, 45, 45);
  
  // Display game-over message:
  textSize(75);
  fill(255, 0, 0);
  text("GAME OVER", windowWidth/2, canvasHeight/2);

  // Display the level and number of coins reached before loss:
  textSize(30);
  fill(255);
  text("Level: " + level + "; " + "Total coins collected: " + treasure, windowWidth/2, canvasHeight/2 + 50);
}



function checkForLevel() {
  // If in level 1, set the grid-background image and goal accordingly:
  if (level === 1) {
    image(bgLevel1, 0, 0, gridColumns*cellWidth, gridRows*cellWidth)
    goal = 4;

    // If level 1 goal reached, call new game, augment the player life by 3, and switch level to level 2:
    if (treasure === goal) {   
      newGame();
      lives += 3;
      level = 2;
    }
  }

  // If in level 2, set the grid-background image and goal accordingly:
  if (level === 2) {
    image(bgLevel2, 0, 0, gridColumns*cellWidth, gridRows*cellWidth)
    goal = 9;

    // If level 2 goal reached, call new game, augment the player life by 3, and switch level to level 3:
    if (treasure === goal) {
      newGame();
      lives += 3;
      level = 3;
    }
  }

  // If in level 3, set the grid-background image and goal accordingly:
  if (level === 3) {
    image(bgLevel3, 0, 0, gridColumns*cellWidth, gridRows*cellWidth);
    goal = 15;

    // If level 3 goal reached, switch level to "Finished":
    if (treasure === goal) {
      level = "Finished";
    }
  }

  // If finished the first 3 levels, display the "You Win" screen:
  if (level === "Finished") {
    textSize(75);
    fill(0, 0, 255);
    text("YOU WIN", windowWidth/2, canvasHeight/2); 
  }
}



function treasureCounter() {
  // As long as game is underway, create the "Treasure" counter:
  if (lives >= 1) {
    fill(255);
    textSize(cellWidth-gridColumns);
    text("Treasure: " + treasure, gridRows*cellWidth, canvasHeight/3);
  }
}



function playerLifeCounter() {
  // As long as game is underway, create the "Lives Left" counter:
  if (lives >= 1) {
    fill(255);
    textSize(cellWidth-gridColumns);
    text("Lives Left: " + lives, gridRows*cellWidth, canvasHeight/3 + cellWidth);
  }
}



function newGame() {
  // Set the grid template to the 2D array.
  grid = create2DArray(gridColumns, gridRows); 

  // Make a grid of Cells:
  for (let i = 0; i < gridColumns; i++) {                             
    for (let j = 0; j < gridRows; j++) {                           
      grid[i][j] = new Cell(i, j, cellWidth);   
    }
  }

  // For every cell in the grid, check how many of cells' neighbors are coins:
  for (let i = 0; i < gridColumns; i++) {                             
    for (let j = 0; j < gridRows; j++) { 
      grid[i][j].countTreasures();
    }
  }
}



// Creates 2D array (the grid template):
function create2DArray (gridColumns, gridRows) {
  // First, create a 1D array of gridColumns:
  let emptyArray = new Array(gridColumns);

  // Turn this array into a 2D array by placing new arrays inside each element of the original array. 
  for (let i = 0; i < emptyArray.length; i++) {
    emptyArray[i] = new Array(gridRows);
  }
  return emptyArray;
}



function mousePressed() {
  //h1.html("Game Started");//////////////////////////////////////////////////////
  // Check if any cell in grid is clicked:
  for (let i = 0; i < gridColumns; i++) {                             
    for (let j = 0; j < gridRows; j++) {                           
      if (grid[i][j].clickedOn(mouseX, mouseY)) {

        // If the cell clicked hasn't already been clicked on before/isn't already visible:
        if (grid[i][j].visible === false) {  
          // Show the cell.
          grid[i][j].reveal();   
          
          // If the cell reveals a coin, play sound and increase "Treasure" counter by 1:
          if (grid[i][j].coins) {     
            treasure += 1;                  
            coinSound.play();
          }
          // If the cell reveals a turtle, play sound and decrease "Lives Left" counter by 1:
          if (grid[i][j].turtle) {     
            turtleSound.play();                  
            return (lives -= 1);
          }
        }
      }  
    }
  }
}



// When window is resized, the game continues with a new grid:
function windowResized() {
  // Compute the new width and height of canvas, to draw the canvas accordingly:
  resizeCanvas(windowWidth, canvasHeight);

  // Compute the new grid size, so that the grid only takes up a portion of the canvas:
  canvasSize = canvasHeight*0.85 + 1;

  // Set the size of each cell in the grid according to the new grid size:
  cellWidth = floor(canvasSize/gridColumns);

  // If window is resized, create new grid (but keep the scores/levels from before):
  newGame();
}