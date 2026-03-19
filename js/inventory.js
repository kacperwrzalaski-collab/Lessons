// ==========================================
//  EKWIPUNEK — WYŚWIETLANIE I ZAKŁADANIE
// ==========================================

// Renderowanie całego ekwipunku
function renderInventory() {
    const username = localStorage.getItem("currentUser");
    const user = loadUser(username);

    renderInventoryFrames(user);
    renderInventoryBackgrounds(user);
    renderInventoryButtons(user);
    renderInventoryBadges(user);
}

// ==========================================
//  RAMKI
// ==========================================

function renderInventoryFrames(user) {
    const box = document.getElementById("inventory-frames");
    box.innerHTML = "";

    user.inventory.frames.forEach(frame => {
        const div = document.createElement("div");
        div.className = "inventory-item";

        const equipped = user.equippedFrame === frame;

        div.innerHTML = `
            <strong>${frame}</strong><br>
            ${equipped ? "<span style='color:#00ff88'>✔ Założone</span>" :
            `<button onclick="equipFrame('${frame}')">Załóż</button>`}
        `;

        box.appendChild(div);
    });
}

function equipFrame(frame) {
    const username = localStorage.getItem("currentUser");
    const user = loadUser(username);

    user.equippedFrame = frame;
    saveUser(user);

    loadProfile();
    renderInventory();
}

// ==========================================
//  TŁA
// ==========================================

function renderInventoryBackgrounds(user) {
    const box = document.getElementById("inventory-backgrounds");
    box.innerHTML = "";

    user.inventory.backgrounds.forEach(bg => {
        const div = document.createElement("div");
        div.className = "inventory-item";

        const equipped = user.equippedBackground === bg;

        div.innerHTML = `
            <strong>${bg}</strong><br>
            ${equipped ? "<span style='color:#00ff88'>✔ Założone</span>" :
            `<button onclick="equipBackground('${bg}')">Załóż</button>`}
        `;

        box.appendChild(div);
    });
}

function equipBackground(bg) {
    const username = localStorage.getItem("currentUser");
    const user = loadUser(username);

    user.equippedBackground = bg;
    saveUser(user);

    loadProfile();
    renderInventory();
}

// ==========================================
//  KOLORY PRZYCISKÓW
// ==========================================

function renderInventoryButtons(user) {
    const box = document.getElementById("inventory-buttons");
    box.innerHTML = "";

    user.inventory.buttons.forEach(btn => {
        const div = document.createElement("div");
        div.className = "inventory-item";

        const equipped = user.equippedButtonTheme === btn;

        div.innerHTML = `
            <strong>${btn}</strong><br>
            ${equipped ? "<span style='color:#00ff88'>✔ Założone</span>" :
            `<button onclick="equipButtons('${btn}')">Załóż</button>`}
        `;

        box.appendChild(div);
    });
}

function equipButtons(btn) {
    const username = localStorage.getItem("currentUser");
    const user = loadUser(username);

    user.equippedButtonTheme = btn;
    saveUser(user);

    loadProfile();
    renderInventory();
}

// ==========================================
//  ODZNAKI
// ==========================================

function renderInventoryBadges(user) {
    const box = document.getElementById("inventory-badges");
    box.innerHTML = "";

    user.badges.forEach(badge => {
        const div = document.createElement("div");
        div.className = "inventory-item";

        const equipped = user.equippedBadge === badge;

        div.innerHTML = `
            <strong>${badge}</strong><br>
            ${equipped ? "<span style='color:#00ff88'>✔ Założona</span>" :
            `<button onclick="equipBadge('${badge}')">Załóż</button>`}
        `;

        box.appendChild(div);
    });
}

function equipBadge(badge) {
    const username = localStorage.getItem("currentUser");
    const user = loadUser(username);

    user.equippedBadge = badge;
    saveUser(user);

    loadProfile();
    renderInventory();
}

// ==========================================
//  AUTO-START
// ==========================================

setTimeout(() => {
    renderInventory();
}, 300);