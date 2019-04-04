// Refactor the following code
// - in other words, keep the same functionality, but improve the method used

let cellSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  strokeWeight(5);
  cellSize = pickCellSize(); 
}

function draw() {
  for (let i=0; i<15; i++){
    for (let j=0; j<8; j++){
      stroke(255);
      point(i*cellSize, j*cellSize); 
    }
  }
}



function pickCellSize() {
  if (width > height) {
    return height/8;
  }
  else {
    return width/8;
  }
}
