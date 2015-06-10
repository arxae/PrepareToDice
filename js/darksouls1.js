var lastGender = "Male";

function rollDice(sides) {
	var max = sides + 1;
	return Math.floor((Math.random()) * (max - 1)) + 1;
}

function getRandomStat() {
	var stats = [];
	stats.push("");
	stats.push("Vitality");
	stats.push("Attunement");
	stats.push("Endurance");
	stats.push("Strength");
	stats.push("Dexterity");
	stats.push("Resistance");
	stats.push("Intelligence");
	stats.push("Faith");

	return stats[rollDice(stats.length - 1)];
}

function getWildCard() {
	var roll = rollDice(20);
	var result = "";

	switch (roll) {
		case 1: result = "<b>Critical Miss</b>: No Estus, No Humanity healing, No items";
			break;
		case 2:
		case 3:
		case 4:
		case 5: result = "<b>The Nudist</b>: No armour";
			break;
		case 6:
		case 7:
		case 8:
		case 9:
		case 10: result = "<b>The Miser</b>: Use only starting equipment"
			break;
		case 11:
		case 12:
		case 13:
		case 14:
		case 15: result = "<b>Well what is it !?</b>: Must taunt the boss when the hp bar appears"
			break;
		case 16:
		case 17:
		case 18:
		case 19: result = "<b>Best offence is a good defence</b>: Only use shield";
			break;
		case 20: result = "<b>No Challenge!</b>";
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
	classes.push("Wanderer");
	classes.push("Thief");
	classes.push("Bandit");
	classes.push("Hunter");
	classes.push("Sorcerer");
	classes.push("Pyromancer");
	classes.push("Cleric");
	classes.push("Deprived");

	return classes[rollDice(classes.length - 1)];
}

function getGift() {
	var gifts = [];
	gifts.push("");
	gifts.push("None");
	gifts.push("Goddess's Blessing");
	gifts.push("Black Firebomb");
	gifts.push("Twin Humanities");
	gifts.push("Binoculars");
	gifts.push("Pendant");
	gifts.push("Master Key");
	gifts.push("Tiny Being's Ring");
	gifts.push("Old Witch's Ring");

	return gifts[rollDice(gifts.length - 1)];
}

function getPhysique() {
	var physiques = []
	physiques.push("");
	physiques.push("Average");
	physiques.push("Slim");
	physiques.push("Very Slim");
	physiques.push("Large");
	physiques.push("Very Large");
	physiques.push("Large Upper Body");
	physiques.push("Large Lower Body");
	physiques.push("Top-heavy");
	physiques.push("Tiny Head");

	return physiques[rollDice(physiques.length - 1)];
}

function getFace() {
	var faces = [];
	faces.push("");
	faces.push("Commoner");
	faces.push("Delta Farmer");
	faces.push("Astora Royalty");
	faces.push("Dragon Scholar");
	faces.push("Thorolund Cleric");
	faces.push("Jubilant Catarina");
	faces.push("Dubious Carim");
	faces.push("Classic Zena");
	faces.push("Eerie Great Swamp");
	faces.push("Far East Traveler");

	return faces[rollDice(faces.length - 1)];
}

function getHair() {
	var femaleHair = []
	femaleHair.push("");
	femaleHair.push("Shaved");
	femaleHair.push("Very Short");
	femaleHair.push("Wave");
	femaleHair.push("Straight A");
	femaleHair.push("Straight B");
	femaleHair.push("Ponytail A");
	femaleHair.push("Ponytail B");
	femaleHair.push("Pigtails");
	femaleHair.push("Bun")
	femaleHair.push("Braided");

	var maleHair = []
	maleHair.push("");
	maleHair.push("Shaved");
	maleHair.push("Receding");
	maleHair.push("Short");
	maleHair.push("Swept Back");
	maleHair.push("Ponytail");
	maleHair.push("Wild");
	maleHair.push("Parted Center");
	maleHair.push("Semi-Long");
	maleHair.push("Curly");
	maleHair.push("Bobbed");

	if(lastGender == "Male") {
		return maleHair[rollDice(maleHair.length - 1)];
	} else {
		return femaleHair[rollDice(femaleHair.length - 1)];
	}
}

function getHairColor() {
	var color = [];
	color.push("");
	color.push("Black");
	color.push("Dark Brown");
	color.push("Light Brown");
	color.push("Dark Red");
	color.push("Dark Blue");
	color.push("Gray");
	color.push("Gold");
	color.push("Silver");
	color.push("Dark Purple");
	color.push("Red");

	return color[rollDice(color.length - 1)];
}
