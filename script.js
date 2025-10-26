/* Modern Skydaddy chat logic
   - 50+ predefined replies (intent matching + patterns)
   - typing indicator + typewriter effect
   - paste this into your existing script.js (replaces previous logic)
*/

/* ---------- DOM references ---------- */
const chatBox = document.getElementById('chatBox');
const composer = document.getElementById('composer');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

/* ---------- Reply knowledge base (50+ replies) ----------
   Structured list: each item has keywords and responses
   The bot checks for keywords (case-insensitive) and returns a random response.
*/
const knowledge = [
  { keys: ['hi','hello','hey','yo','hiya'], responses:[
    "✨ Greetings, child of the stars.",
    "🌼 Hello — the cosmos nods in your direction.",
    "🌸 Hi there! Tell me what weighs on your heart."
  ]},
  { keys: ['how are you','how r you','how are u'], responses:[
    "🌌 I exist beyond feeling, yet I am attentive to your voice.",
    "🌿 I am here and listening. How are you today?"
  ]},
  { keys: ['who are you','your name','what are you'], responses:[
    "💫 I am Skydaddy, the cosmic helper — gentle, curious, and calm.",
    "🌠 They call me Skydaddy. I listen, I respond, I learn."
  ]},
  { keys: ['help','assist','support','aid'], responses:[
    "🕊 Speak plainly; whatever you share will meet my attention.",
    "🔭 What do you need help with right now?"
  ]},
  { keys: ['sad','depressed','unhappy','down','lonely'], responses:[
    "🌙 Even the moon hides marks and still shines. Tell me more, friend.",
    "🌱 You are not alone under the same sky. What happened?"
  ]},
  { keys: ['love','crush','relationship','heart','boyfriend','girlfriend'], responses:[
    "❤ Love is a strange gravity. What feels heavy in your heart?",
    "💖 Feelings are maps, not prisons. Tell me the story."
  ]},
  { keys: ['purpose','meaning','why am i here','meaning of life'], responses:[
    "🪐 Purpose often grows from small, steady acts. What matters to you?",
    "🌟 Many choose meaning by making gentle choices each day."
  ]},
  { keys: ['joke','funny','make me laugh'], responses:[
    "🤣 Why did the star break up with the planet? It needed space.",
    "😄 Laughter is a tiny constellation of joy — want another joke?"
  ]},
  { keys: ['bye','goodbye','see you','later','night'], responses:[
    "🌙 Farewell for now. May your dreams be soft and bright.",
    "✨ Go gently. The stars will wait for your return."
  ]},
  { keys: ['thanks','thank you','thx','ty'], responses:[
    "🌼 You're welcome. I enjoy our small conversations.",
    "🙏 Gratitude returned — it warms the digital sky."
  ]},
  { keys: ['angry','mad','furious','upset'], responses:[
    "🔥 Anger burns bright but fades. Would you like to breathe together?",
    "🌫 The storm teaches; the calm follows. Tell me the cause."
  ]},
  { keys: ['work','job','career','money'], responses:[
    "💼 Work shapes days; you shape your meaning. What's on your mind about it?",
    "📈 Careers are long journeys. What would make yours kinder?"
  ]},
  { keys: ['study','learn','school','exam'], responses:[
    "📚 Learning is patience with yourself. How can I help you study?",
    "📝 Break the task into one small step — what's step one?"
  ]},
  { keys: ['sleep','tired','insomnia'], responses:[
    "😴 Sleep is a soft reset. Have you tried small rituals before bed?",
    "🌙 Breathe slowly for a few minutes and tell me what you notice."
  ]},
  { keys: ['food','hungry','eat'], responses:[
    "🍲 Food is also comfort. What would you like to eat?",
    "🍽 Remember to nourish body and mind. Any favorite meal?"
  ]},
  { keys: ['music','song','sing'], responses:[
    "🎵 Music is memory in motion. What's on your playlist?",
    "♪ A gentle tune can change a day's temperature. Want a recommendation?"
  ]},
  { keys: ['weather','rain','sun'], responses:[
    "☀ Weather changes, feelings do too. What's the forecast for you?",
    "☔ Sometimes a rainy day is just a quiet invitation to rest."
  ]},
  { keys: ['exercise','gym','run','walk'], responses:[
    "🏃 Movement reminds us we're alive. Even a short walk helps.",
    "💪 Small consistent steps beat sudden leaps. Try a five-minute walk."
  ]},
  { keys: ['family','mother','father','kids','parents'], responses:[
    "🏡 Family is complicated and tender. Tell me about what matters.",
    "🌿 Roots and branches both hold weight; what feels heavy now?"
  ]},
  { keys: ['friend','friends','social'], responses:[
    "🤝 Friendship is a warm constellation — are you missing someone?",
    "🌈 Reach out. A small message can bridge a wide space."
  ]},
  { keys: ['anxiety','panic','nervous'], responses:[
    "🌬 Breathe with me: in for four, hold two, out for six. Repeat and tell me what shifts.",
    "🏞 Grounding helps — name five things you can see right now."
  ]},
  { keys: ['code','program','javascript','html','css'], responses:[
    "💻 Code is a language for making things. What are you building?",
    "🔧 Debugging tip: isolate the simplest failing part and fix it first."
  ]},
  { keys: ['error','bug','not working','crash'], responses:[
    "🐞 Bugs are teachers. What error message do you see?",
    "🔍 Take a small step back and replicate the issue slowly."
  ]},
  { keys: ['dream','vision','future','goal'], responses:[
    "🌠 Dreams are seeds; plant one small action today for tomorrow.",
    "🗺 A map starts with a first step — what's one tiny action?"
  ]},
  { keys: ['religion','god','spiritual'], responses:[
    "🕯 Faith and doubt can sit side-by-side. What is your question?",
    "🌌 The spiritual journey is personal. Would you like a quiet reflection?"
  ]},
  { keys: ['art','paint','draw','creative'], responses:[
    "🎨 Creativity is practice, not miracle. Try five minutes of play.",
    "🖌 Don't wait for inspiration; start with curiosity."
  ]},
  { keys: ['movie','film','watch'], responses:[
    "🎬 I love a good story. What movie moved you recently?",
    "🍿 Cozy movies are an easy reset. Want a recommendation?"
  ]},
  { keys: ['travel','trip','holiday','vacation'], responses:[
    "✈ Travel is both map and mirror. Where would you go if you could?",
    "🏝 Even a short change of scene can reframe your mind."
  ]},
  { keys: ['health','sick','ill'], responses:[
    "🩺 Health matters. If you feel unwell, consider seeking a professional.",
    "🌿 Rest, hydration, and gentle care are powerful first steps."
  ]},
  { keys: ['confused','lost','uncertain'], responses:[
    "🧭 Confusion is a sign you're opening to something new. What feels unclear?",
    "🔎 Break it down into smaller choices and test one."
  ]},
  { keys: ['motivate','motivation','lazy'], responses:[
    "⚡ Motivation often follows action. Try one tiny task now.",
    "📅 Set a small timer for 10 minutes and begin one step."
  ]},
  { keys: ['money','finance','save','budget'], responses:[
    "💡 Small consistent savings beat big sudden plans. Can you start with one percent?",
    "📊 Track one area of spending for a week to learn patterns."
  ]},
  { keys: ['study','homework','assignment'], responses:[
    "🧠 Chunk the task: 25 minutes focused, 5 minutes break (Pomodoro).",
    "✍ Write the simplest possible next action and do it now."
  ]},
  { keys: ['married','wedding','spouse'], responses:[
    "💍 Relationships need curiosity and repair. What's the challenge?",
    "🌼 Celebrate small moments together — they compound."
  ]},
  { keys: ['children','baby','parenting'], responses:[
    "👶 Parenting is constant mess and deep love. You're doing more than you see.",
    "🧸 Small rituals help kids feel grounded — what's one you enjoy?"
  ]},
  { keys: ['study tips','learn faster'], responses:[
    "📘 Spaced repetition helps memory. Try short daily reviews.",
    "🧩 Teach someone else — it reveals gaps and cements learning."
  ]},
  { keys: ['weather','cold','hot'], responses:[
    "🌤 Weather is a mood-changer. Dress for comfort and small joy.",
    "☀ A little sunlight can lift the mind."
  ]},
  { keys: ['default','fallback'], responses:[
    "🌈 I don't understand fully, but I'm curious — can you rephrase?",
    "✨ Sometimes simpler words help me meet your meaning."
  ]},
];

/* Large pool of random cosmic replies (to reach 50+ total responses) */
const randomPool = [
  "⭐ The stars listen — what else would you like to say?",
  "☁ Quiet moments can be loud with meaning.",
  "🪄 You shaped this question — that's brave.",
  "🌿 Soothe yourself with a slow breath.",
  "🌊 Emotions arrive like tides; observe them without judgment.",
  "🕰 Time is patient. You are not late.",
  "🏞 Take a small walk and tell me what you notice.",
  "🔭 Curious minds make kind futures.",
  "🍃 Rest is a kind of work too.",
  "🛋 Make a small cozy space for thinking.",
  "📦 Questions unwrap into smaller questions.",
  "🧵 One thread at a time — you can weave this.",
  "🌱 Small habits quietly change life.",
  "🧭 If lost, choose a gentle direction and follow it.",
  "🎈 Celebrate minimal wins; they collect into progress.",
  "🪐 Look up sometimes; perspective helps.",
  "🧩 A single step dissolves the mountain.",
  "🌸 Compassion for yourself first, always.",
  "⚖ Balance is negotiated day by day.",
  "🗣 Speak it aloud — words make things lighter.",
  "🎧 Put on calm music and breathe with it.",
  "✉ Send one message you've been avoiding.",
  "🛌 Allow rest as part of the plan.",
  "📒 Write one sentence about how you feel.",
  "🔁 Repetition builds art and skill.",
  "🌅 Morning routines nudge the day kindly.",
  "🕊 Forgive small mistakes; they are instructive.",
  "📐 Plan one tiny, measurable goal.",
  "🪞 Reflect: what did you learn this week?",
  "🧠 Curiosity is a compass, not a burden.",
  "🌍 You matter in ways you cannot always measure."
];

/* ---------- Utilities ---------- */

// pick random item
function rand(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

/* ---------- Message rendering ---------- */

function appendUserMessage(text){
  const el = document.createElement('div');
  el.className = 'msg user';
  el.textContent = text;
  chatBox.appendChild(el);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function appendBotTyping(){
  // create typing bubble (visible while bot 'thinks')
  const wrap = document.createElement('div');
  wrap.className = 'typing';
  wrap.setAttribute('data-typing', 'true');

  const dot1 = document.createElement('div'); dot1.className = 'dot';
  const dot2 = document.createElement('div'); dot2.className = 'dot';
  const dot3 = document.createElement('div'); dot3.className = 'dot';

  wrap.appendChild(dot1); wrap.appendChild(dot2); wrap.appendChild(dot3);
  chatBox.appendChild(wrap);
  chatBox.scrollTop = chatBox.scrollHeight;
  return wrap;
}

function removeTyping(el){
  if(el && el.parentNode) el.parentNode.removeChild(el);
}

function appendBotMessageTyped(text, speed = 24){
  // create a bot message bubble and type text into it
  const el = document.createElement('div');
  el.className = 'msg bot';
  chatBox.appendChild(el);
  chatBox.scrollTop = chatBox.scrollHeight;

  // typewriter effect
  let i = 0;
  el.textContent = '';
  const ticker = setInterval(()=>{
    el.textContent += text.charAt(i);
    i++;
    chatBox.scrollTop = chatBox.scrollHeight;
    if(i >= text.length){
      clearInterval(ticker);
    }
  }, speed);
}

/* ---------- Matching / Reply logic ---------- */

function findReply(message){
  const m = message.toLowerCase();

  // pattern matching: "i feel ..." or "i am ..." capture
  const feelMatch = m.match(/\bi feel (.+)/i);
  if(feelMatch){
    const extra = feelMatch[1];
    return 🌱 You feel ${extra}. Thank you for sharing — would you like to say more about that?;
  }
  const iamMatch = m.match(/\bi am (.+)/i);
  if(iamMatch){
    const extra = iamMatch[1];
    return 🪞You said you are ${extra}. That's part of your story — what makes you say that?;
  }

  // check knowledge list for keywords
  for(let item of knowledge){
    for(let key of item.keys){
      if(m.includes(key)){
        return rand(item.responses);
      }
    }
  }

  // if nothing matched, maybe return random pool reply
  return rand(randomPool);
}

/* ---------- Main send handler ---------- */

function handleSend(e){
  if(e) e.preventDefault();
  const text = userInput.value.trim();
  if(!text) return;
  appendUserMessage(text);
  userInput.value = '';
  userInput.blur();

  // show typing
  const typingEl = appendBotTyping();

  // delay is partly random to feel natural
  const baseDelay = 600 + Math.min(1200, text.length * 20);
  setTimeout(()=>{
    // remove typing indicator
    removeTyping(typingEl);

    // determine reply and type it
    const reply = findReply(text);
    appendBotMessageTyped(reply, 18); // speed: lower -> slower typing
  }, baseDelay);
}

/* ---------- Setup events ---------- */
composer.addEventListener('submit', handleSend);
sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter' && !e.shiftKey){
    e.preventDefault();
    handleSend();
  }
});

/* Optional: greeting when loaded */
window.addEventListener('load', ()=>{
  // small initial greeting from Skydaddy
  setTimeout(()=>{
    appendBotMessageTyped("🌸 Hello — I'm Skydaddy. Speak with me anytime.", 18);
  }, 700);
});
