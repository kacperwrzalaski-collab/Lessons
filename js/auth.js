const USERS_KEY = "lernzone_users";
const CURRENT_USER_KEY = "lernzone_current_user";

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

function saveUpdatedUser(user) {
    const users = loadUsers();
    const index = users.findIndex(u => u.username === user.username);
    if (index !== -1) {
        users[index] = user;
        saveUsers(users);
        setCurrentUser(user);
    }
}

function initAuth() {
    const loginTab = document.getElementById("tab-login");
    const registerTab = document.getElementById("tab-register");
    const loginBox = document.getElementById("auth-login");
    const registerBox = document.getElementById("auth-register");

    loginTab.onclick = () => switchAuth("login");
    registerTab.onclick = () => switchAuth("register");

    function switchAuth(mode) {
        loginTab.classList.toggle("active", mode === "login");
        registerTab.classList.toggle("active", mode === "register");
        loginBox.classList.toggle("active", mode === "login");
        registerBox.classList.toggle("active", mode === "register");
    }

    document.getElementById("btn-register").onclick = () => {
        const username = document.getElementById("register-username").value.trim();
        const password = document.getElementById("register-password").value.trim();
        const fb = document.getElementById("register-feedback");

        if (!username || !password) {
            fb.textContent = "Uzupełnij dane.";
            return;
        }

        const users = loadUsers();
        if (users.some(u => u.username === username)) {
            fb.textContent = "Taki użytkownik już istnieje.";
            return;
        }

        users.push({
            username,
            password,
            xp: 0,
            level: 1,
            avatar: "",
            quizScore: 0,
            coins: 0,
            inventory: [],
            equipped: {
                background: null,
                buttonColor: null,
                avatarFrame: null
            },
            quests: null
        });

        saveUsers(users);
        fb.textContent = "Konto utworzone!";
    };

    document.getElementById("btn-login").onclick = () => {
        const username = document.getElementById("login-username").value.trim();
        const password = document.getElementById("login-password").value.trim();
        const fb = document.getElementById("login-feedback");

        const users = loadUsers();
        const user = users.find(u => u.username === username && u.password === password);

        if (!user) {
            fb.textContent = "Błędne dane.";
            return;
        }

        setCurrentUser(user);
        loadProfile();

        document.getElementById("screen-auth").style.display = "none";
        document.getElementById("app-container").classList.remove("hidden");
    };
}

function loadProfile() {
    const user = getCurrentUser();
    if (!user) return;

    document.getElementById("profile-name").textContent = user.username;
    document.getElementById("profile-level").textContent = "Poziom " + user.level;
    document.getElementById("profile-avatar").src = user.avatar || "https://i.imgur.com/0y8Ftya.png";

    document.getElementById("coins-display").textContent = user.coins;
    const shopCoins = document.getElementById("coins-display-shop");
    if (shopCoins) shopCoins.textContent = user.coins;

    updateXP();
    applyCosmetics();
}

function updateXP() {
    const user = getCurrentUser();
    if (!user) return;
    const needed = user.level * 100;
    const percent = Math.min(100, (user.xp / needed) * 100);
    document.getElementById("xp-fill").style.width = percent + "%";
}

function initSettings() {
    document.getElementById("avatar-upload").onchange = e => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = ev => {
            const user = getCurrentUser();
            user.avatar = ev.target.result;
            saveUpdatedUser(user);
            loadProfile();
        };
        reader.readAsDataURL(file);
    };

    document.getElementById("theme-toggle").onclick = () => {
        document.body.classList.toggle("light");
    };

    document.getElementById("display-mode").onchange = e => {
        const mode = e.target.value;
        if (mode === "mobile") document.body.classList.add("mobile");
        else document.body.classList.remove("mobile");
    };
}
