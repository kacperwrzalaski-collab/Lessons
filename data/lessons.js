// =========================
//   LESSONS SYSTEM
// =========================

let currentLesson = null;
let practiceIndex = 0;
let quizIndex = 0;
let flashcardIndex = 0;

function loadLessons() {
  const list = document.getElementById("lessons-list");
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
  resetPractice();
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
    li.textContent = `${w.de} — ${w.pl} — ${w.perf}`;
    list.appendChild(li);
  });
}

// =========================
//   PRACTICE MODE
// =========================

function resetPractice() {
  practiceIndex = 0;
  document.getElementById("practice-feedback").textContent = "";
  document.getElementById("practice-next-btn").classList.add("hidden");
  document.getElementById("practice-check-btn").classList.remove("hidden");
  loadPracticeWord();
}

function loadPracticeWord() {
  const w = currentLesson.words[practiceIndex];
  document.getElementById("practice-info").textContent = w.de;
  document.getElementById("practice-pl").value = "";
  document.getElementById("practice-perf").value = "";
}

function checkPractice() {
  const w = currentLesson.words[practiceIndex];
  const pl = document.getElementById("practice-pl").value.trim().toLowerCase();
  const perf = document.getElementById("practice-perf").value.trim().toLowerCase();

  const correctPL = w.pl.toLowerCase();
  const correctPerf = w.perf.toLowerCase();

  const fb = document.getElementById("practice-feedback");
  const user = getCurrentUser();

  user.practiceTotal++;

  if (pl === correctPL && perf === correctPerf) {
    fb.textContent = "✔️ Dobrze!";
    user.practiceCorrect++;
    addXP(10);
  } else {
    fb.textContent = `❌ Źle! Poprawnie: ${w.pl}, ${w.perf}`;
    addXP(2);
  }

  saveUpdatedUser(user);

  document.getElementById("practice-check-btn").classList.add("hidden");
  document.getElementById("practice-next-btn").classList.remove("hidden");
}

function nextPractice() {
  practiceIndex++;
  if (practiceIndex >= currentLesson.words.length) practiceIndex = 0;

  document.getElementById("practice-feedback").textContent = "";
  document.getElementById("practice-next-btn").classList.add("hidden");
  document.getElementById("practice-check-btn").classList.remove("hidden");

  loadPracticeWord();
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

  document.getElementById("quiz-question").textContent = w.de;
  document.getElementById("quiz-feedback").textContent = "";

  const answers = document.getElementById("quiz-answers");
  answers.innerHTML = "";

  const options = shuffle([
    w.pl,
    ...currentLesson.words.filter(x => x !== w).map(x => x.pl).slice(0, 3)
  ]);

  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkQuiz(opt, w.pl);
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
  checkAllAchievements();
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
  document.getElementById("flashcard-word").textContent = w.de;
  document.getElementById("flashcard-translation").textContent = `${w.pl} — ${w.perf}`;
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
//   SPEECH
// =========================

function speak(text, lang = "de-DE") {
  if (!("speechSynthesis" in window)) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  speechSynthesis.speak(utter);
}

function speakCurrentPractice() {
  speak(currentLesson.words[practiceIndex].de);
}

function speakCurrentQuiz() {
  speak(currentLesson.words[quizIndex].de);
}

function speakCurrentFlashcard() {
  speak(currentLesson.words[flashcardIndex].de);
}

// =========================
//   HELPERS
// =========================

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// =========================
//   END OF lessons.js
// =========================
