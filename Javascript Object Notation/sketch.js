// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



let ball;
//repolace the below variables with the above, and just declare them in object notation in setup. 
 // let x, y;
 // let dx, dy;
  //let radius;

  //javascript object notation: j-sign:
function setup() {
  createCanvas(windowWidth, windowHeight);
  ball = {
    x: width/2,
    y: height/2,
    dx: random(3, 10),
    dy: random(3, 10),
    radius: 25,
  };
  
}

function draw() {
  background(0);
  moveBall();
  bounceBall();
  displayBall();
}

function moveBall() {
  // move the ball
  ball.x += ball.dx;
  ball.y += ball.dy;
}

function bounceBall() {
  // check for bounce
  if (ball.x + ball.radius >= width || ball.x - ball.radius <= 0) {
    ball.dx = -1 * ball.dx;
  }
  if (ball.y + ball.radius >= height || ball.y - ball.radius <= 0) {
    ball.dy = -1 * ball.dy;
  }
}

function displayBall() {
  // display the ball
  ellipse(ball.x, ball.y, ball.radius*2, ball.radius*2);
}