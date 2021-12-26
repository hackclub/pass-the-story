let isGameOver;
let player;
let playerImage;
let enemy;
let enemyImage;
let backgroundImage;

function preload() {
  playerImage = loadImage("https://cloud-myjuhavoo-hack-club-bot.vercel.app/0untitled_drawing-39.png");
  enemyImage = loadImage("https://cloud-ki0jy2ltd-hack-club-bot.vercel.app/0untitled_drawing-38.png");
  backgroundImage = loadImage("https://i.imgur.com/aKQOg3G.png");
}

function setup() {
  isGameOver = false;
  createCanvas(window.innerWidth, window.innerHeight);
  player = createSprite(width / 2, (height - (playerImage.height / 2)) - 30, 0, 0);
  player.addImage(playerImage);
  enemy = createSprite(width / 2, 0, 0, 0);
  enemy.addImage(enemyImage);
  enemy.rotationSpeed = 4.0;
}

function draw() {
  if (isGameOver) {
    gameOver();
  } else {
    if (enemy.overlap(player)) {
      isGameOver = true;
    }
    background("#e8ba97");
    if (keyDown(RIGHT_ARROW) && player.position.x < (width - (playerImage.width / 2))) {
      player.position.x += 2;
    }
    if (keyDown(LEFT_ARROW) && player.position.x > (playerImage.width / 2)) {
      player.position.x -= 2;
    }
    enemy.position.y = enemy.position.y + 3;
    if (enemy.position.y > height) {
      enemy.position.y = 0;
      enemy.position.x = random(5, width - 5);
    }
    drawSprites();
  }
}

function gameOver() {
  background(0);
  textAlign(CENTER);
  fill("white");
  text("Game Over! Clue @ hack.af/sadge 👀", width / 2, height / 2);
  text("Click anywhere to try again", width / 2, 3 * height / 4);
}

function mouseClicked() {
  isGameOver = false;
  player.position.x = width / 2;
  player.position.y = (height - (playerImage.height / 2)) - 30;
  enemy.position.x = width / 2;
  enemy.position.y = 0;
}