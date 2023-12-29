const PLAYER_ATTACK_VALUE = 10;
const PLAYER_STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 15;
const HEAL_VALUE = 20;

let chosenMaxLife = 100;
let currentPlayerHealth = chosenMaxLife;
let currentMonsterHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function reset() {
    currentPlayerHealth = chosenMaxLife;
    currentMonsterHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function checkWin() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(currentPlayerHealth);
        alert("Used bonus life");
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert("You won!");
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert("Monster won!");
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert("Draw!");
    }

    if (currentPlayerHealth <= 0 || currentMonsterHealth <= 0) {
        reset();
    }
}

function attack(attackValue) {
    const monsterDamage = dealMonsterDamage(attackValue);
    currentMonsterHealth -= monsterDamage;
    checkWin();
}

function healPlayerHandler() {
    let healValue;
    if (HEAL_VALUE > chosenMaxLife - currentPlayerHealth) {
        healValue = chosenMaxLife - currentPlayerHealth;
    } else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    checkWin();
}

function attackHandler() {
    attack(PLAYER_ATTACK_VALUE);
}

function strongAttackHandler() {
    attack(PLAYER_STRONG_ATTACK_VALUE);
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);