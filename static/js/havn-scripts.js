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
    }, 1000)
  );

  topButton.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // navPadding and scrollIndicator
  window.onscroll = function () {
    const isMobile = window.innerWidth <= 650;
    const offset = isMobile ? 162 : 186;
    const winScroll = Math.max(
      0,
      document.body.scrollTop || document.documentElement.scrollTop - offset
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

  // Lazy loading
  const lazyPlaceholderDivs = document.querySelectorAll(".lazy-placeholder");
  lazyPlaceholderDivs.forEach(function (lazyPlaceholderDiv) {
    const img = lazyPlaceholderDiv.querySelector("img");
    function loaded() {
      lazyPlaceholderDiv.classList.add("loaded");
    }

    if (img.complete) {
      loaded();
    } else {
      img.addEventListener("load", loaded);
    }
  });
});

// View transitions
  const navLinks = document.querySelectorAll('nav a');
  const content = document.getElementById('content');

  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const target = event.target.getAttribute('data-target');
      loadContent(target);
    });
  });

  function loadContent(target) {
    fetch(`https://havn.blog/${target}`)
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newContent = doc.querySelector('main').innerHTML;

        // Start the view transition
        document.startViewTransition(() => {
          content.innerHTML = newContent;
        });
      })
      .catch(error => console.error('Error loading content:', error));
  }
});