/* ============================================================
   lootboxes.js — OTWIERANIE SKRZYNEK JAK W CS2
   Pasek itemów, animacja zwalniania, highlight wygranego
============================================================ */

/* ===================== POPUP =============================== */

function openLootboxPopup(crateType) {
    const overlay = document.getElementById("lootbox-overlay");
    overlay.classList.remove("hidden");

    const strip = document.getElementById("lootbox-strip");
    strip.innerHTML = "";

    // Zapisujemy typ skrzynki do otwarcia
    window.currentCrateType = crateType;

    // Generujemy pasek itemów
    generateLootboxStrip(crateType);
}

function closeLootboxPopup() {
    document.getElementById("lootbox-overlay").classList.add("hidden");
    document.getElementById("lootbox-result").textContent = "";
}

/* ===================== GENEROWANIE PASKA ==================== */

function generateLootboxStrip(crateType) {
    const strip = document.getElementById("lootbox-strip");
    strip.innerHTML = "";

    const dropTable = CRATE_DROP_TABLE[crateType];

    // Pasek ma 40 itemów (jak w CS2)
    for (let i = 0; i < 40; i++) {
        const item = dropTable[Math.floor(Math.random() * dropTable.length)];

        const div = document.createElement("div");
        div.className = "lootbox-item rarity-" + item.rarity;

        div.innerHTML = `
            <div class="lootbox-item-name">${item.id}</div>
        `;

        strip.appendChild(div);
    }
}

/* ===================== ANIMACJA OTWIERANIA ================= */

document.getElementById("lootbox-open-btn").addEventListener("click", () => {
    startLootboxAnimation(window.currentCrateType);
});

function startLootboxAnimation(crateType) {
    const strip = document.getElementById("lootbox-strip");

    // Reset animacji
    strip.style.transition = "none";
    strip.style.transform = "translateX(0)";

    // Wymuszenie reflow
    void strip.offsetWidth;

    // Losujemy wygraną
    const dropTable = CRATE_DROP_TABLE[crateType];
    const winningItem = dropTable[Math.floor(Math.random() * dropTable.length)];

    // Pozycja wygranego itemu (środek paska)
    const winningIndex = 20 + Math.floor(Math.random() * 5);

    const itemWidth = 84; // 80px + marginesy
    const targetX = -(winningIndex * itemWidth) + 160; // marker na środku

    // Animacja zwalniania
    strip.style.transition = "transform 2.4s cubic-bezier(0.05, 0.9, 0.25, 1)";
    strip.style.transform = `translateX(${targetX}px)`;

    // Po zakończeniu animacji — highlight + nagroda
    setTimeout(() => {
        highlightWinningItem(winningIndex);
        giveLootboxReward(winningItem);
    }, 2500);
}

/* ===================== HIGHLIGHT WYGRANEGO ================= */

function highlightWinningItem(index) {
    const strip = document.getElementById("lootbox-strip");
    const items = strip.querySelectorAll(".lootbox-item");

    if (items[index]) {
        items[index].classList.add("highlight");
    }
}

/* ===================== PRZYZNAWANIE NAGRODY ================ */

function giveLootboxReward(item) {
    const resultBox = document.getElementById("lootbox-result");

    resultBox.textContent = `Wygrałeś: ${item.id} (${item.rarity})`;

    // Dodajemy do ekwipunku
    if (item.type === "frame") {
        player.inventory.frames.push(item.id);
    }
    if (item.type === "background") {
        player.inventory.backgrounds.push(item.id);
    }
    if (item.type === "badge") {
        player.inventory.badges.push(item.id);
    }
    if (item.type === "title") {
        player.inventory.titles.push(item.id);
    }

    savePlayer();
}

/* ===================== EXPORT =============================== */

window.openLootboxPopup = openLootboxPopup;
window.closeLootboxPopup = closeLootboxPopup;
window.startLootboxAnimation = startLootboxAnimation;