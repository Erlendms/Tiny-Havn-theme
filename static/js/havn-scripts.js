document.addEventListener("DOMContentLoaded", function () {
	// Cache DOM elements
	const topButton = document.getElementById("back-to-top");
	const navPadding = document.getElementById("navPadding");
	const scrollIndicator = document.getElementById("scrollIndicator");
	const lazyPlaceholderDivs = document.querySelectorAll(".lazy-placeholder");

	// Combine both scroll handlers into one throttled function
	const handleScroll = _.throttle(function () {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		const isMobile = window.innerWidth <= 650;
		const offset = isMobile ? 162 : 186;

		// Back to top button logic
		if (scrollTop > 250) {
			topButton.classList.add("show-button");
		} else {
			topButton.classList.remove("show-button");
		}

		// Scroll indicator and nav padding logic
		const winScroll = Math.max(0, scrollTop - offset);
		const height =
			document.documentElement.scrollHeight -
			document.documentElement.clientHeight -
			offset;
		const scrolled = Math.max(0, height > 0 ? winScroll / height : 0);

		// Batch DOM updates
		requestAnimationFrame(() => {
			document.documentElement.style.setProperty("--scroll-ratio", scrolled);

			if (navPadding) {
				const isPastThreshold = scrollTop >= (isMobile ? 150 : 180);
				navPadding.style.backgroundColor = isPastThreshold
					? "var(--border-60)"
					: "transparent";
				navPadding.style.backdropFilter = isPastThreshold
					? "var(--blur)"
					: "none";
				navPadding.style.setProperty(
					"-webkit-backdrop-filter",
					isPastThreshold ? "var(--blur)" : "none"
				);

				if (scrollIndicator) {
					scrollIndicator.style.backgroundColor = isPastThreshold
						? "var(--link-line)"
						: "transparent";
				}
			}
		});
	}, 16); // 60fps threshold

	// Add scroll event listener
	window.addEventListener("scroll", handleScroll);

	// Back to top button click handler
	topButton.addEventListener("click", function (e) {
		e.preventDefault();
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	});

	// Lazy loading implementation
	lazyPlaceholderDivs.forEach(function (lazyPlaceholderDiv) {
		const img = lazyPlaceholderDiv.querySelector("img");

		function loaded() {
			lazyPlaceholderDiv.classList.add("loaded");
		}

		function handleError() {
			console.error("Failed to load image:", img.src);
			// Optionally add error handling UI here
		}

		if (img.complete) {
			loaded();
		} else {
			img.addEventListener("load", loaded);
			img.addEventListener("error", handleError);
		}
	});
});
