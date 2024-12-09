let users = {}; // Хранилище пользователей

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Пример проверки для администратора
    if (username === "sss" && password === "0") {
        // Сохраняем информацию о пользователе
        document.getElementById("user-name").innerText = username;
        document.getElementById("balance").innerText = "100"; // Пример баланса
        document.getElementById("login-form").style.display = "none";
        document.getElementById("user-info").style.display = "block";
        document.getElementById("admin-controls").style.display = "block";
        document.getElementById("login-error").innerText = "";
    } else {
        document.getElementById("login-error").innerText = "Неверное имя пользователя или пароль.";
    }
}

function registerUser() {
    const newUsername = document.getElementById("new-username").value;
    const newPassword = document.getElementById("new-password").value;

    if (newUsername in users) {
        document.getElementById("register-error").innerText = "Пользователь с таким именем уже существует.";
    } else {
        users[newUsername] = { password: newPassword, balance: 0 }; // Регистрация пользователя
        document.getElementById("register-error").innerText = "Пользователь зарегистрирован.";
        document.getElementById("new-username").value = ""; // Очищаем поле
        document.getElementById("new-password").value = ""; // Очищаем поле
    }
}
