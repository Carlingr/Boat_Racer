function Line(x1, y1, x2, y2, strk) {
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
  this.strk = strk;
  this.active = false
  this.disp1 = function() {
    strokeWeight(this.strk * 2)
    line(this.x1, this.y1, this.x2, this.y2)
  }
  this.disp2 = function() {
    strokeWeight(this.strk)
    line(this.x1, this.y1, this.x2, this.y2);
  }
}