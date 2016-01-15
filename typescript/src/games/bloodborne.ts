/// <reference path="../core.ts" />

module Games {
	export class Bloodborne extends Core.SoulsGame {
		public constructor() {
			super("Bloodborne");
			
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
			CountingChallenge.Special = () => {
				var updown = Util.RandomFromArray(["up", "down"]);
				var start = Core.RollMinMax(100, 999);
				
				CountingChallenge.description = "Start counting " + updown + " from " + start + ".";
			}
			this.AddChallengeWithObject(CountingChallenge);
		}
	}
}