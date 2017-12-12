import React, { Component } from 'react';
import { View, Text } from 'react-native';

class ShoppingCartScreen extends Component {
  state = {};

  render() {
    return (
      <View style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Shopping Cart </Text>
      </View>
    );
  }
}

export default ShoppingCartScreen;
