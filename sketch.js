var ship
var shpImg
var start
var end
var weight
var pathSeg
var lines = []
var colors = []
var gameState = 0; //0 is play, 1 is loss
var cnv

function preload() {
  shipImage = loadImage("images/ship.svg");
  ship = createSprite();
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  //angleMode(DEGREES) //make my head hurt lessship = createSprite(width/2, height/2);

  ship.friction = .93
  ship.addImage(shipImage)

  colors[0] = color("blue")
  colors[1] = color("aqua")
  colors[2] = color("#0e0");

  generateGame(100, 50);
}

function draw() {
  end = millis();
  var rot = (sqrt((ship.velocity.y * ship.velocity.y) + (ship.velocity.x * ship.velocity.x)))

  if (keyDown("A")) {
    ship.rotation -= rot * 2;
  }
  if (keyDown("D")) {
    ship.rotation += rot * 2;
  }
  if (keyDown("W")) {
    ship.addSpeed(.2, ship.rotation);
  }

  background(colors[2]);

  stroke(colors[1]);
  for (i = 0; i < lines.length; i++) {
    lines[i].disp1();
  }
  stroke(colors[0])
  for (i = 0; i < lines.length; i++) {
    lines[i].disp2();
  }

  if (dist(ship.position.x, ship.position.y, lines[lines.length - 1].x2, lines[lines.length - 1].y2) < 15) {
    generateGame(90, 50)
  }

  if (cnv.get(ship.position.x, ship.position.y) == colors[0]) {}

  if (gameState == 1) { //if the game is over
    background("green");
    console.log("I think you found the shore!")
  }

  drawSprites();
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function generateGame(level, strk) {
  var pathX = []
  var pathY = []
  for (var i = 0; i < (height / level) + 1; i++) {
    pathY.push(round(random(i * level, i * level)))
    pathX.push(round(random(0, width)))
  }
  pathX.push(round(random(0, width)))
  for (i = 0; i < pathY.length; i += 1) {
    lines.push(new Line(pathX[i], pathY[i], pathX[i], pathY[i + 1], strk))
    lines.push(new Line(pathX[i], pathY[i + 1], pathX[i + 1], pathY[i + 1], strk))
  }
  ship.rotation = 90
  ship.position.x = lines[0].x1
  ship.position.y = 15
  start = millis()
}