// Interactive Scene: Breakout Game
// Alina Sami
// Created: February 14, 2019           
//
//Instructions:
//This is a Breakout game, in which your goal is to use your Slider to make sure the ball never hits the 
//ground. Use left and right arrow keys to move Slider left and right. Click on the 'Cheat' button in the 
//top right-hand corner of the screen to make the game easier by increasing your Slider width by some 
//amount, each time you click the button! Your running score is displayed in the top left-hand corner of 
//the screen. If you fail, you will get an alert window that displays your total score during the 
//game, and by clicking 'Ok', the game automatically resets. 
//
// Extra for Experts: (describe what you did to take this project "above and beyond")
// - Explored a new way to reset the game by reloading the web page. 
// - Added background sound to the game. 
////////////////////////////////////////////////////////////////////////////////////////////////////////
//function preload() {
  //soundFormats('mp3', 'ogg');
  //mySound = loadSound('assets/doorbell.mp3');
//}

////////?????????????????//whats the advantage of setting score to 0 in variables or set up?
//?????????????????????Which di you prefer:
//x = 5
//y = 7   
//or 
//x = 5, y= 7;






//Variable that stores score:
let score = 0;

//Sets size of font. 
let fontSize = 60;

//Height of black banner on top of page.
let bannerHeight = 100;


////Sets up button values (i.e.: x, y, width, height):
let cheatButtonY = 10;
let cheatButtonW = 250, cheatButtonH = 80;


//Sets width and height of (rectangular) Slider.
let rectWidth = 250, rectHeight = 50;
//Establishes x and y position variables for (rectangular) Slider. 
let x, y;
//Establishes boolean variables that enable Slider movement by listening for arrow key presses and releases. 
let isMovingRight, isMovingLeft; 


//Establishes Bouncing-ball position variables:
let ballX, ballY;
//Sets Bouncing-ball displacement: 
let dx = 3, dy = 3;
//Sets Bouncing-ball radius:
let radius = 25;



function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  //Sets size of text to fontSize for on-screen texts:
  textSize(fontSize);

  //Sets the start values for Slider coordinates.
  x = windowWidth/2;
  y = windowHeight - rectHeight;

  //Sets start values for Bouncing-ball coordinates:
  ballX = width/2;
  ballY = height/2;


  //Background sound:
  //mySound.setVolume(0.1);
  //mySound.play();
}
 



function draw() {
  background(200, 100, 100);

  displayScore();
  
  displayCheatButton();

  displaySlider();

  //Display Ball and ball movement: 
  moveBall();
  bounceBall();
  displayBall();

  //Check for arrow key presses for Slider Movement:
 // if (isMovingLeft === true && (x >= 0)) {
 //   x -= 10;
 // }
 // if (isMovingRight === true && (x <= windowWidth - rectWidth)) {
 //   x += 10;
 // }
}


//Display Score on top of a banner on-screen:
function displayScore() {
  //Create Black Banner first:
  fill(0);
  rect(0, 0, windowWidth, bannerHeight);
  //Display score on top of banner:
  fill(255);
  text("Score: " + score, 100, 75);
}

//Display 'Cheat' button:
function displayCheatButton() {
  fill(255);
  rect(windowWidth - 300, cheatButtonY, cheatButtonW, cheatButtonH); 
  fill(0);
  text("Cheat!", windowWidth - 290, 65);
}

//Display (rectangular) Slider:
function displaySlider() {
  fill(100, 100, 150);
  rect(x, y, rectWidth, rectHeight);
}

//window resize:
//function windowResized() {
 // resizeCanvas(windowWidth, windowHeight);
//}


//Check for arrow key presses for Slider Movement:
function sliderMovement() {
  if (isMovingLeft === true && (x >= 0)) {
    x -= 10;
  }
  if (isMovingRight === true && (x <= windowWidth - rectWidth)) {
    x += 10;
  }
}


//If (left/right) arrowkeys are pressed, turns boolean variables true to enable Slider movement. 
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    isMovingLeft = true;
  } 
  else if (keyCode === RIGHT_ARROW) {
    isMovingRight = true;
  }
}


//If (left/right) arrowkeys are released, turns booleans variables false to stop Slider movement. 
function keyReleased() {
  if (keyCode === LEFT_ARROW) {
    isMovingLeft = false;
  } 
  else if (keyCode === RIGHT_ARROW) {
    isMovingRight = false;
  }
}


//If 'cheat' button clicked, Slider width increases by 10.
function mousePressed() {
  if (mouseX > (windowWidth - 300) && mouseX < ((windowWidth - 300) + 250) && mouseY > 10 && mouseY < 10 + 80) {
    rectWidth += 10;
  }
}


// Move the Bouncing-ball.
function moveBall() {
  ballX += dx;
  ballY += dy;
}


// Check for ball bounce.
function bounceBall() {
  //Bounce off left and right walls:
  if (ballX + radius >= width || ballX - radius <= 0) {
    dx = -1 * dx;
  }

  //Bounce off top banner:
  if (ballY - radius <= bannerHeight) {
    dy = -1 * dy;
  }
  
  //Bounce off Slider if ball hits Slider surface: 
  if (ballY + radius >= y) {
    if (ballX > x && ballX < x + rectWidth) {
      dy = -1 * dy;
      score += 1;
    }

    //If ball falls past Slider:   
    else {
      //Display the alert for 'Game Over':
      alert("GAME OVER! Your Score Was: " + score);
      //And restart a new game:
      document.location.reload();   
    }
  }
  
}


//Create the Bouncing-ball:
function displayBall() {
  fill(250, 150, 100);
  ellipse(ballX, ballY, radius*2, radius*2);
}