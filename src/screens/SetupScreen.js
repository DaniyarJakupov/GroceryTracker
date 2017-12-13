import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Container,
  Header,
  Content,
  Button,
  Text,
  Title,
  Body,
  Form,
  Item,
  Input,
  Label,
} from 'native-base';

import { colors } from '../utils/constants';

class SetupScreen extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      age: '',
      weight: '',
      done: false,
    };
  }

  onBtnPress = () => {
    this.props.navigation.navigate('Selection');
  };
  onNameChange = text => {
    this.setState({ name: text });
    if (
      this.state.name.length >= 1 &&
      this.state.age.length >= 1 &&
      this.state.weight.length >= 1
    ) {
      this.setState({ done: true });
    }
  };
  onAgeChange = text => {
    this.setState({ age: text });
    if (
      this.state.name.length >= 1 &&
      this.state.age.length >= 1 &&
      this.state.weight.length >= 1
    ) {
      this.setState({ done: true });
    }
  };
  onWeightChange = text => {
    this.setState({ weight: text });
    if (
      this.state.name.length >= 1 &&
      this.state.age.length >= 1 &&
      this.state.weight.length >= 1
    ) {
      this.setState({ done: true });
    }
  };

  renderBtn = () => {};

  render() {
    const { name, age, weight } = this.state;

    return (
      <Container>
        <Header>
          <Body>
            <Title>Setup Your Profile</Title>
          </Body>
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input value={name} onChangeText={this.onNameChange} />
            </Item>
            <Item floatingLabel>
              <Label>Age</Label>
              <Input value={age} onChangeText={this.onAgeChange} keyboardType="numeric" />
            </Item>
            <Item floatingLabel last>
              <Label>Weight, kg</Label>
              <Input value={weight} onChangeText={this.onWeightChange} keyboardType="numeric" />
            </Item>
          </Form>
          <View style={styles.btnWrapper}>
            {this.state.done ? (
              <Button block success onPress={this.onBtnPress}>
                <Text>Done</Text>
              </Button>
            ) : (
              <Button block disabled onPress={this.onBtnPress}>
                <Text>Done</Text>
              </Button>
            )}
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnWrapper: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default SetupScreen;
