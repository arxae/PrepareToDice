var lastGender = "Male";

function rollDice(sides) {
	var max = sides + 1;
	return Math.floor((Math.random()) * (max - 1)) + 1;
}

function getRandomStat() {
	var stats = [];
	stats.push("");
	stats.push("Vigor");
	stats.push("Endurance");
	stats.push("Vitality");
	stats.push("Adaptability");
	stats.push("Strength");
	stats.push("Dexterity");
	stats.push("Intelligence");
	stats.push("Faith");
	stats.push("Attunment");

	return stats[rollDice(stats.length - 1)];
}

function getWildCard() {
	var roll = rollDice(23);
	var result = "";
	
	console.log("Diceroll: " + roll);

	switch (roll) {
		case 1: result = "<b>Critical Miss</b>: No Estus, No Humanity healing, No items";
			break;
		case 2:
		case 3:
		case 4: result = "<b>The Nudist</b>: No armour";
			break;
		case 5: 
		case 6:
		case 7: result = "<b>The Miser</b>: Use only starting equipment"
			break;
		case 8:
		case 9:
		case 10: result = "<b>Well what is it !?</b>: Must taunt the boss when the hp bar appears"
			break;
		case 11:
		case 12:
		case 13: result = "<b>Best offence is a good defence</b>: Only use shield";
			break;
		case 14:
		case 15: 
		case 16: result = "<b>Use the force!</b>: No HUD";
			break;
		case 17:
		case 18:
		case 19: result = "<b>Queensbury rules</b>: Fists only";
			break;
		case 20:
		case 21:
		case 22: result = "<b>Not the kitchen sink</b>: Use the ladle!";
			break;
		case 23: result = "<b>No Challenge!</b>";
			break;
	}

	return result;
}

function getSex() {
	if(rollDice(10)%2 == 0) {
		lastGender = "Male"
	} else {
		lastGender = "Female"
	}

	return lastGender;
}

function getClass() {
	var classes = []
	classes.push("");
	classes.push("Warrior");
	classes.push("Knight");
	classes.push("Swordsman");
	classes.push("Bandit");
	classes.push("Cleric");
	classes.push("Sorcerer");
	classes.push("Explorer");
	classes.push("Deprived");

	return classes[rollDice(classes.length - 1)];
}

function getGift() {
	var gifts = [];
	gifts.push("");
	gifts.push("None");
	gifts.push("Life Ring");
	gifts.push("Human Effigy");
	gifts.push("Healing Wares");
	gifts.push("Homeward Bone");
	gifts.push("Seed of a Tree of Giants");
	gifts.push("Bonfire Ascetic");
	gifts.push("Petrified Something");

	return gifts[rollDice(gifts.length - 1)];
}

// TODO: Other appearance options
