document.getElementById("balance-amount").textContent = "$ 300.000.000";
document.getElementById("balance-change").textContent = "-350.000 $ TODAY";




document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.getElementById("amount"); // Поле вводу
    const resultField = document.getElementById("result"); // Поле результату
  
 
    function formatNumber(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  
    // Подія вводу
    inputField.addEventListener("input", function () {
      let rawValue = inputField.value.replace(/\./g, ""); // Видаляємо крапки
      inputField.value = formatNumber(rawValue); 
      resultField.textContent = `${formatNumber(rawValue)}$`; 
    });
  });
  


 




// const tittle = 'Hella Bank';

// console.log(tittle);
// console.log(tittle.length);
// console.log(tittle.at(-2));
// console.log(tittle.codePointAt(1));






document.addEventListener("DOMContentLoaded", () => {
    const balanceElement = document.getElementById("balance-amount");
    const resultField = document.getElementById("result");
    const amountInput = document.getElementById("amount");
    const formHeading = document.querySelector(".box.confirm h2");
    const formDescription = document.querySelector(".box.confirm p");
    const confirmButton = document.querySelector(".btn-confirm");
    const transactionList = document.getElementById("transaction-list");
    const transactionMenu = document.getElementById("transaction-menu");
    const transactionButton = document.getElementById("transaction-button");
    const confirmForm = document.querySelector(".box.confirm form");

    let balance = 25000000; // Початковий баланс
    let transactions = []; // Історія транзакцій
    const maxBalance = 100000000; // Максимальний ліміт

    /** Форматування числа для виводу */
    function formatNumber(value) {
        return new Intl.NumberFormat("en-US").format(value);
    }

    /** Конвертація введених сум у число */
    function parseInput(value) {
        return parseFloat(value.replace(/\./g, "").replace(/,/g, "."));
    }

    /** Оновлення балансу та транзакцій */
    function updateBalance(amount, type) {
        if (type === "withdraw") {
            if (balance >= amount) {
                balance -= amount;
                showNotification(`You withdrew $${formatNumber(amount)}.`, "success");
            } else {
                showNotification("Insufficient funds for withdrawal.", "error");
                return;
            }
        } else if (type === "deposit") {
            if (balance + amount > maxBalance) {
                showNotification("Balance limit exceeded!", "error");
                return;
            }
            balance += amount;
            showNotification(`You deposited $${formatNumber(amount)}.`, "success");
        } else if (type === "transfer") {
            if (balance >= amount) {
                balance -= amount;
                showNotification(`You transferred $${formatNumber(amount)}.`, "success");
            } else {
                showNotification("Insufficient funds for transfer.", "error");
                return;
            }
        } else if (type === "pay") {
            if (balance >= amount) {
                balance -= amount;
                showNotification(`You paid $${formatNumber(amount)} for services.`, "success");
            } else {
                showNotification("Insufficient funds for payment.", "error");
                return;
            }
        }

        balanceElement.textContent = `$ ${formatNumber(balance)}`;
        addTransaction(type, amount);
    }

    /** Додавання транзакції до списку */
    function addTransaction(type, amount) {
        const date = new Date().toLocaleString();
        transactions.push({ type, amount, date });
        displayTransactions();
    }

    /** Оновлення списку транзакцій */
    function displayTransactions() {
        transactionList.innerHTML = transactions
            .map(
                (transaction) =>
                    `<li>${transaction.date} - ${transaction.type.toUpperCase()}: $${formatNumber(transaction.amount)}</li>`
            )
            .join("");
    }

    /** Показ повідомлення */
    function showNotification(message, type = "info") {
        const notificationContainer = document.getElementById("notification-container");
        const notification = document.createElement("div");
        notification.className = `notification ${type}`;
        notification.textContent = message;

        notificationContainer.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    /** Видалення додаткових полів */
    function removeAdditionalFields() {
        const accountNumberInput = document.getElementById("account-number");
        if (accountNumberInput) {
            accountNumberInput.parentElement.remove();
        }
    }

    /** Функція для обробки підтвердження операцій */
    function handleTransaction(type, actionText) {
        removeAdditionalFields();
        formHeading.textContent = actionText;
        formDescription.textContent = actionText;
        confirmButton.textContent = `CONFIRM ${actionText.toUpperCase()}`;

        confirmButton.onclick = () => {
            const amount = parseInput(amountInput.value);
            if (!isNaN(amount) && amount > 0) {
                updateBalance(amount, type);
                resultField.textContent = `$ ${formatNumber(amount)}`;
                amountInput.value = "";
            } else {
                showNotification("Please enter a valid amount.", "error");
            }
        };
    }

    /** Обробник для переказу на інший рахунок */
    document.querySelector(".action-buttons .action-button:nth-child(3)").addEventListener("click", () => {
        // First, clean up previous inputs and set correct heading
        removeAdditionalFields();
        
        // Set the form data attribute for styling
        document.querySelector(".box.confirm").setAttribute("data-form-type", "transfer");
        
        formHeading.textContent = "TRANSFER TO ACCOUNT";
        formDescription.textContent = "TRANSFER TO ACCOUNT";
        confirmButton.textContent = "CONFIRM TRANSFER TO ACCOUNT";
        
        // Update the result label to show 0$ initially
        resultField.textContent = "0$";
        
        // Add account number field
        let accountNumberInput = document.getElementById("account-number");
        if (!accountNumberInput) {
            const inputGroup = document.createElement("div");
            inputGroup.className = "input-group";
            inputGroup.innerHTML = `
                <label for="account-number">ACCOUNT NUMBER</label>
                <input type="text" id="account-number" placeholder="Enter account number" />
            `;
            confirmForm.insertBefore(inputGroup, confirmButton);
        }
        
        // Update the amount placeholder
        document.getElementById("amount").placeholder = "Enter amount";
        
        // Set confirmation button behavior
        confirmButton.onclick = () => {
            const amount = parseInput(amountInput.value);
            const accountNumber = document.getElementById("account-number").value;

            if (!accountNumber || accountNumber.trim() === "") {
                showNotification("Please enter a valid account number.", "error");
                return;
            }

            if (!isNaN(amount) && amount > 0) {
                updateBalance(amount, "transfer");
                resultField.textContent = `$ ${formatNumber(amount)}`;
                amountInput.value = "";
                document.getElementById("account-number").value = "";
            } else {
                showNotification("Please enter a valid amount.", "error");
            }
        };
    });
    
    // Reset the form type attribute when other operations are selected
    document.querySelector(".action-buttons .action-button:nth-child(1)").addEventListener("click", () => {
        document.querySelector(".box.confirm").removeAttribute("data-form-type");
        handleTransaction("withdraw", "WITHDRAW MONEY");
    });
    
    document.querySelector(".action-buttons .action-button:nth-child(2)").addEventListener("click", () => {
        document.querySelector(".box.confirm").removeAttribute("data-form-type");
        handleTransaction("deposit", "DEPOSIT MONEY");
    });
    
    document.querySelector(".action-buttons .action-button:nth-child(4)").addEventListener("click", () => {
        document.querySelector(".box.confirm").removeAttribute("data-form-type");
        handleTransaction("pay", "PAY FOR SERVICES");
    });

    /** Відкриття меню "Transaction History" */
    transactionButton.addEventListener("click", () => {
        transactionMenu.style.display = transactionMenu.style.display === "block" ? "none" : "block";
    });

    /** Початкове відображення балансу */
    balanceElement.textContent = `$ ${formatNumber(balance)}`;
});











/* notification */
// showNotification("Deposit completed successfully!", "success");
// showNotification("Invalid PIN. Please try again.", "error");
// showNotification("New feature coming soon!", "info");
// showNotification("Low account balance warning.", "warning");

document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.querySelector(".card-container");
  const changeCardButton = document.getElementById("change-card-button");
  const unlockCardButton = document.querySelector(".unlock-card-btn");
  const lockedCardOwner = document.getElementById("locked-card-owner");
  const lockedCardNumber = document.getElementById("locked-card-number");

  // Функція для перемикання картки
  changeCardButton.addEventListener("click", () => {
    cardContainer.classList.toggle("flipped");
  });

  // Функція для розблокування картки
  unlockCardButton.addEventListener("click", () => {
    lockedCardOwner.textContent = "Evgenii Lutiy";
    lockedCardNumber.textContent = "2333 3412 3214 5678";
    unlockCardButton.style.display = "none"; // Сховати кнопку розблокування
  });
});

