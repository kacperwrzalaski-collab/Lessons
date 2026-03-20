const SHOP_ITEMS = [
    { id: "bg_blue", name: "Niebieskie tło", price: 50, type: "background", value: "#0b0f17", rarity: "Common" },
    { id: "bg_red", name: "Czerwone tło", price: 50, type: "background", value: "#220000", rarity: "Common" },
    { id: "btn_green", name: "Zielone przyciski", price: 40, type: "buttonColor", value: "#00aa55", rarity: "Common" },
    { id: "frame_neonpulse", name: "Neon Pulse", price: 120, type: "avatarFrame", value: "neonpulse", rarity: "Rare" },
    { id: "frame_neonglow", name: "Neon Glow", price: 200, type: "avatarFrame", value: "neonglow", rarity: "Epic" },
    { id: "frame_electric", name: "Electric Frame", price: 350, type: "avatarFrame", value: "electric", rarity: "Legendary" },
    { id: "frame_cyberpunk", name: "Cyberpunk Flicker", price: 500, type: "avatarFrame", value: "cyberpunk", rarity: "Mythic" }
];

const LOOTBOXES = [
    { id: "box_basic", name: "Basic Lootbox", price: 50, drops: ["Common", "Rare"] },
    { id: "box_epic", name: "Epic Lootbox", price: 150, drops: ["Rare", "Epic"] },
    { id: "box_legendary", name: "Legendary Lootbox", price: 300, drops: ["Epic", "Legendary", "Mythic"] }
];

function initShop() {
    const container = document.getElementById("shop-items");
    container.innerHTML = "";

    const user = getCurrentUser();
    if (!user) return;

    SHOP_ITEMS.forEach(item => {
        const div = document.createElement("div");
        div.className = `shop-item glass rarity-${item.rarity.toLowerCase()}`;

        const owned = user.inventory.includes(item.id);

        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>Cena: ${item.price} XP Coins</p>
            <p>Rzadkość: ${item.rarity}</p>
        `;

        const btn = document.createElement("button");
        if (owned) {
            btn.textContent = "Użyj";
            btn.onclick = () => equipItem(item);
        } else {
            btn.textContent = "Kup";
            btn.onclick = () => buyItem(item);
        }

        div.appendChild(btn);
        container.appendChild(div);
    });

    renderLootboxes();
}

function buyItem(item) {
    const user = getCurrentUser();
    if (!user) return;

    if (user.coins < item.price) {
        alert("Nie masz wystarczająco XP Coins!");
        return;
    }

    user.coins -= item.price;
    if (!user.inventory.includes(item.id)) {
        user.inventory.push(item.id);
    }

    saveUpdatedUser(user);
    initShop();
    loadProfile();
}

function equipItem(item) {
    const user = getCurrentUser();
    if (!user) return;

    user.equipped[item.type] = item.value;
    saveUpdatedUser(user);
    applyCosmetics();
}

function applyCosmetics() {
    const user = getCurrentUser();
    if (!user) return;

    if (user.equipped.background) {
        document.body.style.background = user.equipped.background;
    }

    if (user.equipped.buttonColor) {
        document.querySelectorAll("button").forEach(btn => {
            btn.style.background = user.equipped.buttonColor;
        });
    }

    const avatar = document.getElementById("profile-avatar");
    avatar.className = "avatar";

    if (user.equipped.avatarFrame) {
        avatar.classList.add("avatar-frame-" + user.equipped.avatarFrame);
    }
}

function renderLootboxes() {
    const container = document.getElementById("lootbox-list");
    container.innerHTML = "";

    LOOTBOXES.forEach(box => {
        const div = document.createElement("div");
        div.className = "shop-item glass";

        div.innerHTML = `
            <h3>${box.name}</h3>
            <p>Cena: ${box.price} XP Coins</p>
            <p>Drop: ${box.drops.join(", ")}</p>
        `;

        const btn = document.createElement("button");
        btn.textContent = "Otwórz";
        btn.onclick = () => openLootbox(box);

        div.appendChild(btn);
        container.appendChild(div);
    });
}

function openLootbox(box) {
    const user = getCurrentUser();
    if (!user) return;

    if (user.coins < box.price) {
        alert("Nie masz wystarczająco XP Coins!");
        return;
    }

    user.coins -= box.price;

    const rarity = box.drops[Math.floor(Math.random() * box.drops.length)];
    const pool = SHOP_ITEMS.filter(i => i.rarity === rarity);
    const item = pool[Math.floor(Math.random() * pool.length)];

    if (!user.inventory.includes(item.id)) {
        user.inventory.push(item.id);
    }

    saveUpdatedUser(user);
    loadProfile();
    initShop();

    showLootboxAnimation(item);
}

function showLootboxAnimation(item) {
    const overlay = document.getElementById("lootbox-opening");
    const name = document.getElementById("lootbox-result-name");

    name.textContent = `${item.name} (${item.rarity})`;
    overlay.classList.remove("hidden");

    document.getElementById("lootbox-close").onclick = () => {
        overlay.classList.add("hidden");
    };
}
