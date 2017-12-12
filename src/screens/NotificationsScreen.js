import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Notification } from 'rx';

class NotificationsScreen extends Component {
  state = {};

  render() {
    return (
      <View style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Notifications </Text>
      </View>
    );
  }
}

export default NotificationsScreen;
