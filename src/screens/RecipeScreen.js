import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-elements';

class RecipeScreen extends Component {
  state = {
    items: [],
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          large
          title="Recipes"
          raised
          borderRadius={15}
          containerViewStyle={{ borderRadius: 15 }}
          backgroundColor="#3A3897"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});

export default RecipeScreen;
