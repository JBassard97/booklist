// src/utils/todaysDate.js
export function todaysDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const year = today.getFullYear();
  return `${month}/${day}/${year}`;
}
