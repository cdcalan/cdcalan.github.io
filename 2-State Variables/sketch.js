// State Variables Assignment:
// Alina Sami
// March 12, 2019
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

////////////////////////////use time minis(), use screen sliding, use a rotating object. 
///////////////////////////let name = prompt("what's you name?"); --> stops the rest of your program so use it in setup. 
///////////////////////////////'https://cs30.wmcicompsci.ca/oop/overview.html



//State variable for calling menu screen or other program:
let state;

//State variable for paint-program: stores available colors.  
let colorState;

//Sets font size:
let fontSize = 30;

//Menu outline and menu-buttons variables:
let menuHeight = 600;

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


let buttonX;
//let buttonWidth = 150;
//let buttonHeight = 50;


//Menu-button names:
let menuButtonNames = ["Button 1", "Paint", "Button 3", "Button 4", "Button 5", "Button 6", "Button 7"];



//Class for Menu buttons (so that they display different names and each can be clicked).
class Buttons {
  constructor () {
    this.buttonWidth = 150;
    this.buttonHeight = 50;
  }
}

//each time you want to use the this.button.. varaiule frm a class globally in a diff function, you have to set a new variable that houses that class
//and call it as the name of that new variable + . + button.... (without the this you used in th eclass)
let myButton = new Buttons();
myButton.buttonWidth


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


//Menu screen:
function displayMenu() {
  //Menu Outline:
  rectMode(CENTER);
  fill(150, 200, 200);
  rect(width/2, height/2, 300, menuHeight);

  //Menu Buttons:
  let counter = 0;

  fill(255);
  for (let i=150; i<=menuHeight ; i+= 75) {
    rect(buttonX, i, myButton.buttonWidth, myButton.buttonHeight);
    fill(100); //Sets color to gray for button text.
    
    //Print the correct button name from the list of button names to each button.
    text(menuButtonNames[counter], width/2 - myButton.buttonWidth/3, i + 10);
    counter = counter + 1;
    fill(255); //Sets color back to white for the rest of the buttons. 
  }
}


//Paint program screen:
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

  //Mouse:
  fill(230, 150, 10, 100);
  ellipse(mouseX, mouseY, 25);
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



function clickedOnButton(x, y) {
  if (state === "menu"){
    return x >= buttonX - myButton.buttonWidth/2 &&
           x <= buttonX + myButton.buttonWidth/2 &&
           y >= 225 - myButton.buttonHeight/2 &&
           y <= 225 + myButton.buttonHeight/2;
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
