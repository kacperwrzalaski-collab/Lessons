/* ============================================================
   cosmetics.js — SYSTEM KOSMETYKÓW
   Ramki, tła, odznaki, tytuły, efekty profilu
============================================================ */

/* ===================== NAKŁADANIE KOSMETYKÓW =============== */

function applyCosmetics(player) {

    /* AVATAR */
    const avatar = document.getElementById("profile-avatar");
    if (player.avatar) {
        avatar.style.backgroundImage = `url(${player.avatar})`;
    }

    /* RAMKA */
    if (player.frame) {
        avatar.className = "avatar"; // reset
        avatar.classList.add(player.frame);
    }

    /* TŁO */
    if (player.background) {
        document.body.className = ""; // reset
        document.body.classList.add(player.background);
    }

    /* KOLOR PRZYCISKÓW */
    if (player.buttonColor) {
        document.documentElement.style.setProperty("--button-color", player.buttonColor);
    }

    /* ODZNAKA */
    const badgeSlot = document.getElementById("profile-badge");
    badgeSlot.textContent = player.equippedBadge || "";

    /* TYTUŁ */
    const titleSlot = document.getElementById("profile-title");
    titleSlot.textContent = player.equippedTitle || "";
}

/* ===================== LISTY DO PROFILU ==================== */

function loadFrameSelect(player) {
    const select = document.getElementById("profile-frame-select");
    select.innerHTML = "<option value=''>Brak</option>";

    [...STATIC_FRAMES, ...ANIMATED_FRAMES].forEach(frame => {
        const opt = document.createElement("option");
        opt.value = frame;
        opt.textContent = frame;
        if (player.frame === frame) opt.selected = true;
        select.appendChild(opt);
    });
}

function loadBackgroundSelect(player) {
    const select = document.getElementById("profile-bg-select");
    select.innerHTML = "<option value=''>Domyślne</option>";

    BACKGROUNDS.forEach(bg => {
        const opt = document.createElement("option");
        opt.value = bg;
        opt.textContent = bg;
        if (player.background === bg) opt.selected = true;
        select.appendChild(opt);
    });
}

function loadBadgeList(player) {
    const box = document.getElementById("settings-badge-list");
    box.innerHTML = "";

    player.inventory.badges.forEach(badge => {
        const div = document.createElement("div");
        div.className = "inventory-item glass";
        div.textContent = badge;

        div.addEventListener("click", () => {
            player.equippedBadge = badge;
            savePlayer();
            applyCosmetics(player);
        });

        box.appendChild(div);
    });
}

function loadTitleList(player) {
    const box = document.getElementById("settings-title-list");
    box.innerHTML = "";

    player.inventory.titles.forEach(title => {
        const div = document.createElement("div");
        div.className = "inventory-item glass";
        div.textContent = title;

        div.addEventListener("click", () => {
            player.equippedTitle = title;
            savePlayer();
            applyCosmetics(player);
        });

        box.appendChild(div);
    });
}

/* ===================== FUNKCJE ZMIANY PROFILU =============== */

function updateProfile(player, newName, newFrame, newBg, newBtn) {

    if (newName && newName !== player.username) {
        if (player.coins < 100) {
            return "Za mało coins na zmianę nicku (100)";
        }
        player.coins -= 100;
        player.username = newName;
    }

    if (newFrame) player.frame = newFrame;
    if (newBg) player.background = newBg;
    if (newBtn) player.buttonColor = newBtn;

    savePlayer();
    applyCosmetics(player);

    return "Zapisano!";
}

/* ===================== AVATAR =============================== */

function uploadAvatar(player, file, callback) {
    const reader = new FileReader();
    reader.onload = () => {
        player.avatar = reader.result;
        savePlayer();
        callback && callback();
    };
    reader.readAsDataURL(file);
}

/* ===================== EXPORT =============================== */

window.applyCosmetics = applyCosmetics;
window.loadFrameSelect = loadFrameSelect;
window.loadBackgroundSelect = loadBackgroundSelect;
window.loadBadgeList = loadBadgeList;
window.loadTitleList = loadTitleList;
window.updateProfile = updateProfile;
window.uploadAvatar = uploadAvatar;