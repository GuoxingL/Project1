// Make keyboard
let letters = document.querySelectorAll(`.letter`);
let input = document.querySelector("#input");
let secret = document.querySelector(".secret");
let startBtn = document.querySelector(".start");
let tries = document.querySelector(".left");
let count = document.querySelector(".count");

// List of words
let words = ["apple", "peach", "banana","kiwi","mango","pear"];

// Define variables - answer, guessed letters, etc.
let answer = "";
let newWord = [];

// Function to highlight guessed letters and update the game state
function highlight(e) {
  for (let i = 0; i < letters.length; i++) {
    if (letters[i].dataset.letter == e.key) {
      letters[i].classList.add("active");
      answer = answer.toLowerCase();
      let curLet = letters[i];
      if (answer.includes(e.key)) {
        let results = [];
        // If answer is right, it will change color 
        letters[i].style.background = "white";

        // Find all occurrences of the pressed key 
        function finder() {
          let index = answer.indexOf(curLet.innerHTML);
          while (index != -1) {
            results.push(index);
            index = answer.indexOf(curLet.innerHTML, index + 1);
          }
          return results;
        }
        finder();

        // Replace dashes with the guessed letter in the newWord array
        results.forEach((result) => newWord.splice(result, 1, curLet.innerHTML));
        secret.innerHTML = newWord.join("");

        // Check if the word is fully guessed and the player has tries left
        if (!secret.innerHTML.includes("-") && tries.innerText > 0) {
          input.classList.add("hidden");
          unClick(e);
          document.getElementById("result").innerHTML = `<p class='win'>You Win! The word was ${answer}.</p>`;
        }
      } else {
        if (letters[i].style.background !== "white") {
          letters[i].style.background = "white";
          if (tries.innerText > 0) {
            tries.innerText -= 1;
            if (tries.innerText === "0") {
              input.classList.add("hidden");
              unClick(e);
              document.getElementById("result").innerHTML = `<p class='lose'>You Lose! The word was ${answer}.</p>`;
            }
          }
        }
      }
    }
  }
}

// Function to remove highlight from letters and reset input value
function unClick(e) {
  for (let i = 0; i < letters.length; i++) {
    if (letters[i].dataset.letter == e.key) {
      letters[i].classList.remove("active");
    }
    input.value = "";
  }
}

// Function to random select a word to guess
function randomWord() {
  if (words.length === 0) {
    words = usedWords;
    usedWords = [];
  }
  answer = words[Math.floor(Math.random() * words.length)];
  return answer;
}

// Function to clear the result message
function clearResultMessage() {
  document.getElementById("result").innerHTML = "";
}

// Function to create a new blank game (clear out everything)
function createBlank() {
  clearBoardStyles();
  clearResultMessage(); 
  tries.innerText = 6;
  guessedLetters = [];
  randomWord();
  blankWord = "-".repeat(answer.length);
  secret.innerHTML = blankWord;
  newWord = blankWord.split("");
  count.innerText = answer.length;
}

// Function to clear board styles to remove all stuff
function clearBoardStyles() {
  letters.forEach((letter) => {
    letter.style.background = "";
    letter.classList.remove("active");
    input.value = "";
    input.classList.remove("hidden");
  });
  clearResultMessage();
}

// Event Listeners
input.addEventListener("keydown", highlight);
input.addEventListener("keyup", unClick);
startBtn.addEventListener("click", createBlank);

// Start a new game when the page loads
createBlank();
