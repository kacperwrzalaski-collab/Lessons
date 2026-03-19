// ==========================================
//  USTAWIENIA + PANEL ADMINA
// ==========================================

// Hasło administratora (zmień jak chcesz)
const ADMIN_PASSWORD = "admin123";

// Elementy
const adminLoginBox = document.getElementById("admin-login");
const adminPasswordInput = document.getElementById("admin-password");
const adminLoginBtn = document.getElementById("admin-login-btn");
const adminLoginFeedback = document.getElementById("admin-login-feedback");
const adminPanel = document.getElementById("admin-panel");
const adminOpen = document.getElementById("admin-open");
const adminLoginClose = document.getElementById("admin-login-close");
const adminClose = document.getElementById("admin-close");

// ==========================================
//  OTWIERANIE / ZAMYKANIE OKNA LOGOWANIA ADMINA
// ==========================================

adminOpen.onclick = () => {
    adminLoginBox.classList.remove("hidden");
};

adminLoginClose.onclick = () => {
    adminLoginBox.classList.add("hidden");
};

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
//  ZAMYKANIE PANELU ADMINA
// ==========================================

adminClose.onclick = () => {
    adminPanel.classList.add("hidden");
};