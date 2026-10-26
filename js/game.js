const gameWorld = document.querySelector("#game-world");
const gameSteps = document.querySelector("#game-steps");
const gameHattori = document.querySelector("#game-hattori");

let currentStep = 0;
let cameraOffset = 0;
let gameScale = 1;

steps.forEach(function (step) {
  const image = document.createElement("img");
  image.className = "game-step";
  image.src = "stone-step.png";
  image.alt = "";
  image.width = 480;
  image.height = 170;
  image.draggable = false;
  image.style.left = step.x + "%";
  image.style.setProperty("--step-rotation", step.rotation + "deg");
  gameSteps.appendChild(image);
});

function stepY(index) {
  if (index === finalStep) {
    const openingY = gameScreen.clientHeight * 0.16;
    const characterHeight = 110 * gameScale;
    return Math.max(openingY, characterHeight + 8);
  }
  const distanceFromTop = steps[steps.length - 1].y - steps[index].y;
  return gameScreen.clientHeight * 0.2 + distanceFromTop * gameScale;
}

function cameraFeetPosition() {
  return 0.55;
}

function positionHattori(index = currentStep, drop = 0) {
  const playerY = stepY(index) + drop;
  gameHattori.style.left = steps[index].x + "%";
  gameHattori.style.top = playerY + "px";
  const screenHeight = gameScreen.clientHeight;
  const feetPosition = cameraFeetPosition();
  const worldHeight = stepY(0) + screenHeight * (1 - feetPosition);
  const maxOffset = worldHeight - screenHeight;
  const wantedOffset = playerY - screenHeight * feetPosition;
  const limitedOffset = Math.min(maxOffset, wantedOffset);
  cameraOffset = Math.max(0, limitedOffset);
  gameWorld.style.transform = "translateY(" + -cameraOffset + "px)";
}

function layoutGame() {
  if (gameScreen.hidden) {
    return;
  }
  const screenWidth = gameScreen.clientWidth;
  const screenHeight = gameScreen.clientHeight;
  const feetPosition = cameraFeetPosition();
  gameWorld.style.setProperty("--world-width", Math.min(screenWidth * 0.92, 700 * gameScale) + "px");
  gameWorld.style.setProperty("--world-height", stepY(0) + screenHeight * (1 - feetPosition) + "px");
  gameWorld.style.setProperty("--character-height", 110 * gameScale + "px");
  [...gameSteps.children].forEach(function (image, index) {
    image.style.top = stepY(index) + "px";
    image.style.setProperty("--step-width", 180 * gameScale * steps[index].scale + "px");
  });
  positionHattori();
}

function resetGame() {
  currentStep = 0;
  cameraOffset = 0;
  gameWorld.style.transform = "translateY(0px)";
  gameHattori.style.left = steps[0].x + "%";
  gameHattori.style.top = stepY(0) + "px";
  gameHattori.alt = "Ninja Hattori standing on a stone ledge";
}

function showGame() {
  resetGame();
  homeScreen.hidden = true;
  rulesScreen.hidden = true;
  aboutScreen.hidden = true;
  introScreen.hidden = true;
  gameScreen.hidden = false;
  gameScreen.focus();
  layoutGame();
}

function returnFromGame(event) {
  if (event.key === "Escape" && !gameScreen.hidden) {
    event.preventDefault();
    showHome();
  }
}

window.addEventListener("resize", layoutGame);
document.addEventListener("keydown", returnFromGame);
