import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, View, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppIntroSlider from 'react-native-app-intro-slider';

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    width: 320,
    height: 320,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
    fontSize: 26,
  },
  title: {
    fontSize: 32,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  },
});

const slides = [
  {
    key: 'somethun',
    title: 'Welcome!',
    text: 'Keep track of your groceries in one place!',
    icon: 'ios-pizza',
    colors: ['#63E2FF', '#B066FE'],
  },
  {
    key: 'somethun1',
    title: '',
    text: 'Receive recipe suggestions based on available food products!',
    icon: 'ios-paper-outline',
    colors: ['#A3A1FF', '#3A3897'],
  },
  {
    key: 'somethun2',
    title: 'Enjoy the app!',
    text: 'Visualize consumption of your groceries!',
    icon: 'ios-pie-outline',
    colors: ['#29ABE2', '#4F00BC'],
  },
];

class WelcomeScreen extends Component {
  onDone = () => {
    this.props.navigation.navigate('Setup');
  };

  _renderItem = props => (
    <LinearGradient
      style={[
        styles.mainContent,
        {
          paddingTop: props.topSpacer,
          paddingBottom: props.bottomSpacer,
        },
      ]}
      colors={props.colors}
      start={{ x: 0, y: 0.1 }}
      end={{ x: 0.1, y: 1 }}
    >
      <Ionicons
        style={{ backgroundColor: 'transparent' }}
        name={props.icon}
        size={200}
        color="white"
      />
      <View>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </LinearGradient>
  );

  render() {
    return (
      <AppIntroSlider
        slides={slides}
        renderItem={this._renderItem}
        bottomButton
        onDone={this.onDone}
      />
    );
  }
}

export default WelcomeScreen;
