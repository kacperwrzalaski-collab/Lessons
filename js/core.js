/* ============================================================
   CORE.JS — SYSTEM GRACZA, LOGOWANIE, PROFIL, KOSMETYKI, ADMIN
============================================================ */

let player = {
    username: "",
    password: "",
    level: 1,
    xp: 0,
    coins: 0,

    avatar: "",
    frame: "",
    background: "",
    buttonColor: "",

    inventory: {
        badges: [],
        frames: [],
        backgrounds: [],
        buttons: []
    }
};

function savePlayer() {
    localStorage.setItem("playerData", JSON.stringify(player));
}

function loadPlayer() {
    const data = localStorage.getItem("playerData");
    if (!data) return false;

    player = JSON.parse(data);
    return true;
}

/* LOGOWANIE / REJESTRACJA */

function register(username, password) {
    if (!username || !password) return "Wpisz nazwę i hasło";

    if (localStorage.getItem("playerData")) {
        return "Konto już istnieje";
    }

    player.username = username;
    player.password = password;
    savePlayer();

    return "Zarejestrowano!";
}

function login(username, password) {
    if (!loadPlayer()) return "Brak konta — zarejestruj się";

    if (username !== player.username || password !== player.password) {
        return "Złe dane logowania";
    }

    return "OK";
}

/* XP / LEVEL */

function addXP(amount) {
    player.xp += amount;

    const needed = player.level * 100;

    if (player.xp >= needed) {
        player.xp -= needed;
        player.level++;
        player.coins += 50;
    }

    savePlayer();
}

/* KOSMETYKI */

function applyCosmetics() {
    if (player.background) {
        document.body.style.background = player.background;
    }

    if (player.buttonColor) {
        document.documentElement.style.setProperty("--button-color", player.buttonColor);
    }

    if (player.avatar) {
        document.getElementById("profile-avatar").style.backgroundImage =
            `url(${player.avatar})`;
    }

    if (player.frame) {
        document.getElementById("profile-avatar").style.border =
            `3px solid ${player.frame}`;
    }
}

/* PROFIL */

function updateProfile(newName, newFrame, newBg, newBtn) {
    if (newName && newName !== player.username) {
        if (player.coins < 100) return "Za mało coins!";
        player.coins -= 100;
        player.username = newName;
    }

    if (newFrame) player.frame = newFrame;
    if (newBg) player.background = newBg;
    if (newBtn) player.buttonColor = newBtn;

    savePlayer();
    applyCosmetics();

    return "Zapisano!";
}

/* AVATAR */

function uploadAvatar(file, callback) {
    const reader = new FileReader();
    reader.onload = () => {
        player.avatar = reader.result;
        savePlayer();
        applyCosmetics();
        callback();
    };
    reader.readAsDataURL(file);
}

/* ADMIN */

const ADMIN_PASSWORD = "admin123";

function adminLogin(pass) {
    return pass === ADMIN_PASSWORD;
}

function adminCommand(cmd) {
    const parts = cmd.split(" ");

    switch (parts[0]) {
        case "xp":
            addXP(parseInt(parts[1]));
            return "Dodano XP";

        case "coins":
            player.coins += parseInt(parts[1]);
            savePlayer();
            return "Dodano coins";

        case "reset":
            localStorage.removeItem("playerData");
            return "Zresetowano konto";

        default:
            return "Nieznana komenda";
    }
}

window.core = {
    player,
    savePlayer,
    loadPlayer,
    login,
    register,
    addXP,
    updateProfile,
    uploadAvatar,
    applyCosmetics,
    adminLogin,
    adminCommand
};