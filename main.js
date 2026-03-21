// ================== DANE PODSTAWOWE ==================

const ADMIN_PASSWORD = "1admin2panel";

// Przykładowe tematy nauki i słownictwo
const topics = [
    {
        id: "ang1",
        name: "Angielski - Temat 1",
        words: [
            { pl: "kot", en: "cat" },
            { pl: "pies", en: "dog" },
            { pl: "dom", en: "house" },
            { pl: "samochód", en: "car" },
        ]
    },
    {
        id: "ang2",
        name: "Angielski - Temat 2",
        words: [
            { pl: "jabłko", en: "apple" },
            { pl: "chleb", en: "bread" },
            { pl: "woda", en: "water" },
            { pl: "mleko", en: "milk" },
        ]
    }
];

// Questy – przykładowe
const baseQuests = [
    { id: "q1", text: "Zrób bezbłędnie 1 quiz", type: "perfect_quiz", target: 1, rewardXP: 100, rewardCoins: 50 },
    { id: "q2", text: "Zrób 5 quizów", type: "quiz_count", target: 5, rewardXP: 150, rewardCoins: 80 },
    { id: "q3", text: "Zdobądź 500 XP", type: "xp_total", target: 500, rewardXP: 50, rewardCoins: 50 },
    { id: "q4", text: "Otwórz 3 skrzynki", type: "crates_opened", target: 3, rewardXP: 200, rewardCoins: 100 },
    { id: "q5", text: "Kup 1 przedmiot kosmetyczny", type: "cosmetic_bought", target: 1, rewardXP: 80, rewardCoins: 40 },
    { id: "q6", text: "Zrób 10 quizów", type: "quiz_count", target: 10, rewardXP: 250, rewardCoins: 150 },
    { id: "q7", text: "Zdobądź 2000 XP", type: "xp_total", target: 2000, rewardXP: 300, rewardCoins: 200 },
    { id: "q8", text: "Osiągnij prestiż 3", type: "prestige_level", target: 3, rewardXP: 400, rewardCoins: 250 },
];

// Sklep – ramki (5 zwykłych, 5 animowanych)
const shopFrames = [
    { id: "frame_basic_blue", name: "Niebieska ramka", price: 200, animated: false },
    { id: "frame_basic_red", name: "Czerwona ramka", price: 200, animated: false },
    { id: "frame_basic_green", name: "Zielona ramka", price: 200, animated: false },
    { id: "frame_basic_gold", name: "Złota ramka", price: 400, animated: false },
    { id: "frame_basic_black", name: "Czarna ramka", price: 250, animated: false },

    { id: "frame_anim_fire", name: "Płomienna ramka", price: 800, animated: true },
    { id: "frame_anim_ice", name: "Lodowa ramka", price: 800, animated: true },
    { id: "frame_anim_neon", name: "Neonowa ramka", price: 1000, animated: true },
    { id: "frame_anim_glitch", name: "Glitch ramka", price: 1000, animated: true },
    { id: "frame_anim_galaxy", name: "Galaktyczna ramka", price: 1200, animated: true },
];

// Sklep – tła (5 zwykłych, 5 animowanych)
const shopBackgrounds = [
    { id: "bg_plain_blue", name: "Niebieskie tło", price: 200, animated: false },
    { id: "bg_plain_gray", name: "Szare tło", price: 200, animated: false },
    { id: "bg_plain_green", name: "Zielone tło", price: 200, animated: false },
    { id: "bg_plain_purple", name: "Fioletowe tło", price: 250, animated: false },
    { id: "bg_plain_white", name: "Jasne tło", price: 150, animated: false },

    { id: "bg_anim_matrix", name: "Matrix", price: 900, animated: true },
    { id: "bg_anim_fire", name: "Płomienie", price: 900, animated: true },
    { id: "bg_anim_space", name: "Kosmos", price: 1100, animated: true },
    { id: "bg_anim_wave", name: "Fale neonowe", price: 1100, animated: true },
    { id: "bg_anim_glitch", name: "Glitch tło", price: 1200, animated: true },
];

// Sklep – kolory/ramki przycisków (5 zwykłych, 5 animowanych)
const shopButtonStyles = [
    { id: "btn_basic_blue", name: "Niebieskie przyciski", price: 200, animated: false },
    { id: "btn_basic_red", name: "Czerwone przyciski", price: 200, animated: false },
    { id: "btn_basic_green", name: "Zielone przyciski", price: 200, animated: false },
    { id: "btn_basic_gold", name: "Złote przyciski", price: 300, animated: false },
    { id: "btn_basic_black", name: "Czarne przyciski", price: 250, animated: false },

    { id: "btn_anim_rainbow", name: "Tęczowe przyciski", price: 900, animated: true },
    { id: "btn_anim_pulse", name: "Pulsujące przyciski", price: 900, animated: true },
    { id: "btn_anim_neon", name: "Neonowe przyciski", price: 1000, animated: true },
    { id: "btn_anim_glitch", name: "Glitch przyciski", price: 1000, animated: true },
    { id: "btn_anim_fire", name: "Płomienne przyciski", price: 1100, animated: true },
];

// Skrzynki (5 rodzajów)
const shopCrates = [
    { id: "crate_xp_small", name: "Mała skrzynia XP", price: 150, type: "xp", maxXP: 100 },
    { id: "crate_frames", name: "Skrzynia ramek", price: 300, type: "frame" },
    { id: "crate_backgrounds", name: "Skrzynia tła", price: 300, type: "background" },
    { id: "crate_buttons", name: "Skrzynia kolorów przycisków", price: 300, type: "button" },
    { id: "crate_mixed", name: "Skrzynia mieszana", price: 500, type: "mixed" },
];

// LearnPass – 60 poziomów, każdy 100 XP
const LEARNPASS_LEVELS = 60;
const LEARNPASS_XP_PER_LEVEL = 100;

// Specjalne nagrody z LearnPass (przykład)
const learnPassRewards = {}; // level -> reward
for (let i = 1; i <= LEARNPASS_LEVELS; i++) {
    if (i % 5 === 0) {
        learnPassRewards[i] = { type: "crate_pass", name: "Skrzynia Passowa" };
    } else if (i % 3 === 0) {
        learnPassRewards[i] = { type: "coins", amount: 200 };
    } else {
        learnPassRewards[i] = { type: "xp", amount: 100 };
    }
}
// Poziom 60 – specjalny tytuł i odznaka "Płomień"
learnPassRewards[60] = { type: "title_badge", title: "Płomień", badgeId: "badge_flame" };

// ================== STAN GRACZA ==================

let currentUser = null; // nazwa użytkownika
let users = {};         // baza użytkowników w localStorage

function loadUsers() {
    const data = localStorage.getItem("lr_users");
    if (data) {
        users = JSON.parse(data);
    }
}

function saveUsers() {
    localStorage.setItem("lr_users", JSON.stringify(users));
}

function getUserData(username) {
    if (!users[username]) return null;
    return users[username];
}

function createUser(username, password) {
    users[username] = {
        password,
        xp: 0,
        coins: 0,
        prestigeXP: 0,
        prestigeLevel: 1,
        stats: {
            quizzesDone: 0,
            perfectQuizzes: 0,
            cratesOpened: 0,
            cosmeticsBought: 0,
        },
        inventory: {
            frames: [],
            backgrounds: [],
            buttonStyles: [],
            crates: [],
            titles: [],
            badges: [],
        },
        equipped: {
            frame: null,
            background: null,
            buttonStyle: null,
            title: null,
            badge: null,
        },
        learnpass: {
            xp: 0,
            claimedLevels: [],
        },
        quests: [],
        deviceMode: "desktop",
        theme: "light",
    };
    saveUsers();
}

// ================== POMOCNICZE ==================

function setCurrentUser(username) {
    currentUser = username;
    const user = getUserData(username);
    if (!user) return;

    // motyw
    document.body.classList.toggle("dark-theme", user.theme === "dark");
    document.body.classList.toggle("light-theme", user.theme !== "dark");

    // tryb urządzenia
    document.body.classList.toggle("phone-mode", user.deviceMode === "phone");

    updateUIFromUser();
}

function addXP(amount) {
    const user = getUserData(currentUser);
    if (!user) return;

    user.xp += amount;
    user.prestigeXP += amount;
    user.learnpass.xp += amount;

    // prestiż co 1000 XP
    while (user.prestigeXP >= 1000) {
        user.prestigeXP -= 1000;
        user.prestigeLevel += 1;
        // tu można dodać automatyczne przyznawanie neonowej odznaki/tła/przycisku
    }

    saveUsers();
    updateUIFromUser();
}

function addCoins(amount) {
    const user = getUserData(currentUser);
    if (!user) return;
    user.coins += amount;
    saveUsers();
    updateUIFromUser();
}

function spendCoins(amount) {
    const user = getUserData(currentUser);
    if (!user) return false;
    if (user.coins < amount) return false;
    user.coins -= amount;
    saveUsers();
    updateUIFromUser();
    return true;
}

// ================== UI – PODSTAWY ==================

const authScreen = document.getElementById("auth-screen");
const app = document.getElementById("app");

const loginTab = document.getElementById("login-tab");
const registerTab = document.getElementById("register-tab");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

const loginUsername = document.getElementById("login-username");
const loginPassword = document.getElementById("login-password");
const loginBtn = document.getElementById("login-btn");
const loginError = document.getElementById("login-error");

const registerUsername = document.getElementById("register-username");
const registerPassword = document.getElementById("register-password");
const registerPassword2 = document.getElementById("register-password2");
const registerBtn = document.getElementById("register-btn");
const registerError = document.getElementById("register-error");

const xpAmount = document.getElementById("xp-amount");
const coinsAmount = document.getElementById("coins-amount");
const profileNick = document.getElementById("profile-nick");
const profileTitle = document.getElementById("profile-title");
const profilePrestige = document.getElementById("profile-prestige");

// Sekcje
const sections = document.querySelectorAll(".section");
const menuButtons = document.querySelectorAll(".menu button");

// Nauka
const naukaTopicsDiv = document.getElementById("nauka-topics");
const naukaContentDiv = document.getElementById("nauka-content");

// Quiz
const quizTopicsDiv = document.getElementById("quiz-topics");
const quizContainer = document.getElementById("quiz-container");

// LearnPass
const learnpassBar = document.getElementById("learnpass-bar");

// Questy
const questListDiv = document.getElementById("quest-list");

// Sklep
const shopFramesDiv = document.getElementById("shop-frames");
const shopBackgroundsDiv = document.getElementById("shop-backgrounds");
const shopButtonStylesDiv = document.getElementById("shop-button-styles");
const shopCratesDiv = document.getElementById("shop-crates");
const shopMessage = document.getElementById("shop-message");

// Ekwipunek
const invFramesDiv = document.getElementById("inv-frames");
const invBackgroundsDiv = document.getElementById("inv-backgrounds");
const invButtonStylesDiv = document.getElementById("inv-button-styles");
const invCratesDiv = document.getElementById("inv-crates");
const crateAnim = document.getElementById("crate-open-animation");
const crateResult = document.getElementById("crate-result");
const crateCloseBtn = document.getElementById("crate-close-btn");

// Profil
const profileNickInput = document.getElementById("profile-nick-input");
const changeNickBtn = document.getElementById("change-nick-btn");
const profileSettingsMessage = document.getElementById("profile-settings-message");
const profileFramesSelect = document.getElementById("profile-frames-select");
const profileBackgroundsSelect = document.getElementById("profile-backgrounds-select");
const profileButtonStylesSelect = document.getElementById("profile-button-styles-select");
const profileTitlesSelect = document.getElementById("profile-titles-select");
const profileBadgesSelect = document.getElementById("profile-badges-select");

// Ustawienia
const newPasswordInput = document.getElementById("new-password");
const changePasswordBtn = document.getElementById("change-password-btn");
const passwordMessage = document.getElementById("password-message");

const themeToggleBtn = document.getElementById("theme-toggle-btn");
const devicePhoneBtn = document.getElementById("device-phone-btn");
const deviceDesktopBtn = document.getElementById("device-desktop-btn");
const deviceMessage = document.getElementById("device-message");

const adminPasswordInput = document.getElementById("admin-password");
const adminLoginBtn = document.getElementById("admin-login-btn");
const adminMessage = document.getElementById("admin-message");
const adminPanel = document.getElementById("admin-panel");
const adminCommandInput = document.getElementById("admin-command");
const adminRunBtn = document.getElementById("admin-run-btn");
const adminLog = document.getElementById("admin-log");

// ================== LOGOWANIE / REJESTRACJA ==================

loginTab.addEventListener("click", () => {
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
    loginForm.classList.add("active");
    registerForm.classList.remove("active");
});

registerTab.addEventListener("click", () => {
    registerTab.classList.add("active");
    loginTab.classList.remove("active");
    registerForm.classList.add("active");
    loginForm.classList.remove("active");
});

loginBtn.addEventListener("click", () => {
    const u = loginUsername.value.trim();
    const p = loginPassword.value.trim();
    loginError.textContent = "";

    if (!u || !p) {
        loginError.textContent = "Wpisz nazwę i hasło.";
        return;
    }

    const user = getUserData(u);
    if (!user || user.password !== p) {
        loginError.textContent = "Niepoprawne dane logowania.";
        return;
    }

    setCurrentUser(u);
    authScreen.classList.add("hidden");
    app.classList.remove("hidden");
});

registerBtn.addEventListener("click", () => {
    const u = registerUsername.value.trim();
    const p1 = registerPassword.value.trim();
    const p2 = registerPassword2.value.trim();
    registerError.textContent = "";

    if (!u || !p1 || !p2) {
        registerError.textContent = "Wypełnij wszystkie pola.";
        return;
    }
    if (p1 !== p2) {
        registerError.textContent = "Hasła się nie zgadzają.";
        return;
    }
    if (users[u]) {
        registerError.textContent = "Taki użytkownik już istnieje.";
        return;
    }

    createUser(u, p1);
    setCurrentUser(u);
    authScreen.classList.add("hidden");
    app.classList.remove("hidden");
});

// ================== MENU – PRZEŁĄCZANIE SEKCJI ==================

menuButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const sectionName = btn.dataset.section;
        sections.forEach(sec => sec.classList.remove("active"));
        document.getElementById(`section-${sectionName}`).classList.add("active");
    });
});

// ================== NAUKA ==================

function renderNaukaTopics() {
    naukaTopicsDiv.innerHTML = "";
    topics.forEach(t => {
        const btn = document.createElement("button");
        btn.textContent = t.name;
        btn.addEventListener("click", () => {
            renderNaukaContent(t);
        });
        naukaTopicsDiv.appendChild(btn);
    });
}

function renderNaukaContent(topic) {
    naukaContentDiv.innerHTML = "";
    const table = document.createElement("table");
    const header = document.createElement("tr");
    header.innerHTML = "<th>Polski</th><th>Angielski</th>";
    table.appendChild(header);

    topic.words.forEach(w => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${w.pl}</td><td>${w.en}</td>`;
        table.appendChild(tr);
    });

    naukaContentDiv.appendChild(table);
}

// ================== QUIZ ==================

let currentQuiz = null;
let currentQuizIndex = 0;
let currentQuizCorrect = 0;

function renderQuizTopics() {
    quizTopicsDiv.innerHTML = "";
    topics.forEach(t => {
        const btn = document.createElement("button");
        btn.textContent = t.name;
        btn.addEventListener("click", () => startQuiz(t));
        quizTopicsDiv.appendChild(btn);
    });
}

function startQuiz(topic) {
    currentQuiz = shuffleArray([...topic.words]);
    currentQuizIndex = 0;
    currentQuizCorrect = 0;
    renderQuizQuestion();
}

function renderQuizQuestion() {
    quizContainer.innerHTML = "";
    if (!currentQuiz || currentQuizIndex >= currentQuiz.length) {
        finishQuiz();
        return;
    }

    const word = currentQuiz[currentQuizIndex];
    const question = document.createElement("div");
    question.innerHTML = `<p>Przetłumacz: <strong>${word.pl}</strong></p>`;

    const answers = generateQuizAnswers(word, currentQuiz);
    answers.forEach(ans => {
        const btn = document.createElement("button");
        btn.textContent = ans;
        btn.addEventListener("click", () => {
            if (ans === word.en) {
                currentQuizCorrect++;
            }
            currentQuizIndex++;
            renderQuizQuestion();
        });
        quizContainer.appendChild(btn);
    });

    quizContainer.prepend(question);
}

function finishQuiz() {
    const user = getUserData(currentUser);
    if (!user) return;

    const total = currentQuiz.length;
    const perfect = currentQuizCorrect === total;

    // nagrody – przykładowo: 50 XP + 20 coinów, jeśli perfect to x2
    let xpReward = 50;
    let coinReward = 20;
    if (perfect) {
        xpReward *= 2;
        coinReward *= 2;
        user.stats.perfectQuizzes += 1;
    }

    user.stats.quizzesDone += 1;
    saveUsers();

    addXP(xpReward);
    addCoins(coinReward);

    quizContainer.innerHTML = `
        <p>Quiz zakończony! Poprawne odpowiedzi: ${currentQuizCorrect}/${total}</p>
        <p>Otrzymujesz ${xpReward} XP i ${coinReward} coinów.</p>
        <button id="quiz-restart-btn">Zagraj ponownie</button>
    `;

    document.getElementById("quiz-restart-btn").addEventListener("click", () => {
        currentQuizIndex = 0;
        currentQuizCorrect = 0;
        renderQuizQuestion();
    });

    updateQuestsProgress("quiz_count", user.stats.quizzesDone);
    if (perfect) updateQuestsProgress("perfect_quiz", user.stats.perfectQuizzes);
    updateQuestsProgress("xp_total", user.xp);
    updateQuestsProgress("prestige_level", user.prestigeLevel);
}

// pomocnicze do quizu
function shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

function generateQuizAnswers(correctWord, allWords) {
    const answers = [correctWord.en];
    const others = allWords.filter(w => w.en !== correctWord.en);
    shuffleArray(others);
    while (answers.length < 4 && others.length > 0) {
        answers.push(others.pop().en);
    }
    while (answers.length < 4) {
        answers.push("???");
    }
    return shuffleArray(answers);
}

// ================== QUESTY ==================

function initQuestsIfNeeded() {
    const user = getUserData(currentUser);
    if (!user) return;
    if (!user.quests || user.quests.length === 0) {
        // weź pierwsze 3 questy
        user.quests = baseQuests.slice(0, 3).map(q => ({
            ...q,
            progress: 0,
            completed: false,
            claimed: false,
        }));
        saveUsers();
    }
}

function renderQuests() {
    const user = getUserData(currentUser);
    if (!user) return;

    questListDiv.innerHTML = "";
    user.quests.forEach((q, index) => {
        const div = document.createElement("div");
        div.className = "quest";
        div.innerHTML = `
            <p>${q.text}</p>
            <p>Postęp: ${q.progress}/${q.target}</p>
            <p>Nagroda: ${q.rewardXP} XP, ${q.rewardCoins} coinów</p>
            <p>Status: ${q.completed ? (q.claimed ? "odebrany" : "do odebrania") : "w trakcie"}</p>
        `;
        if (q.completed && !q.claimed) {
            const btn = document.createElement("button");
            btn.textContent = "Odbierz nagrodę";
            btn.addEventListener("click", () => {
                addXP(q.rewardXP);
                addCoins(q.rewardCoins);
                q.claimed = true;
                // po odebraniu – nowy quest na jego miejsce
                replaceQuest(index);
                saveUsers();
                renderQuests();
            });
            div.appendChild(btn);
        }
        questListDiv.appendChild(div);
    });
}

function updateQuestsProgress(type, value) {
    const us
