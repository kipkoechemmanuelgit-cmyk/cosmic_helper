/* ===== Base / layout ===== */
:root{
  --bg:#f7f9fb;
  --card:#ffffff;
  --muted:#5b6470;
  --accent-1:#ffd6e0;
  --accent-2:#dfe9ff;
  --accent-3:#e8fff1;
  --bubble-user:#bfe1ff;
  --bubble-bot:#ffffff;
  --shadow: 0 8px 20px rgba(32,40,56,0.08);
  --radius:16px;
  --gap:12px;
  --glass: rgba(255,255,255,0.7);
  font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}

*{box-sizing:border-box}
html,body,.page{height:100%}
body{
  margin:0;
  background: linear-gradient(180deg, #f0f6ff 0%, #f7f9fb 60%);
  color:var(--muted);
  -webkit-font-smoothing:antialiased;
  display:flex;
  justify-content:center;
  align-items:center;
}

/* Card that contains chat */
.card{
  width:95%;
  max-width:520px;
  background:var(--card);
  border-radius:20px;
  box-shadow:var(--shadow);
  padding:18px;
  display:flex;
  flex-direction:column;
  gap:14px;
  margin:20px;
}

/* Header */
.header{
  display:flex;
  gap:12px;
  align-items:center;
}
.logo{
  width:56px;
  height:56px;
  display:flex;
  justify-content:center;
  align-items:center;
  font-size:28px;
  border-radius:12px;
  background: linear-gradient(135deg,var(--accent-2),var(--accent-3));
  box-shadow: 0 6px 14px rgba(49,74,122,0.06);
}
.title{
  margin:0;
  font-size:20px;
  color:#1f2a44;
}
.subtitle{
  margin:2px 0 0 0;
  font-size:12px;
  color:var(--muted);
}

/* Chat box area */
.chat-box{
  background: linear-gradient(180deg, rgba(239,248,255,0.8), rgba(255,255,255,0.9));
  border-radius:12px;
  padding:14px;
  min-height:380px;
  max-height:58vh;
  overflow-y:auto;
  display:flex;
  flex-direction:column;
  gap:10px;
  border:1px solid rgba(32,40,56,0.03);
}

/* Message bubble base */
.msg{
  display:inline-block;
  padding:10px 14px;
  border-radius:14px;
  max-width:78%;
  line-height:1.35;
  word-wrap:break-word;
  box-shadow: 0 4px 10px rgba(31,41,55,0.03);
  transform-origin: left top;
  opacity:0;
  animation: pop .22s ease forwards;
}

/* user bubbles (right) */
.msg.user{
  margin-left:auto;
  background:linear-gradient(90deg,var(--bubble-user), #91cdfd);
  color:#04253b;
  border-bottom-right-radius:6px;
}

/* bot bubbles (left) */
.msg.bot{
  margin-right:auto;
  background:var(--bubble-bot);
  color:#1f2a44;
  border-bottom-left-radius:6px;
  border: 1px solid rgba(32,40,56,0.03);
}

/* typing indicator bubble */
.typing{
  display:flex;
  gap:6px;
  padding:8px 12px;
  border-radius:12px;
  background:linear-gradient(90deg,#fff,#f7fbff);
  border:1px solid rgba(32,40,56,0.03);
  align-items:center;
}

/* three dots animation */
.dot{
  width:8px;
  height:8px;
  background:#b7c6ff;
  border-radius:50%;
  opacity:0.9;
  transform: translateY(0);
  animation: bounce 1s infinite;
}
.dot:nth-child(2){ animation-delay:.12s; background:#9db6ff }
.dot:nth-child(3){ animation-delay:.24s; background:#80a1ff }

/* composer area (input + send) */
.composer{
  display:flex;
  gap:10px;
  align-items:center;
}
.input{
  flex:1;
  padding:12px 14px;
  border-radius:12px;
  border:1px solid rgba(32,40,56,0.06);
  background:transparent;
  font-size:15px;
  outline:none;
}
.send{
  padding:11px 14px;
  border-radius:12px;
  background:linear-gradient(90deg,#9ad0ff,#a4ffdf);
  border:none;
  cursor:pointer;
  font-size:16px;
  color:#053047;
  box-shadow: 0 8px 18px rgba(31,41,55,0.06);
}

/* footer */
.footer{
  margin-top:6px;
  text-align:center;
  font-size:12px;
  color:var(--muted);
}

/* small animations */
@keyframes pop{
  from{ transform: scale(.98); opacity:0 }
  to{ transform: scale(1); opacity:1 }
}
@keyframes bounce{
  0% { transform: translateY(0); opacity:.6 }
  30% { transform: translateY(-6px); opacity:1 }
  60% { transform: translateY(0); opacity:.8 }
  100%{ transform: translateY(0); opacity:.6 }
}

/* Responsive tweaks */
@media (max-width:420px){
  .card{ padding:12px; border-radius:14px }
  .chat-box{ min-height:60vh; max-height:62vh }
  .logo{ width:48px; height:48px }
}
