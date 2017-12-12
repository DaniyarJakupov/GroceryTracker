import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import Swipeable from 'react-native-swipeable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Divider } from 'react-native-elements';
import { Kaede } from 'react-native-textinput-effects';
import { Container, Header, Content, Body, Title, Button, Left, Icon, Right } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';

import { fetchRecipes, addItem, removeItem } from '../redux/actions';

import { colors } from '../utils/constants';

class SelectionScreen extends Component {
  state = {
    currentlyOpenSwipeable: null,
    value: '',
    isDateTimePickerVisible: false,
    items: [],
    item: {},
    expirationDate: [],
  };

  /* Text Input */
  onInputChange = text => {
    this.setState({ value: text });
  };
  onInputEnter = () => {
    let newItem = { name: this.state.value };
    //this.props.addItem(newItem);
    this.setState(
      (prevState, props) => ({ items: [newItem, ...prevState.items], value: '', item: newItem }),
      () => console.log(this.state.items),
    );
  };
  /* ================================================================================= */
  /* Item Remove Button */
  onItemRemove = selectedItem => {
    // const newItemsArray = this.props.items.filter(item => item.name !== selectedItem.name);
    // this.setState((prevState, props) => ({
    //   items: newItemsArray,
    // }));
  };
  /* ================================================================================= */
  /* Done Button */
  onBtnPress = () => {
    let itemsNames = this.state.items.map(item => item.name);
    const query = itemsNames.join('+');
    this.props.fetchRecipes(query);

    setTimeout(() => {
      this.props.navigation.navigate('Groceries');
      console.log('redux items', this.props.items);
    }, 2000);
  };
  /* ================================================================================= */
  handleScroll = () => {
    const { currentlyOpenSwipeable } = this.state;

    if (currentlyOpenSwipeable) {
      currentlyOpenSwipeable.recenter();
    }
  };
  /* ================================================================================= */
  /* Pick a date */
  showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
  handleDatePicked = date => {
    console.log('A date has been picked: ', date);
    this.setState({ item: { ...this.state.item, expDate: date } });
    this.hideDateTimePicker();
    setTimeout(() => {
      this.props.addItem(this.state.item);
    }, 1000);
  };
  /* ================================================================================= */

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
      <Container>
        <Header>
          <Body>
            <Title>Groceries List</Title>
          </Body>
        </Header>

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
                onSubmitEditing={this.onInputEnter}
                labelStyle={{
                  color: 'white',
                  backgroundColor: '#fcb794',
                }}
                inputStyle={{
                  color: 'white',
                  backgroundColor: '#8781bd',
                }}
              />
            </View>

            {this.state.items.map(item => (
              <View style={styles.wrapper} key={item.name}>
                <Swipeable
                  leftButtonWidth={60}
                  leftButtons={[
                    <TouchableOpacity
                      style={[styles.leftSwipeItem, { backgroundColor: 'lightseagreen' }]}
                      onPress={this.showDateTimePicker}
                    >
                      <Ionicons
                        style={{ backgroundColor: 'transparent' }}
                        name="ios-calendar"
                        size={35}
                        color="white"
                      />
                    </TouchableOpacity>,
                  ]}
                  rightButtons={[
                    <TouchableOpacity
                      style={[styles.rightSwipeItem, { backgroundColor: 'lightseagreen' }]}
                    >
                      <Ionicons
                        style={{ backgroundColor: 'transparent' }}
                        name="ios-checkmark-circle-outline"
                        size={35}
                        color="white"
                      />
                    </TouchableOpacity>,
                    <TouchableOpacity
                      style={[styles.rightSwipeItem, { backgroundColor: 'orchid' }]}
                      onPress={() => {
                        this.setState({
                          items: this.state.items.filter(arrItem => arrItem.name !== item.name),
                        });
                        this.props.removeItem(item);
                      }}
                    >
                      <Ionicons
                        style={{ backgroundColor: 'transparent' }}
                        name="ios-close-circle-outline"
                        size={35}
                        color="white"
                      />
                    </TouchableOpacity>,
                  ]}
                  onRightButtonsOpenRelease={itemProps.onOpen}
                  onRightButtonsCloseRelease={itemProps.onClose}
                >
                  <View style={[styles.listItem, { backgroundColor: '#8781bd' }]}>
                    <Text style={{ fontSize: 20, color: '#fff' }}>{item.name}</Text>
                  </View>
                </Swipeable>
              </View>
            ))}
          </ScrollView>

          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
          />

          <View style={styles.btnWrapper}>
            <Button block backgroundColor="#fcb794" onPress={this.onBtnPress}>
              <Text style={{ fontSize: 20, color: '#fff' }}>Done</Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: '80%',
    top: 500,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

const mapStateToProps = state => ({
  items: state.items,
});

export default connect(mapStateToProps, { fetchRecipes, addItem, removeItem })(SelectionScreen);
