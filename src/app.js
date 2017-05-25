import LED from "./LED";
import http from "http";
import express from "express";
import parser from "body-parser";
import cors from "cors";

// Start instance of express and set port
const app = express();
const port = process.env.PORT || 8080;


// Register body-parser
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

// Create instance of LED class
const led = new LED();


// -------------------------->
// ROUTES -------------------->
// ---------------------------->

// On request send JSON file with LED state
app.get("/device", function(req, res) {
  console.log("Color is set to: " + led.color);

  res.json({ color: led.color });
});

// Device can't accept CORS header
// Website needs CORS header (this is for the site)
app.get("/color", cors(), function(req, res) {
  console.log("Color is set to: " + led.color);

  res.json({ color: led.color });
});

// Send update color state
app.post("/color", cors(), function(req, res) {

  // Grab color from body of the request
  let color = req.body.color;
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

  res.json({
    color: led.color,
    links: [
      url: "http://iot-hello-world.herokuapp.com/color",
      controller: "http://iot.matthewbryancurtis.com/"
    ],
    address: [
      city: "Portland",
      state: "Oregon"
    ]
  });
});


// Start the app and log the port
app.listen(port);
console.log("Listening on " + port);
