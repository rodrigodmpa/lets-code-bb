function createBoard() {
    const words = ["Banana", "Abacaxi", "Abobrinha", "Pera", "Abelha"];
    const word = words[getRandomIndex(0, words.length)].toUpperCase();

    const letters = word.split("");

    const wordContainer = document.getElementsByClassName('word-container')[0];

    for (let _ in letters) {
        let element = document.createElement("div");
        element.classList.add("letter-container");
        wordContainer.appendChild(element);
    }

    window.localStorage.setItem('letrasUsadas', '[]');
    window.localStorage.setItem('solution', word);
}

function guess(guessed_letter) {
    let used = false;
    let correct_indexes = []
    const usedLetters = JSON.parse(window.localStorage.getItem('letrasUsadas'));
    const solution = window.localStorage.getItem('solution');
    for (let letter of usedLetters) {
        if (guessed_letter === letter) {
            used = true;
            alert('Ja usada')
            return
        }
    }

    usedLetters.push(guessed_letter);
    window.localStorage.setItem('letrasUsadas', JSON.stringify(usedLetters));
    for (let index in solution) {
        if (solution[index] === guessed_letter) {

            correct_indexes.push(index)
        }
    }

    const letters_container = document.getElementsByClassName('letter-container');
    for (idx of correct_indexes) letters_container[idx].innerHTML = guessed_letter
}


function getRandomIndex(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

createBoard()

function tentar(event) {
    event.preventDefault()
    const inputElement = document.getElementById("letter");
    const letter = inputElement.value;
    guess(letter)
    inputElement.value = ""
}