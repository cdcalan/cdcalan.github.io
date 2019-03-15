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



function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textSize(fontSize);

  buttonX = width/2;
}


function draw() {
  background(220);

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
  fill(230, 100, 150);
  ellipse(450, 450, 200, 200);
}


function mousePressed () {
  if (state === "menu") {
    if (clickedOnButton(mouseX, mouseY)) {
      state = "other";
    }
  }
}

//an object is just a container of properties and etc.
//define button x and y:
function clickedOnButton(x, y) {
  return x >= buttonX - buttonWidth/2 &&
         x <= buttonX + buttonWidth/2;
      //   y >= buttonY - buttonHeight/2 &&
        // y <= buttonY + buttonHeight/2;
}
