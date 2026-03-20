const QUEST_POOL = [
    { text: "Zrób 5 fiszek", goal: 5, reward: 20, type: "flashcards" },
    { text: "Zrób 3 quizy", goal: 3, reward: 25, type: "quiz" },
    { text: "Naucz się 10 słówek", goal: 10, reward: 30, type: "learn" },
    { text: "Zrób 5 poprawnych odpowiedzi w pisaniu", goal: 5, reward: 35, type: "write" }
];

function generateQuest() {
    const q = QUEST_POOL[Math.floor(Math.random() * QUEST_POOL.length)];
    return {
        id: "q" + Math.random().toString(36).substr(2, 9),
        text: q.text,
        goal: q.goal,
        reward: q.reward,
        type: q.type,
        progress: 0
    };
}

function initQuests() {
    const user = getCurrentUser();
    if (!user) return;

    if (!user.quests) {
        user.quests = [
            generateQuest(),
            generateQuest(),
            generateQuest(),
            generateQuest()
        ];
        saveUpdatedUser(user);
    }

    renderQuests();
}

function renderQuests() {
    const user = getCurrentUser();
    if (!user) return;

    const container = document.getElementById("quests-list");
    container.innerHTML = "";

    user.quests.forEach(q => {
        const div = document.createElement("div");
        div.className = "quest glass";

        div.innerHTML = `
            <p>${q.text}</p>
            <p>Postęp: ${q.progress}/${q.goal}</p>
            <p>Nagroda: ${q.reward} XP Coins</p>
        `;

        if (q.progress >= q.goal) {
            const btn = document.createElement("button");
            btn.textContent = "Odbierz nagrodę";
            btn.onclick = () => completeQuest(q.id);
            div.appendChild(btn);
        }

        container.appendChild(div);
    });
}

function updateQuestProgress(type) {
    const user = getCurrentUser();
    if (!user || !user.quests) return;

    let changed = false;

    user.quests.forEach(q => {
        if (q.type === type && q.progress < q.goal) {
            q.progress++;
            changed = true;
        }
    });

    if (changed) {
        saveUpdatedUser(user);
        renderQuests();
    }
}

function completeQuest(id) {
    const user = getCurrentUser();
    if (!user || !user.quests) return;

    const quest = user.quests.find(q => q.id === id);
    if (!quest) return;

    user.coins += quest.reward;

    const index = user.quests.findIndex(q => q.id === id);
    user.quests[index] = generateQuest();

    saveUpdatedUser(user);
    renderQuests();
    loadProfile();
}

function giveXPBox() {
    const user = getCurrentUser();
    if (!user) return;

    const xpGain = Math.floor(Math.random() * 100) + 50;
    user.xp += xpGain;

    let msg = `Otworzyłeś XP BOX! Zdobyłeś ${xpGain} XP`;

    if (Math.random() < 0.10) {
        const coinsGain = Math.floor(Math.random() * 20) + 10;
        user.coins += coinsGain;
        msg += ` oraz ${coinsGain} XP Coins`;
    }

    alert(msg + "!");

    if (user.xp >= user.level * 100) {
        user.xp = 0;
        user.level++;
    }

    saveUpdatedUser(user);
    loadProfile();
}
