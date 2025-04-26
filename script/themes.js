const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
  themeToggle.classList.toggle("dark"); // Перемикаємо клас темної теми
  body.classList.toggle("dark-theme"); // Перемикаємо загальну тему для сторінки

  const theme = body.classList.contains("dark-theme") ? "Dark" : "Light";
  console.log(`Theme switched to ${theme}`);
});