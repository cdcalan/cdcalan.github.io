class Sprites {
  constructor(x, y) {
    // Coordinates:
    this.x = x;
    this.y = y;
    // Dimensions:
    this.h = 50;
    this.w = 20;
    // Speed variables:
    this.dx = random(3, 10);
    this.dy = 1;


  }
  // Displays sprites:
  show() {
    fill(100, 200, 150);
    rect(this.x, this.y, this.w, this.h);

  }

  // Sprite horizontal movement:
  move() {
    if (keyIsPressed && keyCode === RIGHT_ARROW) {
      this.x += this.dx;
    }
  }

  // Checks if sprite has collided with player:
  hasCollided() {

  }
}




class User extends Sprites {
  // Implement gravity!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  jump() {
    if (keyIsPressed && keyCode === UP_ARROW) {
      this.y -= this.dy;
    }
  }

  attack() {

  }
}