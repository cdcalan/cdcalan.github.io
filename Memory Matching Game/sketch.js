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
// deal with all the movements nad ocllisions before the display in the draw loop when making a class. 


// the variable name for tile templates;
let gameTiles = [];

// Empty array stores all the tiles used in the game. 
////let tilesList = [];

// Template tile: 
class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 75;
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
  console.log(windowWidth/5);
  for (let i = 0; i < 25; i++) {
    for (let d = windowWidth/5; d < windowWidth; d += 10) {
      let someTile = new Tile(d, d);
      gameTiles.push(someTile);
    }
  }
}

function draw() {
  background(220);

  for (let i = 0; i < gameTiles.length; i++) {
    gameTiles[i].show();
  }
}
