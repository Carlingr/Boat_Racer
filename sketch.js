var rocket

function setup() {
  rocket = new Rocket();
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES) //make my head hurt less
}

function draw() {
  background("black")
  rocket.x = mouseX
  rocket.y = mouseY
  rocket.disp();
}