// Interactive Scene
// Alina Sami
// February 14, 2019
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let cnv;
let buttonColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  buttonColor = 10;
} 

function draw() {
  background(200, 100, 100);
  //Black Banner:
  fill(0);
  rect(0, 0, windowWidth, 100);
  setButtonColor();
  //Button:
  fill (buttonColor);
  rect(windowWidth/3, windowHeight/4, 100, 100); 
  //Mouse Curser:
  fill(220, 200, 200, 50);
  ellipse(mouseX, mouseY, 50, 50);

}

function setButtonColor() {
  buttonColor = 255;
}
