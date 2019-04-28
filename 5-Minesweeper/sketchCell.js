// A class for each individual cell in the grid:
class Cell {
  constructor (i, j, cellWidth) {
    
    // Passed-in index values of the grid (used to organize cell positions along the grid):
    this.i = i;
    this.j = j;

    // Posiiton and width variables of the cell:
    this.x = i*cellWidth;
    this.y = j*cellWidth;
    this.w = cellWidth;

    // Variable that stores the total number of coins neighboring a cell.
    this.numberOfTreasures;

    // All potential identities of the cell, turned-off:
    this.turtle = false;
    this.coins = false;
    this.rock = false;

    // Random shuffle of numbers from 0-4 decides the identity of the cell:
    let guess = random(0, 4);
    if (guess < 1) {
      this.turtle = true;
    }
    if (guess > 1 && guess < 2) {
      this.coins = true;
    }
    if (guess > 2) {
      this.rock = true;
    }

    // Hides the identity of the cell:
    this.visible = false;
  }



  // Displays the cell:
  show() {
    // When user clicks on the cell (and thereby turns on the visibility boolean):
    if (this.visible) {   

      // If cell identity is coins, display coins:    
      if (this.coins) {    
        fill(17, 56, 94);
        rect(this.x, this.y, this.w, this.w);
        image(coin, this.x, this.y, this.w, this.w);
      }

      // Otherwise:
      else { 
        // If cell identity is turtle, display turtle: 
        if (this.turtle) {      
          fill(17, 56, 94);
          rect(this.x, this.y, this.w, this.w);
          image(turtle, this.x, this.y, this.w, this.w);
        }

        // If cell identity is rock, display rock: 
        if (this.rock) {       
          fill(127);
          rect(this.x, this.y, this.w, this.w);
          image(rock, this.x, this.y, this.w, this.w);
        }

        // And if the cell is neighboring treasure (coins) ...
        if (this.numberOfTreasures > 0) {
          // And the cell is not a turtle ...
          if (!this.turtle) {
            // Display the number of treasures (coins) the cell neighbors:
            textSize(this.w);
            fill(255, 194, 50);
            text(this.numberOfTreasures, this.x+this.w*0.25, this.y+this.w*0.7);
          }
        }
      }
    }

    // Otherwise, if user hasn't clicked on the cell, display the 'hidden cell':
    else {
      stroke(0);
      fill(37, 90, 144, 200);
      rect(this.x, this.y, this.w, this.w);
    }
  }



  // Checks if player is close to treasure by counting the number of treasures (coins) immideately surrounding the cell clicked.
  countTreasures () {
    // Initially set the total number of treasures surrounding the cell to 0:
    let total = 0;
    
    // If the cell clicked is a coin itself, do not count the number of treasures surrounding the cell:
    if (this.coins) {
      total = -1;
    }
    // If the cell clicked is not a coin (or turtle by default), then check the identity of all the cells in its perimeter:
    else {
      for (let xP = -1; xP <= 1; xP++) {
        for (let yP = -1; yP <= 1; yP++) {
          let i = this.i + xP;
          let j = this.j + yP;
          
          // As long as the neighboring cell is within the area of the grid:
          if (i > -1 && i < gridColumns && j > -1 && j < gridRows) {
            // Treat each neighbor as an individual cell in the grid ...
            let neighbor = grid[i][j];
            // And using the Cell class, add 1 to total if neighbors' identity is coin:
            if (neighbor.coins) {
              total++;
            }
          }
        }
      }
      // The total nunber of coin-cells found is the numberOfTreasures for this particular cell.
      this.numberOfTreasures = total;
    }
  }



  // Checks if the mouse is over the cell (to be used by the mousePressed() function):
  clickedOn(xPos, yPos) {
    return(xPos > this.x && xPos < this.x + this.w && yPos > this.y && yPos < this.y +this.w);
  }



  // Makes the cell identity visible by turning on the visibility variable.
  reveal() {
    this.visible = true;
  }
}