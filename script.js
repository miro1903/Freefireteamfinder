import { db, ref, set, push, onValue, query, orderByChild, equalTo } from './firebase-config.js';

const playerIdInput = document.getElementById('playerId');
const gameTypeSelect = document.getElementById('gameType');
const joinBtn = document.getElementById('joinBtn');
const playersList = document.getElementById('playersList');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const messages = document.getElementById('messages');

let currentPlayerId = null;
let chatRoom = null;

joinBtn.onclick = async () => {
  const playerId = playerIdInput.value.trim();
  const gameType = gameTypeSelect.value;

  if (!playerId) return alert("أدخل ID صحيح");

  currentPlayerId = playerId;
  const playerRef = ref(db, 'players/' + playerId);
  await set(playerRef, {
    id: playerId,
    gameType,
    timestamp: Date.now()
  });

  const q = query(ref(db, 'players'), orderByChild('gameType'), equalTo(gameType));
  onValue(q, snapshot => {
    const players = snapshot.val();
    const playerEntries = Object.entries(players || {}).filter(([key]) => key !== playerId);
    const top3 = playerEntries.slice(0, 3);

    playersList.innerHTML = '<h3>🧑‍🤝‍🧑 لاعبين مقترحين:</h3>';
    top3.forEach(([id, p]) => {
      playersList.innerHTML += `<div class="player">🎮 ID: ${p.id}</div>`;
    });

    if (top3.length > 0) {
      chatRoom = [playerId, ...top3.map(([id]) => id)].sort().join('_');
      listenForMessages(chatRoom);
    }
  });
};

sendBtn.onclick = async () => {
  const msg = chatInput.value.trim();
  if (!msg || !chatRoom) return;
  const msgRef = push(ref(db, 'chats/' + chatRoom));
  await set(msgRef, {
    sender: currentPlayerId,
    text: msg,
    time: Date.now()
  });
  chatInput.value = "";
};

function listenForMessages(room) {
  const chatRef = ref(db, 'chats/' + room);
  onValue(chatRef, snapshot => {
    const data = snapshot.val();
    messages.innerHTML = '';
    if (data) {
      Object.values(data).forEach(msg => {
        messages.innerHTML += `<div class="chat-message"><strong>${msg.sender}:</strong> ${msg.text}</div>`;
      });
    }
  });
}
