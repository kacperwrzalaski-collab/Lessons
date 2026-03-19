// ==========================================
//  SYSTEM NAWIGACJI — PRZEŁĄCZANIE EKRANÓW
// ==========================================

// Ukrywa wszystkie ekrany
function hideAllScreens() {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.add("hidden");
    });
}

// Pokazuje wybrany ekran
function showScreen(id) {
    hideAllScreens();
    const screen = document.getElementById(id);
    if (screen) screen.classList.remove("hidden");
}

// Obsługa kliknięć w sidebar
document.querySelectorAll(".nav-buttons button").forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-screen");
        if (target) showScreen(target);
    });
});

// ==========================================
//  PROFIL — OTWIERANIE I ZAMYKANIE
// ==========================================

const profileWindow = document.getElementById("profile-window");
const profileAvatar = document.getElementById("profile-avatar");
const profileClose = document.getElementById("profile-close");

profileAvatar.onclick = () => {
    profileWindow.classList.remove("hidden");
    loadProfileEditor();
};

profileClose.onclick = () => {
    profileWindow.classList.add("hidden");
};

// ==========================================
//  ADMIN PANEL — OTWIERANIE I ZAMYKANIE
// ==========================================

const adminOpen = document.getElementById("admin-open");
const adminLogin = document.getElementById("admin-login");
const adminLoginClose = document.getElementById("admin-login-close");
const adminPanel = document.getElementById("admin-panel");
const adminClose = document.getElementById("admin-close");

adminOpen.onclick = () => {
    adminLogin.classList.remove("hidden");
};

adminLoginClose.onclick = () => {
    adminLogin.classList.add("hidden");
};

adminClose.onclick = () => {
    adminPanel.classList.add("hidden");
};

// ==========================================
//  PRESTIGE POPUP — ZAMYKANIE
// ==========================================

document.getElementById("prestige-up-close").onclick = () => {
    document.getElementById("prestige-up").classList.add("hidden");
};

// ==========================================
//  DOMYŚLNY EKRAN PO ZALOGOWANIU
// ==========================================

function openDefaultScreen() {
    showScreen("screen-learn");
}