// ==========================================
//  SKLEP — KOSMETYKI
// ==========================================

// Lista przedmiotów w sklepie
const SHOP_ITEMS = [
    // Ramki
    { id: "avatar-frame-neonpulse", name: "Neon Pulse", type: "frame", price: 50 },
    { id: "avatar-frame-neonglow", name: "Neon Glow", type: "frame", price: 50 },
    { id: "avatar-frame-electric", name: "Electric", type: "frame", price: 60 },
    { id: "avatar-frame-cyberpunk", name: "Cyberpunk", type: "frame", price: 70 },
    { id: "avatar-frame-royal", name: "Royal", type: "frame", price: 80 },
    { id: "avatar-frame-inferno", name: "Inferno", type: "frame", price: 90 },
    { id: "avatar-frame-galaxy", name: "Galaxy", type: "frame", price: 100 },
    { id: "avatar-frame-rainbow", name: "Rainbow", type: "frame", price: 120 },

    // Tła
    { id: "prestige-1-bg", name: "Prestige 1", type: "background", price: 40 },
    { id: "prestige-2-bg", name: "Prestige 2", type: "background", price: 50 },
    { id: "prestige-3-bg", name: "Prestige 3", type: "background", price: 60 },
    { id: "prestige-4-bg", name: "Prestige 4", type: "background", price: 70 },
    { id: "prestige-5-bg", name: "Prestige 5", type: "background", price: 80 },

    // Kolory przycisków
    { id: "btn-theme-blue", name: "Niebieskie przyciski", type: "buttons", price: 30 },
    { id: "btn-theme-green", name: "Zielone przyciski", type: "buttons", price: 30 },
    { id: "btn-theme-red", name: "Czerwone przyciski", type: "buttons", price: 30 }
];

// ==========================================
//  WYŚWIETLANIE SKLEPU
// ==========================================

function renderShop() {
    const shop = document.getElementById("shop-items");
    shop.innerHTML = "";

    const username = localStorage.getItem("currentUser");
    const user = loadUser(username);

    SHOP_ITEMS.forEach(item => {
        const owned =
            user.inventory.frames.includes(item.id) ||
            user.inventory.backgrounds.includes(item.id) ||
            user.inventory.buttons.includes(item.id);

        const div = document.createElement("div");
        div.className = "shop-item";

        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>Cena: 💰 ${item.price}</p>
            ${owned ? "<span style='color:#00ff88'>✔ Posiadane</span>" :
            `<button onclick="buyItem('${item.id}')">Kup</button>`}
        `;

        shop.appendChild(div);
    });
}

// ==========================================
//  KUPNO PRZEDMIOTU
// ==========================================

function buyItem(id) {
    const username = localStorage.getItem("currentUser");
    const user = loadUser(username);

    const item = SHOP_ITEMS.find(i => i.id === id);
    if (!item) return;

    // Sprawdzenie czy już kupione
    if (
        user.inventory.frames.includes(id) ||
        user.inventory.backgrounds.includes(id) ||
        user.inventory.buttons.includes(id)
    ) {
        alert("Masz już ten przedmiot!");
        return;
    }

    // Sprawdzenie coins
    if (user.coins < item.price) {
        alert("❌ Za mało XP Coins!");
        return;
    }

    // Pobranie coins
    user.coins -= item.price;

    // Dodanie do ekwipunku
    if (item.type === "frame") user.inventory.frames.push(id);
    if (item.type === "background") user.inventory.backgrounds.push(id);
    if (item.type === "buttons") user.inventory.buttons.push(id);

    saveUser(user);
    loadProfile();
    renderShop();
    renderInventory();
}

// ==========================================
//  AUTO-START
// ==========================================

setTimeout(() => {
    renderShop();
}, 300);