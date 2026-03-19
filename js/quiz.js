// ==========================================
//  QUIZ — TRYB TESTU
// ==========================================

let quizWords = [];
let quizIndex = 0;
let correctAnswers = 0;
let totalAnswers = 0;

// Zmiana tematu quizu
document.getElementById("quiz-topic-select").onchange = () => {
    const topic = document.getElementById("quiz-topic-select").value;
    loadQuiz(topic);
};

// Wczytanie słówek do quizu
function loadQuiz(topic) {
    quizWords = [...topics[topic]]; // kopia tablicy
    shuffleArray(quizWords);
    quizIndex = 0;
    correctAnswers = 0;
    totalAnswers = 0;
    showQuizQuestion();
}

// Wyświetlanie pytania
function showQuizQuestion() {
    if (!quizWords.length) return;

    const word = quizWords[quizIndex];
    const questionBox = document.getElementById("quiz-question");
    const optionsBox = document.getElementById("quiz-options");

    questionBox.textContent = `Jak tłumaczy się: ${word.en}?`;

    // Tworzymy 3 błędne odpowiedzi
    let wrong = quizWords
        .filter(w => w.pl !== word.pl)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

    // Mieszamy poprawną z błędnymi
    let answers = [...wrong.map(w => w.pl), word.pl];
    shuffleArray(answers);

    // Render opcji
    optionsBox.innerHTML = "";
    answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.textContent = answer;
        btn.onclick = () => checkQuizAnswer(answer, word.pl);
        optionsBox.appendChild(btn);
    });

    document.getElementById("quiz-feedback").textContent = "";
}

// Sprawdzanie odpowiedzi
function checkQuizAnswer(selected, correct) {
    const feedback = document.getElementById("quiz-feedback");
    totalAnswers++;

    if (selected === correct) {
        feedback.textContent = "✔ Dobrze!";
        feedback.style.color = "#00ff88";
        correctAnswers++;
        addXP(5);
    } else {
        feedback.textContent = `❌ Źle! Poprawna odpowiedź: ${correct}`;
        feedback.style.color = "#ff4444";
    }

    // Następne pytanie po 1 sekundzie
    setTimeout(() => {
        quizIndex++;

        if (quizIndex >= quizWords.length) {
            endQuiz();
        } else {
            showQuizQuestion();
        }
    }, 900);
}

// Koniec quizu
function endQuiz() {
    const feedback = document.getElementById("quiz-feedback");

    feedback.innerHTML = `
        Quiz zakończony!<br>
        Poprawne odpowiedzi: ${correctAnswers}/${totalAnswers}
    `;

    // Odznaka za perfekcyjny wynik
    if (correctAnswers === totalAnswers) {
        awardQuizBadge();
    }
}

// Przyznawanie odznaki za 100%
function awardQuizBadge() {
    const username = localStorage.getItem("currentUser");
    const user = loadUser(username);

    if (!user.badges.includes("quiz_master")) {
        user.badges.push("quiz_master");
        saveUser(user);

        alert("🎉 Zdobyłeś odznakę: Quiz Master!");
    }
}

// Funkcja mieszająca tablicę
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// Auto-ładowanie pierwszego tematu
setTimeout(() => {
    const select = document.getElementById("quiz-topic-select");
    if (select && select.value) {
        loadQuiz(select.value);
    }
}, 300);