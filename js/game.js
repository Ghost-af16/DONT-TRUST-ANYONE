const gameWorld = document.querySelector("#game-world");
const gameSteps = document.querySelector("#game-steps");
const gameHattori = document.querySelector("#game-hattori");
const gameQuestion = document.querySelector("#game-question");
const questionNumber = document.querySelector("#question-number");
const questionText = document.querySelector("#question-text");
const answerButtons = document.querySelectorAll(".answer-button");
const gameFeedback = document.querySelector("#game-feedback");

let currentStep = 0;
let currentQuestionStop = 0;
let isClimbing = false;
let answerLocked = true;
let cameraOffset = 0;
let gameScale = 1;
let gameTimers = [];

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
  gameWorld.classList.remove("is-climbing");
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
  if (isClimbing) {
    gameWorld.getBoundingClientRect();
    gameWorld.classList.add("is-climbing");
  }
}

function resetGame() {
  gameTimers.forEach(function (timer) {
    clearTimeout(timer);
  });
  gameTimers = [];
  currentStep = 0;
  currentQuestionStop = 0;
  isClimbing = false;
  answerLocked = true;
  cameraOffset = 0;
  gameWorld.classList.remove("is-climbing");
  gameWorld.style.transform = "translateY(0px)";
  gameHattori.style.left = steps[0].x + "%";
  gameHattori.style.top = stepY(0) + "px";
  gameHattori.alt = "Ninja Hattori standing on a stone ledge";
  gameQuestion.hidden = true;
  gameFeedback.textContent = "";
  questionNumber.textContent = "";
  questionText.textContent = "";
  answerButtons.forEach(function (button) {
    button.disabled = true;
    button.textContent = "";
  });
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
  gameTimers.push(setTimeout(showQuestion, 600));
}

function showQuestion() {
  if (gameScreen.hidden || isClimbing) {
    return;
  }
  const question = questionOrder[currentQuestionStop];
  questionNumber.textContent = "QUESTION " + (currentQuestionStop + 1) + " / " + questionOrder.length;
  questionText.textContent = question.text;
  gameFeedback.textContent = "";
  answerButtons.forEach(function (button, index) {
    button.textContent = "ABCD"[index] + ". " + question.options[index];
    button.disabled = false;
  });
  gameQuestion.hidden = false;
  answerLocked = false;
  answerButtons[0].focus();
}

function chooseAnswer(index) {
  if (gameScreen.hidden || gameQuestion.hidden || answerLocked) {
    return;
  }
  answerLocked = true;
  answerButtons.forEach(function (button) {
    button.disabled = true;
  });

  const question = questionOrder[currentQuestionStop];
  const correct = index === question.correct;
  gameFeedback.textContent = correct ? "CORRECT!" : "WRONG!";
  gameTimers.push(setTimeout(function () {
    if (correct) {
      beginClimb();
    } else {
      answerLocked = false;
      answerButtons.forEach(function (button) {
        button.disabled = false;
      });
    }
  }, 600));
}

function beginClimb() {
  isClimbing = true;
  gameQuestion.hidden = true;
  gameScreen.focus();
  gameWorld.classList.add("is-climbing");
  climbNextStep();
}

function climbNextStep() {
  const nextStop = questionStops[currentQuestionStop + 1];
  const targetStep = nextStop === undefined ? finalStep : nextStop;
  currentStep += 1;
  positionHattori();
  gameTimers.push(setTimeout(function () {
    if (currentStep < targetStep) {
      gameTimers.push(setTimeout(climbNextStep, 100));
      return;
    }
    isClimbing = false;
    gameWorld.classList.remove("is-climbing");
    if (nextStop === undefined || currentQuestionStop + 1 === questionOrder.length) {
      showHome();
    } else {
      currentQuestionStop += 1;
      showQuestion();
    }
  }, 450));
}

function returnFromGame(event) {
  if (event.key === "Escape" && !gameScreen.hidden) {
    event.preventDefault();
    showHome();
  }
}

answerButtons.forEach(function (button, index) {
  button.addEventListener("click", function () {
    chooseAnswer(index);
  });
});
window.addEventListener("resize", layoutGame);
document.addEventListener("keydown", returnFromGame);
