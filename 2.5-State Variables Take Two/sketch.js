// State Variables Assignment: Clickable Menu with different programs. 
// Alina Sami
// March 12, 2019
//
// State Variable Feature:
//      I utilize the state variable: 'state' in creating the menu part of my program. If state = "menu", the 
// screen will diplay the menu. If state = "paint" (when the paint-option button is clicked), the screen 
// will display the paint program. If state = "scroll" (when the scroll-option button is clicked), the 
// screen will display the scroll-screen program. 
//      For this project, I mainly focused on creating a clickable menu with state variables and classes. 
// That's why, so far, each menu button leads to a very simple program happening. This is just the initial, 
// Menu part of a potential future project in which, each of the three button programs/ games could be further 
// developed.
//   
// Extra for Experts: describe what you did to take this project "above and beyond".
//    1) I utilized classes to create my menu buttons (not taught in class yet), thereby making my code much 
//       more conceise in checking for button clicks. Although the Buttons class served as the basic 
//       template for all buttons, I also found a way to give each button its own name, and y-position. 
//    2) I also experimented with translate / rotate in my Scroll Screen Program (called by button 2 click). 
//////////////////////////////////////////////////////////////////////////////////////////////////////////


// State variable for switching between menu screen, button 1, button 2, and button 3.
let state;

// Sets meny height for creating menu outline:
let menuHeight = 400;

// Sets font size:
let fontSize = 30;

// Variable for a copy of the Avatar class used in button 3's program: //////////////////////////////////////////////////// shoudl i declare button1, button2 etc variables here too? or delete them compeltely?
let person;
let avatarImage;

// Stores background image for button 2's scrolling-program:
let scrollImage;

// X-xoordinates of scrolling-background-images: 
let imageX1 = 0;
let imageX2;

let scrollSpeed = 1.5;

// Variables for storing userInput, creating imput button, and displaying input instructions on canvas:
let input, button, greeting;

let circleNumber;



// Preloads the background image for scrolling program:
function preload() {
  scrollImage = loadImage("assets/bg.png");
  avatarImage = loadImage("assets/avatarImage.jpg")
}



// Class for the avatar used in button 2's program:
class Person {
  constructor(y) {
    // Assigns position values to avatar:
    this.position = createVector(100, y);
    this.width = 100;
    this.height = 300;

    // Gives avatar a velocity:
    this.velocity = createVector(1, 0);
  }

  // Makes avatar move horizontally:
  move() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
  }

  // Displays the rectangular avatar:
  show() {
    fill(200, 70, 80);
    rect(this.position.x, this.position.y, this.width, this.height);
    ///////////////////////image(avatarImage, this.position.x, this.position.y, this.width, this.height);
  }
}



// Class for menu button template:
class Buttons {
  constructor (buttonX, buttonY, someName) {
    // Assigns position values to menu buttons:
    this.buttonX = buttonX;
    this.buttonY = buttonY;
    this.buttonWidth = 150;
    this.buttonHeight = 50;

    // Assigns individual names to be displayed on menu buttons:
    this.buttonName = someName;
  }

  // Displays menu buttons:
  show() {
    fill(255);
    rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);

    // Sets color to gray for button text, and prints the assigned button name.
    fill(100); 
    text(this.buttonName, this.buttonX - this.buttonWidth/2, this.buttonY + 10);
  }

  // Checks if the mouse is within the menu button boundries when the menu is displayed [for mousePressed()]. 
  clickedOnButton(x, y) {
    if (state === "menu") {
      return (x >= this.buttonX - this.buttonWidth/2 &&
              x <= this.buttonX + this.buttonWidth/2) &&
             (y >= this.buttonY  - this.buttonHeight/2 &&
              y <= this.buttonY + this.buttonHeight/2);
    }
  }
}




function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textSize(fontSize);

  // Start screen will always open in the menu state, triggering the menu screen:
  state = "menu";

  // Makes 3 menu buttons:
  button1 = new Buttons(windowWidth/2, 200, "Program 1");
  button2 = new Buttons(windowWidth/2, 300, "Program 2");
  button3 = new Buttons(windowWidth/2, 400, "Program 3");

  // Makes the avatar used in button 2's program. 
  person = new Person(windowHeight);

  // Sets the x-pos. of an identical background-image at the end of the first one, to create the scrolling background for button 2' program. 
  imageX2 = windowWidth;

  ///////////////////////////////////////////////////////////////////////////
  // Creates and positions a user-input area on screen:
  input = createInput();
  input.position(20, 65);

  // Creates a button for submitting user input:
  button = createButton('submit');
  button.position(input.x + input.width, 65);
  // If mouse is pressed on the input-button, triggers the greet() function:
  button.mousePressed(greet);

  // Displays instructions for user input on screen, by placing text in an h2 heading element:
  greeting = createElement('h2', 'Enter any positive integer:');
  greeting.position(20, 5);
}




function draw() {

  // Implementation of state variable in Menu to call different screens:
  if (state === "menu") {
    // Displays menu screen:
    displayMenu();
  }

  // Displays strobing circles screen when state is in program 1 (when button 1 clicked):
  else if (state === "program 1") {
    displayScreen1();
  }

  // Displays scrolling city screen when state is in program 2 (when button 2 clicked):
  else if (state === "program 2") {
    displayScreen2();
  }

  // Displays scrolling background screen when state is in program 3 (when button 3 clicked):
  else if (state === "program 3") {
    displayScreen3();
  }
}




// Program 2 Screen (scrolling city):
function displayScreen2() {

  // Creates two identical copies of the preloaded background image, and positions them side by side. 
  image(scrollImage, imageX1, 0, windowWidth, windowHeight);
  image(scrollImage, imageX2, 0, windowWidth, windowHeight);

  // Moves the x-pos. of each background image to the left of the canvas to 'scroll backwards'. 
  imageX1 -= scrollSpeed;
  imageX2 -= scrollSpeed;
  
  // Continously loops the two images together, side by side as they move out of the frame to create a scrolling effect. 
  if (imageX1 < -windowWidth){
    imageX1 = windowWidth;
  }
  if (imageX2 < -windowWidth){
    imageX2 = windowWidth;
  }
}




// Program 3 Screen (scrolling background):
function displayScreen3() {
  background(0);

  // Translates canvas left by the avatar's x-position, giving the effect of a 'scrolling' background as the avatar 'moves forward'.
  translate(-person.position.x, 0);
  
  fill(51);
  for (let i = 600; i < 1200; i += 300) {
    rect(i, windowHeight, 50, 200);
  }

  rect(675, windowHeight, 100, 650);

  // Creates a translated and constantly rotating windmill (triangluar shape). 
  push();
  translate(width * 0.5, height * 0.5);
  rotate(frameCount / 100.0);
  fill(150, 0, 200);
  triangle(0, 0, 30, 30, 90, 10);
  pop();

  
  // Displays and moves the rectangular avatar.
  person.move();
  person.show();
}



// Menu Screen:
function displayMenu() {
  background(200, 120, 100);
  
  // Menu Outline:
  rectMode(CENTER);
  fill(150, 200, 200);
  rect(width/2, height/2, 300, menuHeight);

  // Shows each of the 3 buttons:
  button1.show();
  button2.show();
  button3.show();
}



// Program 1 Screen (strobing circles):
function displayScreen1() {
  background(255);

  for (let i = 0; i < circleNumber; i++) {
    fill(100, 100, 200);
    ellipse(random(windowWidth), random(windowHeight), 50);
  }


  // Mouse Cursor:
  fill(230, 150, 10, 100);
  ellipse(mouseX, mouseY, 25);
}



// Changes the user-instruction displayed on screen, when user-input button is clicked to submit input.
function greet() {
  greeting.html('hello !');

  // Sets the user-given number from input to the number of circles to be made for Program 1 (strobing circles).
  circleNumber = input.value();

}





// Checks if menu buttons are clicked, and switches the state variable accordingly to which button is clicked.
function mousePressed () {
  if (state === "menu") {

    // If button 1 clicked, initiate Program 1.
    if (button1.clickedOnButton(mouseX, mouseY)) {;
      state = "program 1";
    }

    // If button 2 clicked, initiate Program 2.
    if (button2.clickedOnButton(mouseX, mouseY)) {;
      state = "program 2";
    }

    // If button 3 clicked, initiate Program 3.
    if (button3.clickedOnButton(mouseX, mouseY)) {;
      state = "program 3";
    }
  }
}