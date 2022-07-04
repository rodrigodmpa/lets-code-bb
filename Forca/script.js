function createBoard() {
  const words = ["Banana", "Abacaxi", "Abobrinha", "Pêra", "Abelha"];
  const word = words[getRandomIndex(0, words.length)].toUpperCase();

  const letters = word.split("");

  const wordContainer = document.getElementsByClassName("word-container")[0];
  const lifeContainer = document.getElementsByClassName("life-container")[0];
  const usedLetters = document.getElementsByClassName("used-letters")[0];

  for (let _ in [1, 2, 3, 4, 5]) {
    let element = document.createElement("div");
    element.classList.add("life");
    element.innerHTML = "❤️";
    lifeContainer.appendChild(element);
  }
  document.getElementsByClassName("success-container")[0].style.display =
    "none";
  wordContainer.innerHTML = "";
  usedLetters.innerHTML = "";

  for (let _ in letters) {
    let element = document.createElement("div");
    element.classList.add("letter-container");
    wordContainer.appendChild(element);
  }

  window.localStorage.setItem("letrasUsadas", "[]");
  window.localStorage.setItem("solution", word);
  window.localStorage.setItem("remaning", word.length);
  window.localStorage.setItem("lives", 5);
}

function guess(guessed_letter) {
  let used = false;
  let correct_indexes = [];
  let solution_letter;
  const usedLetters = JSON.parse(window.localStorage.getItem("letrasUsadas"));
  const solution = window.localStorage.getItem("solution");
  const remaning = window.localStorage.getItem("remaning");
  let lives = +window.localStorage.getItem("lives");

  for (let letter of usedLetters) {
    if (
      normalizeString(guessed_letter).toUpperCase() ===
      normalizeString(letter).toUpperCase()
    ) {
      used = true;
      alert("Letra já usada, tente outra!");
      return;
    }
  }
  if (!guessed_letter.match(/[a-z]/i)) {
    alert("Por favor, insira uma letra válida.");
    return;
  }

  usedLetters.push(guessed_letter);
  const usedLetterContainer =
    document.getElementsByClassName("used-letters")[0];
  let element = document.createElement("div");
  element.classList.add("used-letter");
  element.innerHTML += "&nbsp;&nbsp;" + guessed_letter.toUpperCase();
  usedLetterContainer.appendChild(element);
  window.localStorage.setItem("letrasUsadas", JSON.stringify(usedLetters));
  for (let index in solution) {
    if (
      normalizeString(solution[index]).toUpperCase() ===
      normalizeString(guessed_letter).toUpperCase()
    ) {
      correct_indexes.push(index);
      solution_letter = solution[index].toUpperCase();
    }
  }
  window.localStorage.setItem("remaning", remaning - correct_indexes.length);
  const letters_container = document.getElementsByClassName("letter-container");

  for (idx of correct_indexes) {
    letters_container[idx].innerHTML = solution_letter;
  }
  if (remaning - correct_indexes.length === 0) {
    document.getElementsByClassName("success-container")[0].style.display =
      "flex";
  }

  if (!solution_letter) {
    lives -= 1;
    window.localStorage.setItem("lives", lives);
    const lifeContainer = document.getElementsByClassName("life-container")[0];
    lifeContainer.removeChild(lifeContainer.lastChild);
    if (lives === 0) {
      alert(`Você perdeu! A resposta é: ${solution}`);
      createBoard();
    }
  }
}

function getRandomIndex(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function normalizeString(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function tentar(event) {
  event.preventDefault();
  const inputElement = document.getElementById("letter");
  const letter = inputElement.value;
  guess(letter);
  inputElement.value = "";
}

createBoard();
