/* ============================================================
   APP.JS — CAŁA LOGIKA W JEDNYM PLIKU
============================================================ */

/* ===================== DANE GRACZA ========================= */

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

/* ================= LOGOWANIE / REJESTRACJA ================= */

function register(username, password) {
    if (!username || !password) return "Wpisz dane";

    if (localStorage.getItem("playerData")) {
        return "Konto już istnieje";
    }

    player.username = username;
    player.password = password;
    savePlayer();
    return "Zarejestrowano!";
}

function login(username, password) {
    if (!loadPlayer()) return "Brak konta";

    if (username !== player.username || password !== player.password) {
        return "Złe dane logowania";
    }

    return "OK";
}

/* ===================== XP / LEVEL ========================== */

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

/* ===================== KOSMETYKI =========================== */

function applyCosmetics() {
    if (player.background) {
        document.body.style.background = player.background;
    }

    if (player.buttonColor) {
        document.documentElement.style.setProperty("--button-color", player.buttonColor);
    }

    const avatarEl = document.getElementById("profile-avatar");
    if (player.avatar) {
        avatarEl.style.backgroundImage = `url(${player.avatar})`;
    }
    if (player.frame) {
        avatarEl.style.border = `3px solid ${player.frame}`;
    }
}

/* ===================== TEMATY SŁÓWEK ======================= */

const topics = {
    angielski: {
        temat1: [
            { word: "accent", pl: "akcent" },
            { word: "assignment", pl: "zadanie, zadana praca" },
            { word: "assistance", pl: "pomoc, wsparcie" },
            { word: "attend (school)", pl: "chodzić do szkoły" },
            { word: "concentrate", pl: "skupić się" },
            { word: "distance learning", pl: "nauczanie zdalne" },
            { word: "do a project", pl: "wykonać projekt" },
            { word: "do research", pl: "wyszukać informacje" },
            { word: "express yourself", pl: "wyrazić się" },
            { word: "fall behind with schoolwork", pl: "mieć zaległości w nauce" },
            { word: "gain knowledge", pl: "zdobywać wiedzę" },
            { word: "get better", pl: "poprawiać się" },
            { word: "have a conversation", pl: "prowadzić rozmowę" },
            { word: "high expectations", pl: "wysokie oczekiwania" },
            { word: "improve your grades", pl: "poprawić oceny" },
            { word: "learn a new skill", pl: "nabyć nową umiejętność" },
            { word: "leave school", pl: "skończyć szkołę" },
            { word: "motivate", pl: "motywować" },
            { word: "native speaker", pl: "rodzimy użytkownik języka" },
            { word: "practise", pl: "ćwiczyć" },
            { word: "school certificate", pl: "świadectwo szkolne" },
            { word: "strict", pl: "surowy" },
            { word: "supervise", pl: "nadzorować" },
            { word: "video conferencing app", pl: "oprogramowanie do wideokonferencji" },

            { word: "after-school activities", pl: "zajęcia pozaszkolne" },
            { word: "charity work", pl: "wolontariat" },
            { word: "cookery course", pl: "kurs gotowania" },
            { word: "drawing classes", pl: "lekcje rysunku" },
            { word: "fill up", pl: "zapełniać się" },
            { word: "first-aid course", pl: "kurs pierwszej pomocy" },
            { word: "graphic design classes", pl: "zajęcia z projektowania graficznego" },
            { word: "music production course", pl: "kurs na producenta muzycznego" },
            { word: "register", pl: "rejestrować się" },
            { word: "registration form", pl: "formularz rejestracyjny" },
            { word: "robotics course", pl: "kurs robotyki" },
            { word: "sing in a choir", pl: "śpiewać w chórze" },

            { word: "activity course", pl: "kurs aktywności" },
            { word: "beat", pl: "pokonać" },
            { word: "disappointed", pl: "rozczarowany" },
            { word: "do a task", pl: "wykonać zadanie" },
            { word: "experiment with", pl: "eksperymentować z" },
            { word: "give a presentation", pl: "przedstawiać prezentację" },
            { word: "join a camp", pl: "pojechać na obóz" },
            { word: "learn to drive", pl: "nauczyć się prowadzić" },
            { word: "master", pl: "opanować" },
            { word: "opportunity", pl: "okazja" },
            { word: "participant", pl: "uczestnik" },
            { word: "pass your theory test/driving test", pl: "zdać egzamin" },
            { word: "practical", pl: "praktyczny" },
            { word: "primary/secondary school", pl: "szkoła podstawowa/średnia" },
            { word: "sign up for a course", pl: "zapisać się na kurs" },
            { word: "survive", pl: "przetrwać" },
            { word: "take up classes/a course", pl: "zapisać się na zajęcia" },
            { word: "turn (17)", pl: "ukończyć 17 lat" },

            { word: "academic results", pl: "wyniki w nauce" },
            { word: "continue education", pl: "kontynuować naukę" },
            { word: "copy homework", pl: "spisać pracę domową" },

            { word: "do a conversation exchange", pl: "rozmawiać na zmianę" },
            { word: "draw mind maps", pl: "rysować mapy myśli" },
            { word: "have flexible study hours", pl: "elastyczne godziny nauki" },
            { word: "follow instructions", pl: "wykonywać polecenia" },
            { word: "learn sth by heart", pl: "uczyć się na pamięć" },
            { word: "listen to podcasts", pl: "słuchać podcastów" },
            { word: "listen to song lyrics", pl: "słuchać słów piosenki" },
            { word: "memorise", pl: "uczyć się na pamięć" },
            { word: "practise speaking", pl: "ćwiczyć mówienie" },
            { word: "set up a study group", pl: "stworzyć grupę nauki" },
            { word: "struggle", pl: "borykać się" },
            { word: "take notes", pl: "robić notatki" },
            { word: "use educational apps", pl: "używać aplikacji edukacyjnych" },
            { word: "use sticky notes", pl: "używać karteczek" },
            { word: "watch video tutorials", pl: "oglądać tutoriale" },

            { word: "last", pl: "trwać" },
            { word: "level", pl: "poziom" },
            { word: "speed-reading course", pl: "kurs szybkiego czytania" },

            { word: "race", pl: "wyścig" },
            { word: "regret", pl: "żałować" },
            { word: "run a marathon", pl: "przebiec maraton" },
            { word: "half-marathon", pl: "półmaraton" },
            { word: "triplets", pl: "trojaczki" },

            { word: "enquire about sth", pl: "zapytać o coś" },
            { word: "make a payment", pl: "dokonać wpłaty" },
            { word: "obtain", pl: "uzyskać" },
            { word: "perform a task", pl: "wykonać zadanie" },
            { word: "solve a problem", pl: "rozwiązać problem" },
            { word: "survival course", pl: "kurs przetrwania" }
        ]
    },
    niemiecki: {
        temat1: []
    }
};

/* ===================== SKLEP / QUESTY ====================== */

const shopItems = [
    { id: "frame-red", type: "frames", name: "Czerwona ramka", price: 50, value: "red" },
    { id: "bg-blue", type: "backgrounds", name: "Niebieskie tło", price: 80, value: "#001f3f" },
    { id: "btn-green", type: "buttons", name: "Zielone przyciski", price: 70, value: "#00cc66" }
];

const quests = [
    { id: 1, text: "Zrób 5 fiszek", key: "flash", progress: 0, goal: 5, rewardXP: 30, done: false },
    { id: 2, text: "Zrób 3 quizy", key: "quiz", progress: 0, goal: 3, rewardXP: 40, done: false }
];

/* ===================== POMOCNICZE ========================== */

function getTopicWords() {
    const lang = document.getElementById("learn-language-select").value;
    const topic = document.getElementById("learn-topic-select").value;
    if (!topics[lang] || !topics[lang][topic]) return [];
    return topics[lang][topic];
}

function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

/* ===================== NAUKA — TABELA ====================== */

function fillLanguageSelect() {
    const select = document.getElementById("learn-language-select");
    select.innerHTML = "";
    Object.keys(topics).forEach(lang => {
        const opt = document.createElement("option");
        opt.value = lang;
        opt.textContent = lang.toUpperCase();
        select.appendChild(opt);
    });
}

function fillTopicSelect() {
    const lang = document.getElementById("learn-language-select").value;
    const select = document.getElementById("learn-topic-select");
    select.innerHTML = "";
    if (!topics[lang]) return;
    Object.keys(topics[lang]).forEach(t => {
        const opt = document.createElement("option");
        opt.value = t;
        opt.textContent = t.toUpperCase();
        select.appendChild(opt);
    });
}

function fillLearnTable() {
    const tbody = document.getElementById("learn-table-body");
    tbody.innerHTML = "";
    const words = getTopicWords();
    words.forEach(w => {
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        td1.textContent = w.word;
        td2.textContent = w.pl;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tbody.appendChild(tr);
    });
}

/* ===================== FISZKI ============================== */

let flashIndex = 0;

function loadFlashcard() {
    const words = getTopicWords();
    if (words.length === 0) {
        document.getElementById("flashcard-word").textContent = "Brak słówek";
        document.getElementById("flashcard-answer").textContent = "";
        return;
    }
    const w = words[flashIndex];
    document.getElementById("flashcard-word").textContent = w.word;
    document.getElementById("flashcard-answer").textContent = w.pl;
    document.getElementById("flashcard-answer").classList.add("hidden");
}

function nextFlashcard() {
    const words = getTopicWords();
    if (words.length === 0) return;
    flashIndex = (flashIndex + 1) % words.length;
    loadFlashcard();
}

/* ===================== QUIZ ================================ */

function loadQuiz() {
    const words = getTopicWords();
    const qEl = document.getElementById("quiz-question");
    const box = document.getElementById("quiz-options");
    const fb = document.getElementById("quiz-feedback");

    box.innerHTML = "";
    fb.textContent = "";

    if (words.length < 2) {
        qEl.textContent = "Za mało słówek do quizu";
        return;
    }

    const q = words[Math.floor(Math.random() * words.length)];
    qEl.textContent = `Co znaczy: ${q.word}?`;

    const options = shuffle([
        q.pl,
        ...words.filter(w => w.pl !== q.pl).sort(() => Math.random() - 0.5).slice(0, 3).map(w => w.pl)
    ]);

    options.forEach(opt => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.addEventListener("click", () => {
            if (opt === q.pl) {
                fb.textContent = "Dobrze!";
                addXP(10);
                questsProgress("quiz");
            } else {
                fb.textContent = "Źle!";
            }
            updateUI();
            setTimeout(loadQuiz, 800);
        });
        box.appendChild(btn);
    });
}

/* ===================== PISANIE ============================= */

let writeWord = null;

function loadWriteWord() {
    const words = getTopicWords();
    const qEl = document.getElementById("write-question");
    const fb = document.getElementById("write-feedback");
    fb.textContent = "";
    document.getElementById("write-answer").value = "";

    if (words.length === 0) {
        qEl.textContent = "Brak słówek";
        return;
    }

    writeWord = words[Math.floor(Math.random() * words.length)];
    qEl.textContent = `Przetłumacz: ${writeWord.word}`;
}

function checkWrite() {
    if (!writeWord) return;
    const ans = document.getElementById("write-answer").value.trim();
    const fb = document.getElementById("write-feedback");

    if (ans === writeWord.pl) {
        fb.textContent = "Dobrze!";
        addXP(12);
        updateUI();
        loadWriteWord();
    } else {
        fb.textContent = `Źle! Poprawna odpowiedź: ${writeWord.pl}`;
    }
}

/* ===================== QUESTY ============================== */

function questsProgress(type) {
    quests.forEach(q => {
        if (q.done) return;
        if (q.key === type) {
            q.progress++;
            if (q.progress >= q.goal) {
                q.done = true;
                addXP(q.rewardXP);
            }
        }
    });
    savePlayer();
    renderQuests();
}

function renderQuests() {
    const box = document.getElementById("quests-list");
    box.innerHTML = "";
    quests.forEach(q => {
        const div = document.createElement("div");
        div.className = "quest-item glass";
        div.textContent = `${q.text} (${q.progress}/${q.goal}) — nagroda: ${q.rewardXP} XP` +
            (q.done ? " [ZROBIONE]" : "");
        box.appendChild(div);
    });
}

/* ===================== SKLEP / EKWIPUNEK =================== */

function renderShop() {
    const box = document.getElementById("shop-items");
    box.innerHTML = "";
    shopItems.forEach(item => {
        const div = document.createElement("div");
        div.className = "shop-item glass";
        div.innerHTML = `
            <strong>${item.name}</strong><br>
            Cena: ${item.price} 🪙<br>
        `;
        const btn = document.createElement("button");
        btn.textContent = "Kup";
        btn.addEventListener("click", () => {
            if (player.coins < item.price) return;
            player.coins -= item.price;
            player.inventory[item.type].push(item.value);
            savePlayer();
            updateUI();
            renderInventory();
        });
        div.appendChild(btn);
        box.appendChild(div);
    });
}

function renderInventoryList(id, arr) {
    const box = document.getElementById(id);
    box.innerHTML = "";
    if (!arr || arr.length === 0) {
        box.textContent = "Brak";
        return;
    }
    arr.forEach(v => {
        const div = document.createElement("div");
        div.className = "inventory-item glass";
        div.textContent = v;
        box.appendChild(div);
    });
}

function renderInventory() {
    renderInventoryList("inventory-badges", player.inventory.badges);
    renderInventoryList("inventory-frames", player.inventory.frames);
    renderInventoryList("inventory-backgrounds", player.inventory.backgrounds);
    renderInventoryList("inventory-buttons", player.inventory.buttons);
}

/* ===================== PROFIL / AVATAR ===================== */

function updateUI() {
    document.getElementById("profile-name").textContent = player.username || "Brak";
    document.getElementById("profile-level").textContent = "Poziom " + player.level;
    document.getElementById("profile-coins").textContent = player.coins + " 🪙";

    const needed = player.level * 100;
    const percent = needed ? (player.xp / needed) * 100 : 0;
    document.getElementById("profile-xp-fill").style.width = percent + "%";

    applyCosmetics();
}

function updateProfile(newName, newFrame, newBg, newBtn) {
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
    applyCosmetics();
    updateUI();
    return "Zapisano!";
}

function uploadAvatar(file, cb) {
    const reader = new FileReader();
    reader.onload = () => {
        player.avatar = reader.result;
        savePlayer();
        applyCosmetics();
        cb && cb();
    };
    reader.readAsDataURL(file);
}

/* ===================== ADMIN =============================== */

const ADMIN_PASSWORD = "admin123";

function adminLogin(pass) {
    return pass === ADMIN_PASSWORD;
}

function adminCommand(cmd) {
    const parts = cmd.trim().split(" ");
    if (!parts[0]) return "Brak komendy";

    switch (parts[0]) {
        case "xp":
            addXP(parseInt(parts[1]) || 0);
            return "Dodano XP";
        case "coins":
            player.coins += parseInt(parts[1]) || 0;
            savePlayer();
            updateUI();
            return "Dodano coins";
        case "reset":
            localStorage.removeItem("playerData");
            location.reload();
            return "Zresetowano konto";
        default:
            return "Nieznana komenda";
    }
}

/* ===================== UI — EKRANY / POPUPY ================ */

const screens = document.querySelectorAll(".screen");
const profileWindow = document.getElementById("profile-window");
const adminLoginWindow = document.getElementById("admin-login");
const adminPanelWindow = document.getElementById("admin-panel");

function showScreen(id) {
    screens.forEach(s => s.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
}

document.querySelectorAll(".nav-tile").forEach(btn => {
    btn.addEventListener("click", () => {
        showScreen(btn.dataset.screen);
    });
});

/* POPUPY — tu bez overlay, tylko hidden */

function openPopup(win) {
    win.classList.remove("hidden");
}

function closePopup(win) {
    win.classList.add("hidden");
}

/* ===================== EVENTY — PROFIL ===================== */

document.getElementById("profile-avatar").addEventListener("click", () => {
    document.getElementById("profile-feedback").textContent = "";
    document.getElementById("profile-avatar-preview").style.backgroundImage =
        player.avatar ? `url(${player.avatar})` : "";
    openPopup(profileWindow);
});

document.getElementById("profile-close").addEventListener("click", () => {
    closePopup(profileWindow);
});

document.getElementById("profile-save").addEventListener("click", () => {
    const newName = document.getElementById("profile-new-name").value.trim();
    const newFrame = document.getElementById("profile-frame-select").value;
    const newBg = document.getElementById("profile-bg-select").value;
    const newBtn = document.getElementById("profile-btn-select").value;

    const msg = updateProfile(newName, newFrame, newBg, newBtn);
    document.getElementById("profile-feedback").textContent = msg;
});

document.getElementById("profile-avatar-upload").addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;
    uploadAvatar(file, () => {
        document.getElementById("profile-avatar-preview").style.backgroundImage =
            `url(${player.avatar})`;
    });
});

/* ===================== EVENTY — ADMIN ====================== */

document.getElementById("profile-name").addEventListener("dblclick", () => {
    openPopup(adminLoginWindow);
});

document.getElementById("admin-login-close").addEventListener("click", () => {
    closePopup(adminLogin