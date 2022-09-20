const ALPHABETS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function generateId() {
  let time = Date.now();
  let id = "";
  for (let i = 0; i < 8; i++) {
    id = ALPHABETS[time % ALPHABETS.length] + id;
    time = Math.floor(time / ALPHABETS.length);
  }
  for (let i = 0; i < 8; i++) {
    id = id + ALPHABETS[Math.floor(Math.random() * ALPHABETS.length)];
  }
  return id;
}

export function generateImageId() {
  let id = generateId();
  id = id + "img";
  return id;
}

export function relatedWords({ keyword, recipes, n }) {
  if (n === null) n = 5;
  const mapped = recipes.map((recipe, i) => {
    return { i, value: levDist(keyword, recipe.title) };
  });
  mapped.sort((a, b) => {
    if (a.value > b.value) {
      return 1;
    }
    if (a.value < b.value) {
      return -1;
    }
    return 0;
  });
  const result = mapped.map((v) => recipes[v.i]);
  return result;
}

function levDist(first, second) {
  const matrix = Array.from(Array(first.length + 1), () =>
    new Array(second.length + 1).fill(0)
  );
  for (let i = 1; i <= first.length; i++) matrix[i][0] = i;
  for (let i = 1; i <= second.length; i++) matrix[0][i] = i;
  for (let r = 1; r <= first.length; r++) {
    for (let c = 1; c <= second.length; c++) {
      matrix[r][c] = Math.min(matrix[r - 1][c] + 1, matrix[r][c - 1] + 1);
      if (first.charAt(r - 1) !== second.charAt(c - 1)) {
        matrix[r][c] = Math.min(matrix[r - 1][c - 1] + 1, matrix[r][c]);
      } else {
        matrix[r][c] = Math.min(matrix[r - 1][c - 1], matrix[r][c]);
      }
    }
  }
  return matrix[first.length][second.length];
}
