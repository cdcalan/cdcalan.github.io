// State Variables Assignment:
// Alina Sami
// March 12, 2019
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

////////////////////////////use time minis(), use screen sliding, use a rotating object. 
///////////////////////////let name = prompt("what's you name?"); --> stops the rest of your program so use it in setup. 




//State variable for calling menu screen or other program:
let state;

//State variable for paint-program: stores available colors.  
let colorState;

//Sets font size:
let fontSize = 30;

//Menu outline and menu-buttons variables:
let menuHeight = 600;

let buttonX;
let buttonWidth = 150;
let buttonHeight = 50;

//Variales for Backbutton outline:
let backButtonX;
let backButtonY;
let backButtonWidth = 200;
let backButtonHeight = 75;

//Variables for Paint banner outline:
let bannerX = 0;
let bannerY = 0;
let bannerW;
let bannerH;

//Menu-button names:
let menuButtonNames = ["Button 1", "Button 2", "Button 3", "Button 4", "Button 5", "Button 6", "Button 7"];




function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textSize(fontSize);

  //Start screen will always open with menu:
  state = "menu";

  //Assigns values to menu button variables:
  buttonX = width/2;

  //Assigns values to Paint banner variables:
  bannerW = windowWidth;
  bannerH = windowHeight/5;

  //Sets initial color in Paint to black:
  colorState = 0;
}




function draw() {
  background(200, 120, 100);
  //ballIsHere();        //FAKE

  //Using state variables in menu to call different screens:
  if (state === "menu") {
    //Display menu:
    displayMenu();
  }
  else if (state === "paint") {
    //Display paint screen:
    displayPaintScreen();
  }

}

////'https://cs30.wmcicompsci.ca/oop/overview.html

//Displays menu screen:
function displayMenu() {
  //Menu Outline:
  rectMode(CENTER);
  fill(150, 200, 200);
  rect(width/2, height/2, 300, menuHeight);

  //Menu Buttons:
  fill(255);
  for (let i=150; i<=menuHeight ; i+= 75) {
    rect(buttonX, i, buttonWidth, buttonHeight);
    fill(100);
    text(menuButtonNames, width/2 - buttonWidth/3, i + 10);
    fill(255);
  }
}



//Displays the paint program screen:
function displayPaintScreen() {
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


  // Create Back Button:
  rectMode(CORNER);
  fill(200, 75, 75);
  rect(windowWidth - (backButtonWidth+50), windowHeight - (backButtonHeight+50), backButtonWidth, backButtonHeight);
  fill(0);
  textSize(30);
  text("Back to Menu", backButtonX, backButtonY);
}




//can make two functions for each button, or make one fucntion with two states, and different variables. 
function mousePressed () {
  if (state === "menu") {
    if (clickedOnButton(mouseX, mouseY)) {
      state = "paint";
    }
  }
  else if (state === "paint") {
    if (clickedOnBackButton(mouseX, mouseY)) {
      print("yes");
      state = "menu";
    }  
    if (clickedOnColor(mouseX, mouseY)) {
      colorState = 255;
    }
  }
}



function clickedOnColor(x, y) {
  if (state === "paint") {
    return x >= bannerX + 50 && 
           x <= (bannerX + 50) + (bannerW/12) &&
           y >= bannerY + 40 &&
           y <= (bannerY + 40) + (bannerH/2);
  }
}



//define button x and y:
function clickedOnButton(x, y) {
  if (state === "menu"){
    return x >= buttonX - buttonWidth/2 &&
           x <= buttonX + buttonWidth/2 &&
           y >= 225 - buttonHeight/2 &&
           y <= 225 + buttonHeight/2;
  }
}

function clickedOnBackButton(x, y) {
  if (state === "paint"){
    return x >= backButtonX &&
           x <= backButtonX + backButtonWidth &&
           y >= backButtonY &&
           y <= backButtonY + backButtonHeight;
  }
}
