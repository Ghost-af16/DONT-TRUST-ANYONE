const gameHattori = document.querySelector("#game-hattori");

function resetGame() {
  gameScreen.style.setProperty("--character-height", "110px");
  gameHattori.style.left = "50%";
  gameHattori.style.top = "80%";
}

function showGame() {
  resetGame();
  homeScreen.hidden = true;
  rulesScreen.hidden = true;
  aboutScreen.hidden = true;
  introScreen.hidden = true;
  gameScreen.hidden = false;
  gameScreen.focus();
}

function returnFromGame(event) {
  if (event.key === "Escape" && !gameScreen.hidden) {
    event.preventDefault();
    showHome();
  }
}

document.addEventListener("keydown", returnFromGame);
