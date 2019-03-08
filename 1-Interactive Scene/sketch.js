// Interactive Scene: Breakout Game
// Alina Sami
// Created: February 14, 2019           
//
//Instructions:
//This is a Breakout game, in which your goal is to catch (and bounce) the ball with you Slider. To score 
//points, you must move your Slider completely underneath the ball before it touches the Slider. Use left 
//and right arrow keys to move Slider left and right. The ball will move at a random speed between 3 and 10.
//Click on the 'Cheat' button in the top right-hand corner of the screen to make the game easier by 
//increasing your Slider width by some amount, each time you click the button! Your running score is 
//displayed in the top left-hand corner of the screen. If you fail, you will get an alert window that 
//displays your total score during the game, and by clicking 'Ok' on the alert window, the game will 
//automatically restart. 
//
// Extra for Experts: (describe what you did to take this project "above and beyond")
// - 1) Added sound to the game by causing collision sound effects each time the ball successfully bounces 
//      off of Slider. 
// - 2) Explored a new way to reset the game by reloading the web page through the alert window. 
////////////////////////////////////////////////////////////////////////////////////////////////////////


//Sound effect variable (used to load and call the sound):
let soundEffect;

//Variable that stores score:
let score = 0;

//Sets size of font. 
let fontSize = 60;

//Height of black banner.
let bannerHeight = 100;

////Sets up y-position, width, and height of 'cheat' button:
let cheatButtonY = 10;
let cheatButtonW = 250, cheatButtonH = 80;

//Sets width and height of Slider.
let rectWidth = 250, rectHeight = 50;
//Establishes x and y position variables for Slider. 
let x, y;
//Establishes boolean variables that enable Slider movement by listening for arrow key presses and releases. 
let isMovingRight, isMovingLeft; 

//Establishes Bouncing-ball position variables:
let ballX, ballY;
//Establishes Bouncing-ball displacement variables: 
let dx, dy;
//Sets Bouncing-ball radius:
let radius = 25;



//Preloads the sound. 
function preload() {
  soundEffect = loadSound("assets/Input-06.mp3");
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  //Sets size of text to fontSize for on-screen texts:
  textSize(fontSize);

  //Sets sound volume:
  soundEffect.setVolume(0.5);

  //Sets the start values for Slider coordinates.
  x = windowWidth/2;
  y = windowHeight - rectHeight;

  //Sets start values for Bouncing-ball coordinates:
  ballX = width/3;
  ballY = height/3;

  //Assigns values for Bouncing-ball displacement:
  dx = random(3, 10);
  dy = random(3, 10);
}
 


function draw() {
  background(200, 100, 100);

  //Display all game elements on screen (score, button, slider, and ball):
  displayScore();
  displayCheatButton();
  displaySlider();
  displayBall();

  //Display ball movements: 
  moveBall();
  bounceBall();
 
  //Check for arrow key presses for Slider Movement:
  if (isMovingLeft === true && (x >= 0)) {
    x -= 10;
  }
  if (isMovingRight === true && (x <= windowWidth - rectWidth)) {
    x += 10;
  }
}



//Display Score on-screen:
function displayScore() {
  //Create Black Banner:
  fill(0);
  rect(0, 0, windowWidth, bannerHeight);
  //Display score on banner:
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



//Display Slider:
function displaySlider() {
  fill(100, 100, 150);
  rect(x, y, rectWidth, rectHeight);
}



//Display the Bouncing-ball:
function displayBall() {
  fill(250, 150, 100);
  ellipse(ballX, ballY, radius*2, radius*2);
}



//Move the Bouncing-ball.
function moveBall() {
  ballX += dx;
  ballY += dy;
}



//Check for ball bounce.
function bounceBall() {

  //Bounce off left and right walls if hitting them:
  if (ballX + radius >= width || ballX - radius <= 0) {
    dx = -1 * dx;
  }

  //Bounce off top banner if hitting it:
  if (ballY - radius <= bannerHeight) {
    dy = -1 * dy;
  }
  
  //Bounce off Slider if ball hits Slider surface: 
  if (ballY + radius >= y) {
    if (ballX > x && ballX < x + rectWidth) {
      dy = -1 * dy;
      //Cause collision sound effect: (Extra for Experts)
      soundEffect.play();
      //Augment player score:
      score += 1;
    }
  
    else { 
      //Display alert for 'Game Over':
      alert("GAME OVER! Your Score Was: " + score);
      //Restart a new game: (Extra for Experts)
      document.location.reload();   
    }
  }
}



//If (left or right) arrowkeys are pressed, turn boolean variables true to enable Slider movement. 
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    isMovingLeft = true;
  } 
  else if (keyCode === RIGHT_ARROW) {
    isMovingRight = true;
  }
}



//If (left or right) arrowkeys are released, turn boolean variables false to stop Slider movement. 
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
  if (mouseX > windowWidth - 300 && mouseX < (windowWidth - 300) + cheatButtonW && mouseY > cheatButtonY && mouseY < cheatButtonY + cheatButtonH) {
    rectWidth += 10;
  }
}