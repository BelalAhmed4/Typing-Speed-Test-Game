# Typing Speed Game

This is a simple typing speed game where users have to type displayed words within a limited time. The game dynamically adjusts its difficulty based on the length of the words.

## Features

- Words are categorized into three levels: Easy, Medium, and Hard.
- The user has a limited time to type each word.
- The game keeps track of achieved words and displays a final score.
- Option to play again after all words are typed correctly.

## Technologies Used

- HTML
- CSS
- JavaScript
- LocalStorage API for state management

## Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/BelalAhmed4/typing-speed-game.git
   cd typing-speed-game
   ```

2. **Open the Project:**
   Open the `index.html` file in your preferred web browser to start the game.

## Game Instructions

1. **Start the Game:**
   - Click the "Start" button to begin the game.

2. **Typing the Words:**
   - Type the word displayed in the `.the-word` element within the time specified.
   - The time varies based on the difficulty level:
     - Easy: 6 characters or less (5 seconds)
     - Medium: 7-8 characters (4 seconds)
     - Hard: 9 characters or more (3 seconds)

3. **Achieving Words:**
   - Correctly typed words are stored in the achieved words array.
   - If the input is incorrect or time runs out, the word is not added to the achieved words.

4. **End of Game:**
   - The game ends when all words are typed correctly.
   - A congratulatory message is displayed along with the option to play again.

5. **Play Again:**
   - Click the "Play Again" button to restart the game.

## Code Structure

The main functionalities are divided into several functions within `script.js`:

- **Getting Needed Elements:** Queries and stores all necessary DOM elements.
- **Initializing Game State:** Loads and initializes the game state from local storage.
- **Message Settings:** Sets the game level and corresponding time limits.
- **Appending Words:** Displays words on the game board.
- **Start Button Mission:** Handles the start button logic and game timer.
- **Get Random Word:** Fetches a random word based on the current level.
- **Control Function:** Updates the score and remaining time.
- **Play Again Function:** Resets the game state and allows replaying the game.
- **Check Words Array Length:** Checks if all words have been achieved and ends the game if true.
- **The Game Details:** Displays the current score and total words.

## Example Usage

```javascript
// Initialize the game
initializeGame();

// Start button event listener
startBtn.addEventListener("click", startBtnMission);

// Play again button event listener
playAgain.addEventListener("click", playAgainFunction);
```

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.
