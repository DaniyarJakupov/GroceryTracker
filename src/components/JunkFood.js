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
  Fab,
  Button,
} from 'native-base';
import Prompt from 'rn-prompt';
import { connect } from 'react-redux';

import { addItemArray, addItem } from '../redux/actions';

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
    active: false,
    promptVisible: false,
    promtValue: {},
  };

  /* ================================================================================= */
  /* FAB Button */
  onAddPress = () => {
    this.setState({ promptVisible: true });
  };
  onConsumePress = () => {};
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
                i.name === 'Pizza' ||
                i.name === 'Cookies' ||
                i.name === 'French Fries' ||
                i.name === 'Coke',
            )
            .map(item => (
              <Card key={item.name}>
                <CardItem style={{ backgroundColor: 'peru' }}>
                  <Left>
                    <TouchableOpacity>
                      <Icon name="trash" />
                    </TouchableOpacity>
                  </Left>

                  <Text style={{ color: '#fff', fontSize: 20 }}>{item.name}</Text>

                  <Right>
                    <TouchableOpacity>
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
          style={{ backgroundColor: 'peru' }}
          position="bottomRight"
          onPress={() => this.setState({ active: !this.state.active })}
        >
          <Icon name="menu" />
          <Button style={{ backgroundColor: '#3B5998' }} onPress={this.onAddPress}>
            <Icon name="add" style={{ fontSize: 30 }} />
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

export default connect(mapStateToProps, { addItemArray, addItem })(JunkFood);
