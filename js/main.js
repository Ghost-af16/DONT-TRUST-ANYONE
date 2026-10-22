const homeScreen = document.querySelector("#home-screen");
const gameScreen = document.querySelector("#game-screen");
const rulesScreen = document.querySelector("#rules-screen");
const playButton = document.querySelector("#play-button");
const rulesButton = document.querySelector("#rules-button");
const gameBackButton = document.querySelector("#game-back-button");
const rulesBackButton = document.querySelector("#rules-back-button");
const menuButtons = [playButton, rulesButton];
let returnButton = playButton;

function showHome() {
  homeScreen.hidden = false;
  gameScreen.hidden = true;
  rulesScreen.hidden = true;
  returnButton.focus();
}

function showRules() {
  homeScreen.hidden = true;
  gameScreen.hidden = true;
  rulesScreen.hidden = false;
  returnButton = rulesButton;
  rulesBackButton.focus();
}

function showGame() {
  homeScreen.hidden = true;
  rulesScreen.hidden = true;
  gameScreen.hidden = false;
  returnButton = playButton;
  gameBackButton.focus();
}

function moveMenuSelection(event) {
  if (homeScreen.hidden) {
    return;
  }

  if (event.key !== "ArrowUp" && event.key !== "ArrowDown") {
    return;
  }

  event.preventDefault();
  const selectedIndex = menuButtons.indexOf(document.activeElement);
  let nextIndex;

  if (selectedIndex === -1) {
    nextIndex = event.key === "ArrowDown" ? 0 : menuButtons.length - 1;
  } else if (event.key === "ArrowDown") {
    nextIndex = (selectedIndex + 1) % menuButtons.length;
  } else {
    nextIndex = (selectedIndex + menuButtons.length - 1) % menuButtons.length;
  }

  menuButtons[nextIndex].focus();
}

function returnFromRules(event) {
  if (event.key === "Escape" && !rulesScreen.hidden) {
    event.preventDefault();
    showHome();
  }
}

function returnFromGame(event) {
  if (event.key === "Escape" && !gameScreen.hidden) {
    event.preventDefault();
    showHome();
  }
}

playButton.addEventListener("click", showGame);
rulesButton.addEventListener("click", showRules);
gameBackButton.addEventListener("click", showHome);
rulesBackButton.addEventListener("click", showHome);
document.addEventListener("keydown", moveMenuSelection);
document.addEventListener("keydown", returnFromRules);
document.addEventListener("keydown", returnFromGame);
