// Project Title: Minesweeper (2D Array Assignment)
// Your Name: Alina Sami
// Date: Thursday April 18, 2019
//
// It's is based off of minesweeper, except the numbers tell you how close you are to treasure, instead of how
// close you are to a turtle (mine). 
// Only stepping on rocks with potential treasures around them will siplay numbers to let you know how many 
// treasures are around them. stepping on a turtle that's neighboring coins will not let you know if there
// are coins around that turtle. 
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
// > try making your own shapes (Links to an external site.)Links to an external site.
// > explore how to deal with the user resizing their window (Links to an external site.)Links to an external site. while your sketch is running
// > explore using the mouse wheel (Links to an external site.)Links to an external site. as input
// > play around with the html of your index.html page. You can make it so that your canvas only takes up a portion of your page, or happens "behind" the rest of the content on your webpage.
// > include basic AI / beating a computer mode in your game (could be as simple as an enemy that tries to catch the player, or something more involved, such as a computer opponent in a game like Tic Tac Toe)
// - used new array

let bgMusic;
let turtleSound;
let coinSound;
let rock;
let coin; 
let turtle;

let grid;
let gridColumns;
let gridRows;
let w = 50; 

let canvasSize;

let treasure = 0;
let lives = 3;
let goal;

let level;

let hoveringOverGrid;

let screenState;


function preload() {
  bgMusic = loadSound("assets/music-01.mp3");
  coinSound = loadSound("assets/input-03.mp3");
  turtleSound = loadSound("assets/input-06.mp3");
  rock = loadImage("assets/rock.png");
  coin = loadImage("assets/coin.png");
  turtle = loadImage("assets/turtle.PNG");
}


function treasureCounter() {
  fill(0);
  text("Treasure: " + treasure, gridRows*w+100, 100);
}

function playerLifeCounter() {
  fill(0);
  text("Lives Left: " + lives, gridRows*w+110, 150);
}


class Cell {
  constructor (i, j, w) {
    this.i = i;
    this.j = j;
    this.x = i*w;
    this.y = j*w;
    this.w = w;

    this.numberOfTreasures;

    this.turtle = false;
    this.coins = false;
    this.stone = false;

    let guess = random(0, 4);
    if (guess < 1) {
      this.turtle = true;
    }
    if (guess > 1 && guess < 2) {
      this.coins = true;
    }
    if (guess > 2) {
      this.stone = true;
    }

    this.visible = false; ///////////////////////////turn back to false soon!
  }

  show() {
    if (this.visible) {       // If visible i.e., if user clicks on cell and . . .
      if (this.coins) {    // if there are coins instead, show coins.
        fill(17, 56, 94);
        rect(this.x, this.y, this.w, this.w);
        image(coin, this.x, this.y, this.w, this.w);
      }
      else { 
        if (this.turtle) {      // if there is a turtle, show the turtle.
          fill(17, 56, 94);
          rect(this.x, this.y, this.w, this.w);
          image(turtle, this.x, this.y, this.w, this.w);
        }
        if (this.stone) {       // if there is stone instead, show stone.
          fill(127);
          rect(this.x, this.y, this.w, this.w);
          image(rock, this.x, this.y, this.w, this.w);
        }

        if (this.numberOfTreasures > 0) {
          if (!this.turtle) {
            fill(255, 194, 50);
            text(this.numberOfTreasures, this.x+this.w*0.5, this.y+this.w*0.7);
          }
        }
      }
    }

    else {
      stroke(0);
      fill(37, 90, 144);
      rect(this.x, this.y, this.w, this.w);
    }
  }


  // Check if player is close to treasure by counting treasures around the cell clicked.
  countTreasures () {
    let total = 0;
    
    if (this.coins) {
      total = -1;
    }
    else {
      for (let xDis = -1; xDis <= 1; xDis++) {
        for (let yDis = -1; yDis <= 1; yDis++) {
          let i = this.i + xDis;
          let j = this.j + yDis;
  
          if (i > -1 && i < gridColumns && j > -1 && j < gridRows) {
            let neighbor = grid[i][j]; // Look at all the neighbors.
            if (neighbor.coins) {
              total++;
            }
          }
        }
      }
      this.numberOfTreasures = total;
    }
  }


  clickedOn(xPos, yPos) {
    return(xPos > this.x && xPos < this.x + this.w && yPos > this.y && yPos < this.y +this.w);
  }


  reveal() {
    this.visible = true;
  }
}





function setup() {
  createCanvas(windowWidth, windowHeight);
    canvasSize = windowHeight*0.85 + 1;

  console.log(floor(millis()) + " milliseconds"); //////

  textAlign(CENTER);
  textSize(35);
  turtleSound.setVolume(0.5);
  coinSound.setVolume(0.5);
  bgMusic.setVolume(0.4);

  bgMusic.loop();                   /////////////////////////////////////

  gridColumns = floor(canvasSize/w);
  gridRows = floor(canvasSize/w);

  screenState = "game screen"; ////

  newGame(); ////

  level = 1;  ////
}



function draw() {
  background(53, 45, 45);


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


  
  if (lives >= 1) {
    console.log("level " + level);
    
    // As long as we have one life, set goal according to level:
    checkForLevel();

    if (treasure !== goal) {
      playerLifeCounter()
      treasureCounter();

      // Player Goal:
      text("Level " + level + ": " + "Find " + goal + " hidden coins.", 230, gridRows*w+50);

      for (let i = 0; i < gridColumns; i++) {                             
       for (let j = 0; j < gridRows; j++) {                           
          grid[i][j].show();   
        }
      }
    }

  }
  else {
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

// function gameScreen() {

// }

function checkForLevel() {
  if (level === 1) {
    goal = 4;
    if (treasure === goal) {
      console.log("level up 2");
      //setTimeout()
      newGame();
      level = 2;
    }
  }
  if (level === 2) {
    goal = 9;
    if (treasure === goal) {
      console.log("level up 3");
      newGame();
      level = 3; // Only when we change levels, we need to get newGame();
    }
  }
  // textSize(75);
  //   fill(0, 255, 0);
  //   text("LEVEL UP", windowWidth/2, windowHeight/2);
  //   // newGame();
  if (level === 3) {
    goal = 14;
    if (treasure === goal) {
      textSize(75);
      fill(0, 0, 255);
      text("YOU WIN", windowWidth/2, windowHeight/2); 
    }
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

  // Reset player life to 3 lives.
  lives = 3;
}



function create2DArray (gridColumns, gridRows) {
  let emptyArray = new Array(gridColumns);
  for (let i = 0; i < emptyArray.length; i++) {
    emptyArray[i] = new Array(gridRows);
  }
  return emptyArray;
}


function mousePressed() {
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
            lives -= 1;
            turtleSound.play();                  // decrease life counter.
          }
        }
      }  
    }
  }
}