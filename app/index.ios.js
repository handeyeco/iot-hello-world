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
      loading: true,
      active: null
    }


    // Call server for current color
    this.requestColor();

    // Request color every  five second
    setInterval(this.requestColor.bind(this), 5000);
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
    fetch('http://localhost:8080/color', settings);

    // Request color
    this.requestColor();
  }


  // Request current color from server
  requestColor() {

    // Fetch request
    fetch('http://localhost:8080/color')
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
        blue  = active === "blue"   ? "#3079AB" : "#1E4C6B",
        green = active === "green"  ? "#79AB30" : "#4C6B1E",
        red   = active === "red"    ? "#AB303C" : "#6B1E25";

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
