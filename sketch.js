var ship
var shpImg
var start
var end
var weight
var pathSeg
var lines = []
var colors = []
var gameState = 0; //0 is play, 1 is loss, 2 is win
var cnv

function preload() {
  shipImage = loadImage("images/ship.svg");
  ship = createSprite();
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);

  ship.friction = .93
  ship.addImage(shipImage)

  colors[0] = color('blue');
  colors[1] = color('aqua');
  colors[2] = color('#0e0');

  generateGame(100, 50);

}

function draw() {
  background(colors[2]);

  stroke(colors[1]);
  for (i = 0; i < lines.length; i++) {
    lines[i].disp1();
  }
  stroke(colors[0])
  for (i = 0; i < lines.length; i++) {
    lines[i].disp2();
  }

  if (dist(ship.position.x, ship.position.y, lines[lines.length - 1].x2, lines[lines.length - 1].y2) < 50) {
    gameState = 2;
  }

  noStroke();

  textAlign(LEFT, TOP);
  fill("white");
  textStyle(BOLD);
  textSize(20)
  text("WAD to move", 20, 20)
  text(round((end - start) / 10) / 100, 20, 40)

  if (gameState === 0) {
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

    var shipColor = color(cnv.get(ship.position.x, ship.position.y));

    switch (shipColor.levels[1]) {
      case colors[0].levels[1]:
        ship.friction = .93;
        break;
      case colors[1].levels[1]:
        ship.friction = .9
        break;
      case colors[2].levels[1]:
        gameState = 1;
        break;
      default:
    }
  } else if (gameState == 1) { //if the game is over
    textAlign(CENTER, CENTER);
    fill("white");
    textStyle(BOLD);
    textSize(width / 50)
    text("You've run aground! Reload the page to play again", width / 2, height / 2)
  } else if (gameState == 2) {
    textAlign(CENTER, CENTER);
    fill("white");
    textStyle(BOLD);
    textSize(width / 50)
    text("You've reached the end of the course! Reload the page to play again", width / 2, height / 2)
  }
  drawSprites();
}

function generateGame(level, strk) {
  var pathX = []
  var pathY = [];
  lines = []
  for (var i = 0; i < (height / (level * 1.50)); i++) {
    pathY.push(round(random(i * (level * 1.50), i * (level * 1.50))))
    pathX.push(round(random(0, width)))
  }
  pathX.push(round(random(0, width)))
  for (i = 0; i < pathY.length - 1; i += 1) {
    lines.push(new Line(pathX[i], pathY[i], pathX[i], pathY[i + 1], strk))
    lines.push(new Line(pathX[i], pathY[i + 1], pathX[i + 1], pathY[i + 1], strk))
  }
  ship.rotation = 90
  ship.position.x = lines[0].x1
  ship.position.y = 15
  start = millis()
}