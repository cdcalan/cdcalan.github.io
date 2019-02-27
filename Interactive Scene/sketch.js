// Interactive Scene
// Alina Sami
// February 14, 2019
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let cnv;
let buttonColor;

//Set up the variables that determine x and y coordinates of alien.
let alienX = 105;
let alienY = 100;

//Establish x,y position values for rectangle (shooter). 
let x = 300;
let y = 200;

//Establish the width and height variables of rectangel (shooter).
let rectWidth = 50;
let rectHeight = 50;

//Establish movement variables that enable shooter movement by listening for arrow key presses/releases. 
let isMovingUp;
let isMovingDown;
let isMovingRight;
let isMovingLeft; 

let increaseRectSize;
let decreaseRectSize;



function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  buttonColor = 10;
} 



function draw() {
  background(200, 100, 100);

  //Black Banner:
  fill(0);
  rect(0, 0, windowWidth, 100);
  setButtonColor();

  //Button:
  fill (buttonColor);
  rect(windowWidth/3, windowHeight/4, 100, 100); 

  //Mouse Curser:
  fill(220, 200, 200, 50);
  ellipse(mouseX, mouseY, 50, 50);

  //Key-controlled rectangle:
  fill(100, 100, 150);
  rect(x, y, rectWidth, rectHeight);

  fill(250, 200, 90);
  ellipse(alienX, alienY, 200, 50, 50);

  alienX = alienX + random(-1,5);
  alienY = alienY + random(-1,5);


  //Key-controlled Rectangle Movement:
  if (isMovingUp === true && (y >= 0)) {
    y -= 5;
  }
  if (isMovingDown === true && (y <= windowHeight - rectHeight)) {
    y += 5;
  }
  if (isMovingLeft === true && (x >= 0)) {
    x -= 5;
  }
  if (isMovingRight === true && (x <= windowWidth - rectWidth)) {
    x += 5;
  }
}



function setButtonColor() {
  buttonColor = 255;
}



//If arrow keys are pressed, turn movement variables true to enable movement.
function keyPressed() {
  if (keyCode === UP_ARROW) {
    isMovingUp = true;
  } 
  else if (keyCode === DOWN_ARROW) {
    isMovingDown = true;
  }
  if (keyCode === LEFT_ARROW) {
    isMovingLeft = true;
  } 
  else if (keyCode === RIGHT_ARROW) {
    isMovingRight = true;
  }
  if (key === "i") {
    rectWidth += 5;
  }
  else if (key === "d") {
    rectWidth -= 5;
  }
}



//If arrow keys are released, turn movement variables false to stop movement. 
function keyReleased() {
  if (keyCode === UP_ARROW) {
    isMovingUp = false;
  } 
  else if (keyCode === DOWN_ARROW) {
    isMovingDown = false;
  }
  if (keyCode === LEFT_ARROW) {
    isMovingLeft = false;
  } 
  else if (keyCode === RIGHT_ARROW) {
    isMovingRight = false;
  }
}

