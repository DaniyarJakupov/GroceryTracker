import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Icon,
  Right,
  Left,
  CheckBox,
  Fab,
  Button,
} from 'native-base';
import Prompt from 'rn-prompt';
import { connect } from 'react-redux';

import { fetchRecipes, addItemArray, addItem, addHealthyItem, removeItem } from '../redux/actions';

class HealthyFood extends Component {
  state = {
    selectedItems: [],
    active: false,
    promptVisible: false,
    promtValue: {},
  };

  componentDidMount() {
    console.log(this.props.items);
  }

  /* Item Press */
  onItemPress(checkedItem) {
    const newItems = this.props.items.map(
      item => (item.name === checkedItem.name ? { name: item.name, checked: !item.checked } : item),
    );
    this.props.addItemArray(newItems);
    setTimeout(() => {
      this.setState({
        selectedItems: this.props.items.filter(i => i.checked),
      });
    }, 500);
  }
  /* ================================================================================= */
  /* FAB Button */
  onSearchPress = () => {
    console.log(this.state.selectedItems);
    let itemsNames = this.state.selectedItems.map(item => item.name);
    const query = itemsNames.join('+');
    console.log(query);
    this.props.fetchRecipes(query);
    setTimeout(() => {
      this.props.navigation.navigate('Recipes');
    }, 1000);
  };
  onAddPress = () => {
    this.setState({ promptVisible: true });
    setTimeout(() => {
      //this.props.addItem(this.state.promtValue);
    }, 100);
  };
  onConsumePress = () => {
    this.state.selectedItems.map(item => this.props.removeItem(item));
    this.props.addHealthyItem(this.state.selectedItems);
    this.setState({ selectedItems: [] });
  };
  /* ================================================================================= */
  /* Promt Button */
  onPromtSubmit = value => {
    this.setState({
      promptVisible: false,
      promtValue: { name: value },
    });
    this.props.addItem({ name: value });
  };
  onPromtCancel = () => {
    this.setState({
      promptVisible: false,
    });
  };
  /* ================================================================================= */
  render() {
    return (
      <Container>
        <Content>
          {this.props.items
            .filter(
              i =>
                i.name === 'eggs' ||
                i.name === 'tomatos' ||
                i.name === 'potatoes' ||
                i.name === 'salmon' ||
                i.name === 'garlic' ||
                i.name === 'broccoli' ||
                i.name === 'shrimps' ||
                i.name === 'lemons' ||
                i.name === 'dark chocolate' ||
                i.name === 'apples' ||
                i.name === 'milk' ||
                i.name === 'bananas' ||
                i.name === 'grapes' ||
                i.name === 'oranges' ||
                i.name === 'kiwis' ||
                i.name === 'strawberries' ||
                i.name === 'vegetables' ||
                i.name === 'fruits' ||
                i.name === 'chicken' ||
                i.name === 'turkey' ||
                i.name === 'pork' ||
                i.name === 'beans',
            )
            .map(item => (
              <Card key={item.name}>
                <CardItem style={{ backgroundColor: '#5fb660' }}>
                  <Left>
                    <CheckBox
                      checked={item.checked}
                      color="#fff"
                      onPress={this.onItemPress.bind(this, item)}
                    />
                  </Left>

                  <TouchableOpacity onPress={this.onItemPress.bind(this, item)}>
                    <Text style={{ color: '#fff', fontSize: 20 }}>{item.name}</Text>
                  </TouchableOpacity>

                  <Right>
                    <TouchableOpacity onPress={this.onItemPress.bind(this, item)}>
                      <Icon name="arrow-forward" />
                    </TouchableOpacity>
                  </Right>
                </CardItem>
              </Card>
            ))}
        </Content>
        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={() => this.setState({ active: !this.state.active })}
        >
          <Icon name="menu" />
          <Button style={{ backgroundColor: '#DD5144' }} onPress={this.onSearchPress}>
            <Icon name="search" style={{ fontSize: 25 }} />
          </Button>
          <Button style={{ backgroundColor: '#3B5998' }} onPress={this.onAddPress}>
            <Icon name="add" style={{ fontSize: 30 }} />
          </Button>
          <Button style={{ backgroundColor: '#34A34F' }} onPress={this.onConsumePress}>
            <Icon name="checkmark" style={{ fontSize: 30 }} />
          </Button>
        </Fab>

        <Prompt
          title="Add new item"
          placeholder=""
          defaultValue=""
          visible={this.state.promptVisible}
          onCancel={this.onPromtCancel}
          onSubmit={this.onPromtSubmit}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  items: state.items,
});

export default connect(mapStateToProps, {
  fetchRecipes,
  addItemArray,
  addItem,
  addHealthyItem,
  removeItem,
})(HealthyFood);
