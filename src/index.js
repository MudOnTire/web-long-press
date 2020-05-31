(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    module.exports = factory();
  } else {
    root.LongPress = factory();
  }
})(typeof window !== "undefined" ? window : global, function () {
  const defaultOptions = {
    triggerClass: "long-press",
    pressDelay: 800,
  };

  function LongPress(options) {
    this.options = { ...defaultOptions, options };
    init(this.options);
  }

  function init(options) {
    if ("ontouchstart" in document.body) {
      document.addEventListener("touchstart", handlePressStart);
    } else {
      document.addEventListener("mousedown", handlePressStart);
    }
  }

  function handlePressStart(e) {
    console.dir(e.target);
    if (e.target.className.match(/long-press/)) {
    }
  }

  return LongPress;
});
