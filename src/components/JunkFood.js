import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Content, Card, CardItem, Text, Icon, Right, Left } from 'native-base';
import { connect } from 'react-redux';

const food = [
  { name: 'Pizza' },
  { name: 'Hamburgers' },
  { name: 'Cookies' },
  { name: 'French Fries' },
  { name: 'Ice Cream' },
  { name: 'Candy Bars' },
];

class JunkFood extends Component {
  state = {
    items: [],
  };

  render() {
    return (
      <Container>
        <Content>
          {this.props.items
            .filter(i => i.name === 'Pizza' || i.name === 'Cookies' || i.name === 'French Fries')
            .map(item => (
              <Card key={item.name}>
                <CardItem style={{ backgroundColor: 'peru' }}>
                  <Left />

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

const mapStateToProps = state => ({
  items: state.items,
});

export default connect(mapStateToProps)(JunkFood);
