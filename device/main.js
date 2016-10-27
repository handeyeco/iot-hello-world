const wifi = require('Wifi');
const http = require('http');

let interval = 5000,
    color = null;

let httpOptions = {
  host: 'iot-hello-world.herokuapp.com',
  path: '/color',
  method: 'GET'
};

wifi.connect("CenturyLink1796", { password: "3ebc73c7dkebra" }, error => {
  if (error) {
    console.error("WiFi error: " + error)
  } else {
    console.log("Connected to WiFi");
    getColor();
  };
});

function getColor() {
  http.get(httpOptions, (res) => {
    console.log("HTTP get...");

    res.on('data', (data) => {
      data = JSON.parse(data);
      color = data.color;
      setLEDColor();
    });
  });
}

function setLEDColor() {
  console.log("Setting color to " + color);

  let blue  = color === "blue",
      green = color === "green",
      red   = color === "red";

  digitalWrite(D0, blue);
  digitalWrite(D2, green);
  digitalWrite(D4, red);
}

setInterval(() => {
    getColor();
}, interval);
