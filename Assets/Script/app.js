const PLAYER_ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 18;
const MONSTOR_ATTACK_VALUE = 14;
const HEAL_VALUE = 22;

const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

var logEntries = []
var maxHealthLife = parseInt(prompt("Enter the HEALTH LIFE", "100"));

if (isNaN(maxHealthLife) || maxHealthLife <= 0) {
    maxHealthLife = 100;
}
var currentMonsterHealth = maxHealthLife;
var currentPlayerHealth = maxHealthLife;
var hasBonusLife = true;

adjustHealthBar(maxHealthLife);

function writeLog(ev, val, monsterHealth, playerHealth) {
    let log = {
        Event: ev,
        Value: val,
        MonsterHealth: monsterHealth,
        PlayerHealth: playerHealth,
    };
    if (ev === LOG_EVENT_PLAYER_ATTACK) {
        log.target = "Monster";
    }
    else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
        log.target = "Monster";
    }
    else if (ev === LOG_EVENT_MONSTER_ATTACK) {
        log.target = "PLAYER";
    }
    else if (ev === LOG_EVENT_PLAYER_HEAL) {
        log.target = "PLAYER";
    }

    logEntries.push(log);

}

function reset() {
    currentMonsterHealth = maxHealthLife;
    currentPlayerHealth = maxHealthLife;
    resetGame(maxHealthLife);
}

function endRound() {

    var intialPlayerHealth;
    intialPlayerHealth = currentPlayerHealth;
    var playerDamage = dealPlayerDamage(MONSTOR_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;

    writeLog(
        LOG_EVENT_MONSTER_ATTACK,
        playerDamage,
        currentMonsterHealth,
        currentPlayerHealth
    )

    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        // console.log("INITAIL PLAYER HEALTH ", intialPlayerHealth);
        alert("Congrats !!! You have got a bonus life ");
        currentPlayerHealth = intialPlayerHealth;
        setPlayerHealth(intialPlayerHealth)
        removeBonusLife();
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert("PLAYER wins !!!! ");
        writeLog(
            LOG_EVENT_GAME_OVER,
            "PLAYER WON",
            currentMonsterHealth,
            currentPlayerHealth
        )
        // reset();
    }
    else if (currentMonsterHealth > 0 && currentPlayerHealth <= 0) {
        alert("MONSTOR wins !!!! ");
        writeLog(
            LOG_EVENT_GAME_OVER,
            "MONSTOR WON",
            currentMonsterHealth,
            currentPlayerHealth
        )
        // reset();
    }
    else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert("<<<---- DRAW --->>>");
        writeLog(
            LOG_EVENT_GAME_OVER,
            "DRAAAAAW",
            currentMonsterHealth,
            currentPlayerHealth
        )
        // reset();
    }

    if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
        reset();
    }
}

function attackClick(currentValue) {

    var attackValue = currentValue === "ATTACK" ? PLAYER_ATTACK_VALUE : STRONG_ATTACK_VALUE;
    var logEvent = currentValue === "ATTACK" ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK;
    // if (currentValue === "ATTACK") {
    //     attackValue = PLAYER_ATTACK_VALUE;
    //     logEvent = LOG_EVENT_PLAYER_ATTACK;
    // }
    // else if (currentValue === "STRONG_ATTACK") {
    //     attackValue = STRONG_ATTACK_VALUE;
    //     logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
    // }
    var monsterDamage = dealMonsterDamage(attackValue);
    currentMonsterHealth -= monsterDamage;
    writeLog(
        logEvent,
        attackValue,
        currentMonsterHealth,
        currentPlayerHealth
    )
    endRound();

}
function attackClickHandler() {
    attackClick("ATTACK");
}

function strongAttackClickHandler() {
    attackClick("STRONG_ATTACK");
}

function headBtnHandler() {
    var healValue;
    if (currentPlayerHealth >= maxHealthLife - HEAL_VALUE) {
        healValue = maxHealthLife - currentPlayerHealth;
    }
    else {
        healValue = HEAL_VALUE;
    }
    currentPlayerHealth += healValue;
    increasePlayerHealth(healValue);
    writeLog(
        LOG_EVENT_PLAYER_HEAL,
        healValue,
        currentMonsterHealth,
        currentPlayerHealth
    )
}

function printLogHandler() {
    console.log(logEntries);
}


attackBtn.addEventListener('click', attackClickHandler);
strongAttackBtn.addEventListener('click', strongAttackClickHandler);
healBtn.addEventListener("click", headBtnHandler);
logBtn.addEventListener('click', printLogHandler)