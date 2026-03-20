/* ============================================================
   profile.js — PROFIL GRACZA
   Zmiana nicku, avatara, ramki, tła, odznaki, tytułu
============================================================ */

/* ===================== ŁADOWANIE PROFILU =================== */

function loadProfileSettings() {
    loadFrameSelect(player);
    loadBackgroundSelect(player);
    loadBadgeList(player);
    loadTitleList(player);

    // Podgląd avatara
    const preview = document.getElementById("profile-avatar-preview");
    if (player.avatar) {
        preview.style.backgroundImage = `url(${player.avatar})`;
    }
}

/* ===================== ZMIANA ODZNAKI ======================= */

function equipBadge(badge) {
    player.equippedBadge = badge;
    savePlayer();
    applyCosmetics(player);
}

/* ===================== ZMIANA TYTUŁU ======================== */

function equipTitle(title) {
    player.equippedTitle = title;
    savePlayer();
    applyCosmetics(player);
}

/* ===================== ZMIANA RAMKI ========================= */

function equipFrame(frameId) {
    player.frame = frameId;
    savePlayer();
    applyCosmetics(player);
}

/* ===================== ZMIANA TŁA =========================== */

function equipBackground(bgId) {
    player.background = bgId;
    savePlayer();
    applyCosmetics(player);
}

/* ===================== ZMIANA AVATARA ======================= */

function setAvatar(file) {
    uploadAvatar(player, file, () => {
        const preview = document.getElementById("profile-avatar-preview");
        preview.style.backgroundImage = `url(${player.avatar})`;
        applyCosmetics(player);
    });
}

/* ===================== ZMIANA NICKU ========================= */

function changeNickname(newName) {
    if (!newName || newName.length < 3) {
        return "Nick musi mieć min. 3 znaki";
    }

    if (newName === player.username) {
        return "To już Twój nick";
    }

    if (player.coins < 100) {
        return "Zmiana nicku kosztuje 100 coins";
    }

    player.coins -= 100;
    player.username = newName;

    savePlayer();
    updateUI();

    return "Nick zmieniony!";
}

/* ===================== ZAPIS PROFILU ======================== */

function saveProfileChanges() {
    const newName = document.getElementById("profile-new-name").value.trim();
    const newFrame = document.getElementById("profile-frame-select").value;
    const newBg = document.getElementById("profile-bg-select").value;
    const newBtn = document.getElementById("profile-btn-select").value;

    let msg = "";

    if (newName) {
        msg = changeNickname(newName);
    }

    if (newFrame) equipFrame(newFrame);
    if (newBg) equipBackground(newBg);
    if (newBtn) {
        player.buttonColor = newBtn;
        document.documentElement.style.setProperty("--button-color", newBtn);
    }

    savePlayer();
    applyCosmetics(player);
    updateUI();

    return msg || "Zapisano!";
}

/* ===================== EXPORT =============================== */

window.loadProfileSettings = loadProfileSettings;
window.equipBadge = equipBadge;
window.equipTitle = equipTitle;
window.equipFrame = equipFrame;
window.equipBackground = equipBackground;
window.setAvatar = setAvatar;
window.changeNickname = changeNickname;
window.saveProfileChanges = saveProfileChanges;