
class Cell {
  constructor (i, j, w) {
    this.i = i;
    this.j = j;
    this.x = i*w;
    this.y = j*w;
    this.w = w;

    this.numberOfTreasures;

    this.turtle = false;
    this.coins = false;
    this.stone = false;

    let guess = random(0, 4);
    if (guess < 1) {
      this.turtle = true;
    }
    if (guess > 1 && guess < 2) {
      this.coins = true;
    }
    if (guess > 2) {
      this.stone = true;
    }

    this.visible = false; ///////////////////////////turn back to false soon!
  }

  show() {
    if (this.visible) {       // If visible i.e., if user clicks on cell and . . .
      if (this.coins) {    // if there are coins instead, show coins.
        fill(17, 56, 94);
        rect(this.x, this.y, this.w, this.w);
        image(coin, this.x, this.y, this.w, this.w);
      }
      else { 
        if (this.turtle) {      // if there is a turtle, show the turtle.
          fill(17, 56, 94);
          rect(this.x, this.y, this.w, this.w);
          image(turtle, this.x, this.y, this.w, this.w);
        }
        if (this.stone) {       // if there is stone instead, show stone.
          fill(127);
          rect(this.x, this.y, this.w, this.w);
          image(rock, this.x, this.y, this.w, this.w);
        }

        if (this.numberOfTreasures > 0) {
          if (!this.turtle) {
            textSize(this.w);
            fill(255, 194, 50);
            text(this.numberOfTreasures, this.x+this.w*0.25, this.y+this.w*0.7);
          }
        }
      }
    }

    else {
      stroke(0);
      fill(37, 90, 144, 200);
      rect(this.x, this.y, this.w, this.w);
    }
  }


  // Check if player is close to treasure by counting treasures around the cell clicked.
  countTreasures () {
    let total = 0;
    
    if (this.coins) {
      total = -1;
    }
    else {
      for (let xDis = -1; xDis <= 1; xDis++) {
        for (let yDis = -1; yDis <= 1; yDis++) {
          let i = this.i + xDis;
          let j = this.j + yDis;
  
          if (i > -1 && i < gridColumns && j > -1 && j < gridRows) {
            let neighbor = grid[i][j]; // Look at all the neighbors.
            if (neighbor.coins) {
              total++;
            }
          }
        }
      }
      this.numberOfTreasures = total;
    }
  }


  clickedOn(xPos, yPos) {
    return(xPos > this.x && xPos < this.x + this.w && yPos > this.y && yPos < this.y +this.w);
  }


  reveal() {
    this.visible = true;
  }
}