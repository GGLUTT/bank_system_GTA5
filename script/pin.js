document.addEventListener("DOMContentLoaded", () => {
    const pinInput = document.getElementById("pin-input");
    const pinDots = document.querySelectorAll(".pin-dot");
    const loginScreen = document.querySelector(".login-screen");
    const mainContent = document.getElementById("main-content");
    const welcomeMessage = document.getElementById("welcome-message");
    const errorMessage = document.getElementById("error-message");
    const cardOwnerField = document.getElementById("card-owner");

    // Зберігаємо інформацію про користувачів в об'єкті
    const users = {
        "1234": "Evgenii", // PIN: Ім'я
        "5678": "Olena",
        "0000": "Admin",
    };

    pinInput.focus();

    pinInput.addEventListener("input", () => {
        const pinValue = pinInput.value;

        // Оновлення точок
        pinDots.forEach((dot, index) => {
            dot.style.backgroundColor = index < pinValue.length ? "#000" : "#555";
        });

        // Перевірка введеного PIN
        if (pinValue.length === 4) {
            if (users[pinValue]) {
                const userName = users[pinValue];
                console.log(`Correct PIN entered for user: ${userName}`);

                // Оновлюємо привітання
                welcomeMessage.querySelector("h1").textContent = `Welcome, ${userName}!`;

                // Оновлюємо ім'я на картці
                cardOwnerField.textContent = userName;

                // Показуємо екран привітання
                loginScreen.style.display = "none";
                welcomeMessage.style.display = "flex";

                // Через 3 секунди приховуємо екран привітання і показуємо основний контент
                setTimeout(() => {
                    welcomeMessage.style.animation = "fade-out-bg 1s ease forwards";
                    setTimeout(() => {
                        welcomeMessage.style.display = "none";
                        mainContent.style.display = "block";
                    }, 1000);
                }, 3000);
            } else {
                console.log("Incorrect PIN entered.");
                errorMessage.textContent = "Invalid PIN. Please try again.";
                errorMessage.style.color = "red";

                // Очищення після невірного введення
                setTimeout(() => {
                    pinInput.value = "";
                    pinDots.forEach((dot) => (dot.style.backgroundColor = "#555"));
                    errorMessage.textContent = "";
                }, 1000);
            }
        }
    });
});