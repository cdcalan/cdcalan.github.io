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




//https://p5js.org/examples/objects-array-of-objects.html


// An array of buttons
let buttons = [];

function setup() {
  createCanvas(600, 200);
  // A loop to evenly space out the buttons along the window
  //create buttons:
  for (let i = 0; i < buttons.length; i++) {
    buttons.push(new Jitter());
  }
}

function draw() {
  background(175);
  // Show all the buttons
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].display();
  }
}


//Button class:
class buttons {
  display() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}


function mousePressed() {
  // When the mouse is pressed, we must check every single button
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].click(mouseX, mouseY);
  }
}