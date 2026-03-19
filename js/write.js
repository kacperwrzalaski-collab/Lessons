// ==========================================
//  TRYB PISANIA — WPISYWANIE TŁUMACZEŃ
// ==========================================

let writeWords = [];
let writeIndex = 0;

// Zmiana tematu
document.getElementById("write-topic-select").onchange = () => {
    const topic = document.getElementById("write-topic-select").value;
    loadWriteWords(topic);
};

// Wczytanie słówek
function loadWriteWords(topic) {
    writeWords = [...topics[topic]];
    shuffleArray(writeWords);
    writeIndex = 0;
    showWriteWord();
}

// Wyświetlanie słówka
function showWriteWord() {
    if (!writeWords.length) return;

    const word = writeWords[writeIndex];
    document.getElementById("write-question").textContent = `Przetłumacz: ${word.en}`;
    document.getElementById("write-answer").value = "";
    document.getElementById("write-feedback").textContent = "";
}

// Sprawdzanie odpowiedzi
document.getElementById("write-check").onclick = () => {
    if (!writeWords.length) return;

    const userAnswer = document.getElementById("write-answer").value.trim().toLowerCase();
    const correct = writeWords[writeIndex].pl.toLowerCase();
    const feedback = document.getElementById("write-feedback");

    if (userAnswer === correct) {
        feedback.textContent = "✔ Dobrze!";
        feedback.style.color = "#00ff88";
        addXP(4);

        if (typeof updateQuestProgress === "function") {
            updateQuestProgress("write5");
        }
    } else {
        feedback.textContent = `❌ Źle! Poprawna odpowiedź: ${writeWords[writeIndex].pl}`;
        feedback.style.color = "#ff4444";
    }

    setTimeout(() => {
        writeIndex++;

        if (writeIndex >= writeWords.length) {
            writeIndex = 0;
            shuffleArray(writeWords);
        }

        showWriteWord();
    }, 900);
};

// Funkcja mieszająca tablicę
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// Auto-ładowanie pierwszego tematu
setTimeout(() => {
    const select = document.getElementById("write-topic-select");
    if (select && select.value) {
        loadWriteWords(select.value);
    }
}, 300);