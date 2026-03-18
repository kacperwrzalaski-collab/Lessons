const LANG_KEY = "trainer_language";
const THEME_KEY = "trainer_theme";
const USERS_KEY = "trainer_users";
const CURRENT_USER_KEY = "trainer_current_user";

const translations = {
  pl: {
    welcomeTitle: "Witaj w EDU‑PAGE",
    welcomeSubtitle: "Zaloguj się lub załóż konto, żeby kontynuować naukę.",
    login: "Logowanie",
    register: "Rejestracja",
    menu: "EDU‑PAGE",
    topics: "Tematy",
    settings: "Ustawienia",
    stats: "Statystyki",
    availableLessons: "Dostępne lekcje",
    back: "Powrót",
    chooseMode: "Wybierz tryb lekcji:",
    learn: "Nauka",
    practice: "Praktyka",
    quiz: "Quiz",
    flashcards: "Fiszki",
    listWords: "Lista słówek",
    practiceTitle: "Praktyka",
    quizTitle: "Quiz",
    translationPL: "Tłumaczenie (PL):",
    perfekt: "Perfekt:",
    check: "Sprawdź",
    next: "Kontynuuj",
    theme: "Motyw",
    toggleTheme: "Przełącz motyw jasny/ciemny",
    language: "Język",
    loggedInAs: "Zalogowany jako: ",
    logout: "Wyloguj",
    loginError: "Błędny login lub hasło.",
    registerErrorExists: "Użytkownik o takiej nazwie już istnieje.",
    registerSuccess: "Konto utworzone. Możesz się zalogować.",
    level: "Poziom:",
    xp: "XP:",
    practiceStats: "Praktyka (dobrze / razem):",
    quizStats: "Quiz (dobrze / razem):",
    speak: "Odtwórz",
    showHide: "Pokaż / ukryj tłumaczenie"
  },
  de: {
    welcomeTitle: "Willkommen bei EDU‑PAGE",
    welcomeSubtitle: "Melde dich an oder registriere dich, um weiterzulernen.",
    login: "Anmeldung",
    register: "Registrierung",
    menu: "EDU‑PAGE",
    topics: "Themen",
    settings: "Einstellungen",
    stats: "Statistiken",
    availableLessons: "Verfügbare Lektionen",
    back: "Zurück",
    chooseMode: "Modus wählen:",
    learn: "Lernen",
    practice: "Üben",
    quiz: "Quiz",
    flashcards: "Karteikarten",
    listWords: "Wortliste",
    practiceTitle: "Übung",
    quizTitle: "Quiz",
    translationPL: "Übersetzung (PL):",
    perfekt: "Perfekt:",
    check: "Prüfen",
    next: "Weiter",
    theme: "Thema",
    toggleTheme: "Helles/dunkles Thema wechseln",
    language: "Sprache",
    loggedInAs: "Angemeldet als: ",
    logout: "Abmelden",
    loginError: "Falscher Benutzername oder Passwort.",
    registerErrorExists: "Benutzername existiert bereits.",
    registerSuccess: "Konto erstellt. Du kannst dich anmelden.",
    level: "Level:",
    xp: "XP:",
    practiceStats: "Übung (richtig / gesamt):",
    quizStats: "Quiz (richtig / gesamt):",
    speak: "Abspielen",
    showHide: "Übersetzung zeigen / verstecken"
  },
  en: {
    welcomeTitle: "Welcome to EDU‑PAGE",
    welcomeSubtitle: "Log in or create an account to continue learning.",
    login: "Login",
    register: "Register",
    menu: "EDU‑PAGE",
    topics: "Topics",
    settings: "Settings",
    stats: "Stats",
    availableLessons: "Available lessons",
    back: "Back",
    chooseMode: "Choose lesson mode:",
    learn: "Learn",
    practice: "Practice",
    quiz: "Quiz",
    flashcards: "Flashcards",
    listWords: "Word list",
    practiceTitle: "Practice",
    quizTitle: "Quiz",
    translationPL: "Translation (PL):",
    perfekt: "Perfect tense:",
    check: "Check",
    next: "Next",
    theme: "Theme",
    toggleTheme: "Toggle light/dark theme",
    language: "Language",
    loggedInAs: "Logged in as: ",
    logout: "Logout",
    loginError: "Wrong username or password.",
    registerErrorExists: "User with this name already exists.",
    registerSuccess: "Account created. You can log in.",
    level: "Level:",
    xp: "XP:",
    practiceStats: "Practice (correct / total):",
    quizStats: "Quiz (correct / total):",
    speak: "Play",
    showHide: "Show / hide translation"
  },
  es: {
    welcomeTitle: "Bienvenido a EDU‑PAGE",
    welcomeSubtitle: "Inicia sesión o crea una cuenta para seguir aprendiendo.",
    login: "Iniciar sesión",
    register: "Registrarse",
    menu: "EDU‑PAGE",
    topics: "Temas",
    settings: "Ajustes",
    stats: "Estadísticas",
    availableLessons: "Lecciones disponibles",
    back: "Volver",
    chooseMode: "Elige el modo de lección:",
    learn: "Aprender",
    practice: "Práctica",
    quiz: "Quiz",
    flashcards: "Fichas",
    listWords: "Lista de palabras",
    practiceTitle: "Práctica",
    quizTitle: "Quiz",
    translationPL: "Traducción (PL):",
    perfekt: "Perfecto:",
    check: "Comprobar",
    next: "Continuar",
    theme: "Tema",
    toggleTheme: "Cambiar tema claro/oscuro",
    language: "Idioma",
    loggedInAs: "Conectado como: ",
    logout: "Cerrar sesión",
    loginError: "Usuario o contraseña incorrectos.",
    registerErrorExists: "Ya existe un usuario con ese nombre.",
    registerSuccess: "Cuenta creada. Ya puedes iniciar sesión.",
    level: "Nivel:",
    xp: "XP:",
    practiceStats: "Práctica (bien / total):",
    quizStats: "Quiz (bien / total):",
    speak: "Reproducir",
    showHide: "Mostrar / ocultar traducción"
  },
  fr: {
    welcomeTitle: "Bienvenue sur EDU‑PAGE",
    welcomeSubtitle: "Connecte-toi ou crée un compte pour continuer à apprendre.",
    login: "Connexion",
    register: "Inscription",
    menu: "EDU‑PAGE",
    topics: "Thèmes",
    settings: "Paramètres",
    stats: "Statistiques",
    availableLessons: "Leçons disponibles",
    back: "Retour",
    chooseMode: "Choisis le mode de leçon :",
    learn: "Apprendre",
    practice: "Pratique",
    quiz: "Quiz",
    flashcards: "Fiches",
    listWords: "Liste de mots",
    practiceTitle: "Pratique",
    quizTitle: "Quiz",
    translationPL: "Traduction (PL) :",
    perfekt: "Parfait :",
    check: "Vérifier",
    next: "Continuer",
    theme: "Thème",
    toggleTheme: "Basculer thème clair/sombre",
    language: "Langue",
    loggedInAs: "Connecté en tant que : ",
    logout: "Déconnexion",
    loginError: "Mauvais identifiant ou mot de passe.",
    registerErrorExists: "Un utilisateur avec ce nom existe déjà.",
    registerSuccess: "Compte créé. Tu peux te connecter.",
    level: "Niveau :",
    xp: "XP :",
    practiceStats: "Pratique (bon / total) :",
    quizStats: "Quiz (bon / total) :",
    speak: "Lire",
    showHide: "Afficher / cacher la traduction"
  }
};

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
    fb.textContent = translations[getCurrentLang()].registerErrorExists;
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
  fb.textContent = translations[getCurrentLang()].registerSuccess;
}

function handleLogin() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const fb = document.getElementById("login-feedback");
  fb.textContent = "";

  const users = loadUsers();
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    fb.textContent = translations[getCurrentLang()].loginError;
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
  const lang = getCurrentLang();
  const t = translations[lang] || translations.pl;
  const el = document.getElementById("welcome-user");
  el.textContent = t.loggedInAs + (user ? user.username : "");
}

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

function loadLearnMode() {
  const list = document.getElementById("wordList");
  list.innerHTML = "";
  currentLesson.words.forEach(w => {
    const li = document.createElement("li");
    li.textContent = `${w.de} — ${w.pl} — ${w.perf}`;
    list.appendChild(li);
  });
}

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
  const fill = document.getElementById("xp-fill");
  const label = document.getElementById("xp-label");
  const lvl = document.getElementById("level-label");
  const percent = Math.min(100, (user.xp / needed) * 100);
  fill.style.width = percent + "%";
  label.textContent = `${user.xp} / ${needed} XP`;
  lvl.textContent = `Lv. ${user.level}`;
}

function updateStatsUI() {
  const user = getCurrentUser();
  if (!user) return;
  document.getElementById("stat-level").textContent = user.level;
  document.getElementById("stat-xp").textContent = user.xp;
  document.getElementById("stat-practice").textContent = `${user.practiceCorrect} / ${user.practiceTotal}`;
  document.getElementById("stat-quiz").textContent = `${user.quizCorrect} / ${user.quizTotal}`;
}

function checkPractice() {
  const w = currentLesson.words[practiceIndex];

  const pl = document.getElementById("practice-pl").value.trim();
  const perf = document.getElementById("practice-perf").value.trim();

  let msg = "";

  const user = getCurrentUser();
  if (!user) return;

  user.practiceTotal++;

  const cleanPerf = (w.perf || "").trim().toLowerCase();
  const cleanUserPerf = perf.trim().toLowerCase();

  const cleanPl = (w.pl || "").trim().toLowerCase();
  const cleanUserPl = pl.trim().toLowerCase();

  if (cleanPl === cleanUserPl && cleanPerf === cleanUserPerf) {
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
  if (practiceIndex >= currentLesson.words.length) {
    practiceIndex = 0;
  }

  document.getElementById("practice-feedback").textContent = "";
  document.getElementById("practice-next-btn").classList.add("hidden");
  document.getElementById("practice-check-btn").classList.remove("hidden");

  loadPracticeWord();
}

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
  const fb = document.getElementById("quiz-feedback");
  const user = getCurrentUser();
  if (!user) return;

  user.quizTotal++;

  if (answer === correct) {
    fb.textContent = "✔️ Dobrze!";
    user.quizCorrect++;
    addXP(8);
  } else {
    fb.textContent = `❌ Źle! Poprawnie: ${correct}`;
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

function speak(text, lang = "de-DE") {
  if (!("speechSynthesis" in window)) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  window.speechSynthesis.speak(utter);
}

function speakCurrentPractice() {
  const w = currentLesson.words[practiceIndex];
  speak(w.de, "de-DE");
}

function speakCurrentQuiz() {
  const w = currentLesson.words[quizIndex];
  speak(w.de, "de-DE");
}

function speakCurrentFlashcard() {
  const w = currentLesson.words[flashcardIndex];
  speak(w.de, "de-DE");
}

function showMode(id) {
  document.querySelectorAll(".mode-section").forEach(m => m.classList.remove("active"));
  const target = document.getElementById(id);
  target.classList.add("active");
}

function uploadProfilePhoto() {
  const file = document.getElementById("profile-upload").files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const user = getCurrentUser();
    if (!user) return;
    user.photo = e.target.result;
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
    li.textContent = `${u.username} — Lv.${u.level} (${u.xp} XP)`;
    list.appendChild(li);
  });
}

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