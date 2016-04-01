/// <reference path="../core.ts" />

namespace Games {
	export class DarkSouls3 extends Core.SoulsGame {
		public constructor() {
			super("Dark Souls 3");

			this.ImageName = "dark-souls-3-logo.png";

			this.AddStat("None");

			this.AddClass("None");

			this.AddGift("None");

			this.AddChallenge("No support yet", "No support yet", 100);
		}
	}
}