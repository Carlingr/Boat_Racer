var ship
var shpImg
var pathY = []
var pathX = []
var start
var end

function preload() {
  shipImage = loadImage("images/rocket.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //angleMode(DEGREES) //make my head hurt lessship = createSprite(width/2, height/2);

  ship = createSprite(pathX[0], 15)
  ship.maxSpeed = 6
  ship.friction = .95
  ship.addImage(shipImage)
  generateGame(100, 50);
}

function draw() {
  end = round(millis())
  if (keyDown("A")) {
    ship.rotation -= 2;
  }
  if (keyDown("D")) {
    ship.rotation += 2;
  }
  if (keyDown("W")) {
    ship.addSpeed(.2, ship.rotation);
  }

  background("Blue");
  stroke("white")

  strokeWeight(1);
  textSize(20)
  text(end, 50, 50)

  stroke("aqua")
  strokeWeight(50);
  for (i = 0; i < pathY.length; i += 1) {
    line(pathX[i], pathY[i], pathX[i], pathY[i + 1])
    line(pathX[i], pathY[i + 1], pathX[i + 1], pathY[i + 1])
  }
  drawSprites();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function generateGame(level, weight) {
  for (var i = 0; i < (height / level) + 1; i++) {
    pathY.push(round(random(i * level, i * level)))
    pathX.push(round(random(0, width)))
  }
  pathX.push(round(random(0, width)))
  ship.rotation = 90
  start = millis()
}