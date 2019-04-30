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

let player;

let screenState;

class Button {
  constructor() {
    this.x = windowWidth/2;
    this.y = windowHeight/2;
    this.w = 150;
    this.h = 50;
  }
  show(){

  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  screenState = "Start Screen";

  // Demo Sprite:
  player = new User(300, windowHeight-250);
}




function draw() {
  background(220);

  if (screenState === "Start Screen") {
    displayStartScreen();
  }
  else if (screenState === "Game Screen") {
    displayGameScreen();
  }
  else if (screenState === "Game Over") {
    displayGameOverScreen();
  }
  // Optional: level up screens? or just messages?
  
  player.show();
  player.move();
  player.jump();
}




function displayStartScreen() {
  background(50, 100, 150);

  fill(200, 50, 20);
  rect(windowWdth/2, windowHeight/2, 250, 200); 

  startButton.show();
  infoButton.show();

}
