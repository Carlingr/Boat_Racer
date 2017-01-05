function Ship() {
  this.x = 50
  this.y = 50
  this.spd = 0
  this.dir = 90;
  this.disp = function() {
    var backX = this.x - 20
    var topY = this.y - 8
    var botmY = this.y + 8
    noStroke();
    fill("red")
    triangle(this.x, this.y, backX, topY, backX, botmY);
    // fill("black")
    triangle(this.x - 15, this.y, backX, topY, backX, botmY);
  }
  this.mve = function() {
    this.x = sin(this.dir) * this.spd
    this.y = cos(this.dir) * this.spd
  }
}