// Firebase imports from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDBnRkz3EHIPQavXYPzFp1TAj8EglhXRIA",
  authDomain: "farmer-d40c0.firebaseapp.com",
  projectId: "farmer-d40c0",
  storageBucket: "farmer-d40c0.firebasestorage.app",
  messagingSenderId: "120265841131",
  appId: "1:120265841131:web:e4314b8ea6abb7a9df61ae",
  measurementId: "G-CJ552K3318",
  databaseURL: "https://farmer-d40c0-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);

console.log("✅ Firebase initialized");

// Signup
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  console.log("📨 Signup with:", email);

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await set(ref(db, "users/" + user.uid), {
      email: user.email,
      createdAt: new Date().toISOString()
    });

    alert("✅ Signup successful!");
  } catch (error) {
    console.error("❌ Signup error:", error.message);
    alert("❌ Signup error: " + error.message);
  }
});

// Login
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  console.log("🔐 Login with:", email);

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("✅ Login successful!");
  } catch (error) {
    console.error("❌ Login error:", error.message);
    alert("❌ Login error: " + error.message);
  }
});
