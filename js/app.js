/// <reference path="../typings/defs.d.ts" />
var Util;
(function (Util) {
    function Roll(max) {
        return chance.integer({
            min: 1,
            max: max
        });
    }
    Util.Roll = Roll;
    function RandomFromArray(arr) {
        return chance.pick(arr);
    }
    Util.RandomFromArray = RandomFromArray;
    function RandomFromWeightedArray(vals, weights) {
        return chance.weighted(vals, weights);
    }
    Util.RandomFromWeightedArray = RandomFromWeightedArray;
    function CreateWeightedArray(arr) {
        var newArr = new Array();
        arr.forEach(function (element) {
            newArr.push(element.weight);
        });
        return newArr;
    }
    Util.CreateWeightedArray = CreateWeightedArray;
    function MakeBold(text) {
        return "<b>" + text + "</b>";
    }
    Util.MakeBold = MakeBold;
    function FormatChallenge(chal) {
        var text = MakeBold(chal.Name);
        if (chal.description !== "") {
            text = text + ": " + chal.description;
        }
        return text;
    }
    Util.FormatChallenge = FormatChallenge;
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
    Util.ArraySum = ArraySum;
})(Util || (Util = {}));
/// <reference path="util.ts" />
var Core;
(function (Core) {
    function Roll(max) {
        return chance.integer({
            min: 1,
            max: max
        });
    }
    Core.Roll = Roll;
    function RollMinMax(min, max) {
        return chance.integer({
            min: min,
            max: max
        });
    }
    Core.RollMinMax = RollMinMax;
    var Challenge = (function () {
        function Challenge(Name, description, weight, hasSpecial) {
            this.Name = Name;
            this.description = description;
            this.weight = weight;
            this.hasSpecial = hasSpecial;
        }
        return Challenge;
    })();
    Core.Challenge = Challenge;
    var SoulsGame = (function () {
        function SoulsGame(Name) {
            this.Name = Name;
            this.SupportStartingItem = true;
            this.Stats = new Array();
            this.Classes = new Array();
            this.Gifts = new Array();
            this.Challenges = new Array();
        }
        SoulsGame.prototype.AddStat = function (stat) {
            if (this.Stats.indexOf(stat) == -1) {
                this.Stats.push(stat);
            }
        };
        SoulsGame.prototype.AddClass = function (cls) {
            if (this.Classes.indexOf(cls) == -1) {
                this.Classes.push(cls);
            }
        };
        SoulsGame.prototype.AddGift = function (gift) {
            if (this.Gifts.indexOf(gift) == -1) {
                this.Gifts.push(gift);
            }
        };
        SoulsGame.prototype.AddChallenge = function (name, description, weight, hasSpecial) {
            this.Challenges.push(new Challenge(name, description, weight, hasSpecial));
        };
        SoulsGame.prototype.AddChallengeWithObject = function (chal) {
            this.Challenges.push(chal);
        };
        SoulsGame.prototype.GetRandomStart = function () {
            var text = "Class: ";
            text += this.GetRandomClass();
            if (this.SupportStartingItem) {
                text += "</br>Gift: " + this.GetRandomGift();
            }
            return text;
        };
        SoulsGame.prototype.GetRandomStat = function () {
            return Util.RandomFromArray(this.Stats);
        };
        SoulsGame.prototype.GetRandomClass = function () {
            return Util.RandomFromArray(this.Classes);
        };
        SoulsGame.prototype.GetRandomGift = function () {
            return Util.RandomFromArray(this.Gifts);
        };
        SoulsGame.prototype.GetChallenge = function () {
            //return <Challenge>Util.RandomFromArray(this.Challenges);
            return Util.RandomFromWeightedArray(this.Challenges, Util.CreateWeightedArray(this.Challenges));
        };
        return SoulsGame;
    })();
    Core.SoulsGame = SoulsGame;
})(Core || (Core = {}));
// Original code by Basarat (https://github.com/basarat)
// Code originally from https://github.com/basarat/typescript-collections
var collections;
(function (collections) {
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var has = function (obj, prop) {
        return _hasOwnProperty.call(obj, prop);
    };
    /**
     * Default function to test equality.
     * @function
     */
    function defaultEquals(a, b) {
        return a === b;
    }
    collections.defaultEquals = defaultEquals;
    /**
     * Default function to convert an object to a string.
     * @function
     */
    function defaultToString(item) {
        if (item === null) {
            return 'COLLECTION_NULL';
        }
        else if (collections.isUndefined(item)) {
            return 'COLLECTION_UNDEFINED';
        }
        else if (collections.isString(item)) {
            return '$s' + item;
        }
        else {
            return '$o' + item.toString();
        }
    }
    collections.defaultToString = defaultToString;
    /**
     * Checks if the given argument is undefined.
     * @function
     */
    function isUndefined(obj) {
        return (typeof obj) === 'undefined';
    }
    collections.isUndefined = isUndefined;
    /**
     * Checks if the given argument is a string.
     * @function
     */
    function isString(obj) {
        return Object.prototype.toString.call(obj) === '[object String]';
    }
    collections.isString = isString;
    /**
     * @namespace Contains various functions for manipulating arrays.
     */
    var arrays;
    (function (arrays) {
        /**
         * Returns the position of the first occurrence of the specified item
         * within the specified array.
         * @param {*} array the array in which to search the element.
         * @param {Object} item the element to search.
         * @param {function(Object,Object):boolean=} equalsFunction optional function used to
         * check equality between 2 elements.
         * @return {number} the position of the first occurrence of the specified element
         * within the specified array, or -1 if not found.
         */
        function indexOf(array, item, equalsFunction) {
            var equals = equalsFunction || collections.defaultEquals;
            var length = array.length;
            for (var i = 0; i < length; i++) {
                if (equals(array[i], item)) {
                    return i;
                }
            }
            return -1;
        }
        arrays.indexOf = indexOf;
        /**
         * Returns true if the specified array contains the specified element.
         * @param {*} array the array in which to search the element.
         * @param {Object} item the element to search.
         * @param {function(Object,Object):boolean=} equalsFunction optional function to
         * check equality between 2 elements.
         * @return {boolean} true if the specified array contains the specified element.
         */
        function contains(array, item, equalsFunction) {
            return arrays.indexOf(array, item, equalsFunction) >= 0;
        }
        arrays.contains = contains;
        /**
         * Removes the first ocurrence of the specified element from the specified array.
         * @param {*} array the array in which to search element.
         * @param {Object} item the element to search.
         * @param {function(Object,Object):boolean=} equalsFunction optional function to
         * check equality between 2 elements.
         * @return {boolean} true if the array changed after this call.
         */
        function remove(array, item, equalsFunction) {
            var index = arrays.indexOf(array, item, equalsFunction);
            if (index < 0) {
                return false;
            }
            array.splice(index, 1);
            return true;
        }
        arrays.remove = remove;
        /**
         * Returns true if the two specified arrays are equal to one another.
         * Two arrays are considered equal if both arrays contain the same number
         * of elements, and all corresponding pairs of elements in the two
         * arrays are equal and are in the same order.
         * @param {Array} array1 one array to be tested for equality.
         * @param {Array} array2 the other array to be tested for equality.
         * @param {function(Object,Object):boolean=} equalsFunction optional function used to
         * check equality between elemements in the arrays.
         * @return {boolean} true if the two arrays are equal
         */
        function equals(array1, array2, equalsFunction) {
            var equals = equalsFunction || collections.defaultEquals;
            if (array1.length !== array2.length) {
                return false;
            }
            var length = array1.length;
            for (var i = 0; i < length; i++) {
                if (!equals(array1[i], array2[i])) {
                    return false;
                }
            }
            return true;
        }
        arrays.equals = equals;
        /**
         * Returns shallow a copy of the specified array.
         * @param {*} array the array to copy.
         * @return {Array} a copy of the specified array
         */
        function copy(array) {
            return array.concat();
        }
        arrays.copy = copy;
        /**
         * Swaps the elements at the specified positions in the specified array.
         * @param {Array} array The array in which to swap elements.
         * @param {number} i the index of one element to be swapped.
         * @param {number} j the index of the other element to be swapped.
         * @return {boolean} true if the array is defined and the indexes are valid.
         */
        function swap(array, i, j) {
            if (i < 0 || i >= array.length || j < 0 || j >= array.length) {
                return false;
            }
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            return true;
        }
        arrays.swap = swap;
        function toString(array) {
            return '[' + array.toString() + ']';
        }
        arrays.toString = toString;
        /**
         * Executes the provided function once for each element present in this array
         * starting from index 0 to length - 1.
         * @param {Array} array The array in which to iterate.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        function forEach(array, callback) {
            var lenght = array.length;
            for (var i = 0; i < lenght; i++) {
                if (callback(array[i]) === false) {
                    return;
                }
            }
        }
        arrays.forEach = forEach;
    })(arrays = collections.arrays || (collections.arrays = {}));
    var Dictionary = (function () {
        /**
         * Creates an empty dictionary.
         * @class <p>Dictionaries map keys to values; each key can map to at most one value.
         * This implementation accepts any kind of objects as keys.</p>
         *
         * <p>If the keys are custom objects a function which converts keys to unique
         * strings must be provided. Example:</p>
         * <pre>
         * function petToString(pet) {
         *  return pet.name;
         * }
         * </pre>
         * @constructor
         * @param {function(Object):string=} toStrFunction optional function used
         * to convert keys to strings. If the keys aren't strings or if toString()
         * is not appropriate, a custom function which receives a key and returns a
         * unique string must be provided.
         */
        function Dictionary(toStrFunction) {
            this.table = {};
            this.nElements = 0;
            this.toStr = toStrFunction || collections.defaultToString;
        }
        /**
         * Returns the value to which this dictionary maps the specified key.
         * Returns undefined if this dictionary contains no mapping for this key.
         * @param {Object} key key whose associated value is to be returned.
         * @return {*} the value to which this dictionary maps the specified key or
         * undefined if the map contains no mapping for this key.
         */
        Dictionary.prototype.getValue = function (key) {
            var pair = this.table['$' + this.toStr(key)];
            if (collections.isUndefined(pair)) {
                return undefined;
            }
            return pair.value;
        };
        /**
         * Associates the specified value with the specified key in this dictionary.
         * If the dictionary previously contained a mapping for this key, the old
         * value is replaced by the specified value.
         * @param {Object} key key with which the specified value is to be
         * associated.
         * @param {Object} value value to be associated with the specified key.
         * @return {*} previous value associated with the specified key, or undefined if
         * there was no mapping for the key or if the key/value are undefined.
         */
        Dictionary.prototype.setValue = function (key, value) {
            if (collections.isUndefined(key) || collections.isUndefined(value)) {
                return undefined;
            }
            var ret;
            var k = '$' + this.toStr(key);
            var previousElement = this.table[k];
            if (collections.isUndefined(previousElement)) {
                this.nElements++;
                ret = undefined;
            }
            else {
                ret = previousElement.value;
            }
            this.table[k] = {
                key: key,
                value: value
            };
            return ret;
        };
        /**
         * Removes the mapping for this key from this dictionary if it is present.
         * @param {Object} key key whose mapping is to be removed from the
         * dictionary.
         * @return {*} previous value associated with specified key, or undefined if
         * there was no mapping for key.
         */
        Dictionary.prototype.remove = function (key) {
            var k = '$' + this.toStr(key);
            var previousElement = this.table[k];
            if (!collections.isUndefined(previousElement)) {
                delete this.table[k];
                this.nElements--;
                return previousElement.value;
            }
            return undefined;
        };
        /**
         * Returns an array containing all of the keys in this dictionary.
         * @return {Array} an array containing all of the keys in this dictionary.
         */
        Dictionary.prototype.keys = function () {
            var array = [];
            for (var name in this.table) {
                if (has(this.table, name)) {
                    var pair = this.table[name];
                    array.push(pair.key);
                }
            }
            return array;
        };
        /**
         * Returns an array containing all of the values in this dictionary.
         * @return {Array} an array containing all of the values in this dictionary.
         */
        Dictionary.prototype.values = function () {
            var array = [];
            for (var name in this.table) {
                if (has(this.table, name)) {
                    var pair = this.table[name];
                    array.push(pair.value);
                }
            }
            return array;
        };
        /**
        * Executes the provided function once for each key-value pair
        * present in this dictionary.
        * @param {function(Object,Object):*} callback function to execute, it is
        * invoked with two arguments: key and value. To break the iteration you can
        * optionally return false.
        */
        Dictionary.prototype.forEach = function (callback) {
            for (var name in this.table) {
                if (has(this.table, name)) {
                    var pair = this.table[name];
                    var ret = callback(pair.key, pair.value);
                    if (ret === false) {
                        return;
                    }
                }
            }
        };
        /**
         * Returns true if this dictionary contains a mapping for the specified key.
         * @param {Object} key key whose presence in this dictionary is to be
         * tested.
         * @return {boolean} true if this dictionary contains a mapping for the
         * specified key.
         */
        Dictionary.prototype.containsKey = function (key) {
            return !collections.isUndefined(this.getValue(key));
        };
        /**
        * Removes all mappings from this dictionary.
        * @this {collections.Dictionary}
        */
        Dictionary.prototype.clear = function () {
            this.table = {};
            this.nElements = 0;
        };
        /**
         * Returns the number of keys in this dictionary.
         * @return {number} the number of key-value mappings in this dictionary.
         */
        Dictionary.prototype.size = function () {
            return this.nElements;
        };
        /**
         * Returns true if this dictionary contains no mappings.
         * @return {boolean} true if this dictionary contains no mappings.
         */
        Dictionary.prototype.isEmpty = function () {
            return this.nElements <= 0;
        };
        Dictionary.prototype.toString = function () {
            var toret = "{";
            this.forEach(function (k, v) {
                toret = toret + "\n\t" + k.toString() + " : " + v.toString();
            });
            return toret + "\n}";
        };
        return Dictionary;
    })();
    collections.Dictionary = Dictionary; // End of dictionary
})(collections || (collections = {})); // End of module
/// <reference path="../core.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Games;
(function (Games) {
    var DarkSouls1 = (function (_super) {
        __extends(DarkSouls1, _super);
        function DarkSouls1() {
            _super.call(this, "Dark Souls");
            this.ImageName = "dark-souls-1-logo.png";
            this.AddStat("Vitality");
            this.AddStat("Attunement");
            this.AddStat("Endurance");
            this.AddStat("Strength");
            this.AddStat("Dexterity");
            this.AddStat("Resistance");
            this.AddStat("Intelligence");
            this.AddStat("Faith");
            this.AddClass("Warrior");
            this.AddClass("Knight");
            this.AddClass("Wanderer");
            this.AddClass("Thief");
            this.AddClass("Bandit");
            this.AddClass("Hunter");
            this.AddClass("Sorcerer");
            this.AddClass("Pyromancer");
            this.AddClass("Cleric");
            this.AddClass("Deprived");
            this.AddGift("None");
            this.AddGift("Goddess's Blessing");
            this.AddGift("Black Firebomb");
            this.AddGift("Twin Humanities");
            this.AddGift("Binoculars");
            this.AddGift("Pendant");
            this.AddGift("Master Key");
            this.AddGift("Tiny Being's Ring");
            this.AddGift("Old Witch's Ring");
            this.AddChallenge("Critical Miss", "No estus or other healing items", 50);
            this.AddChallenge("The Nudist", "No Armor", 100);
            this.AddChallenge("The Miser", "Use only your starting equipment", 100);
            this.AddChallenge("Well what is it !?", "Must taunt the boss when the hp bar appears", 100);
            this.AddChallenge("Best offence is a good defence", "Only use a shield", 100);
            this.AddChallenge("No Challenge", "Yay! :D", 100);
        }
        return DarkSouls1;
    })(Core.SoulsGame);
    Games.DarkSouls1 = DarkSouls1;
})(Games || (Games = {}));
/// <reference path="../core.ts" />
var Games;
(function (Games) {
    var DarkSouls2 = (function (_super) {
        __extends(DarkSouls2, _super);
        function DarkSouls2() {
            _super.call(this, "Dark Souls 2");
            this.ImageName = "dark-souls-2-logo.png";
            this.AddStat("Vigor");
            this.AddStat("Endurance");
            this.AddStat("Vitality");
            this.AddStat("Adaptibility");
            this.AddStat("Strength");
            this.AddStat("Dexterity");
            this.AddStat("Intelligence");
            this.AddStat("Faith");
            this.AddStat("Attunement");
            this.AddClass("Warrior");
            this.AddClass("Knight");
            this.AddClass("Swordsman");
            this.AddClass("Bandit");
            this.AddClass("Cleric");
            this.AddClass("Sorcerer");
            this.AddClass("Explorer");
            this.AddClass("Deprived");
            this.AddGift("None");
            this.AddGift("Life Ring");
            this.AddGift("Human Effigy");
            this.AddGift("Healing Wares");
            this.AddGift("Homeward Bone");
            this.AddGift("Seed of a Tree of Giants");
            this.AddGift("Bonfire Ascetic");
            this.AddGift("Petrified Something");
            this.AddChallenge("Critical Miss", "No Estus, no (healing) items", 50);
            this.AddChallenge("The Nudist", "No armor", 100);
            this.AddChallenge("The Miser", "Only use your starting equipment", 100);
            this.AddChallenge("Well what is it?!", "Must taunt the boss when the hp bar appears", 100);
            this.AddChallenge("Best offence is a good defence", "Only use shield", 100);
            this.AddChallenge("Use the force!", "No HUD", 100);
            this.AddChallenge("Queensbury rules", "Fists only (Caestus is acceptable)", 100);
            this.AddChallenge("Not the kitchen sink", "Ladle Only!", 100);
            this.AddChallenge("No Challenge", "Yay :D", 50);
            var FashionSoulsChallenge = new Core.Challenge("Fashion Souls", "", 100, true);
            FashionSoulsChallenge.Special = function () {
                var x = Core.Roll(10);
                var dir = chance.pick(["up", "down"]);
                FashionSoulsChallenge.description = "Take the item in the slot " + x + " spaces " + dir + ".";
            };
            this.AddChallengeWithObject(FashionSoulsChallenge);
        }
        return DarkSouls2;
    })(Core.SoulsGame);
    Games.DarkSouls2 = DarkSouls2;
})(Games || (Games = {}));
/// <reference path="../core.ts" />
var Games;
(function (Games) {
    var Bloodborne = (function (_super) {
        __extends(Bloodborne, _super);
        function Bloodborne() {
            _super.call(this, "Bloodborne");
            this.ImageName = "bloodborne-logo-2.png";
            this.SupportStartingItem = false;
            this.AddStat("Strength");
            this.AddStat("Vitality");
            this.AddStat("Endurance");
            this.AddStat("Skill");
            this.AddStat("Arcane");
            this.AddStat("Bloodtinge");
            this.AddClass("Milquetoast");
            this.AddClass("Lone Survivor");
            this.AddClass("Troubled Childhood");
            this.AddClass("Violent Past");
            this.AddClass("Professional");
            this.AddClass("Military Veteran");
            this.AddClass("Noble Scion");
            this.AddClass("Cruel Fate");
            this.AddClass("Waste of Skin");
            this.AddChallenge("Lygophobia", "Fear of Darkness. Blindfolded player", 50);
            this.AddChallenge("Hemophobia", "Fear of Blood. No bloodvial usage allowed", 100);
            this.AddChallenge("Isolophobia", "Fear of Isolation. Each player controls half of the controller", 100);
            this.AddChallenge("Tropophobia", "Fear of Change. Only use starting equipment", 100);
            this.AddChallenge("Hoplophobia", "Fear of Firearms. Not allowed to use guns", 100);
            this.AddChallenge("Musculomania", "Obsession with Muscles. Must taunt boss when HP bar appears", 100);
            this.AddChallenge("Vestiphobia", "Fear of Clothing. Fight boss naked", 100);
            this.AddChallenge("Cenophobia", "Fear of new Things. Plank shield + 1h untransformed weapon only", 100);
            this.AddChallenge("No Challenge", "Sometimes, things go better then expected", 100);
            var CountingChallenge = new Core.Challenge("Arithmomania", "", 100, true);
            CountingChallenge.Special = function () {
                var updown = Util.RandomFromArray(["up", "down"]);
                var start = Core.RollMinMax(100, 999);
                CountingChallenge.description = "Start counting " + updown + " from " + start + ".";
            };
            this.AddChallengeWithObject(CountingChallenge);
        }
        return Bloodborne;
    })(Core.SoulsGame);
    Games.Bloodborne = Bloodborne;
})(Games || (Games = {}));
/// <reference path="../typings/defs.d.ts" />
var Output;
(function (Output) {
    var Log;
    (function (Log) {
        function WriteLine(line) {
            $("#logMainDiv").show(500);
            $("#rollLog").append(line + "</br>");
        }
        Log.WriteLine = WriteLine;
        function ClearLog() {
            $("#rollLog").empty();
            $("#logMainDiv").hide(500);
        }
        Log.ClearLog = ClearLog;
    })(Log = Output.Log || (Output.Log = {}));
    var Alert;
    (function (Alert) {
        function Show(title, description) {
            sweetAlert({
                title: title,
                text: description,
                type: "success",
                animation: "slide-from-top",
                html: true
            });
        }
        Alert.Show = Show;
        function ShowWarning(title, description) {
            sweetAlert({
                title: title,
                text: description,
                type: "warning",
                animation: "slide-from-top",
                html: true
            });
        }
        Alert.ShowWarning = ShowWarning;
        function ShowChallengeAlert(challenge) {
            if (challenge.hasSpecial == true) {
                challenge.Special(null);
            }
            var settings = {
                title: challenge.Name,
                text: challenge.description,
                type: "success",
                animation: "slide-from-top"
            };
            sweetAlert(settings);
            return challenge;
        }
        Alert.ShowChallengeAlert = ShowChallengeAlert;
    })(Alert = Output.Alert || (Output.Alert = {}));
})(Output || (Output = {}));
/// <reference path="../typings/defs.d.ts" />
/// <reference path="core.ts" />
/// <reference path="dictionary.ts" />
/// <reference path="games/games.d.ts" />
/// <reference path="output.ts" />
var _descriptionVisible;
var _displayExtraButtons = false;
$(document).ready(function () {
    // Add used games (use combobox value property as key)
    var games = new collections.Dictionary();
    games.setValue("darksouls1", new Games.DarkSouls1());
    games.setValue("darksouls2", new Games.DarkSouls2());
    games.setValue("bloodborne", new Games.Bloodborne());
    var _descriptionVisible = store.get("preparetodice_description_visbility");
    if (_descriptionVisible) {
        ShowDescription();
    }
    else {
        HideDescription(true);
    }
    // Hide all the extra buttons by default
    if (_displayExtraButtons == false) {
        $("._extraButtons").hide();
    }
    if (store.enabled == false) {
        Output.Alert.ShowWarning("Local Storage", "Can't access local storage, maybe due to private browsing. Some stuff might not be saved");
    }
    $("#gameSelection").change(function () {
        Output.Log.ClearLog();
        var g = getCurrentGame();
        $("#gameImage").attr("src", "images/" + g.ImageName);
    });
    $("#toggleDescription").click(function () {
        ToggleDescription();
    });
    $("#clearLog").click(function () {
        Output.Log.ClearLog();
    });
    $("#rollStart").click(function () {
        var game = getCurrentGame();
        Output.Alert.Show("Your starting situation", game.GetRandomStart());
    });
    $("#rollStats").click(function () {
        var game = getCurrentGame();
        var stat = Util.MakeBold(game.GetRandomStat());
        Output.Log.WriteLine("You have to level " + stat);
        Output.Alert.Show("You have to level", stat);
    });
    $("#rollChallenge").click(function () {
        var game = getCurrentGame();
        var challenge = game.GetChallenge();
        Output.Alert.ShowChallengeAlert(challenge);
        Output.Log.WriteLine(Util.FormatChallenge(challenge));
    });
    $("#rollD20").click(function () {
        sweetAlert({
            title: "Roll Dice",
            text: "Enter a #d# dice format. There is no error checking for format yet",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputValue: "1d20"
        }, function (input) {
            if (input === false) {
                return false;
            }
            if (input === "") {
                sweetAlert.showInputError("You need to write something!");
                return false;
            }
            var result = chance.rpg(input.toString());
            var text = result.toString();
            if (result.length > 1) {
                text += " (Total: " + Util.ArraySum(result) + ")";
            }
            sweetAlert("You rolled...", text, "success");
            Output.Log.WriteLine("Rolled: " + text);
        });
    });
    $("#checkChallengeButton").click(function () {
        var result = Core.Roll(20);
        // Default to failed roll
        var title = "You failed";
        var description = "Chop chop, try again";
        if (result >= 18) {
            title = "No challenge!";
            description = "Challenge removed!";
        }
        Output.Alert.Show(title, description);
    });
    $("#viewAllChallengesButton").click(function () {
        var challenges = getCurrentGame().Challenges;
        var list = "";
        challenges.forEach(function (c) {
            list += c.Name + ": " + c.description + "</br>";
        });
        Output.Alert.Show("All challenges for " + getCurrentGame().Name, list);
    });
    $("#showExtraButtons").click(function () {
        if (_displayExtraButtons) {
            $("._extraButtons").hide();
            $("#showExtraButtons").html("Show extra buttons");
            _displayExtraButtons = false;
        }
        else {
            $("._extraButtons").show();
            $("#showExtraButtons").html("Hide extra buttons");
            _displayExtraButtons = true;
        }
    });
    function getCurrentGame() {
        return games.getValue($("#gameSelection").val());
    }
    function ToggleDescription() {
        if (_descriptionVisible) {
            $("#toggleDescription").html("Show Description");
            _descriptionVisible = false;
            $("#introText").hide(500);
            store.set("preparetodice_description_visbility", false);
        }
        else {
            $("#toggleDescription").html("Hide Description");
            _descriptionVisible = true;
            $("#introText").show(500);
            store.set("preparetodice_description_visbility", true);
        }
    }
    function HideDescription(instant) {
        $("#toggleDescription").html("Show Description");
        if (instant == true) {
            $("#introText").hide(0);
        }
        else {
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
