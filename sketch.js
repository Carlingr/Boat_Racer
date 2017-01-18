var ship
var shpImg
var start
var end
var weight
var pathSeg
var lines = []

function preload() {
  shipImage = loadImage("images/ship.svg");
  ship = createSprite();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //angleMode(DEGREES) //make my head hurt lessship = createSprite(width/2, height/2);

  ship.friction = .93
  ship.addImage(shipImage)

  generateGame(100, 50);
  //lines[0].active = true
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
  /* console.log("lines active")
   for (i = 0; i < lines.length; i++) {
     console.log(lines[i].active)
     if (lines[i].active === true) {
       if (dist(ship.position.x, ship.position.y, lines[i].x2, lines[i].y2) < 15) {
         lines[i].active = false
         lines[i + 1].active = true
       }
     }
   }*/

  background("#0e0");

  stroke("aqua");
  for (i = 0; i < lines.length; i++) {
    lines[i].disp1();
  }
  stroke("blue")
  for (i = 0; i < lines.length; i++) {
    lines[i].disp2();
  }

  if (dist(ship.position.x, ship.position.y, lines[lines.length - 1].x2, lines[lines.length - 1].y2) < 15) {
    generateGame(90, 50)
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