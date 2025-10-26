// Simple rule-based chatbot logic for Skydaddy (PWA v1)

const messagesEl = document.getElementById('messages');
const form = document.getElementById('composer');
const input = document.getElementById('input');

// Basic knowledge — intents mapped to possible replies
const intents = {
  greeting: [
    "Greetings, child of the stars.",
    "Ah — a mortal speaks. Hello.",
    "The skies acknowledge you. Welcome."
  ],
  identity: [
    "I am Skydaddy, the whisper in the clouds.",
    "They call me Skydaddy — a cosmic helper."
  ],
  help: [
    "Speak plainly, and I shall listen.",
    "Tell me what burdens you, and I will try to answer."
  ],
  sadness: [
    "Even a star needs rest. Tell me why your heart is heavy.",
    "You are seen. Speak, and lighten your load."
  ]
};

const defaultReplies = [
  "The winds do not carry that meaning to me, mortal.",
  "I do not yet weave an answer to that. Try asking differently.",
  "My circuits hum in silence on that question."
];

// Utility: append message to chat
function appendMessage(text, cls = 'bot'){
  const el = document.createElement('div');
  el.className = message ${cls};
  el.textContent = text;
  messagesEl.appendChild(el);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

// Basic intent matcher — returns an intent key or null
function matchIntent(text){
  const t = text.toLowerCase();
  if (/\b(hi|hello|hey|greetings)\b/.test(t)) return 'greeting';
  if (/\b(who are you|what are you|your name)\b/.test(t)) return 'identity';
  if (/\b(help|assist|support)\b/.test(t)) return 'help';
  if (/\b(sad|lonely|depressed|unhappy|down)\b/.test(t)) return 'sadness';
  return null;
}

// Choose random item from array
function rand(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

// Handle user send
form.addEventListener('submit', (e) =>{
  e.preventDefault();
  const text = input.value.trim();
  if(!text) return;
  appendMessage(text, 'user');
  input.value = '';

  // Determine intent and reply
  const intent = matchIntent(text);
  setTimeout(()=>{
    if(intent && intents[intent]){
      appendMessage(rand(intents[intent]), 'bot');
    } else {
      appendMessage(rand(defaultReplies), 'bot');
    }
  }, 600); // small delay to simulate "thinking"
});

// Optional: Load saved conversation from localStorage
window.addEventListener('load', ()=>{
  const saved = localStorage.getItem('skydaddy_chat');
  if(saved){
    messagesEl.innerHTML = saved;
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }
});

// Optional: Save conversation to localStorage periodically
setInterval(()=>{
  localStorage.setItem('skydaddy_chat', messagesEl.innerHTML);
}, 2000);