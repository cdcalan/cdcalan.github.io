// State Variables Assignment:
// Alina Sami
// March 12, 2019
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let fontSize = 30;
let menuHeight = 600;
let buttonWidth = 150;
let buttonHeight = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textSize(fontSize);
}

function draw() {
  background(220);

  //Display menu:
  displayMenu();

}

function displayMenu() {
  //Menu Outline:
  rectMode(CENTER);
  fill(150, 200, 300);
  rect(width/2, height/2, 200, menuHeight);

  //Menu Buttons:
  fill(255);
  for (let i=150; i<=menuHeight ; i+= 75) {
    rect(width/2, i, buttonWidth, buttonHeight);
    fill(100);
    text("Button 1", width/2 - buttonWidth/3, i + 10);
  }


}
