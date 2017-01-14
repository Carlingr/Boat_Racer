var ship
var shpImg
var pathX = []
var pathY = []
var start
var end
var weight
var pathSeg

function preload() {
  shipImage = loadImage("images/rocket.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //angleMode(DEGREES) //make my head hurt lessship = createSprite(width/2, height/2);

  ship = createSprite(pathX[0], 15)

  ship.maxSpeed = 6
  ship.friction = .93
  ship.addImage(shipImage)

  generateGame(100);
  weight = 50
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
    //console.log(ship.velocity.x * ship.velocity.y * 100)
    ship.addSpeed(.2, ship.rotation);
  }

  background("#0f0");

  stroke("blue");
  strokeWeight(weight);
  for (i = 0; i < pathY.length; i += 1) {
    line(pathX[i], pathY[i], pathX[i], pathY[i + 1])
    line(pathX[i], pathY[i + 1], pathX[i + 1], pathY[i + 1])
  }
  if (dist(ship.position.x, ship.position.y, pathX[pathX.length - 1], pathY[pathY.length - 1]) < 15) {
    generateGame(90)
  }
  drawSprites();
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function generateGame(level) {
  pathX = []
  pathY = []
  for (var i = 0; i < (height / level) + 1; i++) {
    pathY.push(round(random(i * level, i * level)))
    pathX.push(round(random(0, width)))
  }
  pathX.push(round(random(0, width)))
  ship.rotation = 90
  start = millis()
  ship.position.x = pathX[0]
  ship.position.y = 15
}