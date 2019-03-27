// Project Title: Perlin Noise Demo
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let x;
let time;
let rectWidth;
let myRectangle;
let numberOfRects = 10;
let rects = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  time = 0;
  rectWidth = 50;
  generateInitialTerrain();
}

function draw() {
  background(220);

  time += 0.01;
  x = noise(time)*width;

  fill(0);
  rect(myRectangle.x, myRectangle.y, myRectangle.width, myRectangle.height);
}

function generateInitialTerrain() {
  let rectHeight = noise(time)* height;
  myRectangle = {
    height: rectWidth, 
    width: rectWidth, 
    x: 0, 
    y: height - rectHeight,
  };
  rects.push(myRectangle);
  time += 0.01;
}