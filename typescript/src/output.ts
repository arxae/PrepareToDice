/// <reference path="../typings/defs.d.ts" />

namespace Output.Log {
	export function WriteLine(line: string) {
		$("#logMainDiv").show(500);
		$("#rollLog").append(line + "</br>");
	}

	export function ClearLog() {
		$("#rollLog").empty();
		$("#logMainDiv").hide(500);
	}
}

namespace Output.Alert {
	export function Show(title: string, description: string) {
		sweetAlert({
			title: title,
			text: description,
			type: "success",
			animation: "slide-from-top",
			html: true
		});
	}

	export function ShowWarning(title: string, description: string) {
		sweetAlert({
			title: title,
			text: description,
			type: "warning",
			animation: "slide-from-top",
			html: true
		});
	}

	export function ShowChallengeAlert(challenge: Core.Challenge): Core.Challenge {
		if (challenge.hasSpecial === true) {
			challenge.Special(null);
		}

		let settings = {
			title: challenge.Name,
			text: challenge.description,
			type: "success",
			animation: "slide-from-top"
		};

		sweetAlert(settings);

		return challenge;
	}
}