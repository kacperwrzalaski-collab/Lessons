// ==========================================
//  PRESTIŻ — SYSTEM AWANSU
// ==========================================

// Przycisk prestiżu
document.getElementById("prestige-btn").onclick = () => {
    const username = localStorage.getItem("currentUser");
    const user = loadUser(username);

    // Wymaganie poziomu
    if (user.level < 50) {
        alert("❌ Musisz osiągnąć poziom 50, aby wykonać prestiż!");
        return;
    }

    // Zwiększamy prestiż
    user.prestige++;

    // Reset statystyk
    user.level = 1;
    user.xp = 0;
    user.coins = 0;

    saveUser(user);
    loadProfile();

    showPrestigePopup(user.prestige);
};

// ==========================================
//  POPUP PRESTIŻU
// ==========================================

function showPrestigePopup(prestige) {
    const popup = document.getElementById("prestige-up");
    const text = document.getElementById("prestige-up-text");

    text.innerHTML = `
        <h2>🎉 PRESTIŻ +${prestige}!</h2>
        <p>Twoje konto zostało ulepszone.</p>
    `;

    popup.classList.remove("hidden");
}

// Zamknięcie popupu
document.getElementById("prestige-up-close").onclick = () => {
    document.getElementById("prestige-up").classList.add("hidden");
};