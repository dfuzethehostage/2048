function createGameField(width, height, filler) {
  return Array(height)
    .fill()
    .map((row) => Array(width).fill(filler));
}

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function log(gameField) {
  for (let i = 0; i < gameField.length; i++) {
    let row = "";
    for (let j = 0; j < gameField[0].length; j++) {
      if (j < gameField[0].length - 1) row += gameField[i][j] + "|";
      else row += gameField[i][j];
    }
    console.log(row + "\n");
  }
}

const gameField = createGameField(4, 4, 0);

function spawnTwoOnRandomFieldAndTestIfGameEnded(gameField) {
  const freeFields = [];
  for (let i = 0; i < gameField.length; i++) {
    for (let j = 0; j < gameField[0].length; j++) {
      if (gameField[i][j] == 0) freeFields.push([i, j]);
    }
  }
  if (freeFields.length == 0) return false;
  const chosenField = freeFields[random(0, freeFields.length - 1)];
  gameField[chosenField[0]][chosenField[1]] = 2;
  return true;
}
function swipe(direction, gameField) {
  if (direction === "left") {
    const alreadyCombined = {};
    for (let i = 0; i < gameField.length; i++) {
      for (let j = 0; j < gameField[0].length; j++) {
        moveAndCombine("left", alreadyCombined, i, j, gameField);
      }
    }
  }
  if (direction === "right") {
    const alreadyCombined = {};
    for (let i = 0; i < gameField.length; i++) {
      for (let j = gameField[0].length - 1; j >= 0; j--) {
        moveAndCombine("right", alreadyCombined, i, j, gameField);
      }
    }
  }
  if (direction === "up") {
    const alreadyCombined = {};
    for (let i = 0; i < gameField.length; i++) {
      for (let j = 0; j < gameField[0].length; j++) {
        moveAndCombine("up", alreadyCombined, j, i, gameField);
      }
    }
  }
  if (direction === "down") {
    const alreadyCombined = {};
    for (let i = 0; i < gameField.length; i++) {
      for (let j = gameField[0].length - 1; j >= 0; j--) {
        moveAndCombine("down", alreadyCombined, j, i, gameField);
      }
    }
  }
}

function moveAndCombine(direction, alreadyCombined, y, x, gameField) {
  const dirs = { left: [0, -1], right: [0, 1], up: [-1, 0], down: [1, 0] };
  let dir = dirs[direction];
  let yNext = y + dir[0];
  let xNext = x + dir[1];
  while (
    (gameField[y][x] == (gameField[yNext] || [])[xNext] ||
      (gameField[yNext] || [])[xNext] == 0) &&
    gameField[y][x] !== 0 &&
    (gameField[yNext] || [])[xNext] !== undefined &&
    !(`${yNext},${xNext}` in alreadyCombined)
  ) {
    if (gameField[y][x] == gameField[yNext][xNext] && gameField[y][x] !== 0) {
      alreadyCombined[`${yNext},${xNext}`] = true;
      gameField[yNext][xNext] += gameField[y][x];
      gameField[y][x] = 0;
      break;
    }
    gameField[yNext][xNext] += gameField[y][x];
    gameField[y][x] = 0;

    y += dir[0];
    x += dir[1];
    yNext += dir[0];
    xNext += dir[1];
  }
}

spawnTwoOnRandomFieldAndTestIfGameEnded(gameField);
spawnTwoOnRandomFieldAndTestIfGameEnded(gameField);
document.addEventListener("keydown", (event) => {
  if (event.key == "ArrowLeft") swipe("left", gameField);
  if (event.key == "ArrowRight") swipe("right", gameField);
  if (event.key == "ArrowUp") swipe("up", gameField);
  if (event.key == "ArrowDown") swipe("down", gameField);
  console.log(":");
  spawnTwoOnRandomFieldAndTestIfGameEnded(gameField);
  log(gameField);
});
