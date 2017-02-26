function Line(x1, y1, x2, y2) {
  //<start coorodinates>
  this.x1 = x1;
  this.y1 = y1;
  //</start coorodinates>
  //<end coorodinates>
  this.x2 = x2;
  this.y2 = y2;
  //<end coorodinates>
  this.disp1 = function() { //draw the outer (dark) line
    strokeWeight(strk * 2)
    line(this.x1, this.y1, this.x2, this.y2)
  }
  this.disp2 = function() { //draw the inner (light) line
    strokeWeight(strk)
    line(this.x1, this.y1, this.x2, this.y2);
  }
}

function generateGame() { //make a new game
  //<DOM>
  cnv.show(); //show the canvas
  head.hide();
  infoP.hide();
  playbtn.hide();
  //</DOM>
  var pathX = []; // string of the X values
  var pathY = []; //string of the Y values
  lines = []; //string of all the lines, this is global
  for (var i = 0; i <= (height / ((strk * 2) * 1.5)); i++) { //create all the points
    //                        width of line * magic number
    pathY.push(round(random(i * ((strk * 2) * 1.50), i * ((strk * 2) * 1.50)))); //Ypoints
    pathX.push(round(random(0, width))); //Xpoints
    if (pathX[pathX.length - 1] < (strk * 2)) {
      pathX[pathX.length - 1] = strk * 2;
    } else if (pathX[pathX.length - 1] > width - (strk * 2)) {
      pathX[pathX.length - 1] = width - (strk * 2);
    }
  }
  pathX.push(round(random(0, width))) //add one more X so it works
  for (i = 0; i < pathY.length - 1; i += 1) { //now make the lines by pulling values from the X and Y arrays
    //2 at a time are needed for the loop to work
    lines.push(new Line(pathX[i], pathY[i], pathX[i], pathY[i + 1])) //One horizontal
    lines.push(new Line(pathX[i], pathY[i + 1], pathX[i + 1], pathY[i + 1])) //one vertical
  }
  /*I make the points and the lines seperately because It makes it easier to have the lines join up*/
  //<init the ship>
  ship.rotation = 90;
  ship.position.x = lines[0].x1;
  ship.position.y = 15;
  //<init the ship>
  gameState = 0; //tell the computer we are playing a game
  start = millis(); //note the start time
}