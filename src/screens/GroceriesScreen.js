import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Content, Tab, Tabs, Button, Text, Title, Body } from 'native-base';

import HealthyFood from '../components/HealthyFood';
import JunkFood from '../components/JunkFood';

class GroceriesScreen extends Component {
  state = {};

  render() {
    return (
      <Container>
        <Header hasTabs>
          <Body>
            <Title>Your groceries</Title>
          </Body>
        </Header>

        <Tabs initialPage={0}>
          <Tab heading="Healthy food">
            <HealthyFood navigation={this.props.navigation} />
          </Tab>
          <Tab heading="Junk food">
            <JunkFood />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default GroceriesScreen;
