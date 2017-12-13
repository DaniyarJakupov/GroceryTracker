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

import { fetchRecipes } from '../redux/actions';

class HealthyFood extends Component {
  state = {
    items: [
      { name: 'Walnuts', checked: false },
      { name: 'Salmon', checked: false },
      { name: 'Lemons', checked: false },
      { name: 'Broccoli', checked: false },
      { name: 'Dark Chocolate', checked: false },
      { name: 'Garlic', checked: false },
      { name: 'Beans', checked: false },
      { name: 'Eggs', checked: false },
      { name: 'Chicken Breasts', checked: false },
      { name: 'Shrimp', checked: false },
    ],
    selectedItems: [],
    active: false,
  };

  componentDidMount() {
    console.log(this.props.items);
  }

  onItemPress(checkedItem) {
    const newItems = this.state.items.map(
      item => (item.name === checkedItem.name ? { name: item.name, checked: !item.checked } : item),
    );
    this.setState({
      items: newItems,
    });
    setTimeout(() => {
      this.setState({
        selectedItems: this.state.items.filter(i => i.checked),
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
          {this.state.items.map(item => (
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
          <Icon name="share" />
          <Button style={{ backgroundColor: '#DD5144' }} onPress={this.onSearchPress}>
            <Icon name="search" />
          </Button>
        </Fab>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  items: state.items,
});

export default connect(mapStateToProps, { fetchRecipes })(HealthyFood);
