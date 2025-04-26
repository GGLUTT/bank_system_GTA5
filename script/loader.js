document.addEventListener("DOMContentLoaded", () => {
    const loaderContainer = document.getElementById("loader-container");

    // Показати лоадер
    function showLoader() {
        loaderContainer.style.display = "flex";
    }

    // Приховати лоадер
    function hideLoader() {
        loaderContainer.style.display = "none";
    }

    // Додавання лоадера до кожної операції
    const confirmButton = document.querySelector(".btn-confirm");

    confirmButton.addEventListener("click", () => {
        const amount = parseFloat(document.getElementById("amount").value.replace(/,/g, ""));
        if (!isNaN(amount) && amount > 0) {
            showLoader(); // Показуємо лоадер
            setTimeout(() => {
                hideLoader(); // Ховаємо лоадер після завершення операції
            }, 2000); // Симуляція затримки операції (2 секунди)
        } else {
            alert("Please enter a valid amount.");
        }
    });
});