
/* ============================================================
   prestige.js — SYSTEM PRESTIŻU
   Prestiż co 5 leveli, duży prestiż co 100 leveli,
   nagrody: odznaki, tytuły, skrzynki, tła, bonusy
============================================================ */

/* ===================== PRESTIŻ CO 5 LEVELI ================= */

function checkPrestigeGain(level) {

    // MAŁY PRESTIŻ (co 5 leveli)
    if (level % 5 === 0) {
        giveSmallPrestigeReward();
    }

    // DUŻY PRESTIŻ (co 100 leveli)
    if (level === 100) {
        giveBigPrestigeReward();
        resetLevelForBigPrestige();
    }
}

/* ===================== MAŁY PRESTIŻ ======================== */

function giveSmallPrestigeReward() {
    player.prestige++;

    const p = player.prestige;

    /* ODZNAKA */
    if (PRESTIGE_BADGES[p]) {
        player.inventory.badges.push(PRESTIGE_BADGES[p]);
    }

    /* TYTUŁ */
    if (PRESTIGE_TITLES[p]) {
        player.inventory.titles.push(PRESTIGE_TITLES[p]);
    }

    /* TŁO PRESTIŻOWE */
    const bgId = `bg_prestige_${p}`;
    if (BACKGROUNDS.includes(bgId)) {
        player.inventory.backgrounds.push(bgId);
    }

    /* SKRZYNKA PRESTIŻOWA */
    let crateType = CRATE_TYPES.COMMON;
    if (p >= 2) crateType = CRATE_TYPES.RARE;
    if (p >= 3) crateType = CRATE_TYPES.EPIC;
    if (p >= 4) crateType = CRATE_TYPES.LEGENDARY;
    if (p >= 5) crateType = CRATE_TYPES.MYTHIC;

    player.inventory.crates.push(crateType);

    /* BONUSY */
    player.bonusXP = (player.bonusXP || 0) + PRESTIGE_REWARDS.small.bonusXP;
    player.bonusDrop = (player.bonusDrop || 0) + PRESTIGE_REWARDS.small.bonusDrop;
    player.coins += PRESTIGE_REWARDS.small.bonusCoins;

    savePlayer();
}

/* ===================== DUŻY PRESTIŻ ======================== */

function giveBigPrestigeReward() {

    /* SKRZYNKA MITYCZNA */
    player.inventory.crates.push(CRATE_TYPES.MYTHIC);

    /* ANIMOWANA RAMKA */
    const randomAnimated = ANIMATED_FRAMES[Math.floor(Math.random() * ANIMATED_FRAMES.length)];
    player.inventory.frames.push(randomAnimated);

    /* ANIMOWANE TŁO */
    const animatedBg = "bg_prestige_animated";
    player.inventory.backgrounds.push(animatedBg);

    /* TYTUŁ LEGENDARNY */
    player.inventory.titles.push(PRESTIGE_REWARDS.big.title);

    /* BONUSY */
    player.bonusXP = (player.bonusXP || 0) + PRESTIGE_REWARDS.big.bonusXP;
    player.bonusDrop = (player.bonusDrop || 0) + PRESTIGE_REWARDS.big.bonusDrop;
    player.coins += PRESTIGE_REWARDS.big.bonusCoins;

    savePlayer();
}

/* ===================== RESET LEVELU ======================== */

function resetLevelForBigPrestige() {
    player.level = 1;
    player.xp = 0;
    savePlayer();
}

/* ===================== EXPORT =============================== */

window.checkPrestigeGain = checkPrestigeGain;
window.giveSmallPrestigeReward = giveSmallPrestigeReward;
window.giveBigPrestigeReward = giveBigPrestigeReward;
window.resetLevelForBigPrestige = resetLevelForBigPrestige;