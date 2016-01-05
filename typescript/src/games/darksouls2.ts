/// <reference path="../core.ts" />

module Games {
	export class DarkSouls2 extends Core.SoulsGame {
		public constructor() {
			super();
			
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
			this.AddChallenge("No Challenge", "", 50);
			
			var FashionSoulsChallenge = new Core.Challenge("Fashion Souls", "", 100, true);
			FashionSoulsChallenge.Special = () => {
				var x = Core.Roll(10);
				var dir = chance.pick(["up", "down"]);
				
				FashionSoulsChallenge.description = "Take the item in the slot " + x + " spaces " + dir + ".";
			}
			
			this.AddChallengeWithObject(FashionSoulsChallenge);
		}
	}
}