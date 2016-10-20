export default class LED {

  constructor() {
    this.color = "blue";
  }

  changeColor(newColor) {
    if (newColor === "red") {
      this.color = "red";
    } else if (newColor === "green") {
      this.color = "green";
    } else {
      this.color = "blue";
    }
  }

}
