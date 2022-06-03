/*
	This entire script is a bodge and i apologise profusely
*/

"use strict";

$(document).ready(() => {

	let currentName = 0;

	let names = ["Beltrán elBelgg", "illustrious raven", "erhabener rabe", "strålende ravn"]

	let pressedKeys = "";

	function switchName() {
		currentName++;

		if (currentName >= names.length) {
			currentName = 0;
		}

		$(".elBelgg").text(names[currentName]).removeClass("1").removeClass("2").removeClass("3").removeClass("4")
		$(".header").removeClass("cjk");

		switch(currentName) {
			case 0:
			case 1:
				$(".elBelgg").addClass("1");
				break;
			case 2:
				$(".elBelgg").addClass("2");
				break;
			case 3:
				$(".elBelgg").addClass("3");
				break;
			case 4:
				$(".elBelgg").addClass("4");
				$(".header").addClass("4");
				break;
		}
	}

	// Adapted from https://stackoverflow.com/questions/5573096/detecting-webp-support

	function checkWebP(callback) {
		var img = new Image();
		img.onload = function() {
			var result = (img.width > 0) && (img.height > 0);
			callback(result);
		};
		img.onerror = function() {
			callback(false);
		};
		img.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA";
	}

	checkWebP(result => {
		if (result === false) {
			console.log("No WebP");
			$("html").addClass("nowebp")
		} else {
			console.log("Yes WebP");
		}
	});

	function tabClick(num, dontPushState) {
		$(".tab").removeClass("tabSelected");
		$(".section").removeClass("sectionSelected");
		$(".tab"+num).addClass("tabSelected");

		$(".sectionList").attr("data-current-section",num);
		$(".section"+num).addClass("sectionSelected");
	}

	$(".elBelgg").click(() => {
		switchName();
	})

	if (location._orig_href) {
		$("#archiveEasterEgg").removeClass("hidden")
	}


	window.addEventListener("popstate", event => {
		console.debug("popstate");
		onStateChange(location.pathname);
	})

	// Map old style URLs to new style

	if (location.hash === "#") {
		history.pushState({}, "", "/");
		onStateChange("/")
	
		// Else, use normal type
		onStateChange(location.pathname)
	}

	$("#discordCopy").click(() => {
		copyDiscordFakeElement.select();
		document.execCommand("copy");

		$("#discordCopy").addClass("copied");

		clearTimeout(window.discordCopyTimeout);

		window.discordCopyTimeout = setTimeout(() => {
			$("#discordCopy").removeClass("copied");
		},1000)
	});


	$(document).on("keydown", e => {
		pressedKeys += e.code;

		if (pressedKeys.match(/ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightKeyBKeyAEnter$/g)) {
			console.log("Easter Egg Time");
			
			let eggAudio = new Audio(`/audio/easter_egg.mp3`);

			eggAudio.volume = 0.5;

			if (location.protocol === "file:") {
				eggAudio.setAttribute("src", "audio/easter_egg.mp3")
			}

			eggAudio.addEventListener("playing", () => {
				console.log("playing");
				eggAudio.volume = 0.5;
				$("html").addClass("easterEggTime");
			});

			$("html").append(eggAudio)

			try {
				eggAudio.volume = 0.5;
				eggAudio.play();
				eggAudio.volume = 0.5;
			} catch(e) {
				console.log("We should have a user interaction based on keyboard input so i'm not sure what happened", e);
				alert("Your browser isn't letting us play audio for some reason");
			}
		}
	})

})
