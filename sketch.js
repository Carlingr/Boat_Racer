var ship

function setup() {
  ship = new Ship();
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES) //make my head hurt less
}

function draw() {
  background("black")
  if (keyDown("A")) {
    ship.dir -= 4;
  }
  if (keyDown("D")) {
    ship.dir += 4;
  }
  if (keyDown("W")) {
    ship.speed++;
  }
  ship.mve();
  ship.disp();
  console.log("(" + ship.x + "," + ship.y + ")");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}