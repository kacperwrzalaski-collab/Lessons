/* ============================================================
   APP.JS — CAŁA LOGIKA APLIKACJI W JEDNYM PLIKU
============================================================ */

/* ============================================================
   DANE GRACZA
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

/* ============================================================
   LOGOWANIE / REJESTRACJA
============================================================ */

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

/* ============================================================
   XP / LEVEL
============================================================ */

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

/* ============================================================
   KOSMETYKI
============================================================ */

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

/* ============================================================
   TEMATY SŁÓWEK
============================================================ */

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

/* ============================================================
   WYBÓR TEMATU
============================================================ */

function getTopicWords() {
    const lang = document.getElementById("learn-language-select").value;
    const topic = document.getElementById("learn-topic-select").value;
    return topics[lang][topic] || [];
}

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

    Object.keys(topics[lang]).forEach(t => {
        const opt = document.createElement("option");
        opt.value = t;
        opt.textContent = t.toUpperCase();
        select.appendChild(opt);
    });
}

/* ============================================================
   NAUKA
============================================================ */

let learnIndex = 0;

function loadLearnWord() {
    const words = getTopicWords();
    if (words.length === 0) return;

    const w = words[learnIndex];
    document.getElementById("learn-word-box").textContent =
        `${w.word} → ${w.pl}`;
}

document.getElementById("learn-next").addEventListener("click", () => {
    const words = getTopicWords();
    if (words.length === 0) return;

    learnIndex = (learnIndex + 1) % words.length;
    loadLearnWord();
    addXP(5);
    updateUI();
});

/* ============================================================
   FISZKI
============================================================ */

let flashIndex = 0;

function loadFlashcard() {
    const words = getTopicWords();
    if (words.length === 0) return;

    const w = words[flashIndex];

    document.getElementById("flashcard-word").textContent = w.word;
    document.getElementById("flashcard-answer").textContent = w.pl;
    document.getElementById("flashcard-answer").classList.add("hidden");
}

document.getElementById("flashcard-show").addEventListener("click", () => {
    document.getElementById("flashcard-answer").classList.remove("hidden");
    addXP(3);
    updateUI();
});

document.getElementById("flashcard-next").addEventListener("click", () => {
    const words = getTopicWords();
    if (words.length === 0) return;

    flashIndex = (flashIndex + 1) % words.length;
    loadFlashcard();
});

/* ============================================================
   QUIZ
============================================================ */

function loadQuiz() {
    const words = getTopicWords();
    if (words.length === 0) return;

    const q = words[Math.floor(Math.random() * words.length)];

    document.getElementById("quiz-question").textContent =
        `Co znaczy: ${q.word}?`;

    const options = shuffle([
        q.pl,
        ...words
            .filter(w => w.pl !== q.pl)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(w => w.pl)
    ]);

    const box = document.getElementById("quiz-options");
    box.innerHTML = "";

    options.forEach(opt => {
        const btn = document.createElement("button");
        btn.textContent = opt;

        btn.addEventListener("click", () => {
            if (opt === q.pl) {
                document.getElementById("quiz-feedback").textContent = "Dobrze!";
                addXP(10);
            } else {
                document.getElementById("quiz-feedback").textContent = "Źle!";
            }

            updateUI();
            setTimeout(loadQuiz, 800);
        });

        box.appendChild(btn);
    });
}

function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

/* ============================================================
   PISANIE
============================================================ */

let writeWord = null;

function loadWriteWord() {
    const words = getTopicWords();
    if (words.length === 0) return;

    writeWord = words[Math.floor(Math.random() * words.length)];

    document.getElementById("write-question").textContent =
        `Przetłumacz: ${writeWord.word}`;
}

document.getElementById("write-check").addEventListener("click", () => {
    const ans = document.getElementById("write-answer").value.trim();
    const fb = document.getElementById("write-feedback");

    if (!writeWord) return;

    if (ans === writeWord.pl) {
        fb.textContent = "Dobrze!";
        addXP(12);
        updateUI();
        loadWriteWord();
    } else {
        fb.textContent = "Źle!";
    }
});

/* ============================================================
   UI — PRZEŁĄCZANIE EKRANÓW
============================================================ */

const screens = document.querySelectorAll(".screen");

function showScreen(id) {
    screens.forEach(s => s.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
}

document.querySelectorAll(".nav-tile").forEach(btn => {
    btn.addEventListener("click", () => {
        showScreen(btn.dataset.screen);
    });
});

/* ============================================================
   PROFIL
============================================================ */

function updateUI() {
    const p = player;

    document.getElementById("profile-name").textContent = p.username;
    document.getElementById("profile-level").textContent = "Poziom " + p.level;
    document.getElementById("profile-coins").textContent = p.coins + " 🪙";

    const needed = p.level * 100;
    const percent = (p.xp / needed) * 100;
    document.getElementById("profile-xp-fill").style.width = percent + "%";

    if (p.avatar) {
        document.getElementById("profile-avatar").style.backgroundImage =
            `url(${p.avatar})`;
    }
}

/* ============================================================
   LOGOWANIE — EVENTY
============================================================ */

document.getElementById("auth-login").addEventListener("click", () => {
    const u = document.getElementById("auth-username").value;
    const p = document.getElementById("auth-password").value;

    const result = login(u, p);

    if (result === "OK") {
        document.getElementById("screen-auth").classList.add("hidden");
        document.getElementById("app-container").classList.remove("hidden");

        updateUI();
        applyCosmetics();
        showScreen("screen-learn");
    } else {
        document.getElementById("auth-feedback").textContent = result;
    }
});

document.getElementById("auth-register").addEventListener("click", () => {
    const u = document.getElementById("auth-username").value;
    const p = document.getElementById("auth-password").value;

    const result = register(u, p);
    document.getElementById("auth-feedback").textContent = result;
});

/* ============================================================
   WYLOGOWANIE
============================================================ */

document.getElementById("logout-btn").addEventListener("click", () => {
    location.reload();
});

/* ============================================================
   OBSŁUGA ZMIANY JĘZYKA I TEMATU
============================================================ */

document.getElementById("learn-language-select").addEventListener("change", () => {
    fillTopicSelect();
    learnIndex = 0;
    flashIndex = 0;
    loadLearnWord();
    loadFlashcard();
    loadQuiz();
    loadWriteWord();
});

document.getElementById("learn-topic-select").addEventListener("change", () => {
    learnIndex = 0;
    flashIndex = 0;