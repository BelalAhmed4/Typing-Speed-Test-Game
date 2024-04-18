//*[1] Getting Needed Elements
let startBtn = document.querySelector(".start");
let inputField = document.querySelector(".input");
// Disable Writing In Input Field
inputField.setAttribute("readonly", "");
let wordsField = document.querySelector(".up-coming-words");
let theWord = document.querySelector(".the-word");
let message = document.querySelector(".message");
let lvl = document.querySelector(".lvl");
let seconds = document.querySelector(".seconds");
let got = document.querySelector(".got");
let total = document.querySelector(".total");
let timeLeft = document.querySelector(".timeLeft");
let result = document.querySelector(".result");
let congrat = document.querySelector(".congrat");
let playAgain = document.querySelector(".playAgain");
//*[2] Initializing GameState
function initializeGame() {
  let gameState = JSON.parse(localStorage.getItem("gameState"));
  if (!gameState) {
    gameState = {
      wordsArray: [
        "banana",
        "purple",
        "rocket",
        "guitar",
        "cookie",
        "elephant",
        "mountain",
        "computer",
        "raindrop",
        "triangle",
        "beautiful",
        "landscape",
        "telephone",
        "something",
        "sunflower",
      ],
      achievedWords: [],
    };
  }
  localStorage.setItem("gameState", JSON.stringify(gameState));
  inputField.value = "";

  gameInfo();
  controlSet();
  chechWordsArrayLength();
}
initializeGame();
//*[3] Message Settings
function gameInfo() {
  let gameState = JSON.parse(localStorage.getItem("gameState"));
  let wordsArray = gameState.wordsArray;
  for (let i = 0; i < wordsArray.length; i++) {
    if (wordsArray[i].length === 6) {
      lvl.textContent = `Easy`;
      seconds.textContent = `5`;
      break;
    } else if (wordsArray[i].length === 8) {
      lvl.textContent = `Medium`;
      seconds.textContent = `4`;
      break;
    } else if (wordsArray[i].length === 9) {
      lvl.textContent = `Hard`;
      seconds.textContent = `3`;
      break;
    }
  }
  localStorage.setItem("gameState", JSON.stringify(gameState));
}
gameInfo();
//*[4] Appending Words To Body
function appendingWords() {
  // Appending Words Function
  wordsField.innerHTML = "";
  var gameState = JSON.parse(localStorage.getItem("gameState"));
  gameState.wordsArray.forEach(function (e) {
    let span = document.createElement("span");
    span.textContent = `${e}`;
    wordsField.appendChild(span);
  });
  // localStorage.setItem("gameState", JSON.stringify(gameState)); ###########
}
appendingWords();
//*[5] Start Btn Event Listener
function addStartEventListener() {
  let startBtn = document.querySelector(".start");
  startBtn.classList.remove("notExist");
  startBtn.classList.add("EventExist");
  startBtn.addEventListener("click", startBtnMission);
}

function removeStartEventListener() {
  let startBtn = document.querySelector(".start");
  startBtn.classList.remove("EventExist");
  startBtn.classList.add("notExist");
  startBtn.removeEventListener("click", startBtnMission);
}
//*[6] Get Random Word
function getRandomWord(lvl) {
  gameState = JSON.parse(localStorage.getItem("gameState"));
  wordsArray = gameState.wordsArray;
  let filteredWords = wordsArray.filter((word) => {
    if (lvl === "Easy") {
      return word.length <= 6;
    } else if (lvl === "Medium") {
      return word.length <= 8;
    } else if (lvl === "Hard") {
      return word.length >= 9;
    }
  });
  if (filteredWords.length > 0) {
    let randomIndex = Math.floor(Math.random() * filteredWords.length);
    return filteredWords[randomIndex];
  } else {
    return null;
  }
}
//*[7] Start Button Mission
function startBtnMission() {
  // Enable Writing In Input Field
  inputField.removeAttribute("readonly");
  removeStartEventListener();
  // Set Time Left Value
  timeLeft.textContent = `${seconds.textContent}`;
  // Clear Input Field
  inputField.value = "";
  // Remove show Class From Result If Player Already Played And Wrote Wrong Answer
  result.classList.remove("show");
  // Focus On Input Field
  inputField.focus();
  // - Random Word Is Choosen according to condition (6 - 8 - 9) And It Is put Into Avariable that is appended to "the word"
  theWord.textContent = getRandomWord(lvl.textContent);
  console.log(theWord.textContent);
  // - Time Start
  let counter = function () {
    timeLeft.textContent -= 1;
    if (timeLeft.textContent === "0") {
      addStartEventListener();
      clearInterval(handler);
      // - If Time Value Is Zero The Result Is Compared between Input Field And The Word
      //* According To Result (if condition)
      // - If True : Random Word Is Put To Achieved Array (Local Storage) and True Result Is Written
      // - If False : Random Word Is Back To Words Array and False Result Is Written
      if (
        theWord.textContent.toUpperCase().trim() ===
        inputField.value.toUpperCase().trim()
      ) {
        var gameState = JSON.parse(localStorage.getItem("gameState"));
        var wordsArray = gameState.wordsArray;
        var achievedWords = gameState.achievedWords;
        //Back Side
        var index = wordsArray.indexOf(theWord.textContent);
        achievedWords.push(`${wordsArray[index]}`);
        wordsArray.splice(index, 1);
        localStorage.setItem("gameState", JSON.stringify(gameState));
        chechWordsArrayLength();
        appendingWords();
        // Front Side
        gameInfo();
        // Disable Writing In Input Field
        inputField.setAttribute("readonly", "");
        result.classList.remove("false");
        result.classList.add("true");
        result.classList.add("show");
        result.textContent = "True";
        //Call Control function
        controlSet();
      } else {
        // Back Side
        // Front Side
        // Disable Writing In Input Field
        inputField.setAttribute("readonly", "");
        result.classList.remove("true");
        result.classList.add("false");
        result.classList.add("show");
        result.textContent = "False";
      }
    }
  };
  let handler = setInterval(counter, 1000);
}
//*[8] Control Fucntion
function controlSet() {
  // Score
  var gameState = JSON.parse(localStorage.getItem("gameState"));
  var wordsArray = gameState.wordsArray;
  var achievedWords = gameState.achievedWords;
  got.textContent = `${achievedWords.length} `;
  // Time
  timeLeft.textContent = `${seconds.textContent}`;
}
//*[9] Play Again function
let playAgainFunction = function () {
  wordsField.innerHTML = "";
  theWord.innerHTML = "";
  result.classList.remove("show");
  message.classList.remove("hide");
  playAgain.classList.remove("show");
  congrat.classList.remove("show");
  localStorage.clear();
  initializeGame();
  appendingWords();
  startBtn.addEventListener("click", startBtnMission);
};
//If User Finished The game
function chechWordsArrayLength() {
  var gameState = JSON.parse(localStorage.getItem("gameState"));
  var wordsArray = gameState.wordsArray;
  if (wordsArray.length === 0) {
    startBtn.removeEventListener("click", startBtnMission);
    message.classList.add("hide");
    playAgain.classList.add("show");
    congrat.classList.add("show");
  }
}
// Add Event To Play Again btn
playAgain.addEventListener("click", playAgainFunction);
//*[10] theGameDetails Function
function theGameDetails() {
  //* Checking Level Through Minumum Word Length And According To Level Message Settings Is Set And Timeout Is Set
  // -  Score & Time Left
  let gameState = JSON.parse(localStorage.getItem("gameState"));
  let wordsArray = gameState.wordsArray;
  let achievedWords = gameState.achievedWords;
  got.textContent = `${achievedWords.length} `;
  total.textContent = `${wordsArray.length + achievedWords.length} `;
  timeLeft.textContent = `${seconds.textContent}`;
  localStorage.setItem("gameState", JSON.stringify(gameState));
}
theGameDetails();
addStartEventListener();
//* The End
