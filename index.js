/*
	This entire script is a bodge and i apologise profusely
*/

"use strict";

$(document).ready(() => {

	let currentName = 0;

	let names = ["Beltran elBelgg", "owl", "сова", "フクロウ"]

	let pressedKeys = "";

	function switchName() {
		currentName++;

		if (currentName >= names.length) {
			currentName = 0;
		}

		$(".elBelgg").text(names[currentName]).removeClass("latin").removeClass("cyrillic").removeClass("cjk")
		$(".header").removeClass("cjk");

		switch(currentName) {
			case 0:
			case 1:
				$(".elBelgg").addClass("latin");
				break;
			case 2:
				$(".elBelgg").addClass("cyrillic");
				break;
			case 3:
				$(".elBelgg").addClass("cjk");
				$(".header").addClass("cjk");
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

	$(".tab1").click((e) => {
		history.pushState({}, "", "/");
		onStateChange("/");
		e.preventDefault();
	})
	$(".tab2").click((e) => {
		history.pushState({}, "", "/projects");
		onStateChange("/projects");
		e.preventDefault();
	})
	$(".tab3").click((e) => {
		history.pushState({}, "", "/mentions");
		onStateChange("/mentions");
		e.preventDefault();
	})
	$(".tab4").click((e) => {
		history.pushState({}, "", "/sitemap");
		onStateChange("/sitemap");
		e.preventDefault();
	})

	$(".elBelgg").click(() => {
		switchName();
	})

	if (location._orig_href) {
		$("#archiveEasterEgg").removeClass("hidden")
	}

	function onStateChange(url) {
		url = url.replace(/\?.+/g, "").replace(/\/new/,"");

		console.debug("onStateChange", url);

		if (url === "/projects" || url === "/projects/") {
			if (url === "/projects/") {
				history.replaceState({}, "", "/projects" + window.location.search)
			}
			tabClick(2)
		}

		if (url === "/mentions" || url === "/mentions/") {
			if (url === "/mentions/") {
				history.replaceState({}, "", "/mentions" + window.location.search)
			}
			tabClick(3)
		}

		if (url === "/sitemap" || url === "/sitemap/") {
			if (url === "/sitemap/") {
				history.replaceState({}, "", "/sitemap" + window.location.search)
			}
			tabClick(4)
		}

		if (url === "/") {
			tabClick(1)
		}
	}
	window.addEventListener("popstate", event => {
		console.debug("popstate");
		onStateChange(location.pathname);
	})

	// Map old style URLs to new style

	if (location.hash === "#links") {
		history.pushState({}, "", "/");
		onStateChange("/")
	} else if (location.hash === "#projects") {
		history.pushState({}, "", "/projects");
		onStateChange("/projects")
	} else if (location.hash === "#media") {
		history.pushState({}, "", "/mentions");
		onStateChange("/mentions")
	} else if (location.hash === "#sitemap") {
		history.pushState({}, "", "/sitemap");
		onStateChange("/sitemap")
	} else {
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

	$("#boopButton").click(() => {
		let heart = $(document.createElement("div")).addClass("boopHeart").append(
			$(document.createElement("span")).addClass("material-icons").html("favorite")
		);
		let rawHeart = heart[0];

		let random = Math.random();

		if (random < 0.33) {
			heart.addClass("anim1");
		} else if (random < 0.66) {
			heart.addClass("anim2");
		} else {
			heart.addClass("anim3")
		}

		setTimeout(() => {
			console.debug(heart);
			heart[0].remove();
		},3999)

		

		$(".boopContainer").append(
			heart
		)


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
