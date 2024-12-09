let users = {
    "Eminov_Nurislam": { password: "38sed2", balance: -21, transactions: [] } // Регистрация пользователя с отрицательным балансом
};

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Показать индикатор загрузки
    document.getElementById("loading").style.display = 'block';

    // Имитация задержки запроса
    setTimeout(() => {
        if (username in users && users[username].password === password) {
            // Сохраняем информацию о пользователе
            document.getElementById("user-name").innerText = username;
            document.getElementById("balance").innerText = users[username].balance; // Баланс
            document.querySelector('.login-card').style.display = "none";
            document.getElementById("user-info").style.display = "block";
            document.getElementById("login-error").innerText = "";
        } else {
            document.getElementById("login-error").innerText = "Неверное имя пользователя или пароль.";
        }

        // Скрыть индикатор загрузки
        document.getElementById("loading").style.display = 'none';
    }, 1000); // Задержка 1 секунда
}

function showPayment() {
    hideAllSections();
    document.getElementById("service-payment").classList.remove("hidden");
}

function makePayment() {
    const amount = parseFloat(document.getElementById("payment-amount").value);
    const username = document.getElementById("user-name").innerText;

    if (isNaN(amount) || amount <= 0) {
        alert("Введите корректную сумму для оплаты.");
        return;
    }

    users[username].balance -= amount; // Уменьшаем баланс
    users[username].transactions.push(`Оплата услуг: -${amount} Р`); // Добавляем транзакцию
    updateBalance();
    alert("Оплата успешна!");
    document.getElementById("payment-amount").value = ''; // Очищаем поле
}

function showTransfer() {
    hideAllSections();
    document.getElementById("money-transfer").classList.remove("hidden");
}

function transferMoney() {
    const transferUsername = document.getElementById("transfer-username").value;
    const amount = parseFloat(document.getElementById("transfer-amount").value);
    const username = document.getElementById("user-name").innerText;

    if (!(transferUsername in users)) {
        alert("Пользователь не найден.");
        return;
    }

    if (isNaN(amount) || amount <= 0 || amount > users[username].balance) {
        alert("Введите корректную сумму для перевода.");
        return;
    }

    users[username].balance -= amount; // Уменьшаем баланс отправителя
    users[transferUsername].balance += amount; // Увеличиваем баланс получателя
    users[username].transactions.push(`Перевод: -${amount} Р на ${transferUsername}`); // Добавляем транзакцию отправителя
    users[transferUsername].transactions.push(`Перевод: +${amount} Р от ${username}`); // Добавляем транзакцию получателя
    updateBalance();
    alert("Перевод успешен!");
    document.getElementById("transfer-username").value = ''; // Очищаем поле
    document.getElementById("transfer-amount").value = ''; // Очищаем поле
}

function showHistory() {
    hideAllSections();
    const username = document.getElementById("user-name").innerText;
    const transactionList = document.getElementById("transaction-list");
    transactionList.innerHTML = ''; // Очищаем список транзакций
    users[username].transactions.forEach(transaction => {
        const li = document.createElement("li");
        li.innerText = transaction;
        transactionList.appendChild(li);
    });
    document.getElementById("transaction-history").classList.remove("hidden");
}

function showSettings() {
    hideAllSections();
    document.getElementById("settings").classList.remove("hidden");
}

function changePassword() {
    const newPassword = document.getElementById("new-password").value;
    const username = document.getElementById("user-name").innerText;

    if (newPassword.length < 6) {
        alert("Пароль должен содержать не менее 6 символов.");
        return;
    }

    users[username].password = newPassword; // Изменение пароля
    alert("Пароль успешно изменен!");
    document.getElementById("new-password").value = ''; // Очищаем поле
}

function logout() {
    // Скрываем пользовательскую информацию и показываем экран входа
    document.getElementById("user-info").style.display = "none";
    document.querySelector('.login-card').style.display = "block";
    document.getElementById("username").value = ''; // Очищаем поле имени пользователя
    document.getElementById("password").value = ''; // Очищаем поле пароля
    document.getElementById("login-error").innerText = ''; // Очищаем сообщение об ошибке
    document.getElementById("balance").innerText = ''; // Очищаем баланс
}

function hideAllSections() {
    // Скрываем все секции (оплата, перевод, история и настройки)
    document.getElementById("service-payment").classList.add("hidden");
    document.getElementById("money-transfer").classList.add("hidden");
    document.getElementById("transaction-history").classList.add("hidden");
    document.getElementById("settings").classList.add("hidden");
}

function updateBalance() {
    const username = document.getElementById("user-name").innerText;
    document.getElementById("balance").innerText = users[username].balance; // Обновляем отображаемый баланс
}
