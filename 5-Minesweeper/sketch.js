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

let bgMusic;
let turtleSound;
let coinSound;
let rock;
let coin; 
let turtle;

let grid;
let gridColumns = 11;
let gridRows = 11;
let w; 

let canvasSize;

let treasure = 0;
let lives;
let goal;

let level;

let hoveringOverGrid;


let bgLevel1;
let bgLevel2;
let bgLevel3;

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


function treasureCounter() {
  if (lives >= 1) {
    fill(255);
    textSize(w-gridColumns);
    text("Treasure: " + treasure, gridRows*w, windowHeight/3);
  }
}

function playerLifeCounter() {
  if (lives >= 1) {
    fill(255);
    textSize(w-gridColumns);
    text("Lives Left: " + lives, gridRows*w, windowHeight/3 + w);
  }
}





function setup() {
  createCanvas(windowWidth, windowHeight);
  canvasSize = windowHeight*0.85 + 1;

  console.log(floor(millis()) + " milliseconds"); //////

  //textAlign(CENTER);
  textSize(35);
  turtleSound.setVolume(0.5);
  coinSound.setVolume(0.5);
  bgMusic.setVolume(0.4);

  bgMusic.loop();                   /////////////////////////////////////

  w = floor(canvasSize/gridColumns);

  newGame(); ////
  // Reset player life to 3 lives.
  lives = 3;

  level = 1;  ////

}



function draw() {
  image(bgImage, 0, 0, windowWidth, windowHeight);
  background(53, 45, 45, 120);


  if (mouseX >= 0 && mouseX <= gridColumns*w && mouseY >= 0 && mouseY <= gridRows*w) {
    hoveringOverGrid = true;
  }
  else {
    hoveringOverGrid = false;
  }

  if (hoveringOverGrid === true) {
    cursor(HAND);
  }
  else {
    cursor(ARROW);
  }

  
  if (lives !== 0) {  //works just as well as lives >= 1
    gameScreen();
  }
  else {
    noLoop();
    gameOverScreen();
  }

}


function gameOverScreen() {
  background(53, 45, 45);
  textSize(75);
  fill(255, 0, 0);
  text("GAME OVER", windowWidth/2, windowHeight/2);
  textSize(30);
  fill(255);
  text("Level: " + level + "; " + "Total coins collected: " + treasure, windowWidth/2, windowHeight/2 + 50);
}

function gameScreen() {
  // As long as we have one life, set goal according to level:
  checkForLevel();

  if (treasure !== goal) {
    playerLifeCounter()
    treasureCounter();

    // Player Goal:
    fill(255);
    textSize(w-gridColumns);
    text("Level " + level + ": " + "Find " + goal + " hidden coins.", 0, windowHeight-w);

    for (let i = 0; i < gridColumns; i++) {                             
     for (let j = 0; j < gridRows; j++) {                           
        grid[i][j].show();   
      }
    }
  }
}



function checkForLevel() {
  if (level === 1) {
    image(bgLevel1, 0, 0, gridColumns*w, gridRows*w)
    goal = 4;
    if (treasure === goal) {
      console.log("level up 2");
      newGame();
      // Reset player life to 3 lives.
      lives += 3;
      level = 2;
    }
  }
  if (level === 2) {
    image(bgLevel2, 0, 0, gridColumns*w, gridRows*w)
    goal = 9;
    if (treasure === goal) {
      console.log("level up 3");
      newGame();
      // Reset player life to 3 lives.
      lives += 3;
      level = 3; // Only when we change levels, we need to get newGame();
    }
  }
  if (level === 3) {
    image(bgLevel3, 0, 0, gridColumns*w, gridRows*w)
    goal = 14;
    if (treasure === goal) {
      level = "Finished";
    }
  }

  if (level === "Finished") {
    textSize(75);
    fill(0, 0, 255);
    text("YOU WIN", windowWidth/2, windowHeight/2); 
  }
  
}




function newGame() {
  // Get new grid.
  grid = create2DArray(gridColumns, gridRows); 

  // Make grid of cells:
  for (let i = 0; i < gridColumns; i++) {                             
    for (let j = 0; j < gridRows; j++) {                           
      grid[i][j] = new Cell(i, j, w);   
    }
  }

  // Check for treasures:
  for (let i = 0; i < gridColumns; i++) {                             
    for (let j = 0; j < gridRows; j++) { 
      grid[i][j].countTreasures();
    }
  }


  
}



function create2DArray (gridColumns, gridRows) {
  let emptyArray = new Array(gridColumns);
  for (let i = 0; i < emptyArray.length; i++) {
    emptyArray[i] = new Array(gridRows);
  }
  return emptyArray;
}


function mousePressed() {
  console.log("life " + lives);
  for (let i = 0; i < gridColumns; i++) {                             
    for (let j = 0; j < gridRows; j++) {                           
      if (grid[i][j].clickedOn(mouseX, mouseY)) {
        if (grid[i][j].visible === false) {  // If coin hasn't already been found / clicked on before:
          grid[i][j].reveal();              // show coins.
          if (grid[i][j].coins) {     
            treasure += 1;                  // increase treasure counter.
            coinSound.play();
          }
          if (grid[i][j].turtle) {     
            turtleSound.play();                  // decrease life counter.
            return (lives -= 1);
          }
        }
      }  
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  canvasSize = windowHeight*0.85 + 1;

  console.log(floor(millis()) + " milliseconds"); //////

  w = floor(canvasSize/gridColumns);

  newGame();
}