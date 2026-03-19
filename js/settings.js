// ==========================================
//  USTAWIENIA + PANEL ADMINA
// ==========================================

// Hasło administratora (możesz zmienić)
const ADMIN_PASSWORD = "admin123";

// Elementy
const adminLoginBox = document.getElementById("admin-login");
const adminPasswordInput = document.getElementById("admin-password");
const adminLoginBtn = document.getElementById("admin-login-btn");
const adminLoginFeedback = document.getElementById("admin-login-feedback");
const adminPanel = document.getElementById("admin-panel");

// ==========================================
//  LOGOWANIE DO PANELU ADMINA
// ==========================================

adminLoginBtn.onclick = () => {
    const pass = adminPasswordInput.value.trim();

    if (pass === ADMIN_PASSWORD) {
        adminLoginFeedback.textContent = "";
        adminLoginBox.classList.add("hidden");
        adminPanel.classList.remove("hidden");
    } else {
        adminLoginFeedback.textContent = "❌ Błędne hasło";
    }
};

// ==========================================
//  ZAPIS USTAWIEŃ PROFILU
// ==========================================

document.getElementById("profile-save").onclick = () => {
    const username = localStorage.getItem("currentUser");
    const user = loadUser(username);

    const newName = document.getElementById("profile-new-name").value.trim();
    const frame = document.getElementById("profile-frame-select").value;
    const bg = document.getElementById("profile-bg-select").value;
    const btn = document.getElementById("profile-btn-select").value;

    const feedback = document.getElementById("profile-feedback");

    // Zmiana nazwy (koszt 100 coins)
    if (newName.length > 0) {
        if (user.coins >= 100) {
            user.username = newName;
            user.coins -= 100;
            feedback.textContent = "✔ Nazwa zmieniona!";
        } else {
            feedback.textContent = "❌ Za mało XP Coins!";
            return;
        }
    }

    // Ramka
    if (frame !== "none") {
        user.equippedFrame = frame;
    }

    // Tło
    if (bg !== "none") {
        user.equippedBackground = bg;
    }

    // Kolor przycisków
    if (btn !== "none") {
        user.equippedButtonTheme = btn;
    }

    saveUser(user);
    loadProfile();
};

// ==========================================
//  ŁADOWANIE OPCJI DO PROFILU
// ==========================================

function loadProfileEditor() {
    const username = localStorage.getItem("currentUser");
    const user = loadUser(username);

    // Ramki
    const frameSelect = document.getElementById("profile-frame-select");
    frameSelect.innerHTML = `
        <option value="none">Brak</option>
        <option value="avatar-frame-neonpulse">Neon Pulse</option>
        <option value="avatar-frame-neonglow">Neon Glow</option>
        <option value="avatar-frame-electric">Electric</option>
        <option value="avatar-frame-cyberpunk">Cyberpunk</option>
        <option value="avatar-frame-royal">Royal</option>
        <option value="avatar-frame-inferno">Inferno</option>
        <option value="avatar-frame-galaxy">Galaxy</option>
        <option value="avatar-frame-rainbow">Rainbow</option>
    `;

    // Tła
    const bgSelect = document.getElementById("profile-bg-select");
    bgSelect.innerHTML = `
        <option value="none">Brak</option>
        <option value="prestige-1-bg">Prestige 1</option>
        <option value="prestige-2-bg">Prestige 2</option>
        <option value="prestige-3-bg">Prestige 3</option>
        <option value="prestige-4-bg">Prestige 4</option>
        <option value="prestige-5-bg">Prestige 5</option>
        <option value="prestige-6-bg">Prestige 6</option>
        <option value="prestige-7-bg">Prestige 7</option>
        <option value="prestige-8-bg">Prestige 8</option>
        <option value="prestige-9-bg">Prestige 9</option>
        <option value="prestige-10-bg">Prestige 10</option>
        <option value="prestige-11-bg">Prestige 11</option>
        <option value="prestige-12-bg">Prestige 12</option>
        <option value="prestige-13-bg">Prestige 13</option>
        <option value="prestige-14-bg">Prestige 14</option>
        <option value="prestige-15-bg">Prestige 15</option>
    `;

    // Kolory przycisków
    const btnSelect = document.getElementById("profile-btn-select");
    btnSelect.innerHTML = `
        <option value="none">Brak</option>
        <option value="btn-theme-blue">Niebieski</option>
        <option value="btn-theme-green">Zielony</option>
        <option value="btn-theme-red">Czerwony</option>
    `;
}