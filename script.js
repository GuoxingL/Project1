let options = 
    ["Apple", "Blueberry", "Pineapple", "Watermelon",];

let winCount = 0;
let count = 0;

const keyboard = document.getElementById("keyboard");
const rows = [
  ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
  ["K", "L", "M", "N", "O", "P", "Q", "R", "S"],
  ["T", "U", "V", "W", "X", "Y", "Z"]
];

    rows.forEach(row => {
      const rowElement = document.createElement("div");
      rowElement.className = "keyboard-row";

      row.forEach(char => {
        const button = document.createElement("button");
        button.className = "key";
        button.textContent = char;
        button.addEventListener("click", () => handleKeyClick(char));
        rowElement.appendChild(button);
      });

      keyboard.appendChild(rowElement);
    });

    function handleKeyClick(char) {
      // Do something with the clicked key (char)
      console.log("Clicked:", char);
    }
    // Add a click event listener to the entire keyboard
    keyboard.addEventListener("click", (event) => {
      if (event.target.classList.contains("key")) {
        console.log("Clicked:", event.target.textContent);
      }
    });
