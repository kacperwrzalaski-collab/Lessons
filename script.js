const LANG_KEY = "trainer_language";
const THEME_KEY = "trainer_theme";
const USERS_KEY = "trainer_users";
const CURRENT_USER_KEY = "trainer_current_user";

/* ==========================
   SYSTEM TŁUMACZEŃ
========================== */

function getCurrentLang() {
  return localStorage.getItem(LANG_KEY) || "pl";
}

function changeLanguage(lang) {
  localStorage.setItem(LANG_KEY, lang);
  applyLanguage(lang);
}

function applyLanguage(lang) {
  const t = translations[lang] || translations.pl;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (!t[key]) return;
    if (key === "loggedInAs") {
      const user = getCurrentUser();
      el.textContent = t[key] + (user ? user.username : "");
    } else {
      el.textContent = t[key];
    }
  });
}

/* ==========================
   MOTYW
========================== */

function applyTheme(theme) {
  if (theme === "dark") document.body.classList.add("dark");
  else document.body.classList.remove("dark");
}

function toggleTheme() {
  const current = document.body.classList.contains("dark") ? "dark" : "light";
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem(THEME_KEY, next);
}

/* ==========================
   UŻYTKOWNICY
========================== */

function loadUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getCurrentUser() {
  const raw = localStorage.getItem(CURRENT_USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

function setCurrentUser(user) {
  if (user) localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  else localStorage.removeItem(CURRENT_USER_KEY);
}

/* ==========================
   LOGOWANIE / REJESTRACJA
========================== */

function showAuthMode(mode) {
  const login = document.getElementById("auth-login");
  const register = document.getElementById("auth-register");
  const tabLogin = document.getElementById("tab-login");
  const tabRegister = document.getElementById("tab-register");

  if (mode === "login") {
    login.classList.add("active");
    register.classList.remove("active");
    tabLogin.classList.add("active");
    tabRegister.classList.remove("active");
  } else {
    login.classList.remove("active");
    register.classList.add("active");
    tabLogin.classList.remove("active");
    tabRegister.classList.add("active");
  }
}

function handleRegister() {
  const username = document.getElementById("register-username").value.trim();
  const password = document.getElementById("register-password").value.trim();
  const fb = document.getElementById("register-feedback");
  fb.textContent = "";

  if (!username || !password) {
    fb.textContent = "Uzupełnij login i hasło.";
    return;
  }

  const users = loadUsers();
  if (users.find(u => u.username === username)) {
    fb.textContent = "Użytkownik o takiej nazwie już istnieje.";
    return;
  }

  users.push({
    username,
    password,
    xp: 0,
    level: 1,
    practiceCorrect: 0,
    practiceTotal: 0,
    quizCorrect: 0,
    quizTotal: 0,
    photo: null
  });

  saveUsers(users);
  fb.textContent = "Konto utworzone. Możesz się zalogować.";
}

function handleLogin() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const fb = document.getElementById("login-feedback");
  fb.textContent = "";

  const users = loadUsers();
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    fb.textContent = "Błędny login lub hasło.";
    return;
  }

  setCurrentUser(user);
  updateLoggedInUserLabel();
  updateXPUI();
  updateStatsUI();
  loadProfilePhoto();
  goToScreen("screen-menu");
}

function logout() {
  setCurrentUser(null);
  goToScreen("screen-auth");
}

function updateLoggedInUserLabel() {
  const user = getCurrentUser();
  const el = document.getElementById("welcome-user");
  el.textContent = "Zalogowany jako: " + (user ? user.username : "");
}
/* ==========================
   PRZEŁĄCZANIE EKRANÓW
========================== */

function goToScreen(id) {
  const user = getCurrentUser();
  if (!user && id !== "screen-auth") id = "screen-auth";

  document.querySelectorAll(".screen").forEach(s => {
    s.classList.remove("active", "screen-enter");
  });

  const target = document.getElementById(id);
  target.classList.add("active");
  void target.offsetWidth;
  target.classList.add("screen-enter");

  if (id === "screen-ranking") loadRanking();
}

/* ==========================
   LEKCJE
========================== */

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

/* ==========================
   TRYB NAUKI
========================== */

function loadLearnMode() {
  const list = document.getElementById("wordList");
  list.innerHTML = "";
  currentLesson.words.forEach(w => {
    const li = document.createElement("li");
    li.textContent = `${w.de} — ${w.pl} — ${w.perf}`;
    list.appendChild(li);
  });
}

/* ==========================
   XP + STATYSTYKI
========================== */

function addXP(amount) {
  const user = getCurrentUser();
  if (!user) return;

  user.xp += amount;

  while (user.xp >= user.level * 100) {
    user.xp -= user.level * 100;
    user.level++;
  }

  saveUpdatedUser(user);
  updateXPUI();
  updateStatsUI();
}

function saveUpdatedUser(user) {
  const users = loadUsers();
  const idx = users.findIndex(u => u.username === user.username);

  if (idx !== -1) {
    users[idx] = user;
    saveUsers(users);
  }

  setCurrentUser(user);
}

function updateXPUI() {
  const user = getCurrentUser();
  if (!user) return;

  const needed = user.level * 100;
  const percent = Math.min(100, (user.xp / needed) * 100);

  document.getElementById("xp-fill").style.width = percent + "%";
  document.getElementById("xp-label").textContent = `${user.xp} / ${needed} XP`;
  document.getElementById("level-label").textContent = `Lv. ${user.level}`;
}

function updateStatsUI() {
  const user = getCurrentUser();
  if (!user) return;

  document.getElementById("stat-level").textContent = user.level;
  document.getElementById("stat-xp").textContent = user.xp;
  document.getElementById("stat-practice").textContent = `${user.practiceCorrect} / ${user.practiceTotal}`;
  document.getElementById("stat-quiz").textContent = `${user.quizCorrect} / ${user.quizTotal}`;
}

/* ==========================
   PRAKTYKA
========================== */

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

  const correctPL = w.pl.trim().toLowerCase();
  const correctPerf = w.perf.trim().toLowerCase();

  const user = getCurrentUser();
  user.practiceTotal++;

  let msg = "";

  if (pl === correctPL && perf === correctPerf) {
    msg = "✔️ Dobrze!";
    user.practiceCorrect++;
    addXP(10);
  } else {
    msg = `❌ Źle! Poprawnie: ${w.pl}, ${w.perf}`;
    addXP(2);
  }

  saveUpdatedUser(user);

  document.getElementById("practice-feedback").textContent = msg;
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

/* ==========================
   QUIZ
========================== */

function resetQuiz() {
  quizIndex = 0;
  loadQuizQuestion();
}

function loadQuizQuestion() {
  const w = currentLesson.words[quizIndex];

  document.getElementById("quiz-question").textContent = w.de;

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

  document.getElementById("quiz-feedback").textContent = "";
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

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

/* ==========================
   FISZKI
========================== */

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

/* ==========================
   LEKTOR
========================== */

function speak(text, lang = "de-DE") {
  if (!("speechSynthesis" in window)) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  window.speechSynthesis.speak(utter);
}

function speakCurrentPractice() {
  const w = currentLesson.words[practiceIndex];
  speak(w.de);
}

function speakCurrentQuiz() {
  const w = currentLesson.words[quizIndex];
  speak(w.de);
}

function speakCurrentFlashcard() {
  const w = currentLesson.words[flashcardIndex];
  speak(w.de);
}
/* ==========================
   PROFIL (ZDJĘCIE)
========================== */

function uploadProfilePhoto() {
  const file = document.getElementById("profile-upload").files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const user = getCurrentUser();
    if (!user) return;

    user.photo = e.target.result; // zapis BASE64
    saveUpdatedUser(user);

    document.getElementById("profile-photo").src = user.photo;
  };

  reader.readAsDataURL(file);
}

function loadProfilePhoto() {
  const user = getCurrentUser();
  if (user && user.photo) {
    document.getElementById("profile-photo").src = user.photo;
  } else {
    document.getElementById("profile-photo").src = "";
  }
}

/* ==========================
   RANKING
========================== */

function loadRanking() {
  const users = loadUsers().sort((a, b) => {
    const scoreA = a.level * 100 + a.xp;
    const scoreB = b.level * 100 + b.xp;
    return scoreB - scoreA;
  });

  const list = document.getElementById("ranking-list");
  list.innerHTML = "";

  users.forEach(u => {
    const li = document.createElement("li");
    li.classList.add("ranking-row");

    const img = document.createElement("img");
    img.classList.add("ranking-avatar");
    img.src = u.photo || "https://via.placeholder.com/40";
    img.alt = u.username;

    const name = document.createElement("span");
    name.classList.add("ranking-name");
    name.textContent = u.username;

    const xp = document.createElement("span");
    xp.classList.add("ranking-xp");
    xp.textContent = `Lv.${u.level} — ${u.xp} XP`;

    li.appendChild(img);
    li.appendChild(name);
    li.appendChild(xp);

    list.appendChild(li);
  });
}

/* ==========================
   START APLIKACJI
========================== */

window.onload = () => {
  const savedTheme = localStorage.getItem(THEME_KEY) || "light";
  applyTheme(savedTheme);

  const savedLang = getCurrentLang();
  applyLanguage(savedLang);

  loadLessons();

  const user = getCurrentUser();
  if (user) {
    updateLoggedInUserLabel();
    updateXPUI();
    updateStatsUI();
    loadProfilePhoto();
    goToScreen("screen-menu");
  } else {
    goToScreen("screen-auth");
  }
};