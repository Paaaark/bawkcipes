const ALPHABETS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

export function generateId() {
  let time = Date.now();
  let id = "";
  for (let i = 0; i < 8; i++) {
    id = id + ALPHABETS[time % ALPHABETS.length];
    console.log(time);
    time = Math.floor(time / ALPHABETS.length);
  }
  for (let i = 0; i < 8; i++) {
    id = id + ALPHABETS[Math.floor(Math.random() * ALPHABETS.length)];
  }
  return id;
}
