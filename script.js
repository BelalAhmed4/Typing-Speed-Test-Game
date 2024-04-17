//* Plan
//[1] Creating up-coming-words In Local Storage
// [1.1] Creating Achieved Words Array In Local Storage
// [2] Appending Words To Body
//// [3] Connect Input Field With The Word
//// [4] Show Answer (Congratulation If True & Wrong If False)
// [3] The Game Function
// * Press Start
// //- Focus on Input Field
//// - Random Word Is Choosen according to condition And It Is put Into Avariable that is appended to "the word"
//// - Score
//// - Time Start
////- If Time Value Is Zero The Result Is Compared between Input Field And The Word
// * According To Result (if condition)
//// - If True : Random Word Is Put To Achieved Array (Local Storage) and True Result Is Written
//// - If False : Random Word Is Back To Words Array and False Result Is Written
// * If Data Array Is Empty
// - Play Again Function btn Is Generated : Pushes All Elements Of Achieved To Words Local Storage Array Again And Play Again and Btn Is Hidden

// [1] Creating Words Data
// let upComingWords = [
//   "banana",
//   "purple",
//   "rocket",
//   "guitar",
//   "cookie",
//   "elephant",
//   "mountain",
//   "computer",
//   "raindrop",
//   "triangle",
//   "beautiful",
//   "landscape",
//   "telephone",
//   "something",
//   "sunflower",
// ];
//* Getting Needed Elements
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
// [2] Initializing GameState
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

  forMessage();
  controlSet();
  chechWordsArrayLength();
}
initializeGame();
// Message Settings
function forMessage() {
  let gameState = JSON.parse(localStorage.getItem("gameState"));
  let wordsArray = gameState.wordsArray;
  for (let i = 0; i < wordsArray.length; i++) {
    if (wordsArray[i].length === 6) {
      lvl.textContent = `Easy`;
      seconds.textContent = `6`;
      break;
    } else if (wordsArray[i].length === 8) {
      lvl.textContent = `Medium`;
      seconds.textContent = `7`;
      break;
    } else if (wordsArray[i].length === 9) {
      lvl.textContent = `Hard`;
      seconds.textContent = `8`;
      break;
    }
  }
  localStorage.setItem("gameState", JSON.stringify(gameState));
}
forMessage();
// [2] Appending Words To Body
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
//* Start Btn
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
//* Get Random Word
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
    // Handle the case when no words match the level
    return null;
  }
}
// Start Button Mission
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
      // startBtn.onclick = () => {
      //   timeLeft.textContent = `${seconds.textContent}`;
      // };
      // - If Time Value Is Zero The Result Is Compared between Input Field And The Word
      // * According To Result (if condition)
      // - If True : Random Word Is Put To Achieved Array (Local Storage) and True Result Is Written
      // - If False : Random Word Is Back To Words Array and False Result Is Written
      if (
        theWord.textContent.toUpperCase().trim() ===
        inputField.value.toUpperCase().trim()
      ) {
        var gameState = JSON.parse(localStorage.getItem("gameState"));
        var wordsArray = gameState.wordsArray;
        var achievedWords = gameState.achievedWords;
        // Back Side
        var index = wordsArray.indexOf(theWord.textContent);
        achievedWords.push(`${wordsArray[index]}`);
        wordsArray.splice(index, 1);
        localStorage.setItem("gameState", JSON.stringify(gameState));
        chechWordsArrayLength();
        appendingWords();
        // *****
        // Front Side
        forMessage();
        // Disable Writing In Input Field
        inputField.setAttribute("readonly", "");
        // *Call Control function
        controlSet();
        result.classList.remove("false");
        result.classList.add("true");
        result.classList.add("show");
        result.textContent = "True";
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
//* Control Fucntion
function controlSet() {
  // Score
  var gameState = JSON.parse(localStorage.getItem("gameState"));
  var wordsArray = gameState.wordsArray;
  var achievedWords = gameState.achievedWords;
  got.textContent = `${achievedWords.length} `;
  // Time
  timeLeft.textContent = `${seconds.textContent}`;
}
//* Play Again function
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
//* For Play Again If User Finished The game

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
// [4] theGameDetails Function
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
// The End
