var container = document.getElementById('container');
var colors = Array.prototype.slice.call(document.getElementsByClassName('color'));

var colorState = null;

initialize();
var pingInterval = window.setInterval(getServerColor, 5000);

/******************************************

UTILITIES

******************************************/
function initialize() {
  //Add onclick handlers for each color div
  colors.forEach(function (elem) {
    elem.onclick = handleColorClick;
  });

  //Set resize callback to adjust portrait display
  columnOrRow();
  window.onresize = columnOrRow;

  //Ping server for current color
  getServerColor();
}

function validateColor(color) {
  //Check to make sure color fits into one of three categories
  if (color == "blue" || color == "green" || color == "red") {
    return true;
  } else {
    return false;
  }
}

function handleColorClick(event) {
  //Grab color from event
  var color = event.target.id;

  setServerColor(color);
}

/******************************************

DISPLAY

******************************************/
function isPortrait () {
  //Get window dimensions
  var width = window.innerWidth,
      height = window.innerHeight;

  //Return true if portrait else false
  if (height > width) {
    return true;
  } else {
    return false;
  }
}

function columnOrRow() {
  //Add/remove "portrait" class depending on dimensions
  if ( isPortrait() ) {
    container.classList.add("portrait");
  } else {
    container.classList.remove("portrait");
  }
}

/******************************************

CLIENT STATE

******************************************/
function setColorState(color) {
  //If input is object, set color to input.color
  //otherwise set color to input
  color = color.color || color;

  // console.log(colorState + " => " + color);

  //If input is different than current state
  if (color != colorState) {
    //If input is good, set state to color
    if ( validateColor(color) ) {
      colorState = color;
    //Else set state to null and console error
    } else {
      colorState == null;
      console.error("Unable to set color to: " + color);
    }

    setActiveColor(color);
  }
}

function setActiveColor(color) {
  //Loop over color divs to add or remove active class
  colors.forEach(function (elem) {
    if (elem.id == color) {
      elem.classList.add("active");
    } else {
      elem.classList.remove("active");
    }
  });
}

/******************************************

SERVER STATE

******************************************/
function getServerColor() {
  //AJAX request for heroku server color state
  jQuery.getJSON(
    "https://iot-hello-world.herokuapp.com/color",
    setColorState
  )
}

function setServerColor(color) {
  //If color input doesn't validate, error and break
  if ( !validateColor(color) ) {
    console.log("Unable to send request for color: " + color);
    return;
  }

  //Send AJAX POST to server
  jQuery.post(
    "https://iot-hello-world.herokuapp.com/color",
    { color: color },
    //When successful, update client color state
    setColorState
  );
}
