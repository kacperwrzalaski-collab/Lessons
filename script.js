const USERS_KEY = "trainer_users";
const CURRENT_USER_KEY = "trainer_current_user";
const THEME_KEY = "trainer_theme";
const LANG_KEY = "trainer_language";
const GROUPS_KEY = "trainer_groups";

function loadUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
function getCurrentUser() {
  return JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || "null");
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
  if (!login || !register || !tabLogin || !tabRegister) return;
  const isLogin = mode === "login";
  login.classList.toggle("active", isLogin);
  register.classList.toggle("active", !isLogin);
  tabLogin.classList.toggle("active", isLogin);
  tabRegister.classList.toggle("active", !isLogin);
}

function handleRegister() {
  const username = document.getElementById("register-username").value.trim();
  const password = document.getElementById("register-password").value.trim();
  const fb = document.getElementById("register-feedback");
  if (!username || !password) {
    fb.textContent = "Uzupełnij login i hasło.";
    return;
  }
  const users = loadUsers();
  if (users.some(u => u.username === username)) {
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
    photo: null,
    achievements: [],
    friends: [],
    groups: []
  });
  saveUsers(users);
  fb.textContent = "Konto utworzone. Możesz się zalogować.";
}

function handleLogin() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const fb = document.getElementById("login-feedback");
  const users = loadUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    fb.textContent = "Błędny login lub hasło.";
    return;
  }
  setCurrentUser(user);
  updateUIAfterLogin();
  goToScreen("screen-menu");
}

function logout() {
  setCurrentUser(null);
  goToScreen("screen-auth");
  updateProfileBar();
}

function goToScreen(id) {
  const user = getCurrentUser();
  if (!user && id !== "screen-auth") id = "screen-auth";
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const target = document.getElementById(id);
  if (!target) return;
  target.classList.add("active");
  if (id === "screen-ranking") loadRanking();
  if (id === "screen-achievements") updateAchievementsUI();
  if (id === "screen-friends") {
    updateFriendsUI();
    updateGroupsUI();
  }
}

function updateUIAfterLogin() {
  const user = getCurrentUser();
  const el = document.getElementById("welcome-user");
  if (el && user) el.textContent = "Zalogowany jako: " + user.username;
  updateXPUI();
  updateStatsUI();
  loadProfilePhoto();
  loadLessons();
  updateProfileBar();
  updateAchievementsUI();
  checkAllAchievements();
  updateFriendsUI();
  updateGroupsUI();
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
  checkAllAchievements();
}

function saveUpdatedUser(user) {
  const users = loadUsers();
  const index = users.findIndex(u => u.username === user.username);
  if (index !== -1) {
    users[index] = user;
    saveUsers(users);
  }
  setCurrentUser(user);
}

function updateXPUI() {
  const user = getCurrentUser();
  if (!user) return;
  const needed = user.level * 100;
  const percent = needed > 0 ? (user.xp / needed) * 100 : 0;
  const fill = document.getElementById("xp-fill");
  const label = document.getElementById("xp-label");
  const lvl = document.getElementById("level-label");
  if (fill) fill.style.width = percent + "%";
  if (label) label.textContent = `${user.xp} / ${needed} XP`;
  if (lvl) lvl.textContent = `Lv. ${user.level}`;
}

function updateStatsUI() {
  const user = getCurrentUser();
  if (!user) return;
  const sl = document.getElementById("stat-level");
  const sx = document.getElementById("stat-xp");
  const sp = document.getElementById("stat-practice");
  const sq = document.getElementById("stat-quiz");
  if (sl) sl.textContent = user.level;
  if (sx) sx.textContent = user.xp;
  if (sp) sp.textContent = `${user.practiceCorrect} / ${user.practiceTotal}`;
  if (sq) sq.textContent = `${user.quizCorrect} / ${user.quizTotal}`;
}

let currentLesson = null;
let practiceIndex = 0;
let quizIndex = 0;
let flashcardIndex = 0;

function loadLessons() {
  const list = document.getElementById("lessons-list");
  if (!list || !window.lessons) return;
  list.innerHTML = "";
  lessons.forEach((lesson, index) => {
    const li = document.createElement("li");
    li.textContent = lesson.title;
    li.onclick = () => openLesson(index);
    list.appendChild(li);
  });
}

function openLesson(index) {
  if (!window.lessons) return;
  currentLesson = lessons[index];
  const lt = document.getElementById("lesson-title");
  const ld = document.getElementById("lesson-description");
  const mt = document.getElementById("modes-lesson-title");
  if (lt) lt.textContent = currentLesson.title;
  if (ld) ld.textContent = currentLesson.description || "";
  if (mt) mt.textContent = currentLesson.title;
  loadLearnMode();
  resetPractice();
  resetQuiz();
  resetFlashcards();
  goToScreen("screen-lesson");
}

function showMode(id) {
  document.querySelectorAll(".mode-section").forEach(m => m.classList.remove("active"));
  const el = document.getElementById(id);
  if (el) el.classList.add("active");
}

function loadLearnMode() {
  const list = document.getElementById("wordList");
  if (!list || !currentLesson) return;
  list.innerHTML = "";
  currentLesson.words.forEach(w => {
    const li = document.createElement("li");
    li.textContent = `${w.de} — ${w.pl} — ${w.perf}`;
    list.appendChild(li);
  });
}

function resetPractice() {
  practiceIndex = 0;
  const fb = document.getElementById("practice-feedback");
  const nextBtn = document.getElementById("practice-next-btn");
  const checkBtn = document.getElementById("practice-check-btn");
  if (fb) fb.textContent = "";
  if (nextBtn) nextBtn.classList.add("hidden");
  if (checkBtn) checkBtn.classList.remove("hidden");
  loadPracticeWord();
}

function loadPracticeWord() {
  if (!currentLesson) return;
  const w = currentLesson.words[practiceIndex];
  const info = document.getElementById("practice-info");
  const pl = document.getElementById("practice-pl");
  const perf = document.getElementById("practice-perf");
  if (info) info.textContent = w.de;
  if (pl) pl.value = "";
  if (perf) perf.value = "";
}

function checkPractice() {
  if (!currentLesson) return;
  const w = currentLesson.words[practiceIndex];
  const plEl = document.getElementById("practice-pl");
  const perfEl = document.getElementById("practice-perf");
  const fb = document.getElementById("practice-feedback");
  const nextBtn = document.getElementById("practice-next-btn");
  const checkBtn = document.getElementById("practice-check-btn");
  const pl = (plEl.value || "").trim().toLowerCase();
  const perf = (perfEl.value || "").trim().toLowerCase();
  const correctPL = w.pl.trim().toLowerCase();
  const correctPerf = w.perf.trim().toLowerCase();
  const user = getCurrentUser();
  if (!user) return;
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
  if (fb) fb.textContent = msg;
  if (checkBtn) checkBtn.classList.add("hidden");
  if (nextBtn) nextBtn.classList.remove("hidden");
}

function nextPractice() {
  if (!currentLesson) return;
  practiceIndex++;
  if (practiceIndex >= currentLesson.words.length) practiceIndex = 0;
  const fb = document.getElementById("practice-feedback");
  const nextBtn = document.getElementById("practice-next-btn");
  const checkBtn = document.getElementById("practice-check-btn");
  if (fb) fb.textContent = "";
  if (nextBtn) nextBtn.classList.add("hidden");
  if (checkBtn) checkBtn.classList.remove("hidden");
  loadPracticeWord();
}

function resetQuiz() {
  quizIndex = 0;
  loadQuizQuestion();
}

function loadQuizQuestion() {
  if (!currentLesson) return;
  const w = currentLesson.words[quizIndex];
  const q = document.getElementById("quiz-question");
  const answers = document.getElementById("quiz-answers");
  const fb = document.getElementById("quiz-feedback");
  if (!q || !answers) return;
  q.textContent = w.de;
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
  if (fb) fb.textContent = "";
}

function checkQuiz(answer, correct) {
  const user = getCurrentUser();
  if (!user) return;
  const fb = document.getElementById("quiz-feedback");
  user.quizTotal++;
  if (answer === correct) {
    if (fb) fb.textContent = "✔️ Dobrze!";
    user.quizCorrect++;
    addXP(8);
  } else {
    if (fb) fb.textContent = `❌ Źle! Poprawnie: ${correct}`;
    addXP(1);
  }
  saveUpdatedUser(user);
  checkAllAchievements();
}

function nextQuiz() {
  if (!currentLesson) return;
  quizIndex++;
  if (quizIndex >= currentLesson.words.length) quizIndex = 0;
  loadQuizQuestion();
}

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function resetFlashcards() {
  flashcardIndex = 0;
  const tr = document.getElementById("flashcard-translation");
  if (tr) tr.classList.add("hidden");
  loadFlashcard();
}

function loadFlashcard() {
  if (!currentLesson) return;
  const w = currentLesson.words[flashcardIndex];
  const fw = document.getElementById("flashcard-word");
  const ft = document.getElementById("flashcard-translation");
  if (fw) fw.textContent = w.de;
  if (ft) ft.textContent = `${w.pl} — ${w.perf}`;
}

function toggleFlashcard() {
  const ft = document.getElementById("flashcard-translation");
  if (ft) ft.classList.toggle("hidden");
}

function nextFlashcard() {
  if (!currentLesson) return;
  flashcardIndex++;
  if (flashcardIndex >= currentLesson.words.length) flashcardIndex = 0;
  const ft = document.getElementById("flashcard-translation");
  if (ft) ft.classList.add("hidden");
  loadFlashcard();
}

function speak(text, lang = "de-DE") {
  if (!("speechSynthesis" in window)) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  window.speechSynthesis.speak(utter);
}

function speakCurrentPractice() {
  if (!currentLesson) return;
  const w = currentLesson.words[practiceIndex];
  speak(w.de);
}

function speakCurrentQuiz() {
  if (!currentLesson) return;
  const w = currentLesson.words[quizIndex];
  speak(w.de);
}

function speakCurrentFlashcard() {
  if (!currentLesson) return;
  const w = currentLesson.words[flashcardIndex];
  speak(w.de);
}

function uploadProfilePhoto() {
  const fileInput = document.getElementById("profile-upload");
  if (!fileInput || !fileInput.files[0]) return;
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    const user = getCurrentUser();
    if (!user) return;
    user.photo = e.target.result;
    saveUpdatedUser(user);
    const img = document.getElementById("profile-photo");
    if (img) img.src = user.photo;
    updateProfileBar();
  };
  reader.readAsDataURL(file);
}

function loadProfilePhoto() {
  const user = getCurrentUser();
  const img = document.getElementById("profile-photo");
  if (!img) return;
  if (user && user.photo) img.src = user.photo;
  else img.src = "";
}

function loadRanking() {
  const users = loadUsers().sort((a, b) => {
    const scoreA = a.level * 100 + a.xp;
    const scoreB = b.level * 100 + b.xp;
    return scoreB - scoreA;
  });
  const list = document.getElementById("ranking-list");
  if (!list) return;
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

const ACHIEVEMENTS = [
  { id: "first_login", name: "Pierwsze logowanie", desc: "Zaloguj się po raz pierwszy." },
  { id: "xp_100", name: "Pierwsza setka", desc: "Zdobądź 100 XP łącznie." },
  { id: "practice_10", name: "Treningowy wojownik", desc: "10 poprawnych odpowiedzi w praktyce." },
  { id: "quiz_10", name: "Mistrz quizu", desc: "10 poprawnych odpowiedzi w quizie." }
];

function unlockAchievement(id) {
  const user = getCurrentUser();
  if (!user) return;
  if (!user.achievements) user.achievements = [];
  if (user.achievements.includes(id)) return;
  user.achievements.push(id);
  saveUpdatedUser(user);
  updateAchievementsUI();
}

function checkAllAchievements() {
  const user = getCurrentUser();
  if (!user) return;
  unlockAchievement("first_login");
  const totalXP = user.level * 100 + user.xp;
  if (totalXP >= 100) unlockAchievement("xp_100");
  if (user.practiceCorrect >= 10) unlockAchievement("practice_10");
  if (user.quizCorrect >= 10) unlockAchievement("quiz_10");
}

function updateAchievementsUI() {
  const user = getCurrentUser();
  const list = document.getElementById("achievements-list");
  if (!list || !user) return;
  list.innerHTML = "";
  ACHIEVEMENTS.forEach(a => {
    const li = document.createElement("li");
    const unlocked = user.achievements && user.achievements.includes(a.id);
    li.textContent = `${a.name} — ${a.desc} ${unlocked ? "✔️" : "🔒"}`;
    list.appendChild(li);
  });
}

function updateFriendsUI() {
  const user = getCurrentUser();
  const list = document.getElementById("friends-list");
  if (!user || !list) return;
  list.innerHTML = "";
  (user.friends || []).forEach(name => {
    const li = document.createElement("li");
    li.textContent = name;
    list.appendChild(li);
  });
}

function addFriend() {
  const input = document.getElementById("friend-name");
  if (!input) return;
  const name = input.value.trim();
  if (!name) return;
  const user = getCurrentUser();
  if (!user) return;
  if (!user.friends) user.friends = [];
  if (!user.friends.includes(name)) {
    user.friends.push(name);
    saveUpdatedUser(user);
  }
  input.value = "";
  updateFriendsUI();
}

function loadGroups() {
  return JSON.parse(localStorage.getItem(GROUPS_KEY) || "[]");
}
function saveGroups(groups) {
  localStorage.setItem(GROUPS_KEY, JSON.stringify(groups));
}

let currentGroupId = null;

function updateGroupsUI() {
  const user = getCurrentUser();
  const list = document.getElementById("groups-list");
  if (!user || !list) return;
  const groups = loadGroups();
  list.innerHTML = "";
  (user.groups || []).forEach(id => {
    const g = groups.find(gr => gr.id === id);
    if (!g) return;
    const li = document.createElement("li");
    li.textContent = g.name;
    li.onclick = () => openGroupChat(g.id);
    list.appendChild(li);
  });
}

function createGroup() {
  const input = document.getElementById("group-name");
  if (!input) return;
  const name = input.value.trim();
  if (!name) return;
  const user = getCurrentUser();
  if (!user) return;
  const groups = loadGroups();
  const id = "group_" + Date.now();
  const newGroup = { id, name, members: [user.username], messages: [] };
  groups.push(newGroup);
  saveGroups(groups);
  if (!user.groups) user.groups = [];
  user.groups.push(id);
  saveUpdatedUser(user);
  input.value = "";
  updateGroupsUI();
}

function openGroupChat(groupId) {
  currentGroupId = groupId;
  const groups = loadGroups();
  const group = groups.find(g => g.id === groupId);
  if (!group) return;
  const title = document.getElementById("group-chat-title");
  if (title) title.textContent = `Czat: ${group.name}`;
  goToScreen("screen-group-chat");
  renderGroupMessages();
}

function renderGroupMessages() {
  const box = document.getElementById("group-chat-messages");
  if (!box || !currentGroupId) return;
  const groups = loadGroups();
  const group = groups.find(g => g.id === currentGroupId);
  if (!group) return;
  box.innerHTML = "";
  group.messages.forEach(m => {
    const div = document.createElement("div");
    div.textContent = `[${m.author}] ${m.text}`;
    box.appendChild(div);
  });
  box.scrollTop = box.scrollHeight;
}

function sendGroupMessage() {
  const input = document.getElementById("group-chat-input");
  if (!input || !currentGroupId) return;
  const text = input.value.trim();
  if (!text) return;
  const user = getCurrentUser();
  if (!user) return;
  const groups = loadGroups();
  const group = groups.find(g => g.id === currentGroupId);
  if (!group) return;
  group.messages.push({ author: user.username, text, time: Date.now() });
  saveGroups(groups);
  input.value = "";
  renderGroupMessages();
}

function updateProfileBar() {
  const user = getCurrentUser();
  const nameEl = document.getElementById("profile-bar-name");
  const statusEl = document.getElementById("profile-bar-status");
  const avatarEl = document.getElementById("profile-bar-avatar");
  if (!nameEl || !statusEl || !avatarEl) return;
  if (!user) {
    nameEl.textContent = "Nie zalogowano";
    statusEl.textContent = "Kliknij, aby się zalogować";
    avatarEl.src = "";
    return;
  }
  nameEl.textContent = user.username;
  statusEl.textContent = `Lv.${user.level} — ${user.xp} XP`;
  avatarEl.src = user.photo || "https://via.placeholder.com/40";
}

function openProfileFromBar() {
  const user = getCurrentUser();
  if (!user) goToScreen("screen-auth");
  else goToScreen("screen-settings");
}

function applyTheme(theme) {
  if (theme === "dark") document.body.classList.add("dark");
  else document.body.classList.remove("dark");
}
function toggleTheme() {
  const isDark = document.body.classList.contains("dark");
  const next = isDark ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem(THEME_KEY, next);
}
function getCurrentLang() {
  return localStorage.getItem(LANG_KEY) || "pl";
}
function changeLanguage(lang) {
  localStorage.setItem(LANG_KEY, lang);
}

window.onload = () => {
  const savedTheme = localStorage.getItem(THEME_KEY) || "light";
  applyTheme(savedTheme);
  getCurrentLang();
  loadLessons();
  const user = getCurrentUser();
  if (user) {
    updateUIAfterLogin();
    goToScreen("screen-menu");
  } else {
    goToScreen("screen-auth");
  }
  updateProfileBar();
};