const chatBox = document.getElementById("chat-box");
const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") sendMessage();
});

function sendMessage() {
    let message = userInput.value.trim();
    if (message === "") return;

    // Add user's message
    addMessage(message, "user");

    userInput.value = "";

    // Fake Skydaddy reply after delay
    setTimeout(() => {
        addMessage("✨ Skydaddy has heard you...", "bot");
    }, 800);
}

function addMessage(text, sender) {
    let msgDiv = document.createElement("div");
    msgDiv.classList.add("message", sender === "user" ? "user-message" : "bot-message");
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);

    // Auto scroll
    chatBox.scrollTop = chatBox.scrollHeight;
}
