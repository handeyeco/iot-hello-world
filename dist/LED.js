"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LED = function () {
  function LED() {
    _classCallCheck(this, LED);

    this.color = "blue";
  }

  _createClass(LED, [{
    key: "changeColor",
    value: function changeColor(newColor) {
      if (newColor !== this.color) {
        if (newColor === "red") {
          this.color = "red";
        } else if (newColor === "green") {
          this.color = "green";
        } else {
          this.color = "blue";
        }
      }
    }
  }]);

  return LED;
}();

exports.default = LED;