/// <reference path="../typings/defs.d.ts" />

module Util {
	export function Roll(max : number) {
		return chance.integer({
			min: 1,
			max: max
		});
	}
	
	export function RandomFromArray(arr : Array<Object>) {
		return chance.pick(arr);
	}
	
	export function RandomFromWeightedArray(vals : Array<Object>, weights : Array<number>) {
		return chance.weighted(vals, weights);		
	}
	
	export function CreateWeightedArray(arr : Array<Core.Challenge>) {
		var newArr = new Array<number>();
		
		arr.forEach(element => {
			newArr.push(element.weight);
		});
		
		return newArr;
	}
	
	export function MakeBold(text : string) : string {
		return "<b>" + text + "</b>";
	}
	
	export function FormatChallenge(chal : Core.Challenge) {
		var text = MakeBold(chal.Name);
		
		if(chal.description !== "") {
			text = text + ": " + chal.description;
		}
		
		return text;
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
}