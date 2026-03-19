// ==========================================
//  PROFIL — AVATAR, ZMIANY WYGLĄDU
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

        // Aktualizacja sidebaru
        const sidebarAvatar = document.getElementById("profile-avatar");
        if (sidebarAvatar) {
            sidebarAvatar.style.backgroundImage = `url(${user.avatar})`;
        }

        // Aktualizacja podglądu w oknie profilu
        const avatarPrev = document.getElementById("profile-avatar-preview");
        if (avatarPrev) {
            avatarPrev.style.backgroundImage = `url(${user.avatar})`;
        }
    };
    reader.readAsDataURL(file);
};

// ŁADOWANIE EDYTORA PROFILU
function loadProfileEditor() {
    const username = localStorage.getItem("currentUser");
    const user = loadUser(username);
    if (!user) return;

    const avatarPrev = document.getElementById("profile-avatar-preview");
    if (avatarPrev) {
        avatarPrev.style.backgroundImage = user.avatar ? `url(${user.avatar})` : "none";
    }

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

    const btnSelect = document.getElementById("profile-btn-select");
    if (btnSelect) {
        btnSelect.innerHTML = "<option value='none'>Brak</option>";
        user.inventory.buttons.forEach(btn => {
            const opt = document.createElement("option");
            opt.value = btn;
            opt.textContent = btn;
            if (user.equippedButtonTheme === btn) opt.selected = true;
            frameSelect.appendChild(opt);
        });
    }
}

// ZAPIS ZMIAN
document.getElementById("profile-save").onclick = () => {
    const username = localStorage.getItem("currentUser");
    const user = loadUser(username);
    if (!user) return;

    const newName = document.getElementById("profile-new-name").value.trim();
    const frame = document.getElementById("profile-frame-select").value;
    const bg = document.getElementById("profile-bg-select").value;
    const btn = document.getElementById("profile-btn-select").value;
    const feedback = document.getElementById("profile-feedback");

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

    if (frame !== "none") user.equippedFrame = frame;
    if (bg !== "none") user.equippedBackground = bg;
    if (btn !== "none") user.equippedButtonTheme = btn;

    saveUser(user);
    loadProfile();
    renderInventory();
};

// OTWIERANIE / ZAMYKANIE OKNA PROFILU
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