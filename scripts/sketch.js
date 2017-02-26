var ship //holds the ship object
var shpImg //holds the image used for the ship
var start //holds start time
var end //holds endtime
var lines = [] //holds the path the boat needs to take
var colors = [] //holds the colors used, this is so they can be refrenced later
var gameState = 0; //0 is play, 1 is loss, 2 is win
var strk = 30

//<dom variables>
var cnv //holds the canvas in case of DOM
var head;
var infoP;
var playbtn;
//</dom vars>

function preload() {
  shipImage = loadImage("images/ship.svg"); //load the image for the ship
  ship = createSprite(); //make sprite in p5.play
}

function setup() {

  //<set up the DOM>
  //<make the canvas>
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
  cnv.parent('game');
  cnv.hide; //hide until game starts
  //</make the canvas>
  //<make everthing else>
  head = createElement("h2")
  head.hide();
  head.style("margin", "auto")
  infoP = createP();
  infoP.hide();
  playbtn = createButton("Play");
  playbtn.mousePressed(generateGame);
  //<make everthing else>
  //<assign parents to everthing else>
  head.parent('game');
  infoP.parent('game');
  playbtn.parent('game');
  //</assign parents to everthing else>
  //</Set up DOM>
  ship.friction = .93; //put some friction in the situation
  ship.addImage(shipImage); //put a face to the name
  //<init the colors>
  colors[0] = color('blue');
  colors[1] = color('aqua');
  colors[2] = color('#0e0');
  //</init the colors>
  generateGame(); //make the game
  cnv.hide();
  playbtn.show();
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
  if (dist(ship.position.x, ship.position.y, lines[lines.length - 1].x2, lines[lines.length - 1].y2) < strk*2) { //if we finish the course
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

    end = millis(); //note the time
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
    drawSprites(); //make the boat
  } else if (gameState == 1) { //if we lost
    //<let the player know>
    cnv.hide()
    head.html("You've run aground.")
    head.show();
    playbtn.html("Try Again")
    playbtn.show();
    //</let the player know>
  } else if (gameState == 2) { //if we won
    //<let the player know>
    cnv.hide()
    head.html("You won!")
    head.show();
    infoP.html("Your time was " + (round((end - start) / 10) / 100));
    infoP.show();
    playbtn.html("Play Again")
    playbtn.show();
    //<let the player know>
  }
}