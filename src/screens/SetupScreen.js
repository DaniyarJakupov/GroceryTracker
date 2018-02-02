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
  ListItem,
  CheckBox,
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
      vegetarian: false,
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
              <Input value={name} onChangeText={this.onNameChange} autoCorrect={false} />
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

          <ListItem>
            <Body style={{ paddingTop: 10 }}>
              <Text style={{ fontSize: 18, color: 'rgba(0,0,0,0.65)', marginLeft: -1 }}>
                Are you vegetarian?
              </Text>
            </Body>
            <CheckBox
              checked={this.state.vegetarian}
              onPress={() => this.setState({ vegetarian: !this.state.vegetarian })}
            />
          </ListItem>

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
    marginTop: 80,
  },
});

export default SetupScreen;
