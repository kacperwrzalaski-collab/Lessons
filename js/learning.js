/* ============================================================
   LEARNING.JS — NAUKA, FISZKI, QUIZ, PISANIE, QUESTY, SKLEP
============================================================ */

/* ============================================================
   STRUKTURA TEMATÓW
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

            // SPEAKING
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

            // READING
            { word: "activity course", pl: "kurs/zajęcia w jakiejś dziedzinie aktywności" },
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
            { word: "pass your theory test/driving test", pl: "zdać egzamin teoretyczny / egzamin na prawo jazdy" },
            { word: "practical", pl: "praktyczny" },
            { word: "primary/secondary school", pl: "szkoła podstawowa / średnia" },
            { word: "sign up for a course", pl: "zapisać się na kurs" },
            { word: "survive", pl: "przetrwać" },
            { word: "take up classes/a course", pl: "zapisać się na zajęcia/kurs" },
            { word: "turn (17)", pl: "ukończyć (17) lat" },

            // VOCABULARY 2
            { word: "academic results", pl: "wyniki w nauce" },
            { word: "continue education", pl: "kontynuować naukę" },
            { word: "copy homework", pl: "spisać od kogoś pracę domową" },

            // LISTENING
            { word: "do a conversation exchange", pl: "rozmawiać z kimś na zmianę w swoim i jego języku" },
            { word: "draw mind maps", pl: "rysować mapy myśli" },
            { word: "have flexible study hours", pl: "elastyczne godziny nauki" },
            { word: "follow instructions", pl: "wykonywać polecenia" },
            { word: "learn sth by heart", pl: "nauczyć się czegoś na pamięć" },
            { word: "listen to podcasts", pl: "słuchać podcastów" },
            { word: "listen to song lyrics", pl: "słuchać słów piosenki" },
            { word: "memorise", pl: "uczyć się na pamięć" },
            { word: "practise speaking", pl: "ćwiczyć mówienie" },
            { word: "set up a study group", pl: "stworzyć grupę uczącą się wspólnie" },
            { word: "struggle", pl: "borykać się" },
            { word: "take notes", pl: "robić notatki" },
            { word: "use educational apps", pl: "używać aplikacji edukacyjnych" },
            { word: "use sticky notes", pl: "używać karteczek samoprzylepnych" },
            { word: "watch video tutorials", pl: "oglądać filmiki instruktażowe" },

            // GRAMMAR 2
            { word: "last", pl: "trwać" },
            { word: "level", pl: "poziom" },
            { word: "speed-reading course", pl: "kurs szybkiego czytania" },

            // USE OF ENGLISH
            { word: "race", pl: "wyścig" },
            { word: "regret", pl: "żałować" },
            { word: "run a marathon", pl: "przebiec maraton" },
            { word: "half-marathon", pl: "półmaraton" },
            { word: "triplets", pl: "trojaczki" },

            // WRITING
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
   POMOCNICZE
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
    core.addXP(5);
    ui.updateUI();
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
    core.addXP(3);
    ui.updateUI();
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
    const words = getTopicWords();
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
    fillLanguageSelect();
    fillTopicSelect();

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