import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Container, Header, Content, Button, Text, Title, Body } from 'native-base';
import { VictoryPie } from 'victory-native';
import { connect } from 'react-redux';

const Center = styled.View`
  justify-content: center;
  align-items: center;
`;
class ConsumptionScreen extends Component {
  state = {};

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Consumed food for the last 7 days</Title>
          </Body>
        </Header>
        <Content>
          <Center>
            <VictoryPie
              animate={{ duration: 2000, easing: 'bounce' }}
              colorScale={['#5fb660', 'peru']}
              width={370}
              data={[{ x: 'Healthy', y: 35 }, { x: 'Junk', y: 40 }]}
              labelRadius={60}
              style={{ labels: { fontSize: 18, fontWeight: 'bold', fill: 'rebeccapurple' } }}
            />
          </Center>
        </Content>
      </Container>
    );
  }
}

export default ConsumptionScreen;
