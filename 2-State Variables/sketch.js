// State Variables Assignment:
// Alina Sami
// March 12, 2019
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


////use time minis(), use screen sliding, use a rotating object. 

//let name = prompt("what's you name?"); --> stops the rest of your program so use it in setup. 

let state;

let buttonX;

let fontSize = 30;
let menuHeight = 600;
let buttonWidth = 150;
let buttonHeight = 50;

let backButtonWidth = 200;
let backButtonHeight = 75;

let backButtonX;
let backButtonY;

let bannerX = 0;
let bannerY = 0;
let bannerW;
let bannerH;


let colorState;


function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textSize(fontSize);

  buttonX = width/2;
  state = "menu";

  bannerW = windowWidth;
  bannerH = windowHeight/5;

  colorState = 0;
}


function draw() {
  background(0);
  ballIsHere();

  if (state === "menu") {
    //Display menu:
    displayMenu();
  }
  else if (state === "other") {
    //Display other object:
    displayOther();
  }

}



function displayMenu() {
  //Menu Outline:
  rectMode(CENTER);
  fill(150, 200, 300);
  rect(width/2, height/2, 200, menuHeight);

  //Menu Buttons:
  fill(255);
  for (let i=150; i<=menuHeight ; i+= 75) {
    rect(buttonX, i, buttonWidth, buttonHeight);
    fill(100);
    text("Button 1", width/2 - buttonWidth/3, i + 10);
    fill(255);
  }
}


function displayOther() {
  let backButtonX = windowWidth - (backButtonWidth+40);
  let backButtonY = windowHeight - backButtonHeight;

  background(255);

  //Create banner outline:
  fill(150, 150, 150);
  rect(bannerX, bannerY, bannerW, bannerH);

  //Create banner elements:
  strokeWeight(3);
  stroke(0, 0, 150);
  fill(colorState);
  rect(bannerX + 50, bannerY + 40, bannerW/12, bannerH/2);
  noStroke();

  fill(0, 0, 150);
  textSize(20);
  text("Color", bannerX+60, (bannerH/2)+60);
  fill(250, 100, 150);
  chooseColor();


  // Create Back Button:
  rectMode(CORNER);
  fill(200, 75, 75);
  rect(windowWidth - (backButtonWidth+50), windowHeight - (backButtonHeight+50), backButtonWidth, backButtonHeight);
  fill(0);
  textSize(30);
  text("Back to Menu", backButtonX, backButtonY);
}


function chooseColor() {

}



//can make two functions for each button, or make one fucntion with two states, and different variables. 
function mousePressed () {
  if (state === "menu") {
    if (clickedOnButton(mouseX, mouseY)) {
      state = "other";
    }
  }
  if (state === "other") {
    if (clickedOnButton(mouseX, mouseY)) {
      state = "menu";
    }  
    if (clickedOnColor(mouseX, mouseY)) {
      colorState = 255;
    }
  }
}


function clickedOnColor(x, y) {
  if (state === "other") {
    return x >= bannerX + 50 && 
        x <= (bannerX + 50) + (bannerW/12) &&
        y >= bannerY + 40 &&
        y <= (bannerY + 40) + (bannerH/2);
  }
}


//an object is just a container of properties and etc.
//define button x and y:
function clickedOnButton(x, y) {
  if (state === "menu"){
    return x >= buttonX - buttonWidth/2 &&
           x <= buttonX + buttonWidth/2 &&
           y >= 225 - buttonHeight/2 &&
           y <= 225 + buttonHeight/2;
  }
  else if (state === "other"){
    return x >= backButtonX - backButtonWidth/2 &&
    x <= backButtonX + backButtonWidth/2 &&
    y >= 225 - backButtonHeight/2 &&
    y <= 225 + backButtonHeight/2;

  }
}
