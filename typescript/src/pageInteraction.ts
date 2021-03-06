/// <reference path="../typings/defs.d.ts" />

/// <reference path="core.ts" />
/// <reference path="dictionary.ts" />
/// <reference path="games/games.d.ts" />
/// <reference path="output.ts" />

let _descriptionVisible;
let _displayExtraButtons = false;

$(document).ready(function() {
	// Add used games (use combobox value property as key)
	let games = new collections.Dictionary<string, Core.IGame>();
	games.setValue("darksouls1", new Games.DarkSouls1());
	games.setValue("darksouls2", new Games.DarkSouls2());
	games.setValue("darksouls3", new Games.DarkSouls3());
	games.setValue("bloodborne", new Games.Bloodborne());

	let _descriptionVisible = store.get("preparetodice_description_visbility");

	if (_descriptionVisible) {
		ShowDescription();
	} else {
		HideDescription(true);
	}

	// Hide all the extra buttons by default
	if (_displayExtraButtons === false) {
		$("._extraButtons").hide();
	}

	if (store.enabled === false) {
		Output.Alert.ShowWarning("Local Storage", "Can't access local storage, maybe due to private browsing. Some stuff might not be saved");
	}

	$("#gameSelection").change(function() {
		Output.Log.ClearLog();
		let g = getCurrentGame();

		$("#gameImage").attr("src", "images/" + g.ImageName);
		$("body").css("background-image", "url('images/" + g.BackgroundName + "')");
	});

	// Set the background of dark souls 1
	$("body").css("background-image", "url('images/" + getCurrentGame().BackgroundName + "')");

	$("#toggleDescription").click(function() {
		ToggleDescription();
	});

	$("#clearLog").click(function() {
		Output.Log.ClearLog();
	});

	$("#rollStart").click(function() {
		let game = getCurrentGame();

		Output.Alert.Show("Your starting situation", game.GetRandomStart());
	});

	$("#rollStats").click(function() {
		let game = getCurrentGame();
		let stat = Util.MakeBold(game.GetRandomStat());
		Output.Log.WriteLine("You have to level " + stat);
		Output.Alert.Show("You have to level", stat);
	});

	$("#rollChallenge").click(function() {
		let game = getCurrentGame();
		let challenge = game.GetChallenge();
		Output.Alert.ShowChallengeAlert(challenge);
		Output.Log.WriteLine(Util.FormatChallenge(challenge));
	});

	$("#rollD20").click(function() {
		sweetAlert({
			title: "Roll Dice",
			text: "Enter a #d# dice format. There is no error checking for format yet",
			type: "input",
			showCancelButton: true,
			closeOnConfirm: false,
			animation: "slide-from-top",
			inputValue: "1d20"
		},
		function(input) {
			if (input === false) { return false; }

			if (input === "") {
				sweetAlert.showInputError("You need to write something!");
				return false;
			}

			let result: Array<number> = chance.rpg(input.toString());
			let text: string = result.toString();

			if (result.length > 1) {
				text += " (Total: " + Util.ArraySum(result) + ")";
			}

			sweetAlert("You rolled...", text, "success");
			Output.Log.WriteLine("Rolled: " + text);
		});
	});

	$("#checkChallengeButton").click(function() {
		let result = Core.Roll(20);

		// Default to failed roll
		let title = "You failed";
		let description = "Chop chop, try again";

		if (result >= 18) {
			title = "No challenge!";
			description = "Challenge removed!";
		}

		Output.Alert.Show(title, description);
	});

	$("#viewAllChallengesButton").click(function() {
		let challenges: Array<Core.Challenge> = getCurrentGame().Challenges;
		let list: string = "";

		challenges.forEach(c => {
			list += c.Name + ": " + c.description + "</br>";
		});

		Output.Alert.Show("All challenges for " + getCurrentGame().Name, list);
	});

	$("#showExtraButtons").click(function() {
		if (_displayExtraButtons) {
			$("._extraButtons").hide();
			$("#showExtraButtons").html("Show extra buttons");
			_displayExtraButtons = false;
		} else {
			$("._extraButtons").show();
			$("#showExtraButtons").html("Hide extra buttons");
			_displayExtraButtons = true;
		}
	});

	function getCurrentGame(): Core.IGame {
		return games.getValue($("#gameSelection").val());
	}

	function ToggleDescription(): void {
		if (_descriptionVisible) {
			$("#toggleDescription").html("Show Description");
			_descriptionVisible = false;
			$("#introText").hide(500);
			store.set("preparetodice_description_visbility", false);
		} else {
			$("#toggleDescription").html("Hide Description");
			_descriptionVisible = true;
			$("#introText").show(500);
			store.set("preparetodice_description_visbility", true);
		}
	}

	function HideDescription(instant?: boolean) {
		$("#toggleDescription").html("Show Description");

		if (instant === true) {
			$("#introText").hide(0);
		} else {
			$("#introText").hide(500);
		}
		_descriptionVisible = false;
	}

	function ShowDescription() {
		$("#toggleDescription").html("Hide Description");
		$("#introText").show(500);
		_descriptionVisible = true;
	}
});