const homeScreen = document.querySelector("#home-screen");
const gameScreen = document.querySelector("#game-screen");
const rulesScreen = document.querySelector("#rules-screen");
const aboutScreen = document.querySelector("#about-screen");
const introScreen = document.querySelector("#intro-screen");
const playButton = document.querySelector("#play-button");
const rulesButton = document.querySelector("#rules-button");
const aboutButton = document.querySelector("#about-button");
const gameBackButton = document.querySelector("#game-back-button");
const rulesBackButton = document.querySelector("#rules-back-button");
const aboutBackButton = document.querySelector("#about-back-button");
const menuButtons = [playButton, rulesButton, aboutButton];
let returnButton = playButton;

function showHome() {
  homeScreen.hidden = false;
  gameScreen.hidden = true;
  rulesScreen.hidden = true;
  aboutScreen.hidden = true;
  introScreen.hidden = true;
  returnButton.focus();
}

function showRules() {
  homeScreen.hidden = true;
  gameScreen.hidden = true;
  aboutScreen.hidden = true;
  introScreen.hidden = true;
  rulesScreen.hidden = false;
  returnButton = rulesButton;
  rulesBackButton.focus();
}

function showAbout() {
  homeScreen.hidden = true;
  gameScreen.hidden = true;
  rulesScreen.hidden = true;
  introScreen.hidden = true;
  aboutScreen.hidden = false;
  returnButton = aboutButton;
  aboutBackButton.focus();
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

function returnFromAbout(event) {
  if (event.key === "Escape" && !aboutScreen.hidden) {
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

rulesButton.addEventListener("click", showRules);
aboutButton.addEventListener("click", showAbout);
gameBackButton.addEventListener("click", showHome);
rulesBackButton.addEventListener("click", showHome);
aboutBackButton.addEventListener("click", showHome);
document.addEventListener("keydown", moveMenuSelection);
document.addEventListener("keydown", returnFromRules);
document.addEventListener("keydown", returnFromAbout);
document.addEventListener("keydown", returnFromGame);
