/// <reference path="definitions/chance.d.ts" />

module Core {
	export function Roll(max : number) {
		return chance.integer({
			min: 1,
			max: max
		});
	}
	
	// TODO: Move to util module
	export function RandomFromArray(arr : Array<Object>) {
		return chance.pick(arr);
	}
	
	export function RandomFromArrayWeighted(vals : Array<Object>, weights : Array<number>) {
		return chance.weighted(vals, weights);
	}
	
	export function CreateWeightArray(arr : Array<Challenge>) {
		var newArr = new Array<number>();
		arr.forEach(element => {
			newArr.push(element.Weight);
		});
		
		return newArr;
	}
	
	export function MakeBold(text : string) {
		return "<b>" + text + "</b>";
	}
	
	export function FormatChallengeText(chal : Challenge) {
		var text = Core.MakeBold(chal.Name);
		
		if(chal.Description !== "") {
			text = text + ": " + chal.Description;
		}
		
		return text;
	}
	
	export function ShowAlert(_title : string, _description : string) {
		sweetAlert({
			title: _title,
			text: _description,
			type: "success",
			animation: "slide-from-top",
			html: true
		});
	}
	
	export function ArraySum(arr : Array<number>) : number {
		if(arr.length === 0) return 0;
		if(arr.length === 1) return arr[0];
		
		var total = 0;
		arr.forEach(element => {
			total += element;
		});
		
		return total;
	}
	
	export function ShowChallengeAlert(challenge : Challenge) : Core.Challenge {
		if(challenge.HasSpecial == true) {
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
	
	export class Challenge {
		Special : Action<void>;
		
		constructor(public Name:string, public Description:string, public Weight:number, public HasSpecial?:boolean) {}
	}
	
	export interface Action<T> {
		(item: T) : void;
	}
}
