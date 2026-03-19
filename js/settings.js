// ==========================================
//  USTAWIENIA — TRYB TELEFONU + ADMIN OPEN
// ==========================================

const mobileToggle = document.getElementById("settings-mobile-toggle");
const adminOpenBtn = document.getElementById("admin-open");

// Wczytanie ustawienia trybu telefonu z localStorage
(function initSettings() {
    const saved = localStorage.getItem("settings_mobile_mode");
    if (saved === "1") {
        document.body.classList.add("mobile-mode");
        if (mobileToggle) mobileToggle.checked = true;
    }
})();

// Zmiana trybu telefonu
if (mobileToggle) {
    mobileToggle.onchange = () => {
        if (mobileToggle.checked) {
            document.body.classList.add("mobile-mode");
            localStorage.setItem("settings_mobile_mode", "1");
        } else {
            document.body.classList.remove("mobile-mode");
            localStorage.setItem("settings_mobile_mode", "0");
        }
    };
}

// Otwieranie okna logowania admina
if (adminOpenBtn) {
    adminOpenBtn.onclick = () => {
        const loginBox = document.getElementById("admin-login");
        if (loginBox) loginBox.classList.remove("hidden");
    };
}