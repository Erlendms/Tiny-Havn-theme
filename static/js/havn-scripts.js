document.addEventListener("DOMContentLoaded", function () {
	// Cache all DOM elements we'll need
	const topButton = document.getElementById("back-to-top");
	const navPadding = document.getElementById("navPadding");
	const scrollIndicator = document.getElementById("scrollIndicator");
	const lazyPlaceholderDivs = document.querySelectorAll(".lazy-placeholder");
	const footer = document.querySelector("footer");

	// Combine all scroll handling into one throttled function
	const handleScroll = _.throttle(function () {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		const isMobile = window.innerWidth <= 650;

		// Back to top button logic
		if (scrollTop > 250) {
			topButton.classList.add("show-button");
		} else {
			topButton.classList.remove("show-button");
		}

		// Nav padding and scroll indicator logic
		const offset = isMobile ? 162 : 186;
		const winScroll = Math.max(0, scrollTop - offset);
		const height =
			document.documentElement.scrollHeight -
			document.documentElement.clientHeight -
			offset;
		const scrolled = Math.max(0, height > 0 ? winScroll / height : 0);

		if (footer) {
			const bottomThreshold = 12 * 16; // 12rem converted to pixels (assuming 1rem = 16px)
			const distanceToBottom =
				document.documentElement.scrollHeight -
				(scrollTop + window.innerHeight);

			if (distanceToBottom <= bottomThreshold) {
				footer.classList.add("bottom");
			} else {
				footer.classList.remove("bottom");
			}
		}

		// Batch DOM updates using requestAnimationFrame
		requestAnimationFrame(() => {
			document.documentElement.style.setProperty("--scroll-ratio", scrolled);

			if (navPadding) {
				const isPastThreshold = scrollTop >= (isMobile ? 150 : 180);
				navPadding.classList.toggle("nav-scrolled", isPastThreshold);

				if (scrollIndicator) {
					scrollIndicator.classList.toggle(
						"indicator-visible",
						isPastThreshold
					);
				}
			}
		});
	}, 50); // Increased to 50ms for better performance

	// Add single scroll event listener
	window.addEventListener("scroll", handleScroll, { passive: true });

	// Back to top button click handler
	topButton.addEventListener("click", function (e) {
		e.preventDefault();
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	});

	// Lazy images
	lazyPlaceholderDivs.forEach(function (lazyPlaceholderDiv) {
		const img = lazyPlaceholderDiv.querySelector("img");

		const mainImageLoader = new Image();
		mainImageLoader.src = img.src;
		mainImageLoader.onload = () => {
			const aspectRatio =
				(mainImageLoader.naturalHeight / mainImageLoader.naturalWidth) * 100;
			lazyPlaceholderDiv.style.setProperty("--aspect-ratio", `${aspectRatio}%`);
			lazyPlaceholderDiv.style.setProperty(
				"--natural-width",
				`${mainImageLoader.naturalWidth}px`
			);
		};

		function loaded() {
			// Add a small delay to ensure smooth transition
			requestAnimationFrame(() => {
				lazyPlaceholderDiv.classList.add("loaded");
			});
		}

		if (img.complete) {
			loaded();
		} else {
			img.addEventListener("load", loaded);
		}
	});
});
