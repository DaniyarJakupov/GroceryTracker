import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Content, Button, Text, Title, Body } from 'native-base';

class ProfileScreen extends Component {
  state = {};

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Profile</Title>
          </Body>
        </Header>
      </Container>
    );
  }
}

export default ProfileScreen;
