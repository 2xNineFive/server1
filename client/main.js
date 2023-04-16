let canSubmit = true;
const searchBtn = document.getElementById("all");
const resetBtn = document.getElementById("reset");

const inputContainer = document.getElementById("input-container");
const dataContainer = document.getElementById("data-container");

searchBtn.addEventListener("click", search);
resetBtn.addEventListener("click", reset);
// async function getMvps() {
//     const x = await fetch ("http://localhost:8080/mvp")
//     const data = await x.json()
//     console.log(data);
//     return data
// }

async function search() {
  const inputData = input.value;

  //   console.log(inputData * 1);
  if (!isNaN(inputData * 1) && canSubmit === true) {
    const x = await fetch(`http://localhost:8080/mvps/year/${inputData}`);
    const data = await x.json();
    renderData(data, "year");
    canSubmit = false;
  } else if (isNaN(inputData * 1) && canSubmit === true) {
    const newData = inputData.replaceAll(" ", "").toLowerCase();
    const x = await fetch(`http://localhost:8080/mvps/player/${newData}`);
    const y = await x.json();
    renderData(y, "player");
    canSubmit = false;
  }

  renderInput();
}

function renderInput() {
  inputContainer.innerHTML = "";
  const input = document.createElement("input");
  input.type = "text";
  //   input.placeholder = "enter a year";
  input.id = "input";
  inputContainer.appendChild(input);
}
// onload
renderInput();

function renderData(data, type) {
  if (type === "year") {
    console.log(data);
    const year = document.createElement("p");
    year.innerText = data.year;
    dataContainer.appendChild(year);

    const name = document.createElement("p");
    name.innerText = data.player;
    dataContainer.appendChild(name);

    const team = document.createElement("p");
    team.innerText = data.team;
    dataContainer.appendChild(team);

    dataContainer.className = "data-container";
  }

  if (type === "player") {
    console.log(data);
    const name = document.createElement("p");
    name.innerText = data.player;
    dataContainer.appendChild(name);

    const year = document.createElement("p");
    year.innerText = data.year;
    dataContainer.appendChild(year);

    const team = document.createElement("p");
    team.innerText = data.team;
    dataContainer.appendChild(team);

    dataContainer.className = "data-container";
  }
}

// reset function
function reset() {
  dataContainer.innerHTML = "";
  canSubmit = true;
  dataContainer.className = "";
}

