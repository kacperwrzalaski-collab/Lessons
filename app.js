/* ============================================================
   APP.JS — GŁÓWNY KONTROLER APLIKACJI
   Ładuje moduły, obsługuje UI, logowanie, XP, ekrany, eventy
============================================================ */

/* ===================== DANE GRACZA ========================= */

let player = {
    username: "",
    password: "",
    level: 1,
    xp: 0,
    coins: 0,
    prestige: 0,

    avatar: "",
    frame: "",
    background: "",
    buttonColor: "",

    equippedBadge: "",
    equippedTitle: "",

    inventory: {
        badges: [],
        titles: [],
        frames: [],
        backgrounds: [],
        crates: []
    }
};

function savePlayer() {
    localStorage.setItem("playerData", JSON.stringify(player));
}

function loadPlayer() {
    const data = localStorage.getItem("playerData");
    if (!data) return false;
    player = JSON.parse(data);
    return true;
}

/* ===================== LOGOWANIE =========================== */

function register(username, password) {
    if (!username || !password) return "Wpisz dane";

    if (localStorage.getItem("playerData")) {
        return "Konto już istnieje";
    }

    player.username = username;
    player.password = password;
    savePlayer();
    return "Zarejestrowano!";
}

function login(username, password) {
    if (!loadPlayer()) return "Brak konta";

    if (username !== player.username || password !== player.password) {
        return "Złe dane logowania";
    }

    return "OK";
}

/* ===================== XP / LEVEL ========================== */

function addXP(amount) {
    player.xp += amount;

    const needed = player.level * 100;

    if (player.xp >= needed) {
        player.xp -= needed;
        player.level++;
        player.coins += 20;

        // PRESTIŻ CO 5 LEVELI
        checkPrestigeGain(player.level);
    }

    savePlayer();
    updateUI();
}

/* ===================== UI PROFILU ========================== */

function updateUI() {
    document.getElementById("profile-name").textContent = player.username;
    document.getElementById("profile-level").textContent = "Poziom: " + player.level;
    document.getElementById("profile-coins").textContent = player.coins + " 🪙";
    document.getElementById("profile-prestige").textContent = "Prestiż: " + player.prestige;

    // XP pasek
    const needed = player.level * 100;
    const percent = needed ? (player.xp / needed) * 100 : 0;
    document.getElementById("profile-xp-fill").style.width = percent + "%";

    // Odznaka
    const badgeSlot = document.getElementById("profile-badge");
    badgeSlot.textContent = player.equippedBadge || "";

    // Tytuł
    document.getElementById("profile-title").textContent = player.equippedTitle || "";

    // Kosmetyki
    applyCosmetics(player);
}

/* ===================== EKRANY ============================== */

const screens = document.querySelectorAll(".screen");

function showScreen(id) {
    screens.forEach(s => s.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
}

document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        showScreen(btn.dataset.screen);
    });
});

/* ===================== NAUKA =============================== */

function refreshLearning() {
    fillLanguageSelect();
    fillTopicSelect();
    fillLearnTable();
}

/* ===================== FISZKI ============================== */

document.getElementById("flashcard-show").addEventListener("click", () => {
    document.getElementById("flashcard-answer").classList.remove("hidden");
    addXP(3);
});

document.getElementById("flashcard-next").addEventListener("click", () => {
    nextFlashcard();
});

/* ===================== QUIZ ================================ */

document.getElementById("write-check").addEventListener("click", () => {
    checkWrite();
});

/* ===================== SKLEP =============================== */

function refreshShop() {
    renderShopCrates();
    renderShopFrames();
    renderShopBackgrounds();
}

/* ===================== EKWIPUNEK =========================== */

function refreshInventory() {
    renderInventoryBadges();
    renderInventoryTitles();
    renderInventoryFrames();
    renderInventoryBackgrounds();
}

/* ===================== PROFIL ============================== */

document.getElementById("profile-save").addEventListener("click", () => {
    const newName = document.getElementById("profile-new-name").value.trim();
    const newFrame = document.getElementById("profile-frame-select").value;
    const newBg = document.getElementById("profile-bg-select").value;
    const newBtn = document.getElementById("profile-btn-select").value;

    const msg = updateProfile(player, newName, newFrame, newBg, newBtn);
    document.getElementById("profile-feedback").textContent = msg;

    updateUI();
});

/* ===================== AVATAR ============================== */

document.getElementById("profile-avatar-upload").addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;

    uploadAvatar(player, file, () => {
        document.getElementById("profile-avatar-preview").style.backgroundImage =
            `url(${player.avatar})`;
        updateUI();
    });
});

/* ===================== LOGOWANIE EVENTY ==================== */

document.getElementById("auth-login").addEventListener("click", () => {
    const u = document.getElementById("auth-username").value;
    const p = document.getElementById("auth-password").value;

    const result = login(u, p);

    if (result === "OK") {
        document.getElementById("screen-auth").classList.add("hidden");
        document.getElementById("app-container").classList.remove("hidden");

        updateUI();
        refreshLearning();
        refreshShop();
        refreshInventory();
        loadFlashcard();
        loadQuiz();
        loadWriteWord();

        showScreen("screen-learn");
    } else {
        document.getElementById("auth-feedback").textContent = result;
    }
});

document.getElementById("auth-register").addEventListener("click", () => {
    const u = document.getElementById("auth-username").value;
    const p = document.getElementById("auth-password").value;

    const result = register(u, p);
    document.getElementById("auth-feedback").textContent = result;
});

/* ===================== WYLOGOWANIE ========================= */

document.getElementById("logout-btn").addEventListener("click", () => {
    location.reload();
});

/* ===================== LOOTBOX POPUP ======================= */

document.getElementById("lootbox-close-btn").addEventListener("click", () => {
    closeLootboxPopup();
});

/* ===================== START APLIKACJI ===================== */

function init() {
    if (loadPlayer()) {
        updateUI();
    }
}

window.addEventListener("load", init);