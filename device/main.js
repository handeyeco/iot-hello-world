var interval = 1000,

    colors = ["blue", "green", "red"],
    index = 0;

function setLights (color) {
  digitalWrite(D0, color === "blue");
  digitalWrite(D1, color === "green");
  digitalWrite(D2, color === "red");
}

setInterval(function(){

  setLights( colors[index] );

  index = (index + 1) % 3;

}, interval);
