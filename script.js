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
// - If Time Value Is Zero The Result Is Compared between Input Field And The Word
// * According To Result (if condition)
// - If True : Random Word Is Put To Achieved Array (Local Storage) and True Result Is Written
// - If False : Random Word Is Back To Words Array and False Result Is Written
// * If Data Array Is Empty
// - Play Again Function btn Is Generated : Pushes All Elements Of Achieved To Words Local Storage Array Again And Play Again and Btn Is Hidden

// [1] Creating Words Data
let upComingWords = [
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
];
let achievedWords = [];
// [2] Appending Words To Body
let wordsParent = document.querySelector(".up-coming-words");
function appedningWords() {
  upComingWords.forEach(function (e) {
    let span = document.createElement("span");
    span.textContent = `${e}`;
    wordsParent.appendChild(span);
  });
}
appedningWords();
// [3] Creating Local Storages
window.localStorage.setItem("words", JSON.stringify(upComingWords));
// [4] Achieved Words Location
window.localStorage.setItem("achievedWords", JSON.stringify(achievedWords));
// [5] theGame Function
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
  //*
  let dataStored = window.localStorage.getItem("words");
  let dataArray = JSON.parse(dataStored);
  //* Checking Level Through Minumum Word Length And According To Level Message Settings Is Set And Timeout Is Set
  // Message Settings
  function forMessage() {
    for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i].length == 6) {
        lvl.textContent = `Easy`;
        seconds.textContent = `3`;
        break;
      } else if (dataArray[i].length == 8) {
        lvl.textContent = `Medium`;
        seconds.textContent = `4`;
        break;
      } else if (dataArray[i].length == 9) {
        lvl.textContent = `Hard`;
        seconds.textContent = `4`;
        break;
      }
    }
  }
  forMessage();
  //* Events
  startBtn.addEventListener("click", function () {
    // Focus On Input Field
    inputField.focus();
    // - Random Word Is Choosen according to condition (6 - 8 - 9) And It Is put Into Avariable that is appended to "the word"
    function randomWord() {
      //* Declaration Of Cases
      const sixLetterWords = dataArray.filter((word) => word.length === 6);
      const eightLetterWords = dataArray.filter((word) => word.length === 8);
      const nineLetterWords = dataArray.filter((word) => word.length === 9);
      //*********************************/
      // Getting Random Word From sixLetterWords
      if (sixLetterWords.length > 0) {
        // Random Index
        let randomIndex = Math.floor(Math.random() * sixLetterWords.length);
        // Random Word With 6 Letters
        let randomSixLetterWord = sixLetterWords[randomIndex];
        theWord.textContent = `${randomSixLetterWord}`;
        // Getting Random Word From eightLetterWords
      } else if (eightLetterWords.length > 0) {
        // Random Index
        let randomIndex = Math.floor(Math.random() * eightLetterWords.length);
        // Random Word With 8 Letters
        let randomEightLetterWord = eightLetterWords[randomIndex];
        theWord.textContent = `${randomEightLetterWord}`;
        // Getting Random Word From nineLetterWords
      } else if (nineLetterWords.length > 0) {
        // Random Index
        let randomIndex = Math.floor(Math.random() * nineLetterWords.length);
        // Random Word With 6 Letters
        let randomNineLetterWord = nineLetterWords[randomIndex];
        theWord.textContent = `${randomNineLetterWord}`;
      }
    }
    randomWord();
    // - Time Start
    let counter = function () {
      timeLeft.innerHTML -= 1;
      if (timeLeft.textContent === "0") {
        clearInterval(handler);
        // - If Time Value Is Zero The Result Is Compared between Input Field And The Word
        // * According To Result (if condition)
        // - If True : Random Word Is Put To Achieved Array (Local Storage) and True Result Is Written
        // - If False : Random Word Is Back To Words Array and False Result Is Written

        if (
          theWord.textContent.trim().toUpperCase() ===
          inputField.value.trim().toUpperCase()
        ) {
          achievedWords.push(theWord.textContent);
          console.log(achievedWords);
          console.log(upComingWords);
        } else {
          console.log(`No !`);
        }
      }
    };
    let handler = setInterval(counter, 1000);
  });
  // -  Score & Time Left
  got.textContent = `${achievedWords.length} `;
  total.textContent = `${upComingWords.length} `;
  timeLeft.textContent = `${seconds.innerHTML}`;
}
theGame();
