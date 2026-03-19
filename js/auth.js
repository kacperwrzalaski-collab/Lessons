// ==========================================
//  SYSTEM UŻYTKOWNIKÓW — AUTH + PROFIL
// ==========================================

// Pobieranie użytkownika z localStorage
function loadUser(username) {
    const data = localStorage.getItem("user_" + username);
    return data ? JSON.parse(data) : null;
}

// Zapisywanie użytkownika
function saveUser(user) {
    localStorage.setItem("user_" + user.username, JSON.stringify(user));
}

// Aktualizacja użytkownika (np. po zmianie ekwipunku)
function saveUpdatedUser(user) {
    saveUser(user);
    loadProfile();
}

// Tworzenie nowego użytkownika
function createUser(username, password) {
    return {
        username,
        password,
        xp: 0,
        level: 1,
        coins: 0,
        prestige: 0,

        // kosmetyki
        equippedFrame: null,
        equippedBackground: null,
        equippedButtonTheme: null,
        avatar: null,

        // odznaki
        badges: [],
        equippedBadge: null,

        // ekwipunek
        inventory: {
            frames: [],
            backgrounds: [],
            buttons: []
        }
    };
}

// Logowanie
document.getElementById("auth-login").onclick = () => {
    const username = document.getElementById("auth-username").value.trim();
    const password = document.getElementById("auth-password").value.trim();
    const feedback = document.getElementById("auth-feedback");

    const user = loadUser(username);

    if (!user) {
        feedback.textContent = "❌ Użytkownik nie istnieje";
        return;
    }

    if (user.password !== password) {
        feedback.textContent = "❌ Błędne hasło";
        return;
    }

    feedback.textContent = "";
    localStorage.setItem("currentUser", username);
    initApp();
};

// Rejestracja
document.getElementById("auth-register").onclick = () => {
    const username = document.getElementById("auth-username").value.trim();
    const password = document.getElementById("auth-password").value.trim();
    const feedback = document.getElementById("auth-feedback");

    if (loadUser(username)) {
        feedback.textContent = "❌ Taki użytkownik już istnieje";
        return;
    }

    if (username.length < 3) {
        feedback.textContent = "❌ Nazwa musi mieć min. 3 znaki";
        return;
    }

    if (password.length < 3) {
        feedback.textContent = "❌ Hasło musi mieć min. 3 znaki";
        return;
    }

    const user = createUser(username, password);
    saveUser(user);

    feedback.textContent = "✔ Zarejestrowano! Możesz się zalogować.";
};

// Wylogowanie
document.getElementById("logout-btn").onclick = () => {
    localStorage.removeItem("currentUser");
    location.reload();
};

// ==========================================
//  INICJALIZACJA APLIKACJI
// ==========================================

function initApp() {
    const username = localStorage.getItem("currentUser");
    if (!username) return;

    const user = loadUser(username);
    if (!user) return;

    document.getElementById("screen-auth").classList.add("hidden");
    document.getElementById("app-container").classList.remove("hidden");

    loadProfile();
    loadTopicsToSelects();
}

// ==========================================
//  PROFIL — ŁADOWANIE DANYCH
// ==========================================

function loadProfile() {
    const username = localStorage.getItem("currentUser");
    if (!username) return;

    const user = loadUser(username);

    document.getElementById("profile-name").innerHTML = user.username;
    document.getElementById("profile-level").innerHTML = "Poziom: " + user.level;
    document.getElementById("profile-coins").innerHTML = "💰 " + user.coins;

    // XP bar
    const xpPercent = (user.xp % 100) + "%";
    document.getElementById("profile-xp-fill").style.width = xpPercent;

    // Avatar
    const avatar = document.getElementById("profile-avatar");
    avatar.style.backgroundImage = user.avatar ? `url(${user.avatar})` : "none";

    // Ramka
    avatar.className = "avatar";
    if (user.equippedFrame) {
        avatar.classList.add(user.equippedFrame);
    }

    // Tło prestiżowe
    document.body.className = "";
    if (user.equippedBackground) {
        document.body.classList.add(user.equippedBackground);
    }

    // Kolor przycisków
    document.body.classList.remove("btn-theme-blue", "btn-theme-green", "btn-theme-red");
    if (user.equippedButtonTheme) {
        document.body.classList.add(user.equippedButtonTheme);
    }
}

// ==========================================
//  XP + LEVEL + PRESTIŻ
// ==========================================

function addXP(amount) {
    const username = localStorage.getItem("currentUser");
    const user = loadUser(username);

    user.xp += amount;

    // Level up
    if (user.xp >= user.level * 100) {
        user.level++;
        user.coins += 10;
    }

    saveUser(user);
    loadProfile();
}

// ==========================================
//  ŁADOWANIE TEMATÓW DO SELECTÓW
// ==========================================

function loadTopicsToSelects() {
    const selects = [
        "learn-topic-select",
        "flashcards-topic-select",
        "quiz-topic-select",
        "write-topic-select"
    ];

    selects.forEach(id => {
        const select = document.getElementById(id);
        select.innerHTML = "";

        Object.keys(topics).forEach(topic => {
            const opt = document.createElement("option");
            opt.value = topic;
            opt.textContent = topic;
            select.appendChild(opt);
        });
    });
}

// ==========================================
//  AUTO-LOGIN
// ==========================================

window.onload = () => {
    const username = localStorage.getItem("currentUser");
    if (username) initApp();
};