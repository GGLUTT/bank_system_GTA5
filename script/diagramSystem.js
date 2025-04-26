document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById("history-chart").getContext("2d");

    // Початкові дані для діаграми
    const transactionData = {
        labels: [],
        datasets: [
            {
                label: "Withdraw",
                borderColor: "#ff073a",
                backgroundColor: "rgba(255, 7, 58, 0.2)",
                borderWidth: 2,
                pointRadius: 3,
                tension: 0.4,
                data: [],
            },
            {
                label: "Deposit",
                borderColor: "#00ffcc",
                backgroundColor: "rgba(0, 255, 204, 0.2)",
                borderWidth: 2,
                pointRadius: 3,
                tension: 0.4,
                data: [],
            },
            {
                label: "Transfer",
                borderColor: "#ffcc00",
                backgroundColor: "rgba(255, 204, 0, 0.2)",
                borderWidth: 2,
                pointRadius: 3,
                tension: 0.4,
                data: [],
            },
        ],
    };

    // Створюємо графік
    const historyChart = new Chart(ctx, {
        type: "line",
        data: transactionData,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { color: "#fff" },
                },
                x: {
                    ticks: { color: "#fff" },
                },
            },
            plugins: {
                legend: {
                    labels: {
                        color: "#fff",
                    },
                },
            },
        },
    });

    // Функція оновлення графіка
    function updateChart(type, amount) {
        const now = new Date().toLocaleTimeString(); // Додаємо поточний час

        // Видаляємо найстарші записи, якщо їх більше 10
        if (transactionData.labels.length >= 10) {
            transactionData.labels.shift();
            transactionData.datasets.forEach((dataset) => dataset.data.shift());
        }

        transactionData.labels.push(now);

        switch (type) {
            case "withdraw":
                transactionData.datasets[0].data.push(-amount); // Від’ємне значення для зняття
                break;
            case "deposit":
                transactionData.datasets[1].data.push(amount);
                break;
            case "transfer":
                transactionData.datasets[2].data.push(-amount);
                break;
        }

        historyChart.update();
    }

    // **Оновлення діаграми після кожної транзакції**
    function handleTransaction(type) {
        const amountInput = document.getElementById("amount");
        let amount = parseFloat(amountInput.value.replace(/,/g, ""));

        if (!isNaN(amount) && amount > 0) {
            updateChart(type, amount);
        }
    }

    // **Додаємо слухачі подій для оновлення діаграми**
    document.querySelector(".btn-confirm").addEventListener("click", () => {
        const formHeading = document.querySelector(".box.confirm h2").textContent;
        if (formHeading.includes("WITHDRAW")) {
            handleTransaction("withdraw");
        } else if (formHeading.includes("DEPOSIT")) {
            handleTransaction("deposit");
        } else if (formHeading.includes("TRANSFER")) {
            handleTransaction("transfer");
        }
    });
});
