// declaring which elements are needed
let qwerty = document.getElementById("qwerty");
let phrase = document.getElementById("phrase");
let missed = 0;
let scoreboard = document.querySelector("#scoreboard ol");
let overlay = document.getElementById("overlay");
let title = document.querySelector("#overlay .title");
let startButton = document.querySelector(".btn__reset");
let list = document.querySelector("#phrase ul");

// declarations of Array
let phrases = [
  "smarty pants",
  "fit as a fiddle",
  "in the same boat",
  "ball is in your court",
  "today was a good day",
  "regulators mount up",
  "spongebob squarepants",
  "be the change",
  "on top of the world",
];

// Hides display when start button is clicked
startButton.addEventListener("click", (event) => {
  overlay.style.display = "none";
});

// This function will randomly select a phrase from phraseArray
const getRandomPhraseAsArray = (phrases) => {
  let randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
  return Array.from(randomPhrase);
};

// for each character of phrase, it creates li element and appends
// Then checks that each character is a through z, if true: add class 'letter', if false: add class 'space'
const addPhraseToDisplay = (phrase) => {
  for (const char of phrase) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(char));
    list.appendChild(li);
    if (char >= "a" && char <= "z") {
      li.classList.add("letter");
    } else {
      li.classList.add("space");
    }
  }
};

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

// Search and match the button.innerText to the li.innerText and store all matches in the variable match
const checkLetter = (button) => {
  const storeAllLI = document.querySelectorAll("#phrase ul li");
  let match = null;
  for (let i = 0; i < storeAllLI.length; i++) {
    const li = storeAllLI[i];
    if (button.innerText === li.innerText) {
      li.classList.add("show");
      match = button.innerText;
    }
  }
  return match;
};

// listens for a button click on the qwerty keyboard
// then if theres a miss, remove heart and recreate a lostHeart
qwerty.addEventListener("click", (event) => {
  if (event.target.tagName == "BUTTON") {
    event.target.className = "chosen";
    let letterFound = checkLetter(event.target);
    if (letterFound === null) {
      missed++;
      scoreboard.removeChild(scoreboard.firstElementChild);
      let lostHeartLi = document.createElement("li");
      lostHeartLi.className = "tries";
      let lostHeartImg = document.createElement("img");
      lostHeartImg.src = "res/lostHeart.png ";
      lostHeartImg.className = "imgTries";
      lostHeartLi.appendChild(lostHeartImg);
      scoreboard.appendChild(lostHeartLi);
    }
  }
  checkWin();
});

// this checks to see if all of the letters were guess, or if you accumulated 5 misses
// triggers win scree/loss screen
function checkWin() {
  console.log("checking");
  let letter = document.getElementsByClassName(".letter");
  let show = document.getElementsByClassName(".show");
  if (letter.length == show.length) {
    overlay.className = "win";
    title.textContent = "You win my guy!";
    overlay.display = "flex";
  }
  if (missed === 5) {
    overlay.className = "lose";
    title.textContent = "You lost bro!";
    startButton.textContent = "Try your luck again";
    overlay.style.display = "flex";
  }
}

// resetting the phrases
function resetPhrase() {
  phrase.removeChild(phrase.firstElementChild);
  let ul = document.createElement("ul");
  phrase.appendChild(ul);
}

// resetting scoreboard
function resetScoreboard() {
  for (let i = 0; i < 5; i++) {
    scoreboard.removeChild(scoreboard.firstElementChild);
    let lostHeartLi = document.createElement("li");
    lostHeartLi.className = "tries";
    let lostHeartImg = document.createElement("img");
    lostHeartImg.src = "res/lostHeart.png";
    scoreboard.appendChild(lostHeartLi);
    lostHeartLi.appendChild(lostHeartImg);
  }
}

// resetting qwerty
function resetQWERTY() {
  let qwerty = document.querySelectorAll("#qwerty button");
  for (let i = 0; i < qwerty.length; i++) {
    qwerty[i].disabled = false;
    qwerty[i].classList.remove("chosen");
  }
}

// clearing the game
// This clears the phrase, scoreboard and the qwerty keyboard
function restartGame() {
  resetPhrase();
  resetScoreboard();
  resetQWERTY();
  missed = 0;
  let phrases = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phrases);
}
