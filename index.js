const userform = document.getElementById("user-form");
const lastname = document.getElementById("lastname");
const firstname = document.getElementById("firstname");
const email = document.getElementById("email");
const lotoNumbers = document.getElementById("lotoNumbers");
const playerNumbers = document.getElementById("player-numbers");
const generateNumbersBtn = document.getElementById("generate-numbers");
const lotoTable = document.getElementById("selection-container");
const chooseNumbersBtn = document.getElementById("choose-numbers");
const submitBtn = document.getElementById("submit");
const result = document.getElementById("result");
const drawnNumbers = document.getElementById("drawn-numbers");
const complementaryNumberDisplay = document.getElementById("complementary-number");
const message = document.getElementById("message");
const playAgainBtn = document.getElementById("play-again");

let selectedNumbers = [];
let selectedComplementaryNumber = null;
const MAX_NUMBERS = 5;
const MAX_TOTAL = 6;

function randomLotoNumbers() {
  let numbers = [];
  while (numbers.length < 5) {
    let number = Math.floor(Math.random() * 49) + 1;
    if (!numbers.includes(number)) {
      numbers.push(number);
    }
  }
  let complimentaryNumber;
  do {
    complimentaryNumber = Math.floor(Math.random() * 49) + 1;
  } while (numbers.includes(complimentaryNumber));

  // Return an object with numbers and complimentaryNumber
  return {
    numbers: numbers.map(num => String(num).padStart(2, "0")),
    complimentaryNumber: String(complimentaryNumber).padStart(2, "0")
  };
}


function createHtmlList(numbers, complimentaryNumber) {
  lotoNumbers.innerHTML = ''; // Clear previous numbers
  numbers.forEach(num => {
    const li = document.createElement("li");
    li.textContent = num;
    lotoNumbers.appendChild(li);
  });
  const liCompl = document.createElement("li");
  liCompl.textContent = complimentaryNumber;
  lotoNumbers.appendChild(liCompl);
  playerNumbers.style.display = "block";
}



function generateLotoTable() {
  lotoTable.style.display = "block";
  lotoTable.innerHTML = "";
  const description = document.createElement("p");
  description.textContent = "Choisissez 5 numéros entre 1 et 49 et un numéro complémentaire";
  lotoTable.appendChild(description);
  const table = document.createElement("table")
  const columns = 7;
  const rows = 7;
  let number = 1;

  for (let index = 0; index < rows; index++) {
    const row = document.createElement("tr");
    row.classList.add("loto-row");
    for (let indexB = 0; indexB < columns; indexB++) {
      if (number <= 49) {
        const cell = document.createElement("td");
        cell.textContent = String(number).padStart(2, "0");
        cell.classList.add("loto-number");
        cell.dataset.number = number;

        cell.addEventListener("click", () => {
          if (!checkLoto()) {
            alert("Veuillez d'abord entrer vos informations");
            return;
          }

          const num = parseInt(cell.dataset.number);
          if (cell.classList.contains("selected") || cell.classList.contains("complementary")) {
            if (cell.classList.contains("complementary")) {
              selectedComplementaryNumber = null;
            } else {
              selectedNumbers = selectedNumbers.filter(n => n !== num);
            }
            cell.classList.remove("selected", "complementary");
          } else {
            if (selectedNumbers.length < MAX_NUMBERS && !selectedComplementaryNumber) {
              selectedNumbers.push(num);
              cell.classList.add("selected");
            } else if (selectedNumbers.length === MAX_NUMBERS && !selectedComplementaryNumber) {
              selectedComplementaryNumber = num;
              cell.classList.add("complementary");
            }
          }
          updateNumbersList();
        });

        row.appendChild(cell);
      }
      number++;
    }
    table.appendChild(row);
  }
  lotoTable.appendChild(table);
}

function initializeEventListeners() {
  generateNumbersBtn.addEventListener("click", function (event) {
    event.preventDefault();
    if (checkLoto()) {
      const loto = randomLotoNumbers();
      selectedNumbers = loto.numbers.map(num => parseInt(num));
      selectedComplementaryNumber = parseInt(loto.complimentaryNumber);
      updateNumbersList();
    } else {
      alert("Entrez vos informations");
    }
  });

  chooseNumbersBtn.addEventListener("click", function (event) {
    event.preventDefault();
    if (checkLoto()) {
      generateLotoTable();
    } else {
      alert("Entrez vos informations");
    }
  });

  userform.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!checkLoto()) {
      alert("Veuillez remplir tous les champs correctement");
      return;
    }
    if (selectedNumbers.length !== MAX_NUMBERS || !selectedComplementaryNumber) {
      alert("Veuillez sélectionner 5 numéros et un numéro complémentaire");
      return;
    }
    saveData();
  });

  playAgainBtn.addEventListener("click", function () {
    selectedNumbers = [];
    selectedComplementaryNumber = null;
    lotoNumbers.innerHTML = "";
    playerNumbers.style.display = "none";
    result.style.display = "none";
    lotoTable.style.display = "none";
  });
}

// Initialiser les écouteurs d'événements
initializeEventListeners();

selectNumbers();

const checkLoto = () => {
  return (
    firstname.value.trim() !== "" &&
    lastname.value.trim() !== "" &&
    email.value.trim() !== "" &&
    validateEmail(email.value)
  );
};



const card1 = document.querySelector("#user-form .card:nth-child(1)");

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const emailLength = email.length;
  if (emailLength < 8 || emailLength > 30 || !regex.test(email)) {
    return false;
  }
  return true;
}

function updateNumbersList() {
  if (selectedNumbers.length > 0 || selectedComplementaryNumber) {
    playerNumbers.style.display = "block";
    lotoNumbers.innerHTML = "";
    selectedNumbers.forEach(num => {
      const li = document.createElement("li");
      li.textContent = String(num).padStart(2, "0");
      lotoNumbers.appendChild(li);
    });
    if (selectedComplementaryNumber) {
      const liCompl = document.createElement("li");
      liCompl.textContent = String(selectedComplementaryNumber).padStart(2, "0");
      lotoNumbers.appendChild(liCompl);
    }
  }
}

function saveData() {
  const userData = {
    firstname: firstname.value,
    lastname: lastname.value,
    email: email.value,
    numbers: selectedNumbers,
    complementaryNumber: selectedComplementaryNumber
  };

  fetch('data.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  })
    .then(response => response.json())
    .then(data => {
      alert("Vos données ont été sauvegardées !");
      showDrawButton();
    })
    .catch(error => {
      console.error('Error:', error);
      alert("Erreur lors de la sauvegarde des données");
    });
}

function showDrawButton() {
  result.style.display = "block";
  const drawBtn = document.createElement("button");
  drawBtn.textContent = "Lancer le tirage";
  drawBtn.addEventListener("click", performDraw);
  result.insertBefore(drawBtn, result.firstChild);
}

function performDraw() {
  const draw = randomLotoNumbers();
  drawnNumbers.textContent = "Numéros tirés : " + draw.numbers.join(", ");
  complementaryNumberDisplay.textContent = "Numéro complémentaire : " + draw.complimentaryNumber;

  // Vérifier les gagnants
  fetch('data.json')
    .then(response => response.json())
    .then(players => {
      const winners = checkWinners(players, draw);
      displayWinners(winners);
    });
}

function checkWinners(players, draw) {
  return players.map(player => {
    const matchingNumbers = player.numbers.filter(num =>
      draw.numbers.includes(String(num).padStart(2, "0"))
    ).length;
    const matchingComplementary =
      String(player.complementaryNumber).padStart(2, "0") === draw.complimentaryNumber;

    return {
      name: `${player.firstname} ${player.lastname}`,
      matches: matchingNumbers,
      complementary: matchingComplementary
    };
  });
}

function displayWinners(winners) {
  const winnersList = document.createElement("div");
  winnersList.innerHTML = "<h3>Résultats :</h3>";

  winners.forEach(winner => {
    const winnerText = `${winner.name}: ${winner.matches} numéro(s) correct(s)` +
      (winner.complementary ? " + numéro complémentaire" : "");
    const p = document.createElement("p");
    p.textContent = winnerText;
    winnersList.appendChild(p);
  });

  result.appendChild(winnersList);
}