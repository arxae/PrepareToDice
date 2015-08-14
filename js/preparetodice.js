/// <reference path="definitions/chance.d.ts" />
var Core;
(function (Core) {
    function Roll(max) {
        return chance.integer({
            min: 1,
            max: max
        });
    }
    Core.Roll = Roll;
    // TODO: Move to util module
    function RandomFromArray(arr) {
        return chance.pick(arr);
    }
    Core.RandomFromArray = RandomFromArray;
    function RandomFromArrayWeighted(vals, weights) {
        return chance.weighted(vals, weights);
    }
    Core.RandomFromArrayWeighted = RandomFromArrayWeighted;
    function CreateWeightArray(arr) {
        var newArr = new Array();
        arr.forEach(function (element) {
            newArr.push(element.Weight);
        });
        return newArr;
    }
    Core.CreateWeightArray = CreateWeightArray;
    function MakeBold(text) {
        return "<b>" + text + "</b>";
    }
    Core.MakeBold = MakeBold;
    function FormatChallengeText(chal) {
        var text = Core.MakeBold(chal.Name);
        if (chal.Description !== "") {
            text = text + ": " + chal.Description;
        }
        return text;
    }
    Core.FormatChallengeText = FormatChallengeText;
    function ShowAlert(_title, _description) {
        sweetAlert({
            title: _title,
            text: _description,
            type: "success",
            animation: "slide-from-top",
            html: true
        });
    }
    Core.ShowAlert = ShowAlert;
    function ArraySum(arr) {
        if (arr.length === 0)
            return 0;
        if (arr.length === 1)
            return arr[0];
        var total = 0;
        arr.forEach(function (element) {
            total += element;
        });
        return total;
    }
    Core.ArraySum = ArraySum;
    function ShowChallengeAlert(challenge) {
        if (challenge.HasSpecial == true) {
            challenge.Special(null);
        }
        var settings = {
            title: challenge.Name,
            text: challenge.Description,
            type: "success",
            animation: "slide-from-top"
        };
        sweetAlert(settings);
        return challenge;
    }
    Core.ShowChallengeAlert = ShowChallengeAlert;
    var Challenge = (function () {
        function Challenge(Name, Description, Weight, HasSpecial) {
            this.Name = Name;
            this.Description = Description;
            this.Weight = Weight;
            this.HasSpecial = HasSpecial;
        }
        return Challenge;
    })();
    Core.Challenge = Challenge;
})(Core || (Core = {}));
/// <reference path="core.ts" />
/// <reference path="definitions/jquery.d.ts" />
/// <reference path="definitions/sweetalert.d.ts" />
var DarkSouls1;
(function (DarkSouls1) {
    var Stats = [
        "Vitality",
        "Attunement",
        "Endurance",
        "Strength",
        "Dexterity",
        "Resistance",
        "Intelligence",
        "Faith"
    ];
    var Classes = [
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
    var Gifts = [
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
    var Challenges = [
        new Core.Challenge("Critical Miss", "No Estus, No Humanity healing, No items", 50),
        new Core.Challenge("The Nudist", "No Armor", 100),
        new Core.Challenge("The Miser", "Use only your starting equipment", 100),
        new Core.Challenge("Well what is it !?", "Must taunt the boss when the hp bar appears", 100),
        new Core.Challenge("Best offence is a good defence", "Only use a shield", 100),
        new Core.Challenge("No Challenge", "", 100)
    ];
    var ChallengeWeights;
    function GetRandomStat() {
        return Core.RandomFromArray(Stats);
    }
    DarkSouls1.GetRandomStat = GetRandomStat;
    function GetRandomClass() {
        return Core.RandomFromArray(Classes);
    }
    DarkSouls1.GetRandomClass = GetRandomClass;
    function GetRandomGift() {
        return Core.RandomFromArray(Gifts);
    }
    DarkSouls1.GetRandomGift = GetRandomGift;
    function GetRandomChallenge() {
        if (ChallengeWeights === undefined) {
            ChallengeWeights = Core.CreateWeightArray(Challenges);
        }
        var challenge = Core.RandomFromArrayWeighted(Challenges, ChallengeWeights);
        if (challenge.HasSpecial == true) {
            challenge.Special(null);
        }
        return challenge;
    }
    DarkSouls1.GetRandomChallenge = GetRandomChallenge;
    // Page interactions
    function AddToLog(text) {
        $("#logMainDiv").show(500);
        $("#rollLog").append(text + "</br>");
    }
    $(document).ready(function () {
        // Setup Page 
        $("#continueButton").hide();
        $("#setupRoll").click(function () {
            $("#classText").text(GetRandomClass());
            $("#giftText").text(GetRandomGift());
            $("#continueButton").show();
        });
        // Rolling Page
        $("#clearLog").click(function () {
            $("#rollLog").empty();
            $("#logMainDiv").hide(500);
        });
        $("#rollStatsDS1").click(function () {
            var stat = Core.MakeBold(GetRandomStat());
            var text = "You have to level " + stat;
            Core.ShowAlert("You have to level!", stat);
            $("#statText").html(text);
            AddToLog(text);
            ;
        });
        $("#rollWildcardsDS1").click(function () {
            var challenge = GetRandomChallenge();
            var text = Core.FormatChallengeText(challenge);
            Core.ShowChallengeAlert(challenge);
            $("#wildcardText").html(text);
            AddToLog(text);
        });
        $("#rollD20DS1").click(function () {
            sweetAlert({
                title: "Roll dice",
                text: "Enter a #d# dice format. There is no error checking for format yet",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                animation: "slide-from-top",
                inputValue: "1d20"
            }, function (input) {
                if (input === false)
                    return false;
                if (input === "") {
                    sweetAlert.showInputError("You need to write something!");
                    return false;
                }
                var result = chance.rpg(input.toString());
                var text = result.toString();
                if (result.length > 1) {
                    text += " (Total: " + Core.ArraySum(result) + ")";
                }
                sweetAlert("You rolled...", text, "success");
                AddToLog("Rolled: " + text);
            });
        });
    });
})(DarkSouls1 || (DarkSouls1 = {}));
/// <reference path="core.ts" />
/// <reference path="definitions/jquery.d.ts" />
/// <reference path="definitions/sweetalert.d.ts" />
var DarkSouls2;
(function (DarkSouls2) {
    var Stats = [
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
    var Classes = [
        "Warrior",
        "Knight",
        "Swordsman",
        "Bandit",
        "Cleric",
        "Sorcerer",
        "Explorer",
        "Deprived"
    ];
    var Gifts = [
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
    FashionSoulsChallenge.Special = function () {
        var x = Core.Roll(10);
        var dir = chance.pick(["up", "down"]);
        FashionSoulsChallenge.Description = "Take the item in the slot " + x + " spaces " + dir + ".";
    };
    var Challenges = [
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
    var ChallengeWeights;
    function GetRandomStat() {
        return Core.RandomFromArray(Stats);
    }
    DarkSouls2.GetRandomStat = GetRandomStat;
    function GetRandomClass() {
        return Core.RandomFromArray(Classes);
    }
    DarkSouls2.GetRandomClass = GetRandomClass;
    function GetRandomGift() {
        return Core.RandomFromArray(Gifts);
    }
    DarkSouls2.GetRandomGift = GetRandomGift;
    function GetRandomChallenge() {
        if (ChallengeWeights === undefined) {
            ChallengeWeights = Core.CreateWeightArray(Challenges);
        }
        var challenge = Core.RandomFromArrayWeighted(Challenges, ChallengeWeights);
        if (challenge.HasSpecial == true) {
            challenge.Special(null);
        }
        return challenge;
    }
    DarkSouls2.GetRandomChallenge = GetRandomChallenge;
    // Page interactions
    function AddToLog(text) {
        $("#logMainDiv").show(500);
        $("#rollLog").append(text + "</br>");
    }
    $(document).ready(function () {
        // Setup Page 
        $("#continueButton").hide();
        $("#setupRoll").click(function () {
            $("#classText").text(GetRandomClass());
            $("#giftText").text(GetRandomGift());
            $("#continueButton").show();
        });
        // Rolling Page
        $("#clearLog").click(function () {
            $("#rollLog").empty();
            $("#logMainDiv").hide(500);
        });
        $("#rollStats").click(function () {
            var stat = Core.MakeBold(GetRandomStat());
            var text = "You have to level " + stat;
            Core.ShowAlert("You have to level!", stat);
            $("#statText").html(text);
            AddToLog(text);
        });
        $("#rollWildcards").click(function () {
            var challenge = GetRandomChallenge();
            var text = Core.FormatChallengeText(challenge);
            Core.ShowChallengeAlert(challenge);
            $("#wildcardText").html(text);
            AddToLog(text);
        });
        $("#rollD20").click(function () {
            sweetAlert({
                title: "Roll dice",
                text: "Enter a #d# dice format. There is no error checking for format yet",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                animation: "slide-from-top",
                inputValue: "1d20"
            }, function (input) {
                if (input === false)
                    return false;
                if (input === "") {
                    sweetAlert.showInputError("You need to write something!");
                    return false;
                }
                var result = chance.rpg(input.toString());
                var text = result.toString();
                if (result.length > 1) {
                    text += " (Total: " + Core.ArraySum(result) + ")";
                }
                sweetAlert("You rolled...", text, "success");
                AddToLog("Rolled: " + text);
            });
        });
    });
})(DarkSouls2 || (DarkSouls2 = {}));
