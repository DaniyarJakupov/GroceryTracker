import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Swipeable from 'react-native-swipeable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Divider } from 'react-native-elements';
import { Kaede } from 'react-native-textinput-effects';
import { Button } from 'react-native-elements';

class SelectionScreen extends Component {
  state = {
    currentlyOpenSwipeable: null,
    value: '',
    items: [],
  };

  onInputChange = text => {
    this.setState({ value: text });
  };

  onSubmit = () => {
    let newItem = { name: this.state.value };
    this.setState((prevState, props) => ({ items: [newItem, ...prevState.items], value: '' }));
    console.log(this.state.items);
  };

  handleScroll = () => {
    const { currentlyOpenSwipeable } = this.state;

    if (currentlyOpenSwipeable) {
      currentlyOpenSwipeable.recenter();
    }
  };

  render() {
    const { currentlyOpenSwipeable } = this.state;
    const itemProps = {
      onOpen: (event, gestureState, swipeable) => {
        if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
          currentlyOpenSwipeable.recenter();
        }

        this.setState({ currentlyOpenSwipeable: swipeable });
      },
      onClose: () => this.setState({ currentlyOpenSwipeable: null }),
    };

    return (
      <View style={styles.container}>
        <ScrollView onScroll={this.handleScroll}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Enter groceries that you currently have:</Text>
          </View>

          <View style={styles.itemInputWrapper}>
            <Kaede
              label="Enter a new item"
              value={this.state.value}
              onChangeText={this.onInputChange}
              onSubmitEditing={this.onSubmit}
            />
          </View>

          {this.state.items.map(item => <Item1 {...itemProps} key={item.name} item={item} />)}
        </ScrollView>

        <View style={styles.btnWrapper}>
          <Button
            large
            title="Done"
            raised
            borderRadius={15}
            containerViewStyle={{ borderRadius: 15 }}
            backgroundColor="#3A3897"
          />
        </View>
      </View>
    );
  }
}

function Item1({ onOpen, onClose, item }) {
  return (
    <View style={styles.wrapper}>
      <Swipeable
        rightButtons={[
          <TouchableOpacity style={[styles.rightSwipeItem, { backgroundColor: 'lightseagreen' }]}>
            <Ionicons
              style={{ backgroundColor: 'transparent' }}
              name="ios-checkmark-circle-outline"
              size={35}
              color="white"
            />
          </TouchableOpacity>,
          <TouchableOpacity style={[styles.rightSwipeItem, { backgroundColor: 'orchid' }]}>
            <Ionicons
              style={{ backgroundColor: 'transparent' }}
              name="ios-close-circle-outline"
              size={35}
              color="white"
            />
          </TouchableOpacity>,
        ]}
        onRightButtonsOpenRelease={onOpen}
        onRightButtonsCloseRelease={onClose}
      >
        <View style={[styles.listItem]}>
          <Text>{item.name}</Text>
        </View>
      </Swipeable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'lightblue',
  },
  wrapper: {},
  listItem: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.5)',
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  titleWrapper: {
    marginTop: 10,
    marginBottom: 15,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 18,
  },
  itemInputWrapper: {
    marginBottom: 20,
  },
  btnWrapper: {
    position: 'absolute',
    width: '100%',
    top: 500,
    justifyContent: 'center',
  },
});

export default SelectionScreen;
