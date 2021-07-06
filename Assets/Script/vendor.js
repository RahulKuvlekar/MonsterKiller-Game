const monsterHealthBar = document.getElementById("monster-health");
const playerHealthBar = document.getElementById("player-health");


const attackBtn = document.getElementById("attack-btn");
const strongAttackBtn = document.getElementById("strong-attack-btn");
const healBtn = document.getElementById("heal-btn");
const logBtn = document.getElementById("log-btn");
const bonusLife= document.getElementById("bonus-life");

function adjustHealthBar(maxHealthLife){
    monsterHealthBar.value=maxHealthLife;
    monsterHealthBar.max=maxHealthLife;
    playerHealthBar.value=maxHealthLife;
    playerHealthBar.max=maxHealthLife;
}

function dealMonsterDamage(damage){
    var totalDamage=Math.random()*damage;
    monsterHealthBar.value= +monsterHealthBar.value - totalDamage;
    return totalDamage;
}

function dealPlayerDamage(damage){
    var totalDamage=Math.random()*damage;
    playerHealthBar.value= +playerHealthBar.value - totalDamage;
    return totalDamage;
}

function increasePlayerHealth(healValue){
    playerHealthBar.value = +playerHealthBar.value + healValue;
    console.log("HEAL-HEALTH == ",playerHealthBar.value)
}

function setPlayerHealth(health){
    playerHealthBar.value=health;
}

function removeBonusLife(){
    bonusLife.parentNode.removeChild(bonusLife);
}

function resetGame(healthValue){
    playerHealthBar.value=healthValue;
    monsterHealthBar.value=healthValue;
}