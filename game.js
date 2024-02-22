let x = innerWidth / 2;
let y = innerHeight / 2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
}

//x1 and y1 is the position of the rocket, thrust is only used to determine if the rocket emits fire or not
function rocket(x1, y1, angle, thrust) {
  translate(x1, y1);
  push();
  scale(0.2);
  translate(x - 25, y);
  rotate(angle);
  translate(-x - 25, -y);

  //Fire
  if (thrust > 0) {
    fire();
  }

  function fire() {
    noStroke();
    fill(255, 0, 0);
    triangle(x, y + 150, x + 50, y + 150, x + 25, y + 450);
    fill(255, 255, 0);
    triangle(x + 10, y + 150, x + 40, y + 150, x + 25, y + 350);
  }

  //legs
  stroke(0, 0, 0);
  strokeWeight(5);
  //left leg
  line(x + 10, y + 90, x - 70, y + 200);
  strokeWeight(7);
  line(x - 70, y + 200, x, y + 150);
  //right leg
  strokeWeight(5);
  line(x + 40, y + 90, x + 120, y + 200);
  strokeWeight(7);
  line(x + 120, y + 200, x + 50, y + 150);

  //front leg
  strokeWeight(6);
  line(x + 25, y + 90, x + 25, y + 200);
  strokeWeight(8);
  line(x + 25, y + 150, x + 25, y + 200);

  //body
  noStroke();
  fill(255, 255, 255);
  rect(x, y - 100, 50, 250);
  fill(0, 0, 0);
  rect(x, y + 150, 50, 20);
  rect(x, y - 50, 50, 30);
  triangle(x, y + 150, x + 25, y + 150, x, y + 80);
  triangle(x + 50, y + 150, x + 25, y + 150, x + 50, y + 80);
  fill(150, 150, 150);
  quad(x, y - 100, x + 50, y - 100, x + 60, y - 110, x - 10, y - 110);
  fill(255, 255, 255);
  rect(x - 10, y - 110, 70, -100);
  fill(0, 0, 0, 75);
  rect(x - 10, y - 110, 29, -100);
  fill(255, 255, 255);
  quad(x - 10, y - 210, x + 60, y - 210, x + 50, y - 220, x, y - 220);
  stroke(0, 0, 0);
  strokeWeight(4);
  line(x - 5, y - 180, x + 5, y - 180);
  line(x + 15, y - 180, x + 35, y - 180);
  line(x + 45, y - 180, x + 55, y - 180);
  line(x - 5, y - 168, x + 12, y - 168);

  //flag
  stroke(172, 33, 50);
  strokeWeight(2);
  line(x + 12, y - 85, x + 38, y - 85);
  line(x + 12, y - 81, x + 38, y - 81);
  line(x + 12, y - 77, x + 38, y - 77);
  line(x + 12, y - 73, x + 38, y - 73);
  line(x + 12, y - 69, x + 38, y - 69);
  noStroke();
  fill(58, 57, 107);
  rect(x + 11, y - 86, 12, 10);

  //shadow bottom body
  fill(0, 0, 0, 75);
  rect(x, y - 100, 25, 250);
  pop();
}

function landingPad(posX, posY, width) {
  stroke(255, 255, 0);
  strokeWeight(7);
  fill(200, 200, 200);
  quad(
    posX + 100 - width * 50,
    posY + 5,
    posX + 100 + width * 50,
    posY + 5,
    posX + 110 + width * 50,
    posY + 25,
    posX + 110 - width * 50,
    posY + 25
  );
  line(posX + 100 - width * 50, posY + 5, posX + 100 + width * 50, posY + 5);
  line(posX + 110 - width * 50, posY + 25, posX + 110 + width * 50, posY + 25);
  line(posX + 100 - width * 50, posY + 5, posX + 110 - width * 50, posY + 25);
  line(posX + 100 + width * 50, posY + 5, posX + 110 + width * 50, posY + 25);
  noStroke();
}

let xPos = 300; //rocket position in x direction
let yPos = 0; //rocket position in y direction
let mass = 1; //Mass of rocket
let xVelocity = 0; //Velocity of rocket in x direction
let yVelocity = 0; //Velocity of rocket in y direction
let thrust = 0; //If thrust is emitted or not (0-1)
let upforce = 0; //Force of rocket thrust towards aimed direction
let downforce = 0; //Force of rocket fall
let g = 1.5; //Gravity
let angle = 0; //Angle of rocket
let fuel = 1000; //Fuel of rocket
let platformWidth = 1; //Standard width of landing platform
let platformPosX = 0;
let platformPosY = 400;
let state = "start";
let win = false;
let score = 0;
let bestScore = 0; //Used to store how far the player got in the game
let waves = [];

function draw() {
  clear();
  if (state == "start") {
    startScreen();
  } else if (state == "play") {
    playScreen();
  } else if (state == "end") {
    resultScreen();
    angle = 0;
    xPos = 0;
    yPos = 0;
  }
}

function mousePressed() {
  if (state == "start") {
    state = "play";
    platformPosX = platformX();
  } else if (state == "end" && win == true) {
    state = "play";
    platformPosX = platformX();
  } else if (state == "end" && win == false) {
    state = "start";
    //reset highscore
    bestScore = 0;
  }
  //empty wave array and spawn new waves
  waves = [];
  for (let i = 0; i < 13; i++) {
    waves.push(spawnWaves());
  }
}

function startScreen() {
  noStroke();
  spawnScenery();
  textFont("Courier New", 40);
  textStyle(BOLD);
  textAlign(CENTER, BOTTOM);
  text("SpaceZ Ocean Lander", x, y - 200);
  textSize(20);
  textStyle(NORMAL);
  textAlign(CENTER, TOP);
  text("Press mouse to start", x, y - 200);
  textStyle(ITALIC);
  text("(Space Key) - Engage Thrust", x, y - 160);
  text("(Left/Right Arrow Keys) - Steer", x, y - 140);
}

function playScreen() {
  spawnScenery();
  spawnPlatform();
  textSize(20);
  textStyle(NORMAL);
  fill(24, 107, 131);
  text("Score: " + score, 50, 50);
  text("Fuel: " + fuel, 50, 70);
  text("Velocity: " + int(yVelocity * 10) + " m/s", 50, 90);
  textAlign(LEFT);
  rocket(xPos, yPos, angle, thrust);

  //Rocketcontrollers & Physics

  //Thrust
  if (keyIsDown(32)) {
    //When spacebar is pressed thrust is "engaged" accelerated
    if (fuel > 0) {
      fuel = fuel - 1;
      thrust = 0.5;
    }
  } else {
    thrust = 0; //When spacebar is not pressed thrust is not engaged
  }
  //Rotation
  if (keyIsDown(LEFT_ARROW)) {
    //When left arrow is pressed rocket rotates left
    angle = angle - (Math.PI / 180) * 4;
  } else if (keyIsDown(RIGHT_ARROW)) {
    //When right arrow is pressed rocket rotates right
    angle = angle + (Math.PI / 180) * 4;
  }
  //Physics loosely based on: https://www.spaceacademy.net.au/flight/sim/lunasim.htm and previous projects

  upforce = thrust * mass; //Force acting upwards
  downforce = -g; //Force acting downwards

  //Forces combined with the angles are used to calculate the velocity in x and y direction
  yVelocity = yVelocity + upforce * Math.cos(angle) + 0.07 * downforce; //Velocity in y direction
  xVelocity = xVelocity + upforce * Math.sin(angle); //Velocity in x direction

  yPos = yPos - yVelocity;
  xPos = xPos + xVelocity;

  //landing
  if (yPos > 300) {
    if (
      xPos < platformPosX + platformWidth * 100 &&
      xPos > platformPosX - platformWidth * 100 &&
      yVelocity > -3 &&
      angle < 0.15 &&
      angle > -0.15
    ) {
      yVelocity = 0;
      xVelocity = 0;
      win = true;
      state = "end";
      endScreen(win);
    } else {
      yVelocity = 0;
      xVelocity = 0;
      win = false;
      state = "end";
      endScreen(win);
    }
  }
  //Out of bounds
  if (xPos > windowWidth) {
    xPos = 0;
  }
  if (xPos < -200) {
    xPos = windowWidth;
  }
}
function resultScreen() {
  spawnScenery();
  if (win == true) {
    textFont("Courier New", 40);
    textStyle(BOLD);
    textAlign(CENTER, BOTTOM);
    text("Landing was a success!", x, y - 200);
    textSize(20);
    textStyle(NORMAL);
    textAlign(CENTER, TOP);
    text("Press mouse to keep playing", x, y - 150);
    bestScore = score;
  }
  if (win == false) {
    textFont("Courier New", 40);
    textStyle(BOLD);
    textAlign(CENTER, BOTTOM);
    text("Landing was a failure!", x, y - 200);
    textSize(20);
    textStyle(NORMAL);
    textAlign(CENTER, TOP);
    text("Score: " + bestScore, x, y - 200);
    textSize(20);
    text("Press mouse to restart", x, y - 150);
  }
}
function endScreen() {
  //Succesful landing
  if (win == true) {
    score = score + 1;
    fuel = int(fuel * 0.9);
    platformWidth = platformWidth * 0.95;
  }

  //Failed Landing
  if (win == false) {
    fuel = 1000;
    platformWidth = 1;
    score = 0;
  }
}

//Randomizes each waves position and length
function spawnWaves() {
  const waveX = Math.random() * 2000;
  const waveY = 430 + Math.random() * 300;
  const waveLength = 30 + Math.random() * 100;
  return { x: waveX, y: waveY, length: waveLength };
}

//Draws the waves based on their position and length
function drawWaves(wave) {
  push();
  strokeWeight(4);
  stroke(255, 255, 255);
  line(wave.x, wave.y, wave.x + wave.length, wave.y);
  stroke(255, 255, 255);
  pop();
}

//Animates each wave
function updateWaves(wave) {
  wave.x = wave.x + 1;
  if (wave.x > windowWidth + 100) {
    wave.x = -100;
  }
}

function spawnScenery() {
  background(229, 210, 221);
  fill(245, 225, 235);

  //Clouds
  ellipse(50, 400, 200);
  ellipse(180, 420, 180);
  ellipse(110, 380, 180);
  ellipse(250, 400, 170);
  ellipse(400, 400, 300);
  ellipse(440, 420, 180);
  ellipse(490, 380, 150);
  ellipse(650, 430, 250);
  ellipse(x + 300, 400, 230);
  ellipse(x + 420, 420, 180);
  ellipse(x + 160, 400, 140);
  ellipse(x + 700, 400, 270);
  ellipse(x + 550, 450, 200);
  fill(255, 150, 90);
  ellipse(x, 400, 200);
  fill(24, 107, 131);
  rect(0, 400, windowWidth, 600);

  //Draws each wave
  for (let wave of waves) {
    updateWaves(wave);
    drawWaves(wave);
  }
}

function spawnPlatform() {
  landingPad(platformPosX, platformPosY, platformWidth);
}
//Randomize platform x position
function platformX() {
  let platformX = Math.floor(Math.random() * (windowWidth - 200));
  return platformX;
}
