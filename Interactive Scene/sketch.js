// Interactive Scene: Breakout Game
// Alina Sami
// Created: February 14, 2019           Due: March 4, 2019
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
// - Explored a new way to reset the game using clearInterval() function, as well as reloading. 
// - I added background sound to the game. 
////////////////////////////////////////////////////////////////////////////////////////////////////////
//function preload() {
  //soundFormats('mp3', 'ogg');
  //mySound = loadSound('assets/doorbell.mp3');
//}

//Set fontsize for on-screen text.
let fontSize = 60;

let newButton;

//Height of black banner on top of page.
let bannerHeight = 100;

//Sets up button values (i.e., bool, x, y, width, height):
let button = false;
let buttonX = 50, buttonY = 50;
let buttonW, buttonH = 75;

//Establishes width and height variables of Rectangle.
let rectWidth = 250, rectHeight = 50;

//Establishes x and y position variables for Rectangle. 
let x, y;

//Establishes variables that enable Rectangle movement by listening for arrow key presses and releases. 
let isMovingRight, isMovingLeft; 

//??????????????????????????????????????????????????????????????????????
let increaseRectSize, decreaseRectSize;

//Bouncing-ball (x,y) position variables:
let ballX, ballY;
//Bouncing-ball speed variables: 
let dx, dy;
//Bouncing-ball radius:
let radius;

//Variable to store score:
let score;



function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  newButton = createButton("Play");

  x = windowWidth/2;
  y = windowHeight - rectHeight;

  //text size:
  textSize(fontSize);

  //Background sound:
  //mySound.setVolume(0.1);
  //mySound.play();

  score = 0;

  //Bouncing Ball Set-Up:
  ballX = width/2;
  ballY = height/2;
  dx = 3;
  dy = 3;
  radius = 25;

}
 



function draw() {
  background(200, 100, 100);

  //Black Banner:
  fill(0);
  rect(0, 0, windowWidth, bannerHeight);


  //Button function:
  //if (button) {
   // background(227);
  //} else {
   // background(160);
  //}

  fill(255);
  rect(windowWidth - 300, 10, 250, 80); 
  fill(0);
  text('Restart', windowWidth - 290, 65);
  //Print Score:
  fill(255);
  text('Score: ' + score, 100, 75);
 

  //Ball Movement:
  moveBall();
  bounceBall();
  displayBall();


  //Key-controlled rectangle:
  fill(100, 100, 150);
  rect(x, y, rectWidth, rectHeight);

  //Key-controlled Rectangle Movement:
  if (isMovingLeft === true && (x >= 0)) {
    x -= 10;
  }
  if (isMovingRight === true && (x <= windowWidth - rectWidth)) {
    x += 10;
  }

}


//window resize:
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//If arrow keys are pressed, turn movement variables true to enable movement.
function keyPressed() {
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
  if (keyCode === LEFT_ARROW) {
    isMovingLeft = false;
  } 
  else if (keyCode === RIGHT_ARROW) {
    isMovingRight = false;
  }
}

//Button function:
//function mousePressed() {
 // if (mouseX > buttonX && mouseX < buttonX + buttonW && mouseY > buttonY && mouseY < buttonY + buttonH) {
//button = !button;
 // }
//}



// Move the ball.
function moveBall() {
  ballX += dx;
  ballY += dy;
}


// Check for bounce.
function bounceBall() {
  //bounce off left and right walls:
  if (ballX + radius >= width || ballX - radius <= 0) {
    dx = -1 * dx;
  }

  //bounce off top banner wall:
  if (ballY - radius <= bannerHeight) {
    dy = -1 * dy;
  }
  
  //bounce off of rectangle if ball hits rectangle 
  if (ballY + radius >= y) {
    if (ballX > x && ballX < x + rectWidth) {
      dy = -1 * dy;
      score += 1;
    }
    else {
      alert("GAME OVER");
      document.location.reload();    //????????????????????????????????????????
      //clearInterval(interval);               dont need
    }
  }
  
}


// Display the ball
function displayBall() {
  fill(250, 150, 100);
  ellipse(ballX, ballY, radius*2, radius*2);
}