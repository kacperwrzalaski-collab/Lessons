// ==========================================
//  ADMIN PANEL — LOGOWANIE + KOMENDY
// ==========================================

const ADMIN_PASSWORD = "1admin2panel";

const adminLoginBox = document.getElementById("admin-login");
const adminPasswordInput = document.getElementById("admin-password");
const adminLoginBtn = document.getElementById("admin-login-btn");
const adminLoginFeedback = document.getElementById("admin-login-feedback");
const adminLoginClose = document.getElementById("admin-login-close");

const adminPanel = document.getElementById("admin-panel");
const adminClose = document.getElementById("admin-close");
const adminCommandInput = document.getElementById("admin-command");
const adminRunBtn = document.getElementById("admin-run");
const adminOutput = document.getElementById("admin-output");

// Logowanie
if (adminLoginBtn) {
    adminLoginBtn.onclick = () => {
        const pass = adminPasswordInput.value.trim();

        if (pass === ADMIN_PASSWORD) {
            adminLoginFeedback.textContent = "";
            if (adminLoginBox) adminLoginBox.classList.add("hidden");
            if (adminPanel) adminPanel.classList.remove("hidden");
        } else {
            adminLoginFeedback.textContent = "❌ Błędne hasło";
        }
    };
}

// Zamknięcie okna logowania
if (adminLoginClose) {
    adminLoginClose.onclick = () => {
        if (adminLoginBox) adminLoginBox.classList.add("hidden");
    };
}

// Zamknięcie panelu admina
if (adminClose) {
    adminClose.onclick = () => {
        if (adminPanel) adminPanel.classList.add("hidden");
    };
}

// Obsługa komend
if (adminRunBtn) {
    adminRunBtn.onclick = () => {
        const cmd = adminCommandInput.value.trim();
        if (!cmd) return;

        handleAdminCommand(cmd);
    };
}

function handleAdminCommand(cmd) {
    const username = localStorage.getItem("currentUser");
    const user = username ? loadUser(username) : null;

    if (!user) {
        adminOutput.textContent = "Brak zalogowanego użytkownika.";
        return;
    }

    const parts = cmd.split(" ");
    const base = parts[0].toLowerCase();

    if (base === "xp" && parts[1]) {
        const amount = parseInt(parts[1]);
        if (!isNaN(amount)) {
            user.xp += amount;
            saveUser(user);
            loadProfile();
            adminOutput.textContent = `Dodano ${amount} XP.`;
            return;
        }
    }

    if (base === "coins" && parts[1]) {
        const amount = parseInt(parts[1]);
        if (!isNaN(amount)) {
            user.coins += amount;
            saveUser(user);
            loadProfile();
            adminOutput.textContent = `Dodano ${amount} coins.`;
            return;
        }
    }

    if (base === "reset") {
        user.xp = 0;
        user.level = 1;
        user.coins = 0;
        saveUser(user);
        loadProfile();
        adminOutput.textContent = "Zresetowano XP, level i coins.";
        return;
    }

    adminOutput.textContent = "Nieznana komenda. Dostępne: xp [liczba], coins [liczba], reset";
}