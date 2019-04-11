// Project Title: Memory-Matching Game
// Alina Sami
// Wednesday, April 10, 2019
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
// - learned how to make rounded rectangule shapes. 
// ------------lerpcolor(), blendColor();
// - NEED TO USE:
//      - playSound();
//      - millis();



// the variable name for tile templates;
let gameTile;
// Empty array stores all the tiles used in the game. 
let tilesList = [];
// Template tile: 
class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 30;
    this.image = false;            // figure out
    this.isFaceUp = false;         // to do
  }

  show() {
    fill(200, 100, 150);
    rect(this.x, this.y, this.width, this.height, 10);
  }

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gameTile = new Tile(150, 150);
}

function draw() {
  background(220);
  gameTile.show();
}

// function theGrid() {
  //for (let y = 0; y <) {
    //for (let x = 0; x <) {

    //}
  //}
//}
