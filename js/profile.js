// ==========================================
//  PROFIL — AVATAR, PRESTIŻ, ZMIANY
// ==========================================

// Zmiana avatara (upload)
document.getElementById("profile-avatar-upload").onchange = function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const username = localStorage.getItem("currentUser");
        const user = loadUser(username);

        user.avatar = e.target.result;
        saveUser(user);

        loadProfile();
    };
    reader.readAsDataURL(file);
};

// ==========================================
//  PRESTIŻ — RESET LEVELA I XP
// ==========================================

document.getElementById("prestige-btn").onclick = () => {
    const username = localStorage.getItem("currentUser");
    const user = loadUser(username);

    if (user.level < 50) {
        alert("❌ Musisz mieć poziom 50, aby wykonać prestiż!");
        return;
    }

    // Zwiększamy prestiż
    user.prestige++;
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

// ==========================================
//  ŁADOWANIE OKNA PROFILU
// ==========================================

function loadProfileEditor() {
    const username = localStorage.getItem("currentUser");
    const user = loadUser(username);

    // Nazwa
    document.getElementById("profile-current-name").textContent = user.username;

    // Coins
    document.getElementById("profile-current-coins").textContent = user.coins;

    // Avatar
    const avatar = document.getElementById("profile-avatar-preview");
    avatar.style.backgroundImage = user.avatar ? `url(${user.avatar})` : "none";

    // Ramki
    const frameSelect = document.getElementById("profile-frame-select");
    frameSelect.innerHTML = "<option value='none'>Brak</option>";
    user.inventory.frames.forEach(f => {
        const opt = document.createElement("option");
        opt.value = f;
        opt.textContent = f;
        frameSelect.appendChild(opt);
    });

    // Tła
    const bgSelect = document.getElementById("profile-bg-select");
    bgSelect.innerHTML = "<option value='none'>Brak</option>";
    user.inventory.backgrounds.forEach(bg => {
        const opt = document.createElement("option");
        opt.value = bg;
        opt.textContent = bg;
        bgSelect.appendChild(opt);
    });

    // Kolory przycisków
    const btnSelect = document.getElementById("profile-btn-select");
    btnSelect.innerHTML = "<option value='none'>Brak</option>";
    user.inventory.buttons.forEach(btn => {
        const opt = document.createElement("option");
        opt.value = btn;
        opt.textContent = btn;
        btnSelect.appendChild(opt);
    });
}

// ==========================================
//  ZAPIS ZMIAN W PROFILU
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
    renderInventory();
};

// ==========================================
//  AUTO-START
// ==========================================

setTimeout(() => {
    // nic nie trzeba inicjalizować — profil ładuje się na kliknięcie
}, 200);