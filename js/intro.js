const introLines = document.querySelectorAll(".intro-line");
const understandButton = document.querySelector("#understand-button");
let introTimers = [];

function resetIntro() {
  introTimers.forEach(function (timer) {
    clearTimeout(timer);
  });
  introTimers = [];
  introScreen.classList.remove("light-active");
  understandButton.hidden = true;
  introLines.forEach(function (line) {
    line.classList.remove("is-visible");
    line.setAttribute("aria-hidden", "true");
  });
}

function showIntro() {
  resetIntro();
  resetGame();
  homeScreen.hidden = true;
  rulesScreen.hidden = true;
  aboutScreen.hidden = true;
  gameScreen.hidden = true;
  introScreen.hidden = false;
  returnButton = playButton;
  introScreen.focus();
  startIntroSequence();
}

function startIntroSequence() {
  introTimers.push(setTimeout(function () {
    introScreen.classList.add("light-active");
  }, 800));

  introLines.forEach(function (line, index) {
    let revealDelay = 1150 + index * 650;
    if (index === introLines.length - 1) {
      revealDelay += 200;
    }
    introTimers.push(setTimeout(function () {
      line.classList.add("is-visible");
      line.setAttribute("aria-hidden", "false");
    }, revealDelay));
  });

  introTimers.push(setTimeout(function () {
    understandButton.hidden = false;
    if (document.activeElement === introScreen) {
      understandButton.focus();
    }
  }, 5050));
}

function finishIntro() {
  if (understandButton.hidden || introScreen.hidden) {
    return;
  }
  resetIntro();
  introScreen.hidden = true;
  showGame();
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
