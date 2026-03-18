/* --- DANE LEKCJI (modułowo) --- */
const lessons = [
  {
    id: 1,
    title: "Lekcja 1 – Czasowniki nieregularne",
    description: "Trening czasowników nieregularnych w języku niemieckim.",
    words: [
      { de: "nennen", pl: "nazywać", perfekt: "hat genannt" },
      { de: "pfeiffen", pl: "gwizdac", perfekt: "hat gepfiffen" },
      { de: "raten", pl: "radzic", perfekt: "hat geraten" },
      { de: "reiten", pl: "konno", perfekt: "hat geritten" },
      { de: "riechen", pl: "pachniec", perfekt: "hat gerochen" },
      { de: "rufen", pl: "wolac", perfekt: "hat gerufen" },
      { de: "salzen", pl: "solic", perfekt: "hat gesalzen" },
      { de: "saugen", pl: "ssąc", perfekt: "hat gesogen" },
      { de: "shaffen", pl: "tworzyć", perfekt: "hat geschlafen" },
      { de: "scheiden", pl: "rozwodzić", perfekt: "hat geschieden" },
      { de: "scheinen", pl: "swiecic", perfekt: "hat gescheinen" },
      { de: "scheren", pl: "kosić", perfekt: "hat geschoren" },
      { de: "schieben", pl: "przesuwać", perfekt: "hat geschoben" },
      { de: "schieben", pl: "strzelac", perfekt: "hat geschossen" },
      { de: "schlafen", pl: "spac", perfekt: "hat geschlafen" },
      { de: "schlagen", pl: "bic", perfekt: "hat geschlagen" },
      { de: "schlieben", pl: "zamykac", perfekt: "hat geschlossen" },
      { de: "schmelzen", pl: "topic", perfekt: "hat geschmolzen" },
      { de: "schneiden", pl: "ciac", perfekt: "hat geschitten" },
      { de: "schreiben", pl: "pisać", perfekt: "hat geschreiben" },
      { de: "schreien", pl: "krzyczeć", perfekt: "hat geschrien" },
      { de: "schweigen", pl: "milczeć", perfekt: "hat eschweigen" },
      { de: "schwimmen", pl: "plywac", perfekt: "hat geschwommen" },
      { de: "sehen", pl: "widzieć", perfekt: "hat gesehen" },
      { de: "senden", pl: "wysylac", perfekt: "hat gesandt" },
      { de: "singen", pl: "spiewac", perfekt: "hat gesungen" },
      { de: "rennen", pl: "pedzic", perfekt: "ist gerannt" },
      { de: "schreiten", pl: "kroczyc", perfekt: "ist geschritten" },
      { de: "schwellen", pl: "puchnac", perfekt: "ist geschwollen" },
      { de: "sein", pl: "być", perfekt: "ist gewesen" }
    ]
  }
];

let currentLesson = lessons[0];

/* --- NAWIGACJA MIĘDZY EKRANAMI --- */
function goToScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* --- LISTA LEKCJI (TEMATY) --- */
const lessonsListEl = document.getElementById("lessons-list");
lessonsListEl.innerHTML = lessons.map(lesson => `
  <li>
    <strong>${lesson.title}</strong><br>
    <button onclick="openLesson(${lesson.id})">Otwórz lekcję</button>
  </li>
`).join("");

function openLesson(id) {
  const lesson = lessons.find(l => l.id === id);
  if (!lesson) return;
  currentLesson = lesson;

  document.getElementById("lesson-title").textContent = lesson.title;
  document.getElementById("lesson-description").textContent = lesson.description;
  document.getElementById("modes-lesson-title").textContent = `Tryby – ${lesson.title}`;

  loadLearnList();
  resetPractice();
  resetQuiz();

  goToScreen("screen-lesson");
}

/* --- TRYBY: PRZEŁĄCZANIE --- */
function showMode(id) {
  document.querySelectorAll(".mode-section").forEach(m => m.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* --- NAUKA (lista słówek) --- */
function loadLearnList() {
  const ul = document.getElementById("wordList");
  ul.innerHTML = currentLesson.words
    .map(w => `<li>${w.de} – ${w.pl} – ${w.perfekt}</li>`)
    .join("");
}

/* --- PRAKTYKA --- */
let pIndex = 0;

function resetPractice() {
  pIndex = 0;
  loadPractice();
}

function loadPractice() {
  const w = currentLesson.words[pIndex];
  document.getElementById("practice-info").textContent =
    `Słówko ${pIndex + 1}/${currentLesson.words.length}: ${w.de}`;

  document.getElementById("practice-pl").value = "";
  document.getElementById("practice-perf").value = "";
  document.getElementById("practice-feedback").textContent = "";

  document.getElementById("practice-check-btn").classList.remove("hidden");
  document.getElementById("practice-next-btn").classList.add("hidden");
}

function checkPractice() {
  const w = currentLesson.words[pIndex];
  const pl = document.getElementById("practice-pl").value.trim().toLowerCase();
  const perf = document.getElementById("practice-perf").value.trim().toLowerCase();

  const fb = document.getElementById("practice-feedback");

  if (pl === w.pl.toLowerCase() && perf === w.perfekt.toLowerCase()) {
    fb.textContent = "Dobrze!";
    fb.style.color = "green";
  } else {
    fb.textContent = `Źle. Poprawnie: ${w.pl}, ${w.perfekt}`;
    fb.style.color = "red";
  }

  document.getElementById("practice-check-btn").classList.add("hidden");
  document.getElementById("practice-next-btn").classList.remove("hidden");
}

function nextPractice() {
  pIndex++;
  if (pIndex >= currentLesson.words.length) pIndex = 0;
  loadPractice();
}

/* --- QUIZ --- */
let qIndex = 0;

function resetQuiz() {
  qIndex = 0;
  loadQuiz();
}

function loadQuiz() {
  const w = currentLesson.words[qIndex];
  document.getElementById("quiz-question").textContent =
    `Co oznacza: ${w.de}?`;

  const answers = shuffle([
    w.pl,
    ...pickRandomAnswers(w.pl)
  ]);

  document.getElementById("quiz-answers").innerHTML =
    answers.map(a => `<button class="answer-btn" onclick="checkQuiz('${a}')">${a}</button>`).join("");

  document.getElementById("quiz-feedback").textContent = "";
}

function pickRandomAnswers(correct) {
  const arr = currentLesson.words.map(w => w.pl).filter(p => p !== correct);
  return shuffle(arr).slice(0, 3);
}

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function checkQuiz(answer) {
  const w = currentLesson.words[qIndex];
  const fb = document.getElementById("quiz-feedback");

  if (answer === w.pl) {
    fb.textContent = "Dobrze!";
    fb.style.color = "green";
  } else {
    fb.textContent = `Źle. Poprawna odpowiedź: ${w.pl}`;
    fb.style.color = "red";
  }
}

function nextQuiz() {
  qIndex++;
  if (qIndex >= currentLesson.words.length) qIndex = 0;
  loadQuiz();
}

/* --- USTAWIENIA: MOTYW JASNY/CIEMNY --- */
const THEME_KEY = "german_trainer_theme";

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
  document.getElementById("theme-label").textContent =
    theme === "dark" ? "ciemny" : "jasny";
}

function toggleTheme() {
  const isDark = document.body.classList.contains("dark");
  const newTheme = isDark ? "light" : "dark";
  localStorage.setItem(THEME_KEY, newTheme);
  applyTheme(newTheme);
}

/* --- INICJALIZACJA --- */
(function init() {
  const savedTheme = localStorage.getItem(THEME_KEY) || "light";
  applyTheme(savedTheme);

  goToScreen("screen-menu");
  showMode("mode-learn");
  loadLearnList();
  resetPractice();
  resetQuiz();
})();
