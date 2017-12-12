import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Content, Card, CardItem, Text, Icon, Right, Left } from 'native-base';
import Popover from 'react-native-popover';

export default class HealthyFood extends Component {
  state = {
    items: [
      { name: 'Walnuts' },
      { name: 'Salmon' },
      { name: 'Lemons' },
      { name: 'Broccoli' },
      { name: 'Dark Chocolate' },
      { name: 'Garlic' },
      { name: 'Beans' },
      { name: 'Eggs' },
      { name: 'Chicken Breasts' },
      { name: 'Shrimp' },
    ],
    isPopoverVisible: false,
    cardRect: {},
  };

  onInfoPress = () => {
    this.props.navigation.navigate('Pop');
  };

  render() {
    return (
      <Container>
        <Content>
          {this.state.items.map(item => (
            <Card key={item.name}>
              <CardItem>
                <Left>
                  <TouchableOpacity onPress={this.onInfoPress}>
                    <Icon name="information-circle" fontSize={15} />
                  </TouchableOpacity>
                </Left>

                <Text>{item.name}</Text>

                <Right>
                  <TouchableOpacity onPress={() => null}>
                    <Icon name="arrow-forward" />
                  </TouchableOpacity>
                </Right>
              </CardItem>
            </Card>
          ))}
        </Content>
      </Container>
    );
  }
}
