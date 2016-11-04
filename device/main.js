// Run code when board loads up
E.on("init", () => {

  // Import modules
  const wifi = require('Wifi');
  const http = require('http');

  // Import WiFi credentials
  const {ssid, pw} = require('./private/wifi.js');

  // State of LED color
  let color = null;

  // Information on where to pull
  // JSON object for LED state
  let httpOptions = {
    host: 'iot-hello-world.herokuapp.com',
    path: '/color',
    method: 'GET'
  };


  // Connect to WiFi
  wifi.connect(ssid, { password: pw }, error => {
    if (error) {
      console.error("WiFi error: " + error)
    } else {
      console.log("Connected to WiFi.");
      getColor();
    };
  });


  // Make HTTP GET request for LED state JSON
  function getColor() {
    http.get(httpOptions, (res) => {
      console.log("HTTP get...");

      // When data is returned update LED color state
      res.on('data', (data) => {
        data = JSON.parse(data);
        color = data.color;
        setLEDColor();
      });
    });
  }


  // Update the physical LEDs
  function setLEDColor() {
    console.log("Setting color to " + color);

    // If truthy...
    let blue  = color === "blue",
        green = color === "green",
        red   = color === "red";

    // ...light LED
    digitalWrite(D0, blue);   // D3 on board
    digitalWrite(D2, green);  // D4 on board
    digitalWrite(D4, red);    // D2 on board
  }


  // Interval to check/update color state
  setInterval(() => {
      getColor();
  }, 2000);

}); // End init

// Save code to board hypothetically!
save();
