function showRegister() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";
}

function showLogin() {
    document.getElementById("register-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
}

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch('https://your-backend-url.com/login', {  // Замените на URL вашего бэкенда
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Неверное имя пользователя или пароль.');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("user-name").innerText = username;
        document.getElementById("balance").innerText = data.balance;
        document.getElementById("balance").className = data.balance < 0 ? "balance negative" : "balance";
        document.getElementById("login-form").style.display = "none";
        document.getElementById("user-info").style.display = "block";
        document.getElementById("login-error").innerText = "";
    })
    .catch(error => {
        document.getElementById("login-error").innerText = error.message;
    });
}

function register() {
    const username = document.getElementById("new-username").value;
    const password = document.getElementById("new-password").value;
    const adminUsername = document.getElementById("admin-username").value;

    fetch('https://your-backend-url.com/register', {  // Замените на URL вашего бэкенда
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, adminUsername })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Пользователь уже существует или доступ запрещен.');
        }
        return response.json();
    })
    .then(data => {
        alert(data.message);
        showLogin();
    })
    .catch(error => {
        document.getElementById("register-error").innerText = error.message;
    });
}
