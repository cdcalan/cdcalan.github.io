// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//create sliders
//creat screen sliding windows
//make paint files be able to save on computer.
//make buttons change color when hoered over
//create a mini map - move around the screen
//flappybird style game with jumping, etc. 
//uylitpmate trafic light simulator
//curser changes based on what it is hovering over.



// Traffic Light Starter Code
// Dan Schellenberg
// Sept 25, 2018

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/

let state;
let greenLightDuration;
let yellowLightDuration;
let redLightDuration;
let timeOfLastLightSwitch;

function setup() {
  createCanvas(600, 600);
  state = 1;
  greenLightDuration = 5000;
  yellowLightDuration = 1500;
  redLightDuration = 3000;
  timeOfLastLightSwitch = 0;
}

function draw() {
  background(255);
  drawOutlineOfLights();
  checkState();
  displayTheCorrectLight();
}