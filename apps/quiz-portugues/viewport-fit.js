"use strict";

(function bootstrapViewportPatch() {
  const appRoot = document.querySelector("#app-root");

  if (!(appRoot instanceof HTMLElement)) {
    return;
  }

  let fitFrame = 0;

  function getOpenModal() {
    return document.querySelector(".modal-backdrop:not([hidden])");
  }

  function fitElementToViewport(element, cssVariableName) {
    if (!(element instanceof HTMLElement)) {
      return;
    }

    const container = element.parentElement;
    if (!(container instanceof HTMLElement)) {
      return;
    }

    element.style.setProperty(cssVariableName, "1");

    const availableWidth = Math.max(container.clientWidth - 6, 0);
    const availableHeight = Math.max(container.clientHeight - 6, 0);
    const naturalWidth = Math.max(element.scrollWidth, element.offsetWidth);
    const naturalHeight = Math.max(element.scrollHeight, element.offsetHeight);

    if (!availableWidth || !availableHeight || !naturalWidth || !naturalHeight) {
      return;
    }

    const scale = Math.min(1, availableWidth / naturalWidth, availableHeight / naturalHeight);
    const safeScale = Number.isFinite(scale) && scale > 0 ? scale : 1;
    element.style.setProperty(cssVariableName, safeScale.toFixed(4));
  }

  function fitInterface() {
    const activeScreenShell = document.querySelector(".screen.is-active .screen-shell");
    fitElementToViewport(activeScreenShell, "--screen-scale");

    const openModal = getOpenModal();
    if (openModal) {
      fitElementToViewport(openModal.querySelector(".modal-card"), "--modal-scale");
    }
  }

  function queueFitInterface() {
    window.cancelAnimationFrame(fitFrame);
    fitFrame = window.requestAnimationFrame(() => {
      fitFrame = window.requestAnimationFrame(fitInterface);
    });
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList" || mutation.type === "characterData") {
        queueFitInterface();
        return;
      }

      if (mutation.type === "attributes") {
        queueFitInterface();
        return;
      }
    }
  });

  observer.observe(appRoot, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: ["class", "hidden", "style", "aria-hidden"]
  });

  window.addEventListener("resize", queueFitInterface);
  window.addEventListener("orientationchange", queueFitInterface);
  document.addEventListener("fullscreenchange", queueFitInterface);
  window.addEventListener("load", queueFitInterface);

  queueFitInterface();
})();
