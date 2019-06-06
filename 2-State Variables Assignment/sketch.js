// State Variables Assignment: Clickable Menu with different programs. 
// Alina Sami
// March 12, 2019
//
//      For this project, I mainly focused on creating a clickable menu with state variables and classes. 
// That's why, so far, each menu button leads to a simple program happening. This is just the initial, 
// Menu part of a potential future project in which, each of the three button programs/ games could be further 
// developed.
//
// STATE VARIABLE FEATURE:
//      I utilize the state variable: 'state' in creating the menu part of my program. If state = "menu", the 
// screen will diplay the menu. If state = "program 1" (when button 1 is clicked), the screen will display 
// a screen with animated 'worm' (trail of circles). If state = "program 2" (when button 2 clicked), the 
// screen will display a scrolling city scene. If state = "program 3" (when button 3 clicked), the screen will
// display the scrolling background program. 
//
//      Entering a value in the user-input section results in a 'strobing circles' effect that can occur
// on any of the 4 different screens in this program. Increasing the input value increases the number of 
// circles visible on screen. You can change the number while the program is running, and the program will 
// automatically change the number of circles running. Upon submitting a value, on-screen instruction will
// change to notify you to submit an input of 0 tp clear circles. 
//
// EXTRA FOR EXPERTS: describe what you did to take this project "above and beyond".
//    1) I utilized classes to create my menu buttons (not taught in class yet), thereby making my code much 
//       more conceise in creating buttons and checking for clicks. Although the Buttons class served as the basic 
//       template for all buttons, each button has its own name, and y-position. 
//    2) I also experimented with translate / rotate with 'animating' the spinning windmill in program 3, as well as \
//       used translate() to create the illusion of a scrolling bacground in program 3.  
//    3) I also used arrays in Worm class.
//    4) Used createElement() to display text on screen by placing the text into an h2 heading element. 
//////////////////////////////////////////////////////////////////////////////////////////////////////////


// State variable for switching between menu screen, button 1, button 2, and button 3.
let state;

// Sets meny height for creating menu outline:
let menuHeight = 400;

// Sets font size:
let fontSize = 30;

// Variables for storing userInput, creating input button, and displaying input instructions on canvas:
let input, inputButton, inputInstruction;

// Stores the number of circles to create for circle strobing:
let circleNumber;

// Stores background image for Program 2's scrolling-city screen:
let scrollImage;

// Variable for the Worm shape class used in Program 1:
let worm;

// X-xoordinates of scrolling-city-images (program 2): 
let imageX1 = 0;
let imageX2;

// Speed for scrolling-city image (program 2):
let scrollSpeed = 1.5;

// Variable for a copy of the Avatar class used in Program 3: 
let person;

// Variable for copies of the button class used in menu:
let button1, button2, button3;




// Class for the 'worm' shape used in Program 1:
class Worm {
  constructor(x, y) {
    // Position values for individual circles:
    this.x = x;
    this.y = y;
    this.radius = 50;

    // Stores past position coordinates in an array: 
    this.positionHistory = [];
  }

  // Moves the worm shape:
  animate() {
    this.x += random(-5, 5);
    this.y += random(-5, 5);

    // Adds the present position to positionHistory array as an (x,y) coordinate pair:
    let v = createVector(this.x, this.y);
    this.positionHistory.push(v);

    // Limits the amount of circle-components displayed at any given time to 20 circles.  
    if (this.positionHistory.length > 20) {
      this.positionHistory.splice(0, 1);
    }
  }

  // Displays the 'worm' shape:
  show() {
    // Initial circle:
    stroke(0);
    fill(0, 200);
    ellipse(this.x, this.y, this.radius);

    // Trail of past circles:
    for (let i = 0; i < this.positionHistory.length; i++) {
      let position = this.positionHistory[i];
      fill(random(255));
      ellipse(position.x, position.y, this.radius);
    }
    noStroke();
  }
}




// Class for the avatar used in Program 2:
class Avatar {
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

    // Prints the assigned button name in gray.
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




// Preloads the background image for program 2:
function preload() {
  scrollImage = loadImage("assets/bg.png");
}




function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textSize(fontSize);

  // Start screen will always open in the menu state, triggering the menu screen:
  state = "menu";

  // Makes 3 menu buttons:
  button1 = new Buttons(windowWidth/2, 250, "Program 1");
  button2 = new Buttons(windowWidth/2, 350, "Program 2");
  button3 = new Buttons(windowWidth/2, 450, "Program 3");

  // Makes the animated 'worm' shape used in Program 1:
  worm = new Worm(500, 500);

  // Makes the avatar used in Program 2. 
  person = new Avatar(windowHeight);

  // Sets the x-pos. of an identical background-image at the end of the first one, to create the scrolling background for Program 2. 
  imageX2 = windowWidth;

  // Creates and positions a user-input area on screen:
  input = createInput();
  input.position(20, 65);

  // Creates a button for submitting user input:
  inputButton = createButton("Submit");
  inputButton.position(input.x + input.width, 65);

  // If mouse is pressed on the input-button, triggers the newInstruction() function:
  inputButton.mousePressed(newInstruction);

  // Displays instructions for user input on screen, by placing text in an h2 heading element:
  inputInstruction = createElement("h2", "Enter any positive integer for a cool effect:");
  inputInstruction.position(20, 5);
}




function draw() {

  // Implementation of state variable in Menu to call different screens:
  if (state === "menu") {
    // Displays menu screen:
    displayMenu();
    generateStrobeCircles();    // Allows strobing-circle effect to occur with user input. 
  }

  // Displays animated 'worm' shape when state is in program 1 (when button 1 clicked):
  else if (state === "program 1") {
    displayScreen1();
    generateStrobeCircles();
  }

  // Displays scrolling city screen when state is in program 2 (when button 2 clicked):
  else if (state === "program 2") {
    displayScreen2();
    generateStrobeCircles();
  }

  // Displays scrolling background screen when state is in program 3 (when button 3 clicked):
  else if (state === "program 3") {
    displayScreen3();
    generateStrobeCircles();
  }
}




function generateStrobeCircles() {
  // Create as many identical ellipses as number given by user-input (circleNumber):
  for (let i = 0; i < circleNumber; i++) {
    fill(100, 100, 200);
    ellipse(random(windowWidth), random(windowHeight), 50);
  }
}




function newInstruction() {
  // Changes the user-instruction displayed on screen, when submit input button is clicked.
  inputInstruction.html("Thankyou! Submit 0 to clear circles!");

  // Sets the user-given number from input to the amount of circles to be made for 'strobing circles'.
  circleNumber = input.value();

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




// Program 1 Screen (animated 'worm'):
function displayScreen1() {
  background(255, 191, 50);

  // Displays and animates the worm shape:
  worm.animate();
  worm.show();

  // Creates special Mouse Cursor:
  fill(230, 150, 10, 100);
  ellipse(mouseX, mouseY, 25);
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
  background(233, 214, 107);

  // Translates canvas left by the avatar's x-position, giving the effect of a 'scrolling' background as the avatar 'moves forward'.
  translate(-person.position.x, 0);
  
  // Draws building obstacles that move with the background:
  fill(51);
  for (let i = 200; i < windowWidth; i += 100) {
    rect(i, windowHeight, 50, 200);
  }

  // Creates a translated and constantly rotating windmill obstacle (triangluar shape). 
  push();
  translate(width * 0.5, height * 0.5);
  rotate(frameCount / 100.0);
  fill(150, 0, 200);
  triangle(0, 0, 30, 30, 70, 7);
  pop();

  // Displays and moves the rectangular avatar.
  person.move();
  person.show();
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