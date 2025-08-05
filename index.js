const userform = document.getElementById("user-form");
const lastname = document.getElementById("lastname");
const firstname = document.getElementById("firstname");
const email = document.getElementById("email");
const lotoNumbers = document.getElementById("lotoNumbers");
const playerNumbers = document.getElementById("player-numbers");
const generateNumbersBtn = document.getElementById("generate-numbers");
const lotoTable = document.getElementById("selection-container");
const chooseNumbersBtn = document.getElementById("choose-numbers");

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
      const cell = document.createElement("td");
      cell.textContent = String(number).padStart(2, "0");
      cell.classList.add("loto-number");
      row.appendChild(cell);
      number++;
    }
    table.appendChild(row)
  }
  lotoTable.appendChild(table)
}

function selectNumbers() {
  if (generateNumbersBtn) {
    generateNumbersBtn.addEventListener("click", function (event) {
      event.preventDefault();
      if (checkLoto()) {
        const loto = randomLotoNumbers();
        createHtmlList(loto.numbers, loto.complimentaryNumber);
      } else {
        alert("Entrez vos informations");
      }
    });
  }
  if (chooseNumbersBtn) {
    chooseNumbersBtn.addEventListener("click", function (event) {
      event.preventDefault();

      if (checkLoto()) {
        generateLotoTable();
      } else {
        alert("Entrez vos informations");
      }
    });
  }
}

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
