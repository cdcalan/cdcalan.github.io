// State Variables Assignment: Menu with Paint Program 
// Alina Sami
// March 12, 2019
//
// State Variable Feature:
// I utilize the state variable: 'state' in creating the menu part of my program. If state = "menu", the 
// screen will diplay the menu. If state = "paint" (when the paint-button is clicked), the screen will 
// display the paint program.
// 
// Extra for Experts: describe what you did to take this project "above and beyond".
// - I experimented with translate / rotate in my program. 

////////////////////////////use time minis(), use screen sliding, use a rotating object. 
///////////////////////////let name = prompt("what's you name?"); --> stops the rest of your program so use it in setup. 
///////////////////////////////'https://cs30.wmcicompsci.ca/oop/overview.html
//
//
//
//
//***********************************************************************************
//create sliders
//creat screen sliding windows
//make paint files be able to save on computer.
//make buttons change color when hovered over
//create a mini map - move around the screen
//flappybird style game with jumping, etc. 
//uylitpmate trafic light simulator
//curser changes based on what it is hovering over.

//an object is just a container of properties and etc.
//https://p5js.org/examples/objects-array-of-objects.html
//***********************************************************************************



//Declare buttons:
let buttons1;
let buttons2;
let buttons3;

//State variable for calling menu screen or other program:
let state;

//State variable for paint-program: stores available colors.  
let colorState;

//Sets font size:
let fontSize = 30;

//Menu outline variable:
let menuHeight = 550;

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

//Menu button variables:
let buttonX;

//Menu-button names:
let menuButtonNames = ["Button 1", "Paint", "Button 3", "Button 4", "Button 5", "Button 6"];




function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textSize(fontSize);


  //initialize buttons varaibles:
  buttons1 = new Buttons();
  buttons2 = new Buttons();
  buttons3 = new Buttons();


  //Start screen will always open with menu:
  state = "menu";

  //Assigns values to Paint banner variables:
  bannerW = windowWidth;
  bannerH = windowHeight/5;

  //Sets initial color in Paint to black:
  colorState = 0;

  print("window width and height: " + windowWidth, windowHeight);
  print("backButton: " + backButtonX, backButtonY, backButtonWidth, backButtonHeight);
  print("test 1: " + backButtonX, backButtonY, backButtonWidth, backButtonHeight);
}




//Class for Menu buttons (so that they display different names and each can be clicked).
class Buttons {
  constructor () {
    //Assigns values to menu button variables:
    this.buttonX = buttonX;
    console.log("now " + this.buttonX)
    this.buttonWidth = 150;
    this.buttonHeight = 50;
  }
  show(i) {
    fill(255);
    rect(this.buttonX, i, this.buttonWidth, this.buttonHeight);
  }
}


let myButton = new Buttons();



function draw() {
  background(200, 120, 100);
  //ballIsHere();        //FAKE

  let backButtonX = windowWidth - (backButtonWidth+40);
  let backButtonY = windowHeight - backButtonHeight;

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

  for (let i=150; i<=menuHeight ; i+= 75) {
    buttons[i] = new Buttons();

    //...rect(buttonX, i, myButton.buttonWidth, myButton.buttonHeight);
    fill(100); //Sets color to gray for button text.
    
    //Print the correct button name from the list of button names to each button.
    text(menuButtonNames[counter], width/2 - myButton.buttonWidth/3, i + 10);
    counter = counter + 1;
    fill(255); //Sets color back to white for the rest of the buttons. 
  }
}


//Paint program screen:
function displayPaintScreen() {
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
  //rect(windowWidth - (backButtonWidth+50), windowHeight - (backButtonHeight+50), backButtonWidth, backButtonHeight);
  rect(backButtonX + 10, backButtonY + 10, backButtonWidth, backButtonHeight);
  //print("new: " + backButtonX, backButtonY, backButtonWidth, backButtonHeight);
  //////////////////!!!!!!!!!// the first two above are undefined. 
  //////
  //////
  ///////
  ///////
  ///////
  fill(0);
  textSize(30);
  text("Back to Menu", backButtonX, backButtonY);

  //Paint-Program Mouse Cursor:
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
  if (state === "paint") {
    if (clickedOnBackButton(mouseX, mouseY)) {
      print(state);
      state = "menu";
    }  
    if (clickedOnColor(mouseX, mouseY)) {
      colorState = 255;
      print("no"+state);
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
    return x >= myButton.buttonX - myButton.buttonWidth/2 &&
           x <= myButton.buttonX + myButton.buttonWidth/2 &&
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