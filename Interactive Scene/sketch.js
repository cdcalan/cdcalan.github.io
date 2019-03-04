// Interactive Scene: Breakout Game
// Alina Sami
// February 14, 2019
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('assets/doorbell.mp3');
}


let cnv; //?????????????????????????????????????????????????
let buttonColor;

//Establish x,y position values for rectangle (shooter). 
let x = 300;
let y = 200;

//Establish the width and height variables of rectangle (shooter).
let rectWidth = 50;
let rectHeight = 50;

//Establish movement variables that enable shooter movement by listening for arrow key presses/releases. 
let isMovingUp;
let isMovingDown;
let isMovingRight;
let isMovingLeft; 

let increaseRectSize;
let decreaseRectSize;

//Bouncing Ball Variables:
let ballX, ballY;
let dx, dy;
let radius;



function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  //Background sound:
  mySound.setVolume(0.1);
  mySound.play();

  buttonColor = 10;


  //Bouncing Ball Set-Up:
  ballX = width/2;
  ballY = height/2;
  dx = random(3, 10);
  dy = random(3, 10);
  radius = 25;
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



  //Ball Movement:
  moveBall();

  bounceBall();

  displayBall();



  //Key-controlled rectangle:
  fill(100, 100, 150);
  rect(x, y, rectWidth, rectHeight);

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


// Move the ball.
function moveBall() {
  ballX += dx;
  ballY += dy;
}


// Check for bounce.
function bounceBall() {
  if (ballX + radius >= width || ballX - radius <= 0) {
    dx = -1 * dx;
  }

  if (ballY + radius >= height || ballY - radius <= 0) {
    dy = -1 * dy;
  }
}


// Display the ball
function displayBall() {
  ellipse(ballX, ballY, radius*2, radius*2);
}