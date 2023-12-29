const PLAYER_ATTACK_VALUE = 10;
const PLAYER_STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 15;
const HEAL_VALUE = 20;

const LOG_EVENT_PLAYER_ATTACK = "Player attack";
const LOG_EVENT_MONSTER_ATTACK = "Monster attack";
const LOG_EVENT_PLAYER_HEAL = "Player heal";
const LOG_EVENT_GAME_OVER = "Game over";

const enteredMaxLifeValue =
    prompt("Choose maximum life for you and the monster:", "100");

let chosenMaxLife = parseInt(enteredMaxLifeValue);
let battleLog = [];

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
    chosenMaxLife = 100;
}

let currentPlayerHealth = chosenMaxLife;
let currentMonsterHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(event, value, playerHealth, monsterHealth) {
    let logEntry = {
        event: event,
        damage: value,
        finalPlayerHealth: playerHealth,
        finalMonsterHealth: monsterHealth,
    };
    if (event === LOG_EVENT_PLAYER_ATTACK) {
        logEntry = {
            event: event,
            damage: value,
            target: "Monster",
            finalPlayerHealth: playerHealth,
            finalMonsterHealth: monsterHealth
        };
    } else if (event === LOG_EVENT_MONSTER_ATTACK) {
        logEntry = {
            event: event,
            damage: value,
            target: "Player",
            finalPlayerHealth: playerHealth,
            finalMonsterHealth: monsterHealth
        };
    } else if (event === LOG_EVENT_PLAYER_HEAL) {
        logEntry = {
            event: event,
            heal: value,
            target: "Player",
            finalPlayerHealth: playerHealth,
            finalMonsterHealth: monsterHealth
        };
    } else if (event === LOG_EVENT_GAME_OVER) {
        logEntry = {
            event: event,
            winner: value,
            finalPlayerHealth: playerHealth,
            finalMonsterHealth: monsterHealth
        };
    }
    battleLog.push(logEntry);
}

function reset() {
    currentPlayerHealth = chosenMaxLife;
    currentMonsterHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function checkWin() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    writeToLog(
        LOG_EVENT_MONSTER_ATTACK,
        playerDamage,
        currentPlayerHealth,
        currentMonsterHealth
    );

    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(currentPlayerHealth);
        alert("Used bonus life");
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert("You won!");
        writeToLog(
            LOG_EVENT_GAME_OVER,
            "Player won",
            currentPlayerHealth,
            currentMonsterHealth
        );
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert("Monster won!");
        writeToLog(
            LOG_EVENT_GAME_OVER,
            "Monster won",
            currentPlayerHealth,
            currentMonsterHealth
        );
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert("Draw!");
        writeToLog(
            LOG_EVENT_GAME_OVER,
            "Draw",
            currentPlayerHealth,
            currentMonsterHealth
        );
    }

    if (currentPlayerHealth <= 0 || currentMonsterHealth <= 0) {
        reset();
    }
}

function attack(attackValue) {
    const monsterDamage = dealMonsterDamage(attackValue);
    currentMonsterHealth -= monsterDamage;
    writeToLog(
        LOG_EVENT_PLAYER_ATTACK,
        monsterDamage,
        currentPlayerHealth,
        currentMonsterHealth
    );
    checkWin();
}

function attackHandler() {
    attack(PLAYER_ATTACK_VALUE);
}

function strongAttackHandler() {
    attack(PLAYER_STRONG_ATTACK_VALUE);
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
    writeToLog(
        LOG_EVENT_PLAYER_HEAL,
        healValue,
        currentPlayerHealth,
        currentMonsterHealth
    );
    checkWin();
}

function printLogHandler() {
    console.log(battleLog);
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);