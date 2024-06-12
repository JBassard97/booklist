// src/utils/todaysDate.js
export function todaysDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  return `${month}/${day}`;
}
