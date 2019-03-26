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


//State variable for calling menu screen or other program:
let state;

//Sets font size:
let fontSize = 30;

//Menu outline variable:
let menuHeight = 550;

//Menu-button names:
/////let menuButtonNames = ["Button 1", "Paint", "Button 3", "Button 4", "Button 5", "Button 6"];

let button1 = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textSize(fontSize);

  //Start screen will always open with menu:
  state = "menu";

  let someName = "";

  //Make 3 buttons:
  for (let numberOfButtons = 1; numberOfButtons < 4; numberOfButtons++) {
    if (numberOfButtons === 1) {
      someName = "Button 1";
    }
    if (numberOfButtons === 2) {
      someName = "Button 2";
    }
    if (numberOfButtons === 3) {
      someName = "Button 3";
    }
    button1[numberOfButtons] = new Buttons(windowWidth/2, numberOfButtons*90, someName);
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
}


//Menu screen:
function displayMenu() {
  //Menu Outline:
  rectMode(CENTER);
  fill(150, 200, 200);
  rect(width/2, height/2, 300, menuHeight);

  //Show each of the 3 buttons:
  for (let numberOfButtons = 1; numberOfButtons < 4; numberOfButtons++) {
    button1[numberOfButtons].show();
  }

  //Menu Buttons:
  ////let counter = 0;

    //...rect(buttonX, i, myButton.buttonWidth, myButton.buttonHeight);
    /////fill(100); //Sets color to gray for button text.
    
    //Print the correct button name from the list of button names to each button.
    /////text(menuButtonNames[counter], width/2 - button1.buttonWidth/3, i + 10);
    ////counter = counter + 1;
    ////fill(255); //Sets color back to white for the rest of the buttons. 
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
  }
}

//for (let i=150; i<=menuHeight ; i+= 75) {
  //buttons[i] = new Buttons();

function clickedOnButton(x, y) {
  if (state === "menu") {
    for (let numberOfButtons = 1; numberOfButtons < 4; numberOfButtons++) {
      return x >= button1[numberOfButtons].buttonX - button1[numberOfButtons].buttonWidth/2 &&
            x <= button1[numberOfButtons].buttonX + button1[numberOfButtons].buttonWidth/2 &&

            y >= button1[1].buttonY  - button1[1].buttonHeight/2 &&
            y <= button1[1].buttonY + button1[1].buttonHeight/2 ||

            y >= button1[2].buttonY  - button1[2].buttonHeight/2 &&
            y <= button1[2].buttonY + button1[2].buttonHeight/2 ||

            y >= button1[3].buttonY  - button1[3].buttonHeight/2 &&
            y <= button1[3].buttonY + button1[3].buttonHeight/2;
    }
  }
}