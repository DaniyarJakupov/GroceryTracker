import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Content, Button, Text, Title, Body } from 'native-base';

class NotificationsScreen extends Component {
  state = {};

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Notifications</Title>
          </Body>
        </Header>
      </Container>
    );
  }
}

export default NotificationsScreen;
