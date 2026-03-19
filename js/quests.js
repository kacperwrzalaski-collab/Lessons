// ==========================================
//  QUESTY — MISJE DZIENNE
// ==========================================

// Lista dostępnych questów
const QUEST_POOL = [
    { id: "learn10", text: "Naucz się 10 słówek", rewardXP: 20, rewardCoins: 5 },
    { id: "flashcards10", text: "Przerób 10 fiszek", rewardXP: 15, rewardCoins: 5 },
    { id: "quiz5", text: "Odpowiedz poprawnie na 5 pytań w quizie", rewardXP: 25, rewardCoins: 10 },
    { id: "write5", text: "Poprawnie wpisz 5 tłumaczeń", rewardXP: 20, rewardCoins: 5 },
    { id: "session5min", text: "Ucz się przez 5 minut", rewardXP: 10, rewardCoins: 3 }
];

// Aktualny stan questów
let activeQuests = [];
let questProgress = {};

// ==========================================
//  GENEROWANIE QUESTÓW DZIENNYCH
// ==========================================

function generateDailyQuests() {
    const username = localStorage.getItem("currentUser");
    const user = loadUser(username);

    const today = new Date().toDateString();

    // Jeśli questy są już wygenerowane na dziś — wczytaj
    if (user.lastQuestDay === today) {
        activeQuests = user.activeQuests || [];
        questProgress = user.questProgress || {};
        renderQuests();
        return;
    }

    // W przeciwnym razie — generujemy nowe
    activeQuests = [];
    questProgress = {};

    // Losujemy 3 różne questy
    const shuffled = [...QUEST_POOL].sort(() => Math.random() - 0.5);
    activeQuests = shuffled.slice(0, 3);

    // Reset progresu
    activeQuests.forEach(q => {
        questProgress[q.id] = 0;
    });

    // Zapis do użytkownika
    user.lastQuestDay = today;
    user.activeQuests = activeQuests;
    user.questProgress = questProgress;
    saveUser(user);

    renderQuests();
}

// ==========================================
//  WYŚWIETLANIE QUESTÓW
// ==========================================

function renderQuests() {
    const list = document.getElementById("quests-list");
    list.innerHTML = "";

    activeQuests.forEach(q => {
        const progress = questProgress[q.id] || 0;
        const done = progress >= getQuestGoal(q.id);

        const div = document.createElement("div");
        div.className = "quest-item";

        div.innerHTML = `
            <strong>${q.text}</strong><br>
            Postęp: ${progress}/${getQuestGoal(q.id)}<br>
            Nagroda: ⭐ ${q.rewardXP} XP, 💰 ${q.rewardCoins} Coins<br>
            ${done ? "<span style='color:#00ff88'>✔ Ukończono!</span>" : ""}
        `;

        list.appendChild(div);
    });
}

// ==========================================
//  CELE QUESTÓW
// ==========================================

function getQuestGoal(id) {
    switch (id) {
        case "learn10": return 10;
        case "flashcards10": return 10;
        case "quiz5": return 5;
        case "write5": return 5;
        case "session5min": return 1;
        default: return 1;
    }
}

// ==========================================
//  AKTUALIZACJA PROGRESU QUESTÓW
// ==========================================

function updateQuestProgress(type) {
    const username = localStorage.getItem("currentUser");
    const user = loadUser(username);

    if (!questProgress[type]) questProgress[type] = 0;

    questProgress[type]++;

    // Sprawdzamy, czy quest ukończony
    if (questProgress[type] >= getQuestGoal(type)) {
        rewardQuest(type);
    }

    // Zapis
    user.questProgress = questProgress;
    saveUser(user);

    renderQuests();
}

// ==========================================
//  NAGRODY ZA QUEST
// ==========================================

function rewardQuest(id) {
    const username = localStorage.getItem("currentUser");
    const user = loadUser(username);

    const quest = activeQuests.find(q => q.id === id);
    if (!quest) return;

    user.xp += quest.rewardXP;
    user.coins += quest.rewardCoins;

    saveUser(user);
    loadProfile();
}

// ==========================================
//  AUTO-START
// ==========================================

setTimeout(() => {
    generateDailyQuests();
}, 300);