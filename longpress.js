"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  var defaultOptions = {
    triggerClass: "long-press",
    pressDelay: 800
  };
  var options;
  var timer; // constructor

  function LongPress(opts) {
    options = _objectSpread(_objectSpread({}, defaultOptions), {}, {
      opts: opts
    });
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
        once: true
      });
      document.addEventListener("touchend", init, {
        once: true
      });
    } else {
      document.addEventListener("mousedown", pressStart, {
        once: true
      });
      document.addEventListener("mouseup", init, {
        once: true
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
    timer = setTimeout(function () {
      handleLongPress(e.target);
    }, options.pressDelay);
  }
  /**
   *
   * @param {HTMLElemnt} target
   */


  function handleLongPress(target) {
    target.dispatchEvent(new Event("longpress", {
      bubbles: true
    }));
  }

  return LongPress;
});