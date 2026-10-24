const introLines = document.querySelectorAll(".intro-line");
const understandButton = document.querySelector("#understand-button");

function showIntro() {
  homeScreen.hidden = true;
  rulesScreen.hidden = true;
  aboutScreen.hidden = true;
  gameScreen.hidden = true;
  introScreen.hidden = false;
  introScreen.classList.add("light-active");
  introLines.forEach(function (line) {
    line.setAttribute("aria-hidden", "false");
  });
  understandButton.hidden = false;
  returnButton = playButton;
  understandButton.focus();
}

function finishIntro() {
  if (understandButton.hidden || introScreen.hidden) {
    return;
  }
  introScreen.hidden = true;
  gameScreen.hidden = false;
  gameBackButton.focus();
}

function returnFromIntro(event) {
  if (event.key === "Escape" && !introScreen.hidden) {
    event.preventDefault();
    showHome();
  }
}

playButton.addEventListener("click", showIntro);
understandButton.addEventListener("click", finishIntro);
document.addEventListener("keydown", returnFromIntro);
