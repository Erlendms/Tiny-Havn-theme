// havn-scripts.js

document.addEventListener("DOMContentLoaded", function () {
  // Back to top arrow
  var topButton = document.getElementById("back-to-top");
  var topArrow = document.getElementById("up-arrow");

  window.addEventListener(
    "scroll",
    _.throttle(function () {
      if (window.pageYOffset > 250) {
        topButton.classList.add("show-button");
      } else {
        topButton.classList.remove("show-button");
      }
    }, 1000),
  );

  topButton.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // navPadding and scrollIndicator
  // navPadding and scrollIndicator
  window.onscroll = function () {
    const isMobile = window.innerWidth <= 650;
    const offset = isMobile ? 162 : 186;
    const winScroll = Math.max(
      0,
      document.body.scrollTop || document.documentElement.scrollTop - offset,
    );
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight -
      offset;
    const scrolled = Math.max(0, height > 0 ? winScroll / height : 0);
    document.documentElement.style.setProperty("--scroll-ratio", scrolled);

    const navPadding = document.getElementById("navPadding");
    const scrollIndicator = document.getElementById("scrollIndicator");

    if (navPadding) {
      if (window.scrollY >= (isMobile ? 150 : 180)) {
        navPadding.style.backgroundColor = "var(--border-60)";
        navPadding.style.backdropFilter = "var(--blur)";
        navPadding.style.setProperty("-webkit-backdrop-filter", "var(--blur)");

        if (scrollIndicator) {
          scrollIndicator.style.backgroundColor = "var(--link-line)";
        }
      } else {
        navPadding.style.backgroundColor = "transparent";
        navPadding.style.backdropFilter = "none";
        navPadding.style.setProperty("-webkit-backdrop-filter", "none");

        if (scrollIndicator) {
          scrollIndicator.style.backgroundColor = "transparent";
        }
      }
    }
  };
});
