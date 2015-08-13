/// <reference path="core.ts" />
/// <reference path="definitions/jquery.d.ts" />
/// <reference path="definitions/sweetalert.d.ts" />
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
			$("#rollLog").empty();
			$("#logMainDiv").hide(500);
		});
		
		$("#rollStatsDS1").click(function() {
			var stat : string = Core.MakeBold(GetRandomStat());
			var text = "You have to level " + stat;
			Core.ShowAlert("You have to level!", stat);
			$("#statText").html(text);
			AddToLog(text);;
		});
		
		$("#rollWildcardsDS1").click(function() {
			var challenge = GetRandomChallenge();
			var text = Core.FormatChallengeText(challenge);
			Core.ShowChallengeAlert(challenge);
			$("#wildcardText").html(text);
			AddToLog(text);
		});
		
		$("#rollD20DS1").click(function() {
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