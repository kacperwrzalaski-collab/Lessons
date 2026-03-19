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
        if (!user) return;

        user.avatar = e.target.result;
        saveUser(user);
        loadProfile();
        loadProfileEditor();
    };
    reader.readAsDataURL(file);
};

// ==========================================
//  PRESTIŻ — RESET LEVELA I XP
// ==========================================

const prestigeBtn = document.getElementById("prestige-btn");
if (prestigeBtn) {
    prestigeBtn.onclick = () => {
        const username = localStorage.getItem("currentUser");
        const user = loadUser(username);
        if (!user) return;

        if (user.level < 50) {
            alert("❌ Musisz mieć poziom 50, aby wykonać prestiż!");
            return;
        }

        user.prestige++;
        user.level = 1;
        user.xp = 0;
        user.coins = 0;

        saveUser(user);
        loadProfile();
        showPrestigePopup(user.prestige);
    };
}

// ==========================================
//  POPUP PRESTIŻU
// ==========================================

function showPrestigePopup(prestige) {
    const popup = document.getElementById("prestige-up");
    const title = document.getElementById("prestige-up-text");
    const desc = document.getElementById("prestige-up-desc");

    if (!popup || !title || !desc) return;

    title.innerHTML = `🎉 PRESTIŻ +${prestige}!`;
    desc.innerHTML = `Twoje konto zostało ulepszone.`;

    popup.classList.remove("hidden");
}

const prestigeClose = document.getElementById("prestige-up-close");
if (prestigeClose) {
    prestigeClose.onclick = () => {
        document.getElementById("prestige-up").classList.add("hidden");
    };
}

// ==========================================
//  ŁADOWANIE OKNA PROFILU
// ==========================================

function loadProfileEditor() {
    const username = localStorage.getItem("currentUser");
    const user = loadUser(username);
    if (!user) return;

    // Nazwa i coins (jeśli chcesz gdzieś wyświetlać w oknie profilu)
    // Możesz dodać np. osobne elementy, ale na razie używamy tylko selectów i avatara

    // Avatar preview
    const avatarPrev = document.getElementById("profile-avatar-preview");
    if (avatarPrev) {
        avatarPrev.style.backgroundImage = user.avatar ? `url(${user.avatar})` : "none";
    }

    // Ramki
    const frameSelect = document.getElementById("profile-frame-select");
    if (frameSelect) {
        frameSelect.innerHTML = "<option value='none'>Brak</option>";
        user.inventory.frames.forEach(f => {
            const opt = document.createElement("option");
            opt.value = f;
            opt.textContent = f;
            if (user.equippedFrame === f) opt.selected = true;
            frameSelect.appendChild(opt);
        });
    }

    // Tła
    const bgSelect = document.getElementById("profile-bg-select");
    if (bgSelect) {
        bgSelect.innerHTML = "<option value='none'>Brak</option>";
        user.inventory.backgrounds.forEach(bg => {
            const opt = document.createElement("option");
            opt.value = bg;
            opt.textContent = bg;
            if (user.equippedBackground === bg) opt.selected = true;
            bgSelect.appendChild(opt);
        });
    }

    // Kolory przycisków
    const btnSelect = document.getElementById("profile-btn-select");
    if (btnSelect) {
        btnSelect.innerHTML = "<option value='none'>Brak</option>";
        user.inventory.buttons.forEach(btn => {
            const opt = document.createElement("option");
            opt.value = btn;
            opt.textContent = btn;
            if (user.equippedButtonTheme === btn) opt.selected = true;
            btnSelect.appendChild(opt);
        });
    }
}

// ==========================================
//  ZAPIS ZMIAN W PROFILU
// ==========================================

document.getElementById("profile-save").onclick = () => {
    const username = localStorage.getItem("currentUser");
    const user = loadUser(username);
    if (!user) return;

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
//  OTWIERANIE / ZAMYKANIE OKNA PROFILU
// ==========================================

const profileWindow = document.getElementById("profile-window");
const profileAvatar = document.getElementById("profile-avatar");
const profileClose = document.getElementById("profile-close");

if (profileAvatar && profileWindow) {
    profileAvatar.onclick = () => {
        profileWindow.classList.remove("hidden");
        loadProfileEditor();
    };
}

if (profileClose && profileWindow) {
    profileClose.onclick = () => {
        profileWindow.classList.add("hidden");
    };
}