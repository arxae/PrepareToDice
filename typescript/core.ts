/// <reference path="definitions/chance.d.ts" />

module Core {
	export function Roll(max : number) {
		return chance.integer({
			min: 1,
			max: max
		});
	}
	
	export function RandomFromArray(arr : Array<Object>) {
		return chance.pick(arr);
	}
	
	// TODO: Move to util module
	export function MakeBold(text : string) {
		return "<b>" + text + "</b>";
	}
	
	export class Challenge {
		constructor(public Name:string, public Description:string) {}
	}
}
