/// <reference path="core.ts" />
/// <reference path="definitions/jquery.d.ts" />
/// <reference path="definitions/sweetalert.d.ts" />
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
	
	// Special Challenges
	// Equip an item x spaces down/up. Description will change depening on chosen result
	var FashionSoulsChallenge = new Core.Challenge("Fashion Souls", "", 100, true);
	FashionSoulsChallenge.Special = () => {
		var x = Core.Roll(10);
		var dir = chance.pick(["up", "down"]);
		
		FashionSoulsChallenge.Description = "Take the item in the slot " + x + " spaces " + dir + ".";
	}
	
	var Challenges:Array<Core.Challenge> = [
		new Core.Challenge("Critical Miss", "No Estus, no (healing) items", 50),
		new Core.Challenge("The Nudist", "No armor", 100),
		new Core.Challenge("The Miser", "Only use your starting equipment", 100),
		new Core.Challenge("Well what is it?!", "Must taunt the boss when the hp bar appears", 100),
		new Core.Challenge("Best offence is a good defence", "Only use shield", 100),
		new Core.Challenge("Use the force!", "No HUD", 100),
		new Core.Challenge("Queensbury rules", "Fists only", 100),
		new Core.Challenge("Not the kitchen sink", "Ladle Only!", 100),
		new Core.Challenge("No Challenge", "", 50),
		FashionSoulsChallenge
	];
	
	var ChallengeWeights:Array<number>;
	
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
		if(ChallengeWeights === undefined) {
			ChallengeWeights = Core.CreateWeightArray(Challenges);
		}
		
		var challenge = <Core.Challenge>Core.RandomFromArrayWeighted(Challenges, ChallengeWeights);
		
		if(challenge.HasSpecial == true) {
	 		challenge.Special(null);
	 	}
		 
		 return challenge;
	}
	
	// Page interactions
	function AddToLog(text : string) {
		$("#logMainDiv").show(500);
		$("#rollLog").append(text + "</br>");
	}
	
	$(document).ready(function() {
		// Setup Page 
		$("#continueButton").hide();
		
		$("#setupRoll").click(function() {
			$("#classText").text(GetRandomClass());
			$("#giftText").text(GetRandomGift());
			
			$("#continueButton").show();
		});
	
		// Rolling Page
		$("#clearLog").click(function() {
			$("#rollLog").empty()
			$("#logMainDiv").hide(500);
		});
		
		$("#rollStats").click(function() {
			var stat : string = Core.MakeBold(GetRandomStat());
			var text = "You have to level " + stat;
			Core.ShowAlert("You have to level!", stat);
			$("#statText").html(text);
			AddToLog(text);
		});
		
		$("#rollWildcards").click(function() {
			var challenge = GetRandomChallenge();
			var text = Core.FormatChallengeText(challenge);
			Core.ShowChallengeAlert(challenge);
			$("#wildcardText").html(text);
			AddToLog(text);
		});
		
		$("#rollD20").click(function() {
			sweetAlert({
				title: "Roll dice",
				text: "Enter a #d# dice format. There is no error checking for format yet",
				type: "input",
				showCancelButton: true,
				closeOnConfirm: false,
				animation: "slide-from-top",
				inputValue: "1d20"
			},
			function(input) {
				if(input === false) return false;
				
				if(input === "") {
					sweetAlert.showInputError("You need to write something!");
					return false;
				}
				
				var result : Array<number> = chance.rpg(input.toString());
				var text : string = result.toString();
				
				if(result.length > 1) {
					text += " (Total: " + Core.ArraySum(result) + ")";
				}
				
				sweetAlert("You rolled...", text, "success");
				AddToLog("Rolled: " + text);
			});
		});
	});
}