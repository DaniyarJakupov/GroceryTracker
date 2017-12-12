import React, { Component } from 'react';
import { View, Text } from 'react-native';

class ProfileScreen extends Component {
  state = {};

  render() {
    return (
      <View style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile </Text>
      </View>
    );
  }
}

export default ProfileScreen;
