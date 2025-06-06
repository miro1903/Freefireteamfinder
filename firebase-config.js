// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set, push, onValue, query, orderByChild, equalTo } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDwvH7M-GVJnGcO4bm45XSiTLKRkrxBZ7I",
  authDomain: "ffteamfinder-5eb2d.firebaseapp.com",
  databaseURL: "https://ffteamfinder-5eb2d-default-rtdb.firebaseio.com",
  projectId: "ffteamfinder-5eb2d",
  storageBucket: "ffteamfinder-5eb2d.firebasestorage.app",
  messagingSenderId: "643376168999",
  appId: "1:643376168999:web:18bda4987d476c6f1e8e02"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set, push, onValue, query, orderByChild, equalTo };
