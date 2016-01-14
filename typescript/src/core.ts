/// <reference path="util.ts" />

module Core {
	export function Roll(max : number) {
		return chance.integer({
			min: 1,
			max: max
		});
	}
	
	export function RollMinMax(min : number, max : number) {
		return chance.integer({
			min: min,
			max: max
		});
	}
	
	export interface IGame {
		Name : string;
		ImageName : string;
		Stats : Array<string>;
		Classes : Array<string>;
		Gifts : Array<string>;
		Challenges : Array<Core.Challenge>;
		SupportStartingItem : boolean;
		
		AddStat(string);
		AddClass(string);
		AddGift(string);
		
		GetRandomStart() : string;
		GetRandomStat() : string;
		GetRandomClass() : string;
		GetRandomGift() : string;
		GetChallenge() : Challenge;
	}
	
	export class Challenge {
		Special: Action<void>;
		
		constructor(public Name : string, public description : string,
					public weight : number, public hasSpecial? : boolean) {
				
		}
	}
	
	export interface Action<T> {
		(item: T) : void;
	}
	
	export class SoulsGame implements Core.IGame {
		public ImageName : string;
		public Stats : Array<string>;
		public Classes : Array<string>;
		public Gifts : Array<string>;
		public Challenges : Array<Challenge>;
		public SupportStartingItem : boolean = true;
		
		constructor(public Name : string) {
			this.Stats = new Array<string>();
			this.Classes = new Array<string>();
			this.Gifts = new Array<string>();
			this.Challenges = new Array<Challenge>();
		}
		
		public AddStat(stat : string) {
			if(this.Stats.indexOf(stat) == -1) {
				this.Stats.push(stat);
			}
		}
		
		public AddClass(cls : string) {
			if(this.Classes.indexOf(cls) == -1) {
				this.Classes.push(cls);
			}
		}
		
		public AddGift(gift : string) {
			if(this.Gifts.indexOf(gift) == -1) {
				this.Gifts.push(gift);
			}
		}
		
		public AddChallenge(name : string, description : string, 
							weight : number, hasSpecial? : boolean) {
			this.Challenges.push(new Challenge(name, description, weight, hasSpecial));
		}
		
		public AddChallengeWithObject(chal : Challenge) {
			this.Challenges.push(chal);
		}
		
		public GetRandomStart() : string {
			var text : string = "Class: ";
			text += this.GetRandomClass();
			
			if(this.SupportStartingItem){
				text += "</br>Gift: " + this.GetRandomGift();
			}
			
			return text;
		}
		
		public GetRandomStat() : string {
			return <string>Util.RandomFromArray(this.Stats);
		}
		
		public GetRandomClass() : string {
			return <string>Util.RandomFromArray(this.Classes);
		}
		
		public GetRandomGift() : string {
			return <string>Util.RandomFromArray(this.Gifts);
		}
		
		public GetChallenge() : Challenge {
			//return <Challenge>Util.RandomFromArray(this.Challenges);
			return <Challenge>Util.RandomFromWeightedArray(this.Challenges, Util.CreateWeightedArray(this.Challenges));
		}
	}
}