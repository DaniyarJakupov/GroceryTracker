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
  CheckBox,
} from 'native-base';
import Prompt from 'rn-prompt';
import { connect } from 'react-redux';

import { addItemArray, addItem, addJunkItem, removeItem } from '../redux/actions';

class JunkFood extends Component {
  state = {
    selectedItems: [],
    active: false,
    promptVisible: false,
    promtValue: {},
  };

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
  onAddPress = () => {
    this.setState({ promptVisible: true });
  };
  onConsumePress = () => {
    this.state.selectedItems.map(item => this.props.removeItem(item));
    this.props.addJunkItem(this.state.selectedItems);
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
                i.name === 'pizza' ||
                i.name === 'cookies' ||
                i.name === 'french fries' ||
                i.name === 'candys' ||
                i.name === 'hamburgers' ||
                i.name === 'sausages' ||
                i.name === 'sugar' ||
                i.name === 'cake' ||
                i.name === 'fast food' ||
                i.name === 'chips' ||
                i.name === 'coke',
            )
            .map(item => (
              <Card key={item.name}>
                <CardItem style={{ backgroundColor: 'peru' }}>
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
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={() => this.setState({ active: !this.state.active })}
        >
          <Icon name="menu" />
          <Button style={{ backgroundColor: '#3B5998' }} onPress={this.onAddPress}>
            <Icon name="add" style={{ fontSize: 30 }} />
          </Button>
          <Button style={{ backgroundColor: 'peru' }} onPress={this.onConsumePress}>
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

export default connect(mapStateToProps, { addItemArray, addItem, removeItem, addJunkItem })(
  JunkFood,
);
