// =========================
//   LOCAL STORAGE SYSTEM
// =========================

const USERS_KEY = "trainer_users";
const CURRENT_USER_KEY = "trainer_current_user";
const THEME_KEY = "trainer_theme";
const LANG_KEY = "trainer_language";

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

// =========================
//   AUTH SYSTEM
// =========================

function showAuthMode(mode) {
  document.getElementById("auth-login").classList.toggle("active", mode === "login");
  document.getElementById("auth-register").classList.toggle("active", mode === "register");
  document.getElementById("tab-login").classList.toggle("active", mode === "login");
  document.getElementById("tab-register").classList.toggle("active", mode === "register");
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

// =========================
//   SCREEN SYSTEM
// =========================

function goToScreen(id) {
  const user = getCurrentUser();
  if (!user && id !== "screen-auth") id = "screen-auth";

  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  if (id === "screen-ranking") loadRanking();
  if (id === "screen-achievements") updateAchievementsUI();
  if (id === "screen-friends") {
    updateFriendsUI();
    updateGroupsUI();
  }
}

function updateUIAfterLogin() {
  const user = getCurrentUser();
  document.getElementById("welcome-user").textContent = "Zalogowany jako: " + user.username;

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

// =========================
//   XP & LEVEL SYSTEM
// =========================

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
  const percent = (user.xp / needed) * 100;

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

// =========================
//   RANKING
// =========================

function loadRanking() {
  const users = loadUsers().sort((a, b) => (b.level * 100 + b.xp) - (a.level * 100 + a.xp));
  const list = document.getElementById("ranking-list");

  list.innerHTML = "";

  users.forEach(u => {
    const li = document.createElement("li");
    li.classList.add("ranking-row");

    li.innerHTML = `
      <img class="ranking-avatar" src="${u.photo || "https://via.placeholder.com/40"}">
      <span class="ranking-name">${u.username}</span>
      <span class="ranking-xp">Lv.${u.level} — ${u.xp} XP</span>
    `;

    list.appendChild(li);
  });
}

// =========================
//   ACHIEVEMENTS
// =========================

const ACHIEVEMENTS = [
  { id: "first_login", name: "Pierwsze logowanie" },
  { id: "xp_100", name: "Pierwsza setka XP" },
  { id: "practice_10", name: "Treningowy wojownik" },
  { id: "quiz_10", name: "Mistrz quizu" }
];

function unlockAchievement(id) {
  const user = getCurrentUser();
  if (!user) return;

  if (!user.achievements.includes(id)) {
    user.achievements.push(id);
    saveUpdatedUser(user);
  }
}

function checkAllAchievements() {
  const user = getCurrentUser();
  if (!user) return;

  unlockAchievement("first_login");

  if (user.level * 100 + user.xp >= 100) unlockAchievement("xp_100");
  if (user.practiceCorrect >= 10) unlockAchievement("practice_10");
  if (user.quizCorrect >= 10) unlockAchievement("quiz_10");

  updateAchievementsUI();
}

function updateAchievementsUI() {
  const user = getCurrentUser();
  const list = document.getElementById("achievements-list");

  list.innerHTML = "";

  ACHIEVEMENTS.forEach(a => {
    const unlocked = user.achievements.includes(a.id);
    const li = document.createElement("li");
    li.textContent = `${a.name} — ${unlocked ? "✔️" : "🔒"}`;
    list.appendChild(li);
  });
}

// =========================
//   PROFILE & SETTINGS
// =========================

function uploadProfilePhoto() {
  const file = document.getElementById("profile-upload").files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    const user = getCurrentUser();
    user.photo = e.target.result;
    saveUpdatedUser(user);
    loadProfilePhoto();
    updateProfileBar();
  };
  reader.readAsDataURL(file);
}

function loadProfilePhoto() {
  const user = getCurrentUser();
  document.getElementById("profile-photo").src = user?.photo || "";
}

function updateProfileBar() {
  const user = getCurrentUser();
  document.getElementById("profile-bar-name").textContent = user ? user.username : "Nie zalogowano";
  document.getElementById("profile-bar-avatar").src = user?.photo || "";
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}

// =========================
//   END OF core.js
// =========================
