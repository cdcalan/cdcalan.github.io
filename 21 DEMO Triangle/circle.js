// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


// CODING JS PRACTICE COUNT 7:
// function count7(n){
//   let right = n % 10;
//   let rest = Math.floor(n/10);
//   if (n === 0) {
//     return 0;
//   }
//   else {
//     if (right === 7) {
//       return 1 + count7(rest);
//     }
//     return count7(rest);
//   }
// }



let circlePoints = [    //square brackets means creating an array
  {x: 400, y:350}, 
  {x: 100, y: 600}
];

let degree = 5;
let depth = 0;



function setup() {
  createCanvas(800, 700);
}



function draw() {
  background(220);
  sierpinski(circlePoints, depth);
}



function mouseClicked() {
  depth++;
}



function sierpinski(points, degree) {
  let theColors = ["red", "purple", "green", "orange", "pink", "yellow", "black"];
  fill(theColors[degree]);
  noStroke();
  
  triangle(points[0].x, points[0].y, 
           points[1].x, points[1].y, 
           points[2].x, points[2].y); 

  if (degree > 0) {
    sierpinski([points[0], 
               getMidpoint(points[0], points[1]),
               getMidpoint(points[0], points[2])],
               degree-1);

    sierpinski([points[1], 
               getMidpoint(points[0], points[1]),
               getMidpoint(points[1], points[2])],
               degree-1);

    sierpinski([points[2], 
               getMidpoint(points[0], points[2]),
               getMidpoint(points[1], points[2])],
               degree-1);

  }
}



function getMidpoint(point1, point2) {
  let xDiff = point1.x + point2.x;
  let yDiff = point1.y + point2.y;
  let theMidpoint = {              //json stuff
    x: yDiff/2,
    y: yDiff/2
  };
  return theMidpoint;
}
