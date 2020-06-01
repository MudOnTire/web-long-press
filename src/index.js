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
    if ("ontouchstart" in document.body) {
      document.addEventListener("touchstart", this.pressStart.bind(that), {
        once: true,
        passive: false,
      });
      document.addEventListener("touchend", this.init.bind(that), {
        once: true,
      });
    } else {
      document.addEventListener("mousedown", this.pressStart.bind(that), {
        once: true,
      });
      document.addEventListener("mouseup", this.init.bind(that), {
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
    if (e.target.className.split(" ").indexOf(options.triggerClass) < 0)
      return;

    that.timer = setTimeout(() => {
      that.handleLongPress(e.target);
    }, options.pressDelay);
  };

  /**
   * trigger longpress event
   * @param {HTMLElemnt} target
   */
  LongPress.prototype.handleLongPress = function (target) {
    target.dispatchEvent(new Event(this.options.eventName, { bubbles: true }));
  };

  return LongPress;
});
