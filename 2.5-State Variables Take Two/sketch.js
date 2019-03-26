// State Variables Assignment: Menu with Paint Program 
// Alina Sami
// March 12, 2019
//
// State Variable Feature:
// I utilize the state variable: 'state' in creating the menu part of my program. If state = "menu", the 
// screen will diplay the menu. If state = "paint" (when the paint-option button is clicked), the screen 
// will display the paint program.
// 
// Extra for Experts: describe what you did to take this project "above and beyond".
//    1) I utilized classes to create my menu buttons, thereby making my code much more conceise in checking
//       for button-clicks. Although the Buttons class served as the basic template for all buttons, I also 
//       found a way to give each button its own name, and y-position. 
//    2) I also experimented with translate / rotate in my program. 
//////////////////////////////////////////////////////////////////////////////////////////////////////////


//State variable for calling menu screen or other program:
let state;

//Sets font size:
let fontSize = 30;

//Menu outline variable:
let menuHeight = 400;

let button1 = [];

let someName = "";




function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textSize(fontSize);

  //Start screen will always open with menu:
  state = "menu";

  //Make 3 buttons:
  for (let numberOfButtons = 2; numberOfButtons < 5; numberOfButtons++) {
    if (numberOfButtons === 2) {
      someName = "Button 1";
    }
    if (numberOfButtons === 3) {
      someName = "Button 2";
    }
    if (numberOfButtons === 4) {
      someName = "Button 3";
    }
    button1[numberOfButtons] = new Buttons(windowWidth/2, numberOfButtons*100, someName);
  }
}




//Class for Menu buttons (so that they display different names and each can be clicked).
class Buttons {
  constructor (buttonX, buttonY, someName) {
    //Assigns values to menu button variables:
    this.buttonX = buttonX;
    this.buttonY = buttonY;

    console.log("buttonX in the class is " + this.buttonX)              /////TESTER
    console.log("buttonY in the class is " + this.buttonY)              /////TESTER

    this.buttonWidth = 150;
    this.buttonHeight = 50;

    this.buttonName = someName;
  }

  show() {
    fill(255);
    rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);

    fill(100); //Sets color to gray for button text, and prints the correct button name from the list of button names.
    text(this.buttonName, this.buttonX - this.buttonWidth/3, this.buttonY + 10);
  }
}



function draw() {
  background(200, 120, 100);

  //Using state variables in menu to call different screens:
  if (state === "menu") {
    //Display menu:
    displayMenu();
  }
  else if (state === "paint") {
    //Display paint screen:
    displayPaintScreen();
  }
  else if (state === "none") {
    //Display alternative screen:
    displayNoneScreen();
  }
}




function displayNoneScreen() {
  backgorund(0);
}




//Menu screen:
function displayMenu() {
  //Menu Outline:
  rectMode(CENTER);
  fill(150, 200, 200);
  rect(width/2, height/2, 300, menuHeight);

  //Show each of the 3 buttons:
  for (let numberOfButtons = 2; numberOfButtons < 5; numberOfButtons++) {
    button1[numberOfButtons].show();
  }
}




//Paint program screen:
function displayPaintScreen() {
  background(255);

  //Create banner outline:
  fill(150, 150, 150);
  rect(0, 0, width, 200);


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
    console.log(state, button1[2].buttonY, button1[3].buttonY);
  }
}


/////////////////fix the fact that the x cack does not work with the other two:
function clickedOnButton(x, y) {
  if (state === "menu") {
    for (let numberOfButtons = 2; numberOfButtons < 5; numberOfButtons++) {
      return x >= button1[numberOfButtons].buttonX - button1[numberOfButtons].buttonWidth/2 &&
            x <= button1[numberOfButtons].buttonX + button1[numberOfButtons].buttonWidth/2 &&

            y >= button1[2].buttonY  - button1[2].buttonHeight/2 &&
            y <= button1[2].buttonY + button1[2].buttonHeight/2 ||

            y >= button1[3].buttonY  - button1[3].buttonHeight/2 &&
            y <= button1[3].buttonY + button1[3].buttonHeight/2 ||

            y >= button1[4].buttonY  - button1[4].buttonHeight/2 &&
            y <= button1[4].buttonY + button1[4].buttonHeight/2;
    }
  }
}