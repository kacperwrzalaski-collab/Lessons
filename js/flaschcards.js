// ==========================================
//  FISZKI — TRYB NAUKI
// ==========================================

let flashcardsWords = [];
let flashcardIndex = 0;

// Zmiana tematu fiszek
document.getElementById("flashcards-topic-select").onchange = () => {
    const topic = document.getElementById("flashcards-topic-select").value;
    loadFlashcards(topic);
};

// Wczytanie fiszek
function loadFlashcards(topic) {
    flashcardsWords = topics[topic];
    flashcardIndex = 0;
    showFlashcard();
}

// Wyświetlanie fiszki
function showFlashcard() {
    if (!flashcardsWords.length) return;

    const word = flashcardsWords[flashcardIndex];

    document.getElementById("flashcard-word").textContent = word.en;
    document.getElementById("flashcard-answer").textContent = word.pl;
    document.getElementById("flashcard-answer").classList.add("hidden");
}

// Pokaż tłumaczenie
document.getElementById("flashcard-show").onclick = () => {
    document.getElementById("flashcard-answer").classList.remove("hidden");
    addXP(1); // XP za odsłonięcie fiszki
};

// Następna fiszka
document.getElementById("flashcard-next").onclick = () => {
    if (!flashcardsWords.length) return;

    flashcardIndex++;

    if (flashcardIndex >= flashcardsWords.length) {
        flashcardIndex = 0;
    }

    showFlashcard();
};

// Auto-ładowanie pierwszego tematu
setTimeout(() => {
    const select = document.getElementById("flashcards-topic-select");
    if (select && select.value) {
        loadFlashcards(select.value);
    }
}, 300);