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
// - used new array


let grid;
let gridColumns;
let gridRows;
let w = 50; 

let canvasSize;

let treasure = 0;
let lives = 3;


let counterX = 100;

function treasureCounter() {
  fill(0);
  text("Treasure: " + treasure, counterX, gridRows*w+50);
}

function playerLifeCounter() {
  fill(0);
  text("Lives Left: " + lives, counterX, gridRows*w+100);
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
        fill(255, 194, 40);
        ellipse(this.x + this.w*0.5, this.y+ this.w*0.5, this.w * 0.5);
      }
      else {
        if (this.turtle) {      // if there is a turtle, show the turtle.
          fill(17, 56, 94);
          rect(this.x, this.y, this.w, this.w);
          fill(127);
          ellipse(this.x + this.w*0.5, this.y+ this.w*0.5, this.w * 0.5);
        }
        if (this.stone) {       // if there is stone instead, show stone.
          fill(127);
          rect(this.x, this.y, this.w, this.w);
        }

        if (this.numberOfTreasures > 0) {
          textAlign(CENTER);
          fill(0);
          text(this.numberOfTreasures, this.x+this.w*0.5, this.y+this.w*0.5);
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

  textSize(35);

  gridColumns = floor(canvasSize/w);
  gridRows = floor(canvasSize/w);
  grid = create2DArray(gridColumns, gridRows); 

  // Make grid of cells:
  for (let i = 0; i < gridColumns; i++) {                             
    for (let j = 0; j < gridRows; j++) {                           
      grid[i][j] = new Cell(i, j, w);   
    }
  }

  /////*************************************************************************** */

  // For each level in the y-direction of the grid:
  let pathX = random(0, gridRows-1);
  for (let n = gridColumns; n > 0; n--) {
    if (pathX === 0) {          // And if the chosen block is on the left-most side:
      pathX += random(0, 1);
    }         
    if (pathX === gridRows-1) { // Or if the chosen block is on the right-most side:
      pathX += random(-1, 0);
    }
    else {
      pathX += random(-1, 1); // Otherwise, pick a random block from the three forward to move to:
    }
    fill(0);
    rect(pathX, n, w, w);
  }
  /////*************************************************************************** */

  // Check for treasures:
  for (let i = 0; i < gridColumns; i++) {                             
    for (let j = 0; j < gridRows; j++) { 
      grid[i][j].countTreasures();
    }
  }
}



function draw() {
  background(53, 45, 45);
  for (let i = 0; i < gridColumns; i++) {                             
    for (let j = 0; j < gridRows; j++) {                           
      grid[i][j].show();   
    }
  }
  playerLifeCounter()
  treasureCounter();
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
          }
          if (grid[i][j].turtle) {     
            lives -= 1;                  // decrease life counter.
          }
        }
      }  
    }
  }
}