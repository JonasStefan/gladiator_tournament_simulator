let recoveryNameList = ["Guenther", "Ferdinand", "Maximilian", "Elias", "Gabse", "Paul", "Raffi", "The Rock", "Logan Paul", "Caillou", "Francesco", "Iron Golem", "Luise", "Sigurd", "DiMonte", "Jeremias", "Renegaide Raider", "Mario", "Super Mario", "Bowser", "Creeper", "'awww man'", "Wince11", "Englxnd", "obuth", "Mandi", "Artua Morgan", "Rüdiger", "Franz Dietrich", "Helmut", "Herbert", "Leopoldine", "Wilhelmine", "Gisela", "Olga", "Ludmilla", "Rudolfine", "Victor", "Adalbert", "Albrecht", "Willibald", "Raimund", "Arnold", "Reinhold", "Rolf", "Leonhard", "Dionysius", "Crescentia", "Agatha", "Apollonia"];
let nameList = ["Guenther", "Ferdinand", "Maximilian", "Elias", "Gabse", "Paul", "Raffi", "The Rock", "Logan Paul", "Caillou", "Francesco", "Iron Golem", "Luise", "Sigurd", "DiMonte", "Jeremias", "Renegaide Raider", "Mario", "Super Mario", "Bowser", "Creeper", "'awww man'", "Wince11", "Englxnd", "obuth", "Mandi", "Artua Morgan", "Rüdiger", "Franz Dietrich", "Helmut", "Herbert", "Leopoldine", "Wilhelmine", "Gisela", "Olga", "Ludmilla", "Rudolfine", "Victor", "Adalbert", "Albrecht", "Willibald", "Raimund", "Arnold", "Reinhold", "Rolf", "Leonhard", "Dionysius", "Crescentia", "Agatha", "Apollonia"];
let participants;
let fighterList = [];
let deadFighters = [];
let currentRound = 1;
let maxHealth = 100;
let maxDmg = 20;
let maxRegen = 6;

function add_to_combat_log(msg){
    let node = document.createElement("li");
    node.appendChild(document.createTextNode(msg));
    document.querySelector("ul").appendChild(node);

}

function add_to_winner_log(msg){
    let node = document.createElement("p");
    node.className = "logElement";
    node.appendChild(document.createTextNode(msg));
    document.getElementById("winnerLog").appendChild(node);
}

function resetButtonHandler(){
    while(document.getElementById("log").children.length > 0){
        for(let i = 0; i < document.getElementById("log").children.length; i++){
            document.getElementById("log").children[i].remove();

        }

    }

    while( document.getElementById("winnerLog").children.length > 1){
        for(let i = 0; i < document.getElementById("winnerLog").children.length; i++){
            if(document.getElementById("winnerLog").children[i].id != "big"){
            document.getElementById("winnerLog").children[i].remove();

            }
            
        }
    }
    
    

}

function nameListButtonHandler(button){
    switch(button.id) {
        case "defaultListButton":
            nameList = recoveryNameList;
            break;

        case "resetListButton":
            nameList = [];
            break;
    }
}

function resetMaxHpButtonHandler(){
    maxHealth = 100;
}

function resetMaxDmgButtonHandler(){
    maxDmg = 20;
}

function resetMaxRegenButtonHandler(){
    maxRegen = 6;
}

function nameListInputHandler(input){
    if(event.keyCode === 13){
        nameList.push(input.value);
    }
}

function maxHpInputHandler(input){
    if(event.keyCode === 13){
        maxHealth = input.value;
    }
}

function maxDmgInputHandler(input){
    if(event.keyCode === 13){
        maxDmg = input.value;
    }
}

function maxRegenInputHandler(input){
    if(event.keyCode === 13){
        maxRegen = input.value;
    }
}

function fighterInputHandler(input){
    if(event.keyCode === 13){
        fighterList = [];
        deadFighters = [];
        currentRound = 1;

        if(input.value == ""){
            alert("Please write a number in the input field");
            return;
        }

        participants = input.value;

        for(let i = 0; i < participants; i++){
            fighterList.push(new Fighter(i));

        }


        while(true){
            for(let i = 0; i < fighterList.length; i += 2){
                let fighter1 = fighterList[i];
                let fighter2 = fighterList[i + 1];

                add_to_combat_log(`${currentRound}. round: ${fighter1.name} vs. ${fighter2.name}!`);

                while(true){
                    if(fighter1.dead == false && fighter2.dead == false){
                        if(15 > Math.floor(Math.random() * 101)){
                            fighter1.regen();

                        }else{
                            fighter1.attack(fighter2);

                        }

                    }else{
                        break;

                    }

                    if(fighter2.dead == false){
                        if(15 > Math.floor(Math.random() * 101)){
                            fighter2.regen();

                        }else{
                            fighter2.attack(fighter1);

                        }
                        
                    }else{
                        break;

                    }
                }

                currentRound += 1;

            }
            
            for(let i = 0; i < deadFighters.length; i++){
                fighterList.splice(fighterList.indexOf(deadFighters[i]), 1);

            }

            deadFighters = [];

            if(fighterList.length == 1){
                add_to_combat_log(`${fighterList[0].name} has won the game!`);
                add_to_combat_log("");
                add_to_combat_log("stats:");
                add_to_combat_log(`damage: ${fighterList[0].dmg}`);
                add_to_combat_log(`hp left: ${fighterList[0].hp}`);
                add_to_combat_log(`dodgechance: ${fighterList[0].dodgeChance}%`);
                add_to_combat_log(`hp per regen: ${fighterList[0].regenVal}`);

                add_to_winner_log(`name: ${fighterList[0].name}`);
                add_to_winner_log(`damage: ${fighterList[0].dmg}`);
                add_to_winner_log(`hp left: ${fighterList[0].hp}`);
                add_to_winner_log(`dodgechance: ${fighterList[0].dodgeChance}%`);
                add_to_winner_log(`hp per regen: ${fighterList[0].regenVal}`);
                break;

            }else{
                add_to_combat_log("");
                add_to_combat_log("batch completed, starting new one:");
                add_to_combat_log("");
            }

        }

    }

}

class Fighter{
    constructor(index){
        this.dmg = Math.floor((Math.random() * maxDmg) + 1);
        this.hp = Math.floor((Math.random() * (maxHealth / 2) + 1) + maxHealth / 2);
        this.dodgeChance = Math.floor(Math.random() * 11);
        this.regenVal = Math.floor(Math.random() * maxRegen);
        this.name = nameList[Math.floor(Math.random() * nameList.length)];
        this.dead = false;
        this.listIndex = index;
    }

    attack(enemy){
        if(enemy.dodgeChance > Math.floor(Math.random() * 101)){
            return;

        }else if(enemy.hp - this.dmg <= 0){
            add_to_combat_log(`${enemy.name} is dead! ${this.name} survived with ${this.hp} hp left!`);
            enemy.dead = true;
            deadFighters.push(enemy);

        }else{
            enemy.hp -= this.dmg;

        }
        
    }

    regen(){
        this.hp += this.regenVal;

    }

}