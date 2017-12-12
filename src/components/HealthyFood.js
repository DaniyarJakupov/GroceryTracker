import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Icon,
  Right,
  Left,
  Body,
} from 'native-base';

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
  };

  render() {
    return (
      <Container>
        <Content>
          {this.state.items.map(item => (
            <Card key={item.name}>
              <CardItem>
                <Left>
                  <TouchableOpacity onPress={() => null}>
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
