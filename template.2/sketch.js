// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


//basic example

function setup() {
  createCanvas(windowWidth, windowHeight);
}

//Return an object containing the x,y position of the bottom intersection of the rect using the optional calcIntersection boolean.
var hit = false;
function draw() {
	background(255);
	rect(200,300,100,150);
	line(mouseX,mouseY,350,50);

	hit = collideLineRect(mouseX,mouseY,350,50,200,300,100,150,true);

  //retruned object contains top,right,bottom,left objects which each contain x,y values.
  print("bottomX: " + hit.bottom.x);
  print("bottomY: " + hit.bottom.y);
  print("topX: " + hit.top.x);
  print("topY: " + hit.top.y);
  print("leftX: " + hit.left.x);
  print("leftY: " + hit.left.y);
  print("rightX: " + hit.right.x);
  print("rightY: " + hit.right.y);
}