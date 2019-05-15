// Circle Recursion
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  drawCircle(width/2, width/2);
}

function drawCircle(x, radius) {
  let theColor = map(radius, 50, width/2, 50, 255);
  fill(theColor);
  ellipse(x, height/2, radius*2, radius*2);

  if (radius > 50) {
    drawCircle(x - radius/2, radius/2);
  }
  if (radius > 50) {
    drawCircle(x + radius/2, radius/2);
  }

}
