"use strict";

var _LED = require("./LED");

var _LED2 = _interopRequireDefault(_LED);

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Start instance of express and set port
var app = (0, _express2.default)();
var port = process.env.PORT || 8080;

// Register body-parser
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

// Create instance of LED class
var led = new _LED2.default();

// -------------------------->
// ROUTES -------------------->
// ---------------------------->
app.get("/color", function (req, res) {
  console.log("Color is set to: " + led.color);

  res.json({ color: led.color });
});

app.post("/color", function (req, res) {

  // Grab color from body of the request
  var color = req.body.color;
  console.log("Setting to: ");
  console.log(color);

  // Change LED color
  led.changeColor(color);

  // If LED color and request color don't match
  // Console log error
  if (led.color !== color) {
    console.log("Error changing to: " + color);
  }

  // Console log color and return JSON object
  console.log("Color currently set to: " + led.color);

  res.json({ color: led.color });
});

// Start the app and log the port
app.listen(port);
console.log("Listening on " + port);