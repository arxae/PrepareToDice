/// <reference path="../core.ts" />

module Games {
	export class Bloodborne extends Core.SoulsGame {
		public constructor() {
			super();
			
			this.ImageName = "bloodborne-logo-2.png";
			
			this.AddStat("No support yet");
			
			this.AddClass("No support yet");
			
			this.AddChallenge("No support yet", "No support yet", 100);
		}
	}
}