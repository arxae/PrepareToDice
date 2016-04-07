/// <reference path="../core.ts" />

namespace Games {
	export class DarkSouls3 extends Core.SoulsGame {
		public constructor() {
			super("Dark Souls 3");

			this.ImageName = "dark-souls-3-logo.png";

			this.AddStat("Vigor");
			this.AddStat("Attunement");
			this.AddStat("Endurance");
			this.AddStat("Vitality");
			this.AddStat("Strength");
			this.AddStat("Dexterity");
			this.AddStat("Intelligence");
			this.AddStat("Faith");
			this.AddStat("Luck");

			this.AddClass("Knight");
			this.AddClass("Mercenary");
			this.AddClass("Warrior");
			this.AddClass("Herald");
			this.AddClass("Thief");
			this.AddClass("Assasin");
			this.AddClass("Sorcerer");
			this.AddClass("Pyromancer");
			this.AddClass("Cleric");
			this.AddClass("Deprived");

			this.AddGift("Life Ring");
			this.AddGift("Divine Blessing");
			this.AddGift("Hidden Blessing");
			this.AddGift("Black Firebomb");
			this.AddGift("Fire Gem");
			this.AddGift("Sovereignless Soul");
			this.AddGift("Rusted Gold Coin");
			this.AddGift("Cracked Red Eye Orb");
			this.AddGift("Young White Branch");

			this.AddChallenge("Critical Miss", "No Estus, no (healing) items", 50);
			this.AddChallenge("The Nudist", "No armor", 100);
			this.AddChallenge("The Miser", "Only use your starting equipment", 100);
			this.AddChallenge("Well what is it?!", "Must taunt the boss when the hp bar appears", 100);
			this.AddChallenge("Shield Bash!", "Only use shield", 100);
			this.AddChallenge("Use the force!", "No HUD", 100);
			this.AddChallenge("Queensbury rules", "Fists only (Caestus is acceptable)", 100);
			this.AddChallenge("Which way is up?", "Invert the Y axis", 100);
			this.AddChallenge("What is this? Bloodborne?", "1h weapon + crossbow in offhand", 100);
			this.AddChallenge("No Challenge", "Yay :D", 50);

			let CountChallenge = new Core.Challenge("Arithmomania", "", 100, true);
			CountChallenge.Special = () => {
				let start = Core.RollMinMax(400, 900);
				let increment = Core.Roll(10);
				let updown = Util.RandomFromArray([ "up", "down" ]);

				CountChallenge.description = "Count " + updown + " by " + increment + " starting from " + start;
			};
			this.AddChallengeWithObject(CountChallenge);
		}
	}
}