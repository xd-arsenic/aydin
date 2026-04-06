(function () {
  var STORAGE_KEY = "yuhhh-vote-modal-dismissed";
  var modal = document.getElementById("vote-open-modal");
  var closeBtn = document.getElementById("vote-modal-close");
  var panel = modal && modal.querySelector(".vote-modal__panel");
  var lastFocus = null;

  if (!modal || !closeBtn) return;

  function openModal() {
    lastFocus = document.activeElement;
    modal.removeAttribute("hidden");
    document.body.classList.add("vote-modal-open");
    closeBtn.focus();
  }

  function closeModal() {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch (e) {
      /* ignore */
    }
    modal.setAttribute("hidden", "");
    document.body.classList.remove("vote-modal-open");
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    }
  }

  function shouldShow() {
    try {
      return !sessionStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return true;
    }
  }

  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.hasAttribute("hidden")) {
      closeModal();
    }
  });

  if (panel) {
    panel.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }

  if (shouldShow()) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", openModal);
    } else {
      openModal();
    }
  }
})();
