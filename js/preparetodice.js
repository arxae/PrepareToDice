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
    function RandomFromArray(arr) {
        return chance.pick(arr);
    }
    Core.RandomFromArray = RandomFromArray;
    // TODO: Move to util module
    function MakeBold(text) {
        return "<b>" + text + "</b>";
    }
    Core.MakeBold = MakeBold;
    var Challenge = (function () {
        function Challenge(Name, Description) {
            this.Name = Name;
            this.Description = Description;
        }
        return Challenge;
    })();
    Core.Challenge = Challenge;
})(Core || (Core = {}));
/// <reference path="core.ts" />
/// <reference path="definitions/jquery.d.ts" />
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
        new Core.Challenge("Critical Miss", "No Estus, No Humanity healing, No items"),
        new Core.Challenge("The Nudist", "No Armor"),
        new Core.Challenge("The Miser", "Use only your starting equipment"),
        new Core.Challenge("Well what is it !?", "Must taunt the boss when the hp bar appears"),
        new Core.Challenge("Best offence is a good defence", "Only use a shield"),
        new Core.Challenge("No Challenge", "")
    ];
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
        return Core.RandomFromArray(Challenges);
    }
    DarkSouls1.GetRandomChallenge = GetRandomChallenge;
    // Page interactions
    $(document).ready(function () {
        // Setup Page 
        $("#continueButton").hide();
        var hasDoneRoll = false;
        $("#setupRoll").click(function () {
            $("#classText").text(GetRandomClass());
            $("#giftText").text(GetRandomGift());
            $("#continueButton").show();
        });
        // Rolling Page
        $("#rollStats").click(function () {
            var stat = GetRandomStat();
            $("#statText").html("You have to level " + Core.MakeBold(stat));
        });
        $("#rollWildcards").click(function () {
            var challenge = GetRandomChallenge();
            var text = Core.MakeBold(challenge.Name);
            text = text + ": " + challenge.Description;
            $("#wildcardText").html(text);
        });
        $("#rollD20").click(function () {
            var roll = Core.Roll(20).toString();
            $("#d20Text").html("You rolled " + Core.MakeBold(roll));
        });
    });
})(DarkSouls1 || (DarkSouls1 = {}));
