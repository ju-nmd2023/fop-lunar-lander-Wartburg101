let waves = [];

function setup() {
  createCanvas(1000, 500);
}

function spawnWaves() {
  const waveX = Math.random() * 1000;
  const waveY = 400 + Math.random() * 100;
  return { x: waveX, y: waveY };
}

function drawWaves(wave) {
  push();

  strokeWeight(4);
  stroke(255, 255, 255);
  line(wave.x, wave.y, wave.x + 100, wave.y);
  stroke(255, 255, 255);
  pop();
}
function updateWaves(wave) {
  wave.x = wave.x + 1;
  if (wave.x > 1100) {
    wave.x = -100;
  }
}
function mousePressed() {
  waves = [];
  for (let i = 0; i < 7; i++) {
    waves.push(spawnWaves());
  }
}

function draw() {
  clear();
  for (let wave of waves) {
    drawWaves(wave);
    updateWaves(wave);
  }
}
