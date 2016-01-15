/// <reference path="../core.ts" />

module Games {
	export class DarkSouls1 extends Core.SoulsGame {
		public constructor() {
			super("Dark Souls");
			
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
	}
}