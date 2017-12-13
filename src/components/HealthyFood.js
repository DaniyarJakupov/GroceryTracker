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
import { connect } from 'react-redux';

import { fetchRecipes, addItemArray } from '../redux/actions';

const food = [
  { name: 'Walnuts', checked: false },
  { name: 'Salmon', checked: false },
  { name: 'Lemons', checked: false },
  { name: 'Broccoli', checked: false },
  { name: 'Dark Chocolate', checked: false },
  { name: 'Garlic', checked: false },
  { name: 'Beans', checked: false },
  { name: 'Eggs', checked: false },
  { name: 'Chicken Breasts', checked: false },
  { name: 'Shrimps', checked: false },
];

class HealthyFood extends Component {
  state = {
    items: [],
    selectedItems: [],
    active: false,
  };

  componentDidMount() {
    console.log(this.props.items);
  }

  onItemPress(checkedItem) {
    const newItems = this.props.items.map(
      item => (item.name === checkedItem.name ? { name: item.name, checked: !item.checked } : item),
    );
    // this.setState({
    //   items: newItems,
    // });
    this.props.addItemArray(newItems);
    setTimeout(() => {
      this.setState({
        selectedItems: this.props.items.filter(i => i.checked),
      });
    }, 500);
  }

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

  render() {
    return (
      <Container>
        <Content>
          {this.props.items
            .filter(
              i =>
                i.name === 'Eggs' ||
                i.name === 'Salmon' ||
                i.name === 'Garlic' ||
                i.name === 'Broccoli' ||
                i.name === 'Shrimps' ||
                i.name === 'Lemons' ||
                i.name === 'Dark Chocolate' ||
                i.name === 'Beans',
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
          <Button style={{ backgroundColor: '#3B5998' }}>
            <Icon name="add" style={{ fontSize: 30 }} />
          </Button>
          <Button style={{ backgroundColor: '#34A34F' }}>
            <Icon name="checkmark" style={{ fontSize: 30 }} />
          </Button>
        </Fab>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  items: state.items,
});

export default connect(mapStateToProps, { fetchRecipes, addItemArray })(HealthyFood);
