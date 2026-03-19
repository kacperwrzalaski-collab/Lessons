function initNavigation() {
    document.querySelectorAll("[data-screen]").forEach(btn => {
        btn.onclick = () => {
            const target = btn.dataset.screen;
            document.querySelectorAll("main .screen").forEach(s => s.classList.remove("active"));
            document.getElementById(target).classList.add("active");
        };
    });

    document.getElementById("btn-logout").onclick = () => {
        setCurrentUser(null);
        location.reload();
    };
}

function initLearn() {
    const topicsContainer = document.getElementById("learn-topics");
    const list = document.getElementById("learn-list");

    topicsContainer.innerHTML = "";
    list.innerHTML = "";

    Object.keys(topics).forEach(topicName => {
        const btn = document.createElement("button");
        btn.textContent = topicName;
        btn.onclick = () => loadTopic(topicName);
        topicsContainer.appendChild(btn);
    });

    const firstTopic = Object.keys(topics)[0];
    if (firstTopic) loadTopic(firstTopic);
}

function loadTopic(topicName) {
    const list = document.getElementById("learn-list");
    list.innerHTML = "";

    const header = document.createElement("h3");
    header.textContent = topicName;
    list.appendChild(header);

    topics[topicName].forEach(w => {
        const li = document.createElement("li");
        if (w.perf) li.textContent = `${w.pl} — ${w.en} — ${w.perf}`;
        else li.textContent = `${w.pl} — ${w.en}`;
        list.appendChild(li);
    });

    updateQuestProgress("learn");
}

/* FISZKI */

let flashTopicName = null;
let flashIndex = 0;

function initFlashcards() {
    const select = document.getElementById("flash-topic");
    select.innerHTML = "";

    Object.keys(topics).forEach(t => {
        const opt = document.createElement("option");
        opt.value = t;
        opt.textContent = t;
        select.appendChild(opt);
    });

    flashTopicName = select.value;
    flashIndex = 0;
    loadFlashcard();

    select.onchange = () => {
        flashTopicName = select.value;
        flashIndex = 0;
        loadFlashcard();
    };

    document.getElementById("flash-show").onclick = () => {
        document.getElementById("flash-en").classList.toggle("hidden");
    };

    document.getElementById("flash-next").onclick = () => {
        const arr = topics[flashTopicName];
        flashIndex++;
        if (flashIndex >= arr.length) flashIndex = 0;
        loadFlashcard();
    };
}

function loadFlashcard() {
    const arr = topics[flashTopicName];
    const w = arr[flashIndex];

    document.getElementById("flash-pl").textContent = w.pl;
    document.getElementById("flash-en").textContent = w.en;
    document.getElementById("flash-en").classList.add("hidden");

    updateQuestProgress("flashcards");
}

/* TRYB PISANIA */

let writeTopicName = null;
let writeIndex = 0;
let writeScore = 0;

function initWrite() {
    const select = document.getElementById("write-topic");
    select.innerHTML = "";

    Object.keys(topics).forEach(t => {
        const opt = document.createElement("option");
        opt.value = t;
        opt.textContent = t;
        select.appendChild(opt);
    });

    writeTopicName = select.value;
    writeIndex = 0;
    writeScore = 0;

    loadWriteQuestion();

    select.onchange = () => {
        writeTopicName = select.value;
        writeIndex = 0;
        writeScore = 0;
        loadWriteQuestion();
    };

    document.getElementById("write-check").onclick = checkWriteAnswer;
    document.getElementById("write-next").onclick = nextWriteQuestion;
}

function loadWriteQuestion() {
    const arr = topics[writeTopicName];
    const w = arr[writeIndex];

    document.getElementById("write-question").textContent = `Przetłumacz: ${w.pl}`;
    document.getElementById("write-input").value = "";
    document.getElementById("write-feedback").textContent = "";
    document.getElementById("write-score").textContent = `Punkty: ${writeScore}`;
}

function checkWriteAnswer() {
    const user = getCurrentUser();
    const arr = topics[writeTopicName];
    const w = arr[writeIndex];

    const input = document.getElementById("write-input").value.trim().toLowerCase();
    const fb = document.getElementById("write-feedback");

    if (input === w.en.toLowerCase()) {
        fb.textContent = "✔️ Dobrze!";
        writeScore += 10;
        user.xp += 12;
        updateQuestProgress("write");
    } else {
        fb.textContent = `❌ Źle! Poprawnie: ${w.en}`;
        user.xp += 3;
    }

    if (user.xp >= user.level * 100) {
        user.xp = 0;
        user.level++;
    }

    saveUpdatedUser(user);
    loadProfile();

    document.getElementById("write-score").textContent = `Punkty: ${writeScore}`;
}

function nextWriteQuestion() {
    const arr = topics[writeTopicName];
    writeIndex++;
    if (writeIndex >= arr.length) writeIndex = 0;
    loadWriteQuestion();
}

/* INIT APP */

window.onload = () => {
    initAuth();
    initNavigation();
    initLearn();
    initFlashcards();
    initQuiz();
    initWrite();
    initSettings();
    initQuests();
    initShop();

    const user = getCurrentUser();
    if (user) {
        document.getElementById("screen-auth").style.display = "none";
        document.getElementById("app-container").classList.remove("hidden");
        loadProfile();
    }
};
