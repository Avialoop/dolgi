let users = {
    "Eminov_Nurislam": { password: "38sed2", balance: -21 } // Регистрация пользователя с отрицательным балансом
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
