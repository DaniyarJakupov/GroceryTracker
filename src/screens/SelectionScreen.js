import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  DeviceEventEmitter,
} from 'react-native';
import { connect } from 'react-redux';
import Swipeable from 'react-native-swipeable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Divider } from 'react-native-elements';
import { Kaede } from 'react-native-textinput-effects';
import { Container, Header, Content, Body, Title, Button, Left, Icon, Right } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';

import ModalSelector from 'react-native-modal-selector';

import { fetchRecipes, addItem, removeItem, addItemArray } from '../redux/actions';

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
    const foodItemName = text.toLowerCase();
    this.setState({ value: foodItemName });
  };
  onInputEnter = () => {
    let newItem = { name: this.state.value, checked: false, expDate: 'None' };
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
    this.props.navigation.navigate('Groceries');

    this.props.addItemArray(this.state.items);
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
    this.setState({ item: { ...this.state.item, expDate: date } });
    this.hideDateTimePicker();
    // setTimeout(() => {
    //   this.props.addItem(this.state.item);
    // }, 1000);
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
    let index = 0;
    const data = [
      { key: index++, label: 'milk' },
      { key: index++, label: 'potatoes' },
      { key: index++, label: 'pizza' },
      { key: index++, label: 'beans' },
      { key: index++, label: 'oranges' },
      { key: index++, label: 'shrimps' },
      { key: index++, label: 'salmon' },
      { key: index++, label: 'cookies' },
      { key: index++, label: 'apples' },
      { key: index++, label: 'french fries' },
      { key: index++, label: 'eggs' },
      { key: index++, label: 'bananas' },
      { key: index++, label: 'sweets' },
      { key: index++, label: 'broccoli' },
      { key: index++, label: 'fast food' },
      { key: index++, label: 'chicken' },
      { key: index++, label: 'hamburgers' },
      { key: index++, label: 'vegetables' },
      { key: index++, label: 'sausages' },
      { key: index++, label: 'lemons' },
      { key: index++, label: 'tomatoes' },
      { key: index++, label: 'cake' },
      { key: index++, label: 'dark chocolate' },
      { key: index++, label: 'chips' },
      { key: index++, label: 'coke' },
      { key: index++, label: 'garlic' },
      { key: index++, label: 'grapes' },
      { key: index++, label: 'turkey' },
      { key: index++, label: 'pork' },
    ];

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
              <ModalSelector
                style={{ backgroundColor: '#fcb794' }}
                data={data}
                initValue="Select your groceries"
                onChange={option => {
                  let newItem = { name: option.label, checked: false, expDate: 'None' };
                  this.setState(
                    (prevState, props) => ({
                      items: [newItem, ...prevState.items],
                      value: '',
                      item: newItem,
                    }),
                    () => console.log(this.state.items),
                  );
                }}
              />
            </View>

            {/* <View style={styles.itemInputWrapper}>
              <Kaede
                label="Enter a new item"
                autoCapitalize="none"
                autoCorrect={false}
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
            </View> */}

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
            <TouchableOpacity onPress={this.onBtnPress}>
              <View style={styles.btn}>
                <Text style={{ fontSize: 26, color: '#fff', marginRight: 10 }}>Next</Text>
                <Ionicons name="md-arrow-forward" size={26} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
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
    marginTop: 20,
    marginBottom: 15,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 18,
  },
  itemInputWrapper: {
    marginBottom: 20,
  },
  btn: {
    width: 200,
    height: 70,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: '#8781bd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: '#000',
    elevation: 2,
  },
  btnWrapper: {
    position: 'absolute',
    bottom: 20,
    right: 0,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

const mapStateToProps = state => ({
  items: state.items,
});

export default connect(mapStateToProps, { fetchRecipes, addItem, removeItem, addItemArray })(
  SelectionScreen,
);
