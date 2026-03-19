// =========================
//   LESSONS SYSTEM
// =========================

let currentLesson = null;
let practiceIndex = 0;
let quizIndex = 0;
let flashcardIndex = 0;

function loadLessons() {
    const list = document.getElementById("lessons-list");
    if (!list) return;

    list.innerHTML = "";

    lessons.forEach((lesson, index) => {
        const li = document.createElement("li");
        li.textContent = lesson.title;
        li.onclick = () => openLesson(index);
        list.appendChild(li);
    });
}

function openLesson(index) {
    currentLesson = lessons[index];

    document.getElementById("lesson-title").textContent = currentLesson.title;
    document.getElementById("lesson-description").textContent = currentLesson.description;
    document.getElementById("modes-lesson-title").textContent = currentLesson.title;

    loadLearnMode();
    resetQuiz();
    resetFlashcards();

    goToScreen("screen-lesson");
}

// =========================
//   LEARN MODE
// =========================

function loadLearnMode() {
    const list = document.getElementById("wordList");
    list.innerHTML = "";

    currentLesson.words.forEach(w => {
        const li = document.createElement("li");
        li.textContent = `${w.pl} — ${w.en}`;
        list.appendChild(li);
    });
}

// =========================
//   QUIZ MODE
// =========================

function resetQuiz() {
    quizIndex = 0;
    loadQuizQuestion();
}

function loadQuizQuestion() {
    const w = currentLesson.words[quizIndex];

    document.getElementById("quiz-question").textContent = w.pl;
    document.getElementById("quiz-feedback").textContent = "";

    const answers = document.getElementById("quiz-answers");
    answers.innerHTML = "";

    const options = shuffle([
        w.en,
        ...currentLesson.words.filter(x => x !== w).map(x => x.en).slice(0, 3)
    ]);

    options.forEach(opt => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.onclick = () => checkQuiz(opt, w.en);
        answers.appendChild(btn);
    });
}

function checkQuiz(answer, correct) {
    const user = getCurrentUser();
    user.quizTotal++;

    if (answer === correct) {
        document.getElementById("quiz-feedback").textContent = "✔️ Dobrze!";
        user.quizCorrect++;
        addXP(8);
    } else {
        document.getElementById("quiz-feedback").textContent = `❌ Źle! Poprawnie: ${correct}`;
        addXP(1);
    }

    saveUpdatedUser(user);
}

function nextQuiz() {
    quizIndex++;
    if (quizIndex >= currentLesson.words.length) quizIndex = 0;
    loadQuizQuestion();
}

// =========================
//   FLASHCARDS
// =========================

function resetFlashcards() {
    flashcardIndex = 0;
    document.getElementById("flashcard-translation").classList.add("hidden");
    loadFlashcard();
}

function loadFlashcard() {
    const w = currentLesson.words[flashcardIndex];
    document.getElementById("flashcard-word").textContent = w.pl;
    document.getElementById("flashcard-translation").textContent = w.en;
}

function toggleFlashcard() {
    document.getElementById("flashcard-translation").classList.toggle("hidden");
}

function nextFlashcard() {
    flashcardIndex++;
    if (flashcardIndex >= currentLesson.words.length) flashcardIndex = 0;

    document.getElementById("flashcard-translation").classList.add("hidden");
    loadFlashcard();
}

// =========================
//   HELPERS
// =========================

function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}
