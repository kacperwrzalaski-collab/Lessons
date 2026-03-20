/* ============================================================
   shop.js — SKLEP
   Kupowanie skrzynek, ramek, teł, efektów profilu
============================================================ */

/* ===================== CENNIK ============================== */

const SHOP_PRICES = {
    crate_common: 50,
    crate_rare: 120,
    crate_epic: 250,
    crate_legendary: 500,
    crate_mythic: 900,

    frame: 200,
    background: 150
};

/* ===================== SKLEP — SKRZYNKI ==================== */

function renderShopCrates() {
    const box = document.getElementById("shop-crates");
    box.innerHTML = "";

    Object.keys(CRATE_TYPES).forEach(key => {
        const crateId = CRATE_TYPES[key];
        const price = SHOP_PRICES[crateId];

        const div = document.createElement("div");
        div.className = "shop-item glass rarity-" + getCrateRarity(crateId);

        div.innerHTML = `
            <div class="shop-item-header">
                <strong>${crateId}</strong>
                <span>${price} 🪙</span>
            </div>
            <button class="buy-btn">Kup</button>
        `;

        div.querySelector(".buy-btn").addEventListener("click", () => {
            buyCrate(crateId);
        });

        box.appendChild(div);
    });
}

function getCrateRarity(crateId) {
    if (crateId === CRATE_TYPES.COMMON) return RARITY.COMMON;
    if (crateId === CRATE_TYPES.RARE) return RARITY.RARE;
    if (crateId === CRATE_TYPES.EPIC) return RARITY.EPIC;
    if (crateId === CRATE_TYPES.LEGENDARY) return RARITY.LEGENDARY;
    return RARITY.MYTHIC;
}

function buyCrate(crateId) {
    const price = SHOP_PRICES[crateId];

    if (player.coins < price) {
        showConfirm("Za mało coins!");
        return;
    }

    player.coins -= price;
    player.inventory.crates.push(crateId);

    savePlayer();
    updateUI();
    refreshInventory();

    showConfirm("Kupiono skrzynkę: " + crateId);
}

/* ===================== SKLEP — RAMKI ======================= */

function renderShopFrames() {
    const box = document.getElementById("shop-frames");
    box.innerHTML = "";

    const allFrames = [...STATIC_FRAMES, ...ANIMATED_FRAMES];

    allFrames.forEach(frame => {
        const div = document.createElement("div");
        div.className = "shop-item glass";

        div.innerHTML = `
            <div class="shop-item-header">
                <strong>${frame}</strong>
                <span>${SHOP_PRICES.frame} 🪙</span>
            </div>
            <button class="buy-btn">Kup</button>
        `;

        div.querySelector(".buy-btn").addEventListener("click", () => {
            buyFrame(frame);
        });

        box.appendChild(div);
    });
}

function buyFrame(frameId) {
    if (player.coins < SHOP_PRICES.frame) {
        showConfirm("Za mało coins!");
        return;
    }

    player.coins -= SHOP_PRICES.frame;
    player.inventory.frames.push(frameId);

    savePlayer();
    updateUI();
    refreshInventory();

    showConfirm("Kupiono ramkę: " + frameId);
}

/* ===================== SKLEP — TŁA ========================= */

function renderShopBackgrounds() {
    const box = document.getElementById("shop-backgrounds");
    box.innerHTML = "";

    BACKGROUNDS.forEach(bg => {
        const div = document.createElement("div");
        div.className = "shop-item glass";

        div.innerHTML = `
            <div class="shop-item-header">
                <strong>${bg}</strong>
                <span>${SHOP_PRICES.background} 🪙</span>
            </div>
            <button class="buy-btn">Kup</button>
        `;

        div.querySelector(".buy-btn").addEventListener("click", () => {
            buyBackground(bg);
        });

        box.appendChild(div);
    });
}

function buyBackground(bgId) {
    if (player.coins < SHOP_PRICES.background) {
        showConfirm("Za mało coins!");
        return;
    }

    player.coins -= SHOP_PRICES.background;
    player.inventory.backgrounds.push(bgId);

    savePlayer();
    updateUI();
    refreshInventory();

    showConfirm("Kupiono tło: " + bgId);
}

/* ===================== POPUP POTWIERDZEŃ =================== */

function showConfirm(msg) {
    const overlay = document.getElementById("confirm-overlay");
    const message = document.getElementById("confirm-message");

    message.textContent = msg;
    overlay.classList.remove("hidden");

    document.getElementById("confirm-yes").onclick = () => {
        overlay.classList.add("hidden");
    };

    document.getElementById("confirm-no").onclick = () => {
        overlay.classList.add("hidden");
    };
}

/* ===================== EXPORT =============================== */

window.renderShopCrates = renderShopCrates;
window.renderShopFrames = renderShopFrames;
window.renderShopBackgrounds = renderShopBackgrounds;
window.buyCrate = buyCrate;
window.buyFrame = buyFrame;
window.buyBackground = buyBackground;
window.showConfirm = showConfirm;