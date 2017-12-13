import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Content, Card, CardItem, Text, Icon, Right, Left } from 'native-base';

export default class JunkFood extends Component {
  state = {
    items: [
      { name: 'Pizza' },
      { name: 'Hamburgers' },
      { name: 'Cookies' },
      { name: 'French Fries' },
      { name: 'Ice Cream' },
      { name: 'Candy Bars' },
    ],
  };

  render() {
    return (
      <Container>
        <Content>
          {this.state.items.map(item => (
            <Card key={item.name}>
              <CardItem style={{ backgroundColor: 'peru' }}>
                <Left>
                  <TouchableOpacity>
                    <Icon
                      name="information-circle"
                      fontSize={15}
                      style={{ color: 'transparent' }}
                    />
                  </TouchableOpacity>
                </Left>

                <Text style={{ color: '#fff', fontSize: 20 }}>{item.name}</Text>

                <Right>
                  <TouchableOpacity>
                    <Icon name="arrow-forward" style={{ color: 'transparent' }} />
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
