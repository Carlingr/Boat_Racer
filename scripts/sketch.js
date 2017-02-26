var ship //holds the ship object
var shpImg //holds the image used for the ship
var start //holds start time
var end //holds endtime
var lines = [] //holds the path the boat needs to take
var colors = [] //holds the colors used, this is so they can be refrenced later
var gameState = 0; //0 is play, 1 is loss, 2 is win
var cnv //holds the canvas in case of DOM

function preload() {
  shipImage = loadImage("images/ship.svg"); //load the image for the ship
  ship = createSprite(); //make sprite in p5.play
}

function setup() {
  var wth; //holds width of canvas
  if (windowWidth < 500) { //the game is too hard to play if the canvas is giant
    wth = windowWidth //set the width to the window width
  } else { // if the window is biiger then 500
    wth = 500; //the the width to 500
  }
  if (windowHeight < 500) { //the game is too hard to play if the canvas is giant
    cnv = createCanvas(wth, windowHeight); //make a small canvas
  } else { // if the window is biiger then 500
    cnv = createCanvas(wth, 500) //make a big canvas
  }

  ship.friction = .93; //put some friction in the situation
  ship.addImage(shipImage); //put a face to the name
  //<init the colors>
  colors[0] = color('blue');
  colors[1] = color('aqua');
  colors[2] = color('#0e0');
  //</init the colors>
  generateGame(); //make the game
}

function draw() {
  background(colors[2]); //make a background
  //<draw the lines>
  stroke(colors[1]); //this is the color of the outer lines
  for (i = 0; i < lines.length; i++) { //loop through all the things
    lines[i].disp1(); //draw the first part of the line
  }
  stroke(colors[0]) //color of the inner lines
  for (i = 0; i < lines.length; i++) { //around again
    lines[i].disp2(); //the inner lines this time
  }
  //</draw the lines>
  if (dist(ship.position.x, ship.position.y, lines[lines.length - 1].x2, lines[lines.length - 1].y2) < 50) { //if we finish the course
    gameState = 2; //goto Win
  }

  noStroke(); //ditch the stroke
  //<make the text work>
  textAlign(LEFT, TOP);
  fill("white");
  textStyle(BOLD);
  textSize(20)
    //</make the text work>
  text("WAD to move", 20, 20) //Instructions in the corner
  text(round((end - start) / 10) / 100, 20, 40) //time on course

  if (gameState === 0) { //if we re playing
    end = millis(); //note the time
    var rot = (sqrt((ship.velocity.y * ship.velocity.y) + (ship.velocity.x * ship.velocity.x))); //sort out how fast were going
    //p5.play helpfully only give the x and y velocities seperately, so we have to use pytagorus to sort it
    //rot makes a numerical relationshp betwwen the forward speed and the turnign speed

    if (keyDown("A")) { //if A key is pressed
      ship.rotation -= rot * 2; //turn left
    }
    if (keyDown("D")) { //if D key is pressed
      ship.rotation += rot * 2; //turn right
    }
    if (keyDown("W")) { //if W key is pressed
      ship.addSpeed(.2, ship.rotation); //give her power
    }

    var shipColor = color(cnv.get(ship.position.x, ship.position.y)); //gets the color of the canvas under the ship to determine how close to shore it is

    switch (shipColor.levels[1]) { //google switch/case
      case colors[0].levels[1]: //if in the main channel
        ship.friction = .93; //full speed
        break;
      case colors[1].levels[1]: //if approacing shore
        ship.friction = .9 //slow down
        break;
      case colors[2].levels[1]: //if aground
        gameState = 1; //end game
        break;
      default:
    }
  } else if (gameState == 1) { //if we lost
    //<let the player know>
    textAlign(CENTER, CENTER);
    fill("white");
    textStyle(BOLD);
    textSize(width / 50)
    text("You've run aground! Reload the page to play again", width / 2, height / 2);
    //</let the player know>
  } else if (gameState == 2) { //if we won
    //<let the player know>
    textAlign(CENTER, CENTER);
    fill("white");
    textStyle(BOLD);
    textSize(width / 50)
    text("You've reached the end of the course! Reload the page to play again", width / 2, height / 2);
    //<let the player know>
  }
  drawSprites(); //fnd the boat
}

function generateGame() { //make a new game
  var pathX = []; //
  var pathY = [];
  lines = []
  for (var i = 0; i < (height / (100 * 1.50)); i++) {
    pathY.push(round(random(i * (100 * 1.50), i * (100 * 1.50))))
    pathX.push(round(random(0, width)))
  }
  pathX.push(round(random(0, width)))
  for (i = 0; i < pathY.length - 1; i += 1) {
    lines.push(new Line(pathX[i], pathY[i], pathX[i], pathY[i + 1], 50))
    lines.push(new Line(pathX[i], pathY[i + 1], pathX[i + 1], pathY[i + 1], 50))
  }
  ship.rotation = 90
  ship.position.x = lines[0].x1
  ship.position.y = 15
  start = millis()
}