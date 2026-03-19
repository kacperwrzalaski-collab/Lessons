/* ============================================================
   LEARNING.JS — NAUKA, FISZKI, QUIZ, PISANIE, QUESTY, SKLEP
============================================================ */

/* ============================================================
   TEMATY SŁÓWEK
============================================================ */

const topics = {
    podstawowe: [
        { word: "cat", pl: "kot" },
        { word: "dog", pl: "pies" },
        { word: "house", pl: "dom" },
        { word: "car", pl: "samochód" }
    ],

    jedzenie: [
        { word: "apple", pl: "jabłko" },
        { word: "bread", pl: "chleb" },
        { word: "milk", pl: "mleko" }
    ]
};

/* ============================================================
   POMOCNICZE
============================================================ */

function getTopicWords(selectId) {
    const topic = document.getElementById(selectId).value;
    return topics[topic] || [];
}

function fillTopicSelect(id) {
    const select = document.getElementById(id);
    select.innerHTML = "";

    Object.keys(topics).forEach(t => {
        const opt = document.createElement("option");
        opt.value = t;
        opt.textContent = t;
        select.appendChild(opt);
    });
}

/* ============================================================
   NAUKA SŁÓWEK
============================================================ */

let learnIndex = 0;

function loadLearnWord() {
    const words = getTopicWords("learn-topic-select");
    if (words.length === 0) return;

    const w = words[learnIndex];
    document.getElementById("learn-word-box").textContent =
        `${w.word} → ${w.pl}`;
}

document.getElementById("learn-next").addEventListener("click", () => {
    const words = getTopicWords("learn-topic-select");
    if (words.length === 0) return;

    learnIndex = (learnIndex + 1) % words.length;
    loadLearnWord();
    core.addXP(5);
    ui.updateUI();
});

/* ============================================================
   FISZKI
============================================================ */

let flashIndex = 0;

function loadFlashcard() {
    const words = getTopicWords("flashcards-topic-select");
    if (words.length === 0) return;

    const w = words[flashIndex];

    document.getElementById("flashcard-word").textContent = w.word;
    document.getElementById("flashcard-answer").textContent = w.pl;
    document.getElementById("flashcard-answer").classList.add("hidden");
}

document.getElementById("flashcard-show").addEventListener("click", () => {
    document.getElementById("flashcard-answer").classList.remove("hidden");
    core.addXP(3);
    ui.updateUI();
});

document.getElementById("flashcard-next").addEventListener("click", () => {
    const words = getTopicWords("flashcards-topic-select");
    if (words.length === 0) return;

    flashIndex = (flashIndex + 1) % words.length;
    loadFlashcard();
});

/* ============================================================
   QUIZ
============================================================ */

function loadQuiz() {
    const words = getTopicWords("quiz-topic-select");
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
                core.addXP(10);
            } else {
                document.getElementById("quiz-feedback").textContent = "Źle!";
            }

            ui.updateUI();
            setTimeout(loadQuiz, 800);
        });

        box.appendChild(btn);
    });
}

function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

/* ============================================================
   TRYB PISANIA
============================================================ */

let writeWord = null;

function loadWriteWord() {
    const words = getTopicWords("write-topic-select");
    if (words.length === 0) return;

    writeWord = words[Math.floor(Math.random() * words.length)];

    document.getElementById("write-question").textContent =
        `Przetłumacz: ${writeWord.word}`;
}

document.getElementById("write-check").addEventListener("click", () => {
    const ans = document.getElementById("write-answer").value.trim();
    const fb = document.getElementById("write-feedback");

    if (ans === writeWord.pl) {
        fb.textContent = "Dobrze!";
        core.addXP(12);
        ui.updateUI();
        loadWriteWord();
    } else {
        fb.textContent = "Źle!";
    }
});

/* ============================================================
   QUESTY
============================================================ */

const quests = [
    { id: 1, text: "Zrób 5 fiszek", progress: 0, goal: 5, reward: 20 },
    { id: 2, text: "Zrób 3 quizy", progress: 0, goal: 3, reward: 30 }
];

function updateQuests() {
    const box = document.getElementById("quests-list");
    box.innerHTML = "";

    quests.forEach(q => {
        const div = document.createElement("div");
        div.className = "quest-item glass";

        div.textContent =
            `${q.text} (${q.progress}/${q.goal}) — nagroda: ${q.reward} XP`;

        if (q.progress >= q.goal) {
            div.style.color = "#4aff4a";
        }

        box.appendChild(div);
    });
}

/* ============================================================
   SKLEP
============================================================ */

const shopItems = [
    { id: "frame-red", type: "frame", name: "Czerwona ramka", price: 50, value: "red" },
    { id: "bg-blue", type: "background", name: "Niebieskie tło", price: 80, value: "#001f3f" },
    { id: "btn-green", type: "button", name: "Zielone przyciski", price: 70, value: "#00cc66" }
];

function loadShop() {
    const box = document.getElementById("shop-items");
    box.innerHTML = "";

    shopItems.forEach(item => {
        const div = document.createElement("div");
        div.className = "shop-item glass";

        div.innerHTML = `
            <strong>${item.name}</strong><br>
            Cena: ${item.price} 🪙<br>
            <button>Kup</button>
        `;

        div.querySelector("button").addEventListener("click", () => {
            if (core.player.coins < item.price) return;

            core.player.coins -= item.price;
            core.player.inventory[item.type + "s"].push(item.value);

            core.savePlayer();
            ui.updateUI();
            loadInventory();
        });

        box.appendChild(div);
    });
}

/* ============================================================
   EKWIPUNEK
============================================================ */

function loadInventory() {
    const inv = core.player.inventory;

    fillInventory("inventory-badges", inv.badges);
    fillInventory("inventory-frames", inv.frames);
    fillInventory("inventory-backgrounds", inv.backgrounds);
    fillInventory("inventory-buttons", inv.buttons);
}

function fillInventory(id, arr) {
    const box = document.getElementById(id);
    box.innerHTML = "";

    arr.forEach(item => {
        const div = document.createElement("div");
        div.className = "inventory-item glass";
        div.textContent = item;
        box.appendChild(div);
    });
}

/* ============================================================
   INICJALIZACJA
============================================================ */

function initLearning() {
    fillTopicSelect("learn-topic-select");
    fillTopicSelect("flashcards-topic-select");
    fillTopicSelect("quiz-topic-select");
    fillTopicSelect("write-topic-select");

    loadLearnWord();
    loadFlashcard();
    loadQuiz();
    loadWriteWord();
    updateQuests();
    loadShop();
    loadInventory();
}

window.addEventListener("load", initLearning);

/* ============================================================
   EKSPORT
============================================================ */

window.learning = {
    loadLearnWord,
    loadFlashcard,
    loadQuiz,
    loadWriteWord,
    updateQuests,
    loadShop,
    loadInventory
};