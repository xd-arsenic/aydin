(function () {
  var toggle = document.getElementById("nav-toggle");
  var drawer = document.getElementById("nav-drawer");
  if (!toggle || !drawer) return;

  function isDesktop() {
    return window.matchMedia("(min-width: 769px)").matches;
  }

  function close() {
    drawer.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }

  function open() {
    drawer.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
  }

  toggle.addEventListener("click", function () {
    if (isDesktop()) return;
    if (drawer.classList.contains("is-open")) close();
    else open();
  });

  window.addEventListener("resize", function () {
    if (isDesktop()) close();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !isDesktop()) close();
  });

  drawer.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      if (!isDesktop()) close();
    });
  });
})();
