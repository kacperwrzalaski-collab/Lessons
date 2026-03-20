/* ============================================================
   data.js — BAZA DANYCH GRY
   Rzadkości, skrzynki, dropy, ramki, tła, odznaki, tytuły, słówka
============================================================ */

/* ===================== RZADKOŚCI =========================== */

const RARITY = {
    COMMON: "common",
    RARE: "rare",
    EPIC: "epic",
    LEGENDARY: "legendary",
    MYTHIC: "mythic"
};

const RARITY_COLORS = {
    common: "#9e9e9e",
    rare: "#4a8cff",
    epic: "#b347ff",
    legendary: "#ffb300",
    mythic: "#ff4081"
};

/* ===================== SKRZYNKI ============================ */

const CRATE_TYPES = {
    COMMON: "crate_common",
    RARE: "crate_rare",
    EPIC: "crate_epic",
    LEGENDARY: "crate_legendary",
    MYTHIC: "crate_mythic"
};

const CRATE_DROP_TABLE = {
    crate_common: [
        { type: "background", id: "bg_sunset", rarity: RARITY.COMMON },
        { type: "background", id: "bg_ocean", rarity: RARITY.COMMON },
        { type: "frame", id: "frame_steel", rarity: RARITY.COMMON }
    ],

    crate_rare: [
        { type: "background", id: "bg_forest", rarity: RARITY.RARE },
        { type: "frame", id: "frame_silver", rarity: RARITY.RARE },
        { type: "badge", id: "badge_rare", rarity: RARITY.RARE }
    ],

    crate_epic: [
        { type: "background", id: "bg_lava", rarity: RARITY.EPIC },
        { type: "frame", id: "frame_emerald", rarity: RARITY.EPIC },
        { type: "title", id: "title_epic", rarity: RARITY.EPIC }
    ],

    crate_legendary: [
        { type: "background", id: "bg_aurora", rarity: RARITY.LEGENDARY },
        { type: "frame", id: "frame_gold", rarity: RARITY.LEGENDARY },
        { type: "badge", id: "badge_legendary", rarity: RARITY.LEGENDARY }
    ],

    crate_mythic: [
        { type: "background", id: "bg_rainbow", rarity: RARITY.MYTHIC },
        { type: "frame", id: "frame_neon_purple", rarity: RARITY.MYTHIC },
        { type: "title", id: "title_mythic", rarity: RARITY.MYTHIC }
    ]
};

/* ===================== RAMKI =============================== */

/* 10 statycznych */
const STATIC_FRAMES = [
    "frame_steel",
    "frame_gold",
    "frame_silver",
    "frame_bronze",
    "frame_obsidian",
    "frame_emerald",
    "frame_sapphire",
    "frame_ruby",
    "frame_amethyst",
    "frame_carbon"
];

/* 12 animowanych — neon, gradient, pixel */
const ANIMATED_FRAMES = [
    // NEON
    "frame_neon_blue",
    "frame_neon_pink",
    "frame_neon_green",
    "frame_neon_purple",

    // GRADIENT
    "frame_gradient_sunset",
    "frame_gradient_ocean",
    "frame_gradient_fire",
    "frame_gradient_rainbow",

    // PIXEL
    "frame_pixel_white",
    "frame_pixel_green",
    "frame_pixel_red",
    "frame_pixel_cyan"
];

/* ===================== TŁA ================================ */

const BACKGROUNDS = [
    "bg_sunset",
    "bg_ocean",
    "bg_forest",
    "bg_lava",
    "bg_aurora",
    "bg_cyberpunk",
    "bg_neoncity",
    "bg_galaxy",
    "bg_mountains",
    "bg_abstract",
    "bg_prestige_1",
    "bg_prestige_2",
    "bg_prestige_3",
    "bg_prestige_4",
    "bg_prestige_5"
];

/* ===================== ODZNAKI PRESTIŻU ==================== */

const PRESTIGE_BADGES = {
    1: "●",
    2: "◆",
    3: "★",
    4: "✦",
    5: "✪",
    6: "✵"
};

/* ===================== TYTUŁY PRESTIŻU ===================== */

const PRESTIGE_TITLES = {
    1: "Nowicjusz",
    2: "Uczący się",
    3: "Adept",
    4: "Ekspert",
    5: "Mistrz",
    6: "Arcymistrz",
    7: "Legendarny",
    8: "Mityczny",
    9: "Boski",
    10: "Absolut"
};

/* ===================== PRESTIŻ — DEFINICJA ================= */

const PRESTIGE_REWARDS = {
    small: {
        badge: true,
        title: true,
        crate: true,
        background: true,
        bonusXP: 0.05,
        bonusDrop: 0.02,
        bonusCoins: 10
    },
    big: {
        crate: CRATE_TYPES.MYTHIC,
        animatedFrame: true,
        animatedBackground: true,
        title: "Legendarny",
        bonusXP: 0.15,
        bonusDrop: 0.05,
        bonusCoins: 100
    }
};

/* ===================== SŁÓWKA ============================== */

const WORDS = {
    angielski: {
        temat1: [
            { word: "accent", pl: "akcent" },
            { word: "assignment", pl: "zadanie" },
            { word: "attend", pl: "uczęszczać" }
        ]
    }
};