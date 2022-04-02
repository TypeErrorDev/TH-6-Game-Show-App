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
startButton.addEventListener("click", start);

function start(e) {
  overlay.style.display = "none";
}

function reset(e) {
  restartGame(phrases);
  console.log("Reset");
}

// This function will randomly select a phrase from phraseArray
const getRandomPhraseAsArray = (phrases) => {
  let randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
  return Array.from(randomPhrase);
};

// for each character of phrase, it creates li element and appends
// Then checks that each character is a through z, if true: add class 'letter', if false: add class 'space'
const addPhraseToDisplay = (phrase, ul) => {
  for (const char of phrase) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(char));
    ul === undefined ? list.appendChild(li) : ul.appendChild(li);
    if (char >= "a" && char <= "z") {
      li.classList.add("letter");
    } else {
      li.classList.add("space");
    }
  }
  console.log(list);
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
  let letter = document.querySelectorAll(".letter");
  let show = document.querySelectorAll(".show");
  if (letter.length == show.length) {
    overlay.className = "win";
    title.textContent = "You win!";
    overlay.style.display = "flex";
    console.log(letter);
    console.log(show);
  }
  if (missed === 5) {
    overlay.className = "lose";
    title.textContent = "You lost bro!";
    startButton.textContent = "Try your luck again";
    overlay.style.display = "flex";
    startButton.removeEventListener("click", start);
    startButton.addEventListener("click", reset);
  }
}

// resetting the phrases
function resetPhrase(arr) {
  phrase.removeChild(phrase.firstElementChild);
  let ul = document.createElement("ul");
  ul.classList.add("reset_list");
  phrase.appendChild(ul);
  addPhraseToDisplay(arr, ul);
}

// resetting scoreboard
function resetScoreboard() {
  for (let i = 0; i < 5; i++) {
    scoreboard.removeChild(scoreboard.firstElementChild);
    let liveHeartLi = document.createElement("li");
    let liveHeartImg = document.createElement("img");
    liveHeartImg.src = "res/liveHeart.png";
    liveHeartImg.className = "imgTries";
    scoreboard.appendChild(liveHeartLi);
    liveHeartLi.appendChild(liveHeartImg);
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
function restartGame(arr) {
  let phrases = getRandomPhraseAsArray(arr);
  resetPhrase(phrases);
  resetScoreboard();
  resetQWERTY();
  missed = 0;
  overlay.style.display = "none";
}
