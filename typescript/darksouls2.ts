/// <reference path="core.ts" />
/// <reference path="definitions/jquery.d.ts" />
module DarkSouls2 {
	var Stats:Array<string> = [
		"Vigor",
		"Endurance",
		"Vitality",
		"Adaptibility",
		"Strength",
		"Dexterity",
		"Intelligence",
		"Faith",
		"Attunement"
	];
	
	var Classes:Array<string> = [
		"Warrior",
		"Knight",
		"Swordsman",
		"Bandit",
		"Cleric",
		"Sorcerer",
		"Explorer",
		"Deprived"
	];
	
	var Gifts:Array<string> = [
		"None",
		"Life Ring",
		"Human Effigy",
		"Healing Wares",
		"Homeward Bone",
		"Seed of a Tree of Giants",
		"Bonfire Ascetic",
		"Petrified Something"
	];
	
	var Challenges:Array<Core.Challenge> = [
		new Core.Challenge("Critical Miss", "No Estus, no (healing) items"),
		new Core.Challenge("The Nudist", "No armor"),
		new Core.Challenge("The Miser", "Only use your starting equipment"),
		new Core.Challenge("Well what is it?!", "Must taunt the boss when the hp bar appears"),
		new Core.Challenge("Best offence is a good defence", "Only use shield"),
		new Core.Challenge("Use the force!", "No HUD"),
		new Core.Challenge("Queensbury rules", "Fists only"),
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