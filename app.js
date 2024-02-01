const table = [];
const level = {
  easy: {
    columns: 9,
    rows: 9,
    bombs: 10,
  },
  normal: {
    columns: 16,
    rows: 16,
    bombs: 40,
  },
  hard: {
    columns: 30,
    rows: 16,
    bombs: 99,
  },
};
const types = {
  none: "NONE",
  number: "NUMBER",
  bomb: "BOMB",
};
const overs = {
  question: "QUESTION",
  flag: "FLAG",
  cover: "COVER",
  none: "NONE",
};
function getId(id) {
  return document.getElementById(id);
}
const container = getId("container");
const btnEasy = getId("s-easy");
const btnNormal = getId("s-normal");
const btnHard = getId("s-hard");
const btnCustom = getId("s-custom");

const iRows = getId("rows");
const iCols = getId("cols");
const iBombs = getId("bombs");

iCols.value = 10;
iRows.value = 10;
iBombs.value = 10;

const modalB = getId("config-b");
const modalM = getId("config-m");
const configuration = getId("configuration");
const msg = getId("msg");
const numberBombs = getId("counter-bomb");
const time = getId("counter-time");

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function setBombs(columns, rows, bombs) {
  const boxes = columns * rows;
  let countBoxes = boxes;
  let countBombs = bombs;
  for (let i = 0; i < rows; i++) {
    if (countBombs) {
      for (let j = 0; j < columns; j++) {
        if (table[j][i].type !== types.bomb) {
          if (generateRandomNumber(1, 100) === 1) {
            table[j][i].type = types.bomb;
            table[j][i].content = "X";
            countBombs--;
          }
        }
        countBoxes--;
      }
    }
  }
  if (countBombs > 0) {
    setBombs(columns, rows, countBombs);
  }
}



function generateNumbers() {
  const rows = table[0].length;
  const columns = table.length;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const box = table[j][i];
      if (box.type === types.bomb) {
        // console.log(box.upLeft[0], box.upLeft[1]);
        const upLeft =
          box.upLeft[0] < columns && box.upLeft[1] >= 0 && box.upLeft[0] >= 0
            ? table[box.upLeft[0]][box.upLeft[1]]
            : "";
        const up =
          box.up[0] < columns && box.up[1] >= 0 && box.up[0] >= 0
            ? table[box.up[0]][box.up[1]]
            : "";
        const upRight =
          box.upRight[0] < columns && box.upRight[1] >= 0 && box.upRight[0] >= 0
            ? table[box.upRight[0]][box.upRight[1]]
            : "";
        const left =
          box.left[0] < columns && box.left[1] >= 0 && box.left[0] >= 0
            ? table[box.left[0]][box.left[1]]
            : "";
        const right =
          box.right[0] < columns && box.right[1] >= 0 && box.right[0] >= 0
            ? table[box.right[0]][box.right[1]]
            : "";
        const downLeft =
          box.downLeft[0] < columns &&
          box.downLeft[1] >= 0 &&
          box.downLeft[0] >= 0
            ? table[box.downLeft[0]][box.downLeft[1]]
            : "";
        const down =
          box.down[0] < columns && box.down[1] >= 0 && box.down[0] >= 0
            ? table[box.down[0]][box.down[1]]
            : "";
        const downRight =
          box.downRight[0] < columns &&
          box.downRight[1] >= 0 &&
          box.downRight[0] >= 0
            ? table[box.downRight[0]][box.downRight[1]]
            : "";
        if (upLeft) {
          if (upLeft.type !== types.bomb) {
            upLeft.type = types.number;
            upLeft.content = +upLeft.content + 1;
          }
        }
        if (up) {
          if (up.type !== types.bomb) {
            up.type = types.number;
            up.content = +up.content + 1;
          }
        }
        if (upRight) {
          if (upRight.type !== types.bomb) {
            upRight.type = types.number;
            upRight.content = +upRight.content + 1;
          }
        }
        if (left) {
          if (left.type !== types.bomb) {
            left.type = types.number;
            left.content = +left.content + 1;
          }
        }
        if (right) {
          if (right.type !== types.bomb) {
            right.type = types.number;
            right.content = +right.content + 1;
          }
        }
        if (downLeft) {
          if (downLeft.type !== types.bomb) {
            downLeft.type = types.number;
            downLeft.content = +downLeft.content + 1;
          }
        }
        if (down) {
          if (down.type !== types.bomb) {
            down.type = types.number;
            down.content = +down.content + 1;
          }
        }
        if (downRight) {
          if (downRight.type !== types.bomb) {
            downRight.type = types.number;
            downRight.content = +downRight.content + 1;
          }
        }
      }
    }
  }
}

function generateTable(columns, rows, bombs) {
  for (let j = 0; j < columns; j++) {
    table.push([]);
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      table[j][i] = {
        id: "b" + (j + 1) + "-" + (i + 1),
        column: j,
        row: i,
        upLeft: [j - 1, i - 1],
        up: [j, i - 1],
        upRight: [j + 1, i - 1],
        left: [j - 1, i],
        right: [j + 1, i],
        downLeft: [j - 1, i + 1],
        down: [j, i + 1],
        downRight: [j + 1, i + 1],
        type: types.none,
        content: "",
        over: overs.cover,
      };
    }
  }
  setBombs(columns, rows, bombs);
}

function checkBox(columnn, roww, id) {
  const columns = table.length;
  const rows = table[0].length;
  const column = parseInt(columnn);
  const row = parseInt(roww);
  // console.log("CHECKBOX", id, column, row);
  if (column < 0 || column >= columns) {
    return;
  } else if (row < 0 || row >= rows) {
    return;
  }
  const selected = table[column][row];
  if (selected.over !== overs.cover) {
    return;
  }
  // console.log("CLICK WAKA WAKA");
  const box = getId(id);

  switch (selected.type) {
    case types.bomb:
      box.style.background = "red";
      setTimeout(() => {
        loose();
      }, 100);
      break;
    case types.number:
      selected.over = overs.none;
      box.className = "mine-box";
      box.innerHTML = selected.content;
      box.style.fontWeight = "bold";
      box.style.fontSize = "25px";
      switch(parseInt(selected.content)){
        case 1:
        box.style.color = "blue";
        break;
        case 2:
        box.style.color = "green";
        break;
        case 3:
        box.style.color = "#FFEB3B";
        break;
        case 4:
        box.style.color = "FF9800";
        break;
        case 5:
        box.style.color = "#F44336";
        break;
        case 6:
        box.style.color = "#C62828";
        break;
        case 7:
        box.style.color = "#8B0000";
        break;
        case 8:
        box.style.color = "#4B0082";
        break;
        
      }
      break;
    case types.none:
      selected.over = overs.none;
      box.className = "mine-box";
      checkBox(
        selected.upLeft[0],
        selected.upLeft[1],
        "b" + (+selected.upLeft[0] + 1) + "-" + (selected.upLeft[1] + 1)
      );
      checkBox(
        selected.up[0],
        selected.up[1],
        "b" + (selected.up[0] + 1) + "-" + (selected.up[1] + 1)
      );
      checkBox(
        selected.upRight[0],
        selected.upRight[1],
        "b" + (selected.upRight[0] + 1) + "-" + (selected.upRight[1] + 1)
      );
      checkBox(
        selected.left[0],
        selected.left[1],
        "b" + (selected.left[0] + 1) + "-" + (selected.left[1] + 1)
      );
      checkBox(
        selected.right[0],
        selected.right[1],
        "b" + (selected.right[0] + 1) + "-" + (selected.right[1] + 1)
      );
      checkBox(
        selected.downLeft[0],
        selected.downLeft[1],
        "b" + (selected.downLeft[0] + 1) + "-" + (selected.downLeft[1] + 1)
      );
      checkBox(
        selected.down[0],
        selected.down[1],
        "b" + (selected.down[0] + 1) + "-" + (selected.down[1] + 1)
      );
      checkBox(
        selected.downRight[0],
        selected.downRight[1],
        "b" + (selected.downRight[0] + 1) + "-" + (selected.downRight[1] + 1)
      );
      break;
  }
}

function clickBox(event, isRight = false) {
  const selected = event.target.id;
  const selectedSplitIndex = selected.indexOf("-");
  const column = selected.slice(1, selectedSplitIndex) - 1;
  const row = selected.slice(selectedSplitIndex + 1, selected.length) - 1;
  console.log("CLICK", column, row);
  if (isRight) {
    const selectedItem = table[column][row];
    const box = getId(selected);
    switch (selectedItem.over) {
      case overs.cover:
        selectedItem.over = overs.flag;
        box.className = "mine-box cover flag-box";
        box.innerHTML = "!";
        break;
      case overs.flag:
        selectedItem.over = overs.question;
        box.className = "mine-box cover question-box";
        box.innerHTML = "?";
        break;
      case overs.question:
        selectedItem.over = overs.cover;
        box.className = "mine-box cover";
        box.innerHTML = "";
        break;
    }
  } else {
    checkBox(column, row, selected);
  }
  checkWin();
}

function generateGame() {
  container.innerHTML = "";
  const rows = table[0].length;
  const columns = table.length;
  for (let i = 0; i < rows; i++) {
    const div = document.createElement("div");
    div.id = "row" + (i + 1);
    div.className = "row";
    container.appendChild(div);
    for (let j = 0; j < columns; j++) {
      const box = document.createElement("div");
      box.id = table[j][i].id;
      box.className = "mine-box cover";
      switch (table[j][i].over) {
        case overs.flag:
          box.innerHTML = "!";
          break;
        case overs.cover:
          box.innerHTML = "";
          break;
        case overs.question:
          box.innerHTML = "?";
          break;
        case overs.none:
          box.className = "mine-box";
          box.innerHTML = table[j][i].content;
          break;
      }
      box.addEventListener("click", clickBox);
      box.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        clickBox(event, true);
      });
      // console.log("CONTENT",table[j][i] );
      div.appendChild(box);
    }
  }

  // console.log("ROWS", rows);
  // console.log("COLUMNS", columns);
}

function closeModal() {
  modalM.style.display = "none";
  modalB.style.display = "none";
}

function openModal() {
  modalM.style.display = "flex";
  modalB.style.display = "flex";
}

let bombs = 0;
let numberTime = 0;
let interval;
function play(option) {
  // COLUMNS, ROWS, BOMBS
  table.length = 0;
  switch (option) {
    case "easy":
      bombs = level.easy.bombs;
      generateTable(level.easy.columns, level.easy.rows, level.easy.bombs);
      generateNumbers();
      generateGame();
      break;
    case "normal":
      bombs = level.normal.bombs;
      generateTable(
        level.normal.columns,
        level.normal.rows,
        level.normal.bombs
      );
      generateNumbers();
      generateGame();
      break;
    case "hard":
      bombs = level.hard.bombs;
      generateTable(level.hard.columns, level.hard.rows, level.hard.bombs);
      generateNumbers();
      generateGame();
      break;
    case "custom":
      bombs = iBombs.value;
      generateTable(iCols.value, iRows.value, iBombs.value);
      generateNumbers();
      generateGame();
      break;
  }
  closeModal();

  // generateTable(level.hard.columns, level.hard.rows, level.hard.bombs);
  // generateNumbers();
  // generateGame();
  time.innerText = 0;
  numberBombs.innerHTML = bombs;
  numberTime = 0;
  const timer = () => {
      if (numberTime === 999) {
        clearInterval(interval);
      } else {
        numberTime++;
        time.innerText = numberTime;
      }
  }
  clearInterval(interval);
  interval = setInterval(timer, 1000);
  console.log(time.innerText);
  // console.log("BEGIN", table);
}

function loose() {
  openModal();
  msg.innerHTML = "YOU LOSE!";
  msg.style.color = "RED";
}

function win() {
  openModal();
  msg.innerHTML = "YOU WIN!";
  msg.style.color = "BLUE";
}

function checkWin() {
  const rows = table[0].length;
  const columns = table.length;
  let countCovers = 0;
  let numBombs = bombs;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const item = table[j][i];
      if (item.over !== overs.none) {
        countCovers++;
        if(item.over === overs.flag){
          if(numBombs > 0){
            numBombs--;
          }
        }
      }
    }
  };
  numberBombs.innerText = numBombs;
  console.log("BOMBS", bombs);
  console.log("COVERS", countCovers);
  if (countCovers == bombs) {
    win();
  }
}

btnEasy.addEventListener("click", () => play("easy"));

btnNormal.addEventListener("click", () => play("normal"));

btnHard.addEventListener("click", () => play("hard"));

btnCustom.addEventListener("click", () => play("custom"));

configuration.addEventListener("click", () => {
  openModal();
  msg.innerText = "BEGIN";
  msg.style.color = "black";
});
