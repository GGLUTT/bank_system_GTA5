//  logic Drag And Drop

document.addEventListener("DOMContentLoaded", () => {
    const transactionMenu = document.getElementById("transaction-menu");
  
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
  
    // Початок переміщення
    transactionMenu.addEventListener("mousedown", (e) => {
      isDragging = true;
      offsetX = e.clientX - transactionMenu.offsetLeft;
      offsetY = e.clientY - transactionMenu.offsetTop;
      transactionMenu.style.transition = "none"; // Забираємо плавність під час перетягування
    });
  
    // Переміщення
    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
  
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;
  
      // Переміщення елемента
      transactionMenu.style.left = `${x}px`;
      transactionMenu.style.top = `${y}px`;
    });
  
    // Завершення переміщення
    document.addEventListener("mouseup", () => {
      isDragging = false;
      transactionMenu.style.transition = "all 0.2s ease"; // Додаємо плавність після завершення
    });
  });
