(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    module.exports = factory();
  } else {
    root.LongPress = factory();
  }
})(typeof window !== "undefined" ? window : global, function () {
  // default options
  const defaultOptions = {
    triggerClass: "long-press",
    pressDelay: 800,
  };

  let options;
  let timer;

  // constructor
  function LongPress(opts) {
    options = { ...defaultOptions, opts };
    init();
  }

  /**
   * initialize with options
   * @param {Object} options
   */
  function init() {
    if (timer) clearTimeout(timer);
    if ("ontouchstart" in document.body) {
      document.addEventListener("touchstart", pressStart, {
        once: true,
      });
      document.addEventListener("touchend", init, {
        once: true,
      });
    } else {
      document.addEventListener("mousedown", pressStart, {
        once: true,
      });
      document.addEventListener("mouseup", init, {
        once: true,
      });
    }
  }

  /**
   * handle long-press start
   * @param {Event} e
   * @param {Object} options
   */
  function pressStart(e) {
    if (e.target.className.split(" ").indexOf(options.triggerClass) < 0) return;

    timer = setTimeout(() => {
      handleLongPress(e.target);
    }, options.pressDelay);
  }

  /**
   *
   * @param {HTMLElemnt} target
   */
  function handleLongPress(target) {
    target.dispatchEvent(new Event("longpress", { bubbles: true }));
  }

  return LongPress;
});
