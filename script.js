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
}
initializeGame();
// [2] Appending Words To Body
let wordsParent = document.querySelector(".up-coming-words");
function appendingWords() {
  var gameState = JSON.parse(localStorage.getItem("gameState"));
  console.log(gameState.wordsArray);
  gameState.wordsArray.forEach(function (e) {
    let span = document.createElement("span");
    span.textContent = `${e}`;
    wordsParent.appendChild(span);
  });
  localStorage.setItem("gameState", JSON.stringify(gameState));
}
appendingWords();
//*
// Storing Local Storages Array State Into Variable
let dataStored = window.localStorage.getItem("words");
let dataArray = JSON.parse(dataStored);
let achievedStored = window.localStorage.getItem("achievedWords");
let achievedArray = JSON.parse(achievedStored);
// [4] theGame Function
function theGame() {
  //* Getting Needed Elements
  let startBtn = document.querySelector(".start");
  let inputField = document.querySelector(".input");
  let theWord = document.querySelector(".the-word");
  let lvl = document.querySelector(".lvl");
  let seconds = document.querySelector(".seconds");
  let got = document.querySelector(".got");
  let total = document.querySelector(".total");
  let timeLeft = document.querySelector(".timeLeft");
  let result = document.querySelector(".result");
  let congrat = document.querySelector(".congrat");
  let playAgain = document.querySelector(".playAgain");
  //* Checking Level Through Minumum Word Length And According To Level Message Settings Is Set And Timeout Is Set
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
  //* Events
  startBtn.addEventListener("click", function () {
    // Clear Input Field
    inputField.value = "";
    // Remove show Class From Result If Player Already Played And Wrote Wrong Answer
    result.classList.remove("show");
    // Focus On Input Field
    inputField.focus();
    // - Random Word Is Choosen according to condition (6 - 8 - 9) And It Is put Into Avariable that is appended to "the word"
    function getRandomWord(lvl) {
      gameState = JSON.parse(localStorage.getItem("gameState"));
      wordsArray = gameState.wordsArray;

      let filteredWords = wordsArray.filter((word) => {
        if (lvl === "Easy") {
          return word.length === 6;
        } else if (lvl === "Medium") {
          return word.length === 8;
        } else if (lvl === "Hard") {
          return word.length === 9;
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
    theWord.textContent = getRandomWord(lvl.textContent);
    console.log(theWord.textContent);
    // - Time Start
    let counter = function () {
      timeLeft.innerHTML -= 1;
      if (timeLeft.textContent === "0") {
        clearInterval(handler);
        startBtn.onclick = () => {
          timeLeft.textContent = `${seconds.textContent}`;
        };
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
          // *****
          // Front Side
          forMessage();
          var gameState = JSON.parse(localStorage.getItem("gameState"));
          var wordsArray = gameState.wordsArray;
          var achievedWords = gameState.achievedWords;
          got.textContent = `${achievedWords.length} `;
          result.classList.remove("false");
          result.classList.add("true");
          result.classList.add("show");
          result.textContent = "True";
        } else {
          // Back Side
          // Front Side
          result.classList.remove("true");
          result.classList.add("false");
          result.classList.add("show");
          result.textContent = "False";
        }
      }
    };
    let handler = setInterval(counter, 1000);
  });
  // -  Score & Time Left
  let gameState = JSON.parse(localStorage.getItem("gameState"));
  let wordsArray = gameState.wordsArray;
  let achievedWords = gameState.achievedWords;
  got.textContent = `${achievedWords.length} `;
  total.textContent = `${wordsArray.length} `;
  timeLeft.textContent = `${seconds.innerHTML}`;
  localStorage.setItem("gameState", JSON.stringify(gameState));
}
theGame();
// The End
