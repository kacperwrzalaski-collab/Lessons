// ==========================================
//  TRYB NAUKI — WYŚWIETLANIE SŁÓWEK
// ==========================================

let learnWords = [];
let learnIndex = 0;

// Wczytanie słówek po wyborze tematu
document.getElementById("learn-topic-select").onchange = () => {
    const topic = document.getElementById("learn-topic-select").value;
    loadLearnWords(topic);
};

// Ładowanie słówek do nauki
function loadLearnWords(topic) {
    learnWords = topics[topic];
    learnIndex = 0;
    showLearnWord();
}

// Wyświetlanie aktualnego słówka
function showLearnWord() {
    if (!learnWords.length) return;

    const word = learnWords[learnIndex];
    const box = document.getElementById("learn-word-box");

    box.innerHTML = `
        <div class="learn-word">
            <h2>${word.en}</h2>
            <p>${word.pl}</p>
        </div>
    `;
}

// Przycisk „Następne słówko”
document.getElementById("learn-next").onclick = () => {
    if (!learnWords.length) return;

    learnIndex++;

    // Jeśli koniec — wracamy do początku
    if (learnIndex >= learnWords.length) {
        learnIndex = 0;
    }

    showLearnWord();
    addXP(2); // XP za naukę
};

// Auto-ładowanie pierwszego tematu po wejściu
setTimeout(() => {
    const select = document.getElementById("learn-topic-select");
    if (select && select.value) {
        loadLearnWords(select.value);
    }
}, 300);