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
    eventName: "longpress",
    bubbles: true,
  };

  // constructor
  function LongPress(opts) {
    this.options = { ...defaultOptions, ...opts };
    this.timer;
    this.init();
  }

  /**
   * initialize
   */
  LongPress.prototype.init = function () {
    const that = this;
    const { timer } = that;
    if (timer) clearTimeout(timer);
    const pressStart = that.pressStart.bind(that);
    const init = that.init.bind(that);
    if ("ontouchstart" in document.body) {
      document.addEventListener("touchstart", pressStart, {
        once: true,
        passive: false,
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
  };

  /**
   * handle press start
   * @param {Event} e
   * @param {Object} options
   */
  LongPress.prototype.pressStart = function (e) {
    const that = this;
    const { options } = that;
    e.preventDefault();
    if (e.target.className.split(" ").indexOf(options.triggerClass) < 0) return;

    that.timer = setTimeout(() => {
      that.handleLongPress(e.target);
    }, options.pressDelay);
  };

  /**
   * trigger longpress event
   * @param {HTMLElemnt} target
   */
  LongPress.prototype.handleLongPress = function (target) {
    const { eventName, bubbles } = this.options;
    target.dispatchEvent(new Event(eventName, { bubbles }));
  };

  return LongPress;
});
