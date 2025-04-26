/* notification */

document.addEventListener("DOMContentLoaded", () => {
    const notificationContainer = document.getElementById("notification-container");

    // Функція для створення сповіщення з іконкою
    function showNotification(message, type = "info") {
        const notification = document.createElement("div");
        notification.className = `notification ${type}`;

        // Визначаємо іконку залежно від типу
        let icon;
        switch (type) {
            case "success": icon = "✅"; break;
            case "error": icon = "❌"; break;
            case "info": icon = "ℹ️"; break;
            case "warning": icon = "⚠️"; break;
            default: icon = "🔔";
        }

        // Додаємо текст та іконку
        notification.innerHTML = `<span class="notif-icon">${icon}</span> ${message}`;

        // Додаємо сповіщення в контейнер
        notificationContainer.appendChild(notification);

        // Автоматичне видалення після завершення анімації
        notification.addEventListener("animationend", () => {
            if (notification.style.animation.includes("fadeOut")) {
                notification.remove();
            }
        });
    }

    // Використання в операціях
    const confirmButton = document.querySelector(".btn-confirm");

    confirmButton.addEventListener("click", () => {
        const amountInput = document.getElementById("amount");
        const amount = parseFloat(amountInput.value.replace(/,/g, ""));
        if (!isNaN(amount) && amount > 0) {
            showNotification(`Successfully processed $${amount.toLocaleString()}`, "success");
        } else {
            showNotification("Invalid amount entered. Please try again.", "error");
        }
    });

    // Тестове використання кнопок
    document.querySelector(".action-buttons .action-button:nth-child(1)").addEventListener("click", () => {
        showNotification(" Withdrawal action selected", "info");
    });
});


const num = 15;
 
let suma = 10;

for(let i = 0; i < num; i++){
    suma += 23;
}

console.log(suma);


console.log('Hello World!!!');
console.error('Hello World!!!');
console.warn('Hello World!!!');
