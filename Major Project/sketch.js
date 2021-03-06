// Major Project
// Alina Sami
// Monday, April 29, 2019
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// To Do:
// - create sprites classes
// - use parent and subclasses of sprites.
// - create background txt file (?)
// - create a start screen with menu buttons: start, info
// - Extra: loading animation? (maybe use css)?



// Player object:
let player;

// Screen state variable:
let screenState;

// Button objects:
let startButton;
let infoButton;

// Menu coordinates and dimensions:
let menuX;
let menuY;
let menuWidth = 250;
let menuHeight = 200;

// Player variables:
let playerLives;
let score;

let playerAvatar;
let marioRun;
let marioJump;
let marioDuck;


let gravity;
let yLocation, ground;
let yVelocity, yAcceleration;


function preload() {
  marioRun = loadImage("assets/marioRun.png");
  marioJump = loadImage("assets/marioJump.png");
  marioDuck = loadImage("assets/marioDuck.png");
}



function setup() {
  createCanvas(windowWidth, windowHeight);

  textSize(40);

  // Start Screen: 
  screenState = "Start Screen";

  menuX = (windowWidth/2) - (menuWidth/2);
  menuY = (windowHeight/2) - (menuHeight/2);

  yVelocity = 0;
  yAcceleration = 0;
  gravity = 0.1;
  ground = windowHeight-250;
  yLocation = ground;
  // Demo Sprite Object:
  player = new User(300, yLocation);

  // Menu Button Objects:
  startButton = new Button(menuX, menuY + 20, "Start");
  infoButton = new Button(menuX, menuY + 95, "Info");

  // Gameplay stuff ----------------------------------------------should i be declaring these in setup or the gamescreen?
  playerLives = 4;
  score = 0;

  playerAvatar = marioDuck;
}



function draw() {
  background(220);

  if (screenState === "Start Screen") {
    displayStartScreen();
  }
  else if (screenState === "Game Screen") {
    displayGameScreen();
  }
  else if (screenState === "Info Screen") {
    displayInfoScreen();
  }
  else if (screenState === "Game Over") {
    displayGameOverScreen();
  }
  // Optional: level up screens? or just messages?

}



function mousePressed() {
  if (screenState === "Start Screen") {
    if (startButton.clickedOn(mouseX, mouseY)) {
      screenState = "Game Screen";
    }
    if (infoButton.clickedOn(mouseX, mouseY)) {
      screenState = "Info Screen";
    }
  }
}



//SCREENS-----------------------------------------------------------------------------------------------------------------------------
function displayStartScreen() {
  background(50, 100, 150);

  fill(200, 50, 20, 100);
  rect(menuX, menuY, menuWidth, menuHeight, 30); 

  startButton.show();
  infoButton.show();

}



// Scrolling background??????????????????????????????????
function displayInfoScreen() {
  background(200);
}



function displayGameScreen() {
  background(70, 150, 100);
  player.show();
  player.updateShow(playerAvatar);
  player.move(playerAvatar);
  player.jump(playerAvatar);

  playerLifeCounter();
}



function displayGameOverScreen() {
  background(80);
  textAlign(CENTER);
  textSize(80);
  fill(255, 0, 0);
  text("GAME OVER", windowWidth/2, windowHeight/2);
  textSize(50);
  fill(255);
  text("Score " + score, windowWidth/2, windowHeight/2);
}

/////////////////COLORS//////////////////////
// grass = (70, 150, 10)

function playerLifeCounter() {
  fill(190);
  rect(25, 25, 125, 40, 5);
  
  fill(0);
  textSize(25);
  text("Life : " + playerLives, 30, 55);
}