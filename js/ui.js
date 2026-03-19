/* ============================================================
   UI.JS — PRZEŁĄCZANIE EKRANÓW, POPUPY, SIDEBAR, UI UPDATE
============================================================ */

/* ============================================================
   ELEMENTY DOM
============================================================ */

const screens = document.querySelectorAll(".screen");
const appContainer = document.getElementById("app-container");
const popupOverlay = document.getElementById("popup-overlay");

const profileWindow = document.getElementById("profile-window");
const adminLoginWindow = document.getElementById("admin-login");
const adminPanelWindow = document.getElementById("admin-panel");

/* ============================================================
   PRZEŁĄCZANIE EKRANÓW
============================================================ */

function showScreen(id) {
    screens.forEach(s => s.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
}

/* Obsługa kliknięć w kafelki menu */
document.querySelectorAll(".nav-tile").forEach(btn => {
    btn.addEventListener("click", () => {
        const screen = btn.dataset.screen;
        showScreen(screen);
    });
});

/* ============================================================
   START APLIKACJI PO ZALOGOWANIU
============================================================ */

function startApp() {
    document.getElementById("screen-auth").classList.add("hidden");
    appContainer.classList.remove("hidden");

    updateUI();
    core.applyCosmetics();
    showScreen("screen-learn");
}

/* ============================================================
   AKTUALIZACJA UI
============================================================ */

function updateUI() {
    const p = core.player;

    document.getElementById("profile-name").textContent = p.username;
    document.getElementById("profile-level").textContent = "Poziom " + p.level;
    document.getElementById("profile-coins").textContent = p.coins + " 🪙";

    const needed = p.level * 100;
    const percent = (p.xp / needed) * 100;
    document.getElementById("profile-xp-fill").style.width = percent + "%";

    if (p.avatar) {
        document.getElementById("profile-avatar").style.backgroundImage =
            `url(${p.avatar})`;
    }
}

/* ============================================================
   POPUPY
============================================================ */

function openPopup(win) {
    popupOverlay.classList.remove("hidden");
    win.classList.remove("hidden");
}

function closePopup(win) {
    popupOverlay.classList.add("hidden");
    win.classList.add("hidden");
}

/* PROFIL */
document.getElementById("profile-avatar").addEventListener("click", () => {
    openPopup(profileWindow);
});

/* Zamknięcie profilu */
document.getElementById("profile-close").addEventListener("click", () => {
    closePopup(profileWindow);
});

/* ADMIN LOGIN */
document.getElementById("admin-open").addEventListener("click", () => {
    openPopup(adminLoginWindow);
});

document.getElementById("admin-login-close").addEventListener("click", () => {
    closePopup(adminLoginWindow);
});

/* ADMIN PANEL */
document.getElementById("admin-close").addEventListener("click", () => {
    closePopup(adminPanelWindow);
});

/* ============================================================
   LOGOWANIE / REJESTRACJA
============================================================ */

document.getElementById("auth-login").addEventListener("click", () => {
    const u = document.getElementById("auth-username").value;
    const p = document.getElementById("auth-password").value;

    const result = core.login(u, p);

    if (result === "OK") {
        startApp();
    } else {
        document.getElementById("auth-feedback").textContent = result;
    }
});

document.getElementById("auth-register").addEventListener("click", () => {
    const u = document.getElementById("auth-username").value;
    const p = document.getElementById("auth-password").value;

    const result = core.register(u, p);
    document.getElementById("auth-feedback").textContent = result;
});

/* ============================================================
   PROFIL — ZAPIS ZMIAN
============================================================ */

document.getElementById("profile-save").addEventListener("click", () => {
    const newName = document.getElementById("profile-new-name").value;
    const newFrame = document.getElementById("profile-frame-select").value;
    const newBg = document.getElementById("profile-bg-select").value;
    const newBtn = document.getElementById("profile-btn-select").value;

    const msg = core.updateProfile(newName, newFrame, newBg, newBtn);

    document.getElementById("profile-feedback").textContent = msg;
    updateUI();
});

/* Avatar upload */
document.getElementById("profile-avatar-upload").addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;

    core.uploadAvatar(file, () => {
        updateUI();
        document.getElementById("profile-avatar-preview").style.backgroundImage =
            `url(${core.player.avatar})`;
    });
});

/* ============================================================
   ADMIN LOGIN
============================================================ */

document.getElementById("admin-login-btn").addEventListener("click", () => {
    const pass = document.getElementById("admin-password").value;

    if (core.adminLogin(pass)) {
        closePopup(adminLoginWindow);
        openPopup(adminPanelWindow);
    } else {
        document.getElementById("admin-login-feedback").textContent =
            "Złe hasło!";
    }
});

/* ============================================================
   ADMIN PANEL — KOMENDY
============================================================ */

document.getElementById("admin-run").addEventListener("click", () => {
    const cmd = document.getElementById("admin-command").value;
    const out = core.adminCommand(cmd);

    document.getElementById("admin-output").textContent = out;
    updateUI();
});

/* ============================================================
   WYLOGOWANIE
============================================================ */

document.getElementById("logout-btn").addEventListener("click", () => {
    location.reload();
});

/* ============================================================
   EKSPORT
============================================================ */

window.ui = {
    showScreen,
    updateUI,
    openPopup,
    closePopup
};
