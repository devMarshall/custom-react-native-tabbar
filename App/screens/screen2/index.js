import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    fontFamily: 'Raleway-Regular',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'Raleway-Regular',
  },
  instructions: {
    fontSize: 30,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontFamily: 'Raleway-Regular',
  },
});

class Screen2 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Screen 2</Text>
      </View>
    );
  }
}

export default Screen2;
