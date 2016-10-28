/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native';

export default class app extends Component {
  constructor(props) {
    super(props);

    // Init with signal for loading and falsy color value
    this.state = {
      URL: 'https://iot-hello-world.herokuapp.com/color',
      loading: true,
      active: null
    }


    // Call server for current color
    this.requestColor();

    // Request color every  five seconds
    setInterval(this.requestColor.bind(this), 2000);
  }


  // POST new color to server
  // @param color string either "blue" "green" or "red"
  postColor(color) {

    // Set state to loading
    this.setState({loading: true});

    //Setup spec object for fetch POST
    const settings = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ color: color })
    };

    // POST new color
    fetch(this.state.URL, settings);

    // Request color
    this.requestColor();
  }


  // Request current color from server
  requestColor() {

    // Fetch request
    fetch(this.state.URL)
      .then((response) => {
        response.json().then((data) => {

          // Grab color from response
          let color = data.color;

          // Update state
          this.setState({
            loading: false,
            active: color,
          });
        });
      });
  }

  render() {
    let active = this.state.active,

        // Highlight view if it's the current color
        blue  = active === "blue"   ? "#14D4F4" : "#0D8599",
        green = active === "green"  ? "#8EE000" : "#598C00",
        red   = active === "red"    ? "#E53838" : "#8F2323";

    // If loading, show spinner
    if (this.state.loading) {
      return (
        <ActivityIndicator style={styles.flexOne}></ActivityIndicator>
      )

    // Else show touchable colors
    } else {
      return (
        <View style={styles.flexOne}>

          <TouchableHighlight onPress={ this.postColor.bind(this, "blue") } style={styles.flexOne}>
            <View style={[styles.flexOne, { backgroundColor: blue }]}></View>
          </TouchableHighlight>

          <TouchableHighlight onPress={ this.postColor.bind(this, "green") } style={styles.flexOne}>
            <View style={[styles.flexOne, { backgroundColor: green }]}></View>
          </TouchableHighlight>

          <TouchableHighlight onPress={ this.postColor.bind(this, "red") } style={styles.flexOne}>
            <View style={[styles.flexOne, { backgroundColor: red }]}></View>
          </TouchableHighlight>

        </View>
      );
    }
  }

}

const styles = StyleSheet.create({
  flexOne: {
    flex: 1
  }
});

AppRegistry.registerComponent('app', () => app);
