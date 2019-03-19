// State Variables Assignment:
// Alina Sami
// March 12, 2019
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


////use time minis(), use screen sliding, use a rotating object. 

let state;

let buttonX;

let fontSize = 30;
let menuHeight = 600;
let buttonWidth = 150;
let buttonHeight = 50;

let backButtonWidth = 200;
let backButtonHeight = 75;




function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textSize(fontSize);

  buttonX = width/2;
  state = "menu";
}


function draw() {
  background(0);

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
  background(255);
  fill(250, 100, 150);
  ellipse(450, 450, 200, 200);

  // Create Back Button:
  rectMode(CORNER);
  fill(200, 75, 75);
  rect(windowWidth - (backButtonWidth+50), windowHeight - (backButtonHeight+50), backButtonWidth, backButtonHeight);
  fill(0);
  text("Back to Menu", windowWidth - (backButtonWidth+40), windowHeight - backButtonHeight);
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
}
