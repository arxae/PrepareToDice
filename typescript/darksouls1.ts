/// <reference path="core.ts" />
/// <reference path="definitions/jquery.d.ts" />
module DarkSouls1 {
	var Stats:Array<string> = [
		"Vitality",
		"Attunement",
		"Endurance",
		"Strength",
		"Dexterity",
		"Resistance",
		"Intelligence",
		"Faith"
	];
	
	var Classes:Array<string> = [
		"Warrior",
		"Knight",
		"Wanderer",
		"Thief",
		"Bandit",
		"Hunter",
		"Sorcerer",
		"Pyromancer",
		"Cleric",
		"Deprived"
	];
	
	var Gifts:Array<string> = [
		"None",
		"Goddess's Blessing",
		"Black Firebomb",
		"Twin Humanities",
		"Binoculars",
		"Pendant",
		"Master Key",
		"Tiny Being's Ring",
		"Old Witch's Ring"
	];
	
	var Challenges:Array<Core.Challenge> = [
		new Core.Challenge("Critical Miss", "No Estus, No Humanity healing, No items"),
		new Core.Challenge("The Nudist", "No Armor"),
		new Core.Challenge("The Miser", "Use only your starting equipment"),
		new Core.Challenge("Well what is it !?", "Must taunt the boss when the hp bar appears"),
		new Core.Challenge("Best offence is a good defence", "Only use a shield"),
		new Core.Challenge("No Challenge", "")
	];
	
	export function GetRandomStat() : string {
		return <string>Core.RandomFromArray(Stats);
	}
	
	export function GetRandomClass() : string {
		return <string>Core.RandomFromArray(Classes);
	}
	
	export function GetRandomGift() : string {
		return <string>Core.RandomFromArray(Gifts);
	}
	
	export function GetRandomChallenge() : Core.Challenge {
		return <Core.Challenge>Core.RandomFromArray(Challenges);
	}
	
	// Page interactions
	$(document).ready(function() {	
		// Setup Page 
		$("#continueButton").hide();
		var hasDoneRoll : boolean = false;
		
		$("#setupRoll").click(function() {
			$("#classText").text(GetRandomClass());
			$("#giftText").text(GetRandomGift());
			
			$("#continueButton").show();
		});
	
		// Rolling Page
		$("#rollStats").click(function() {
			var stat = GetRandomStat();
			$("#statText").html("You have to level " + Core.MakeBold(stat));
		});
		
		$("#rollWildcards").click(function() {
			var challenge = GetRandomChallenge();
			
			var text = Core.MakeBold(challenge.Name);
			text = text + ": " + challenge.Description;
			
			$("#wildcardText").html(text);
		});
		
		$("#rollD20").click(function() {
			var roll = Core.Roll(20).toString();
			$("#d20Text").html("You rolled " + Core.MakeBold(roll));
		});
	});
}