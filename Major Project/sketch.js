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

let startButton;
let infoButton;

let menuX;
let menuY;
let menuWidth = 250;
let menuHeight = 200;


class Button {
  constructor(x, y) {
    this.w = 150;
    this.h = 50;
    this.x = x;
    this.y = y;
  }
  show(){
    fill(255);
    rect(this.x + (menuWidth/4), this.y, this.w, this.h, 50);
  }
}



function setup() {
  createCanvas(windowWidth, windowHeight);

  screenState = "Start Screen";

  menuX = (windowWidth/2) - (menuWidth/2);
  menuY = (windowHeight/2) - (menuHeight/2);

  // Demo Sprite Object:
  player = new User(300, windowHeight-250);

  // Menu Button Objects:
  startButton = new Button(menuX, menuY);
  infoButton = new Button(menuX, menuY + 50);
  console.log(menuX, menuY);
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

  fill(200, 50, 20, 100);
  rect(menuX, menuY, menuWidth, menuHeight, 30); 

  startButton.show();
  infoButton.show();

}
