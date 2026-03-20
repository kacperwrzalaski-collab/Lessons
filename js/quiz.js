let quizTopicName = null;
let quizIndex = 0;
let quizScore = 0;

function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

function initQuiz() {
    const select = document.getElementById("quiz-topic");
    select.innerHTML = "";

    Object.keys(topics).forEach(t => {
        const opt = document.createElement("option");
        opt.value = t;
        opt.textContent = t;
        select.appendChild(opt);
    });

    quizTopicName = select.value;
    quizIndex = 0;
    quizScore = 0;

    loadQuiz();

    select.onchange = () => {
        quizTopicName = select.value;
        quizIndex = 0;
        quizScore = 0;
        loadQuiz();
    };

    document.getElementById("quiz-next").onclick = () => {
        const arr = topics[quizTopicName];
        quizIndex++;
        if (quizIndex >= arr.length) quizIndex = 0;
        loadQuiz();
    };
}

function loadQuiz() {
    const arr = topics[quizTopicName];
    const w = arr[quizIndex];

    document.getElementById("quiz-question").textContent = w.pl;

    const answersContainer = document.getElementById("quiz-answers");
    answersContainer.innerHTML = "";

    const options = shuffle([
        w.en,
        ...arr.filter(x => x !== w).map(x => x.en).slice(0, 3)
    ]);

    options.forEach(opt => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.onclick = () => checkQuiz(opt, w.en);
        answersContainer.appendChild(btn);
    });

    document.getElementById("quiz-score").textContent = `Punkty: ${quizScore}`;
}

function checkQuiz(answer, correct) {
    const fb = document.getElementById("quiz-feedback");
    const user = getCurrentUser();

    if (answer === correct) {
        fb.textContent = "✔️ Dobrze!";
        quizScore += 10;
        user.xp += 10;
        updateQuestProgress("quiz");
    } else {
        fb.textContent = `❌ Źle! Poprawnie: ${correct}`;
        user.xp += 2;
    }

    if (user.xp >= user.level * 100) {
        user.xp = 0;
        user.level++;
    }

    saveUpdatedUser(user);
    loadProfile();

    document.getElementById("quiz-score").textContent = `Punkty: ${quizScore}`;

    const arr = topics[quizTopicName];
    if (quizIndex === arr.length - 1) {
        giveXPBox();
    }
}
