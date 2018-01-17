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
  state = {
    healthyFood: 0,
    junkFood: 0,
  };

  componentWillReceiveProps(newProps) {
    const healthyFoodNumber = newProps.items.healthyFood.length;
    const junkFoodNumber = newProps.items.junkFood.length;
    if (healthyFoodNumber == 0) {
      this.setState({ junkFood: 100 });
    } else if (junkFoodNumber == 0) {
      this.setState({ healthyFood: 100 });
    } else {
      const ratio = healthyFoodNumber / junkFoodNumber;
      const junkFoodPortion = 100 / (ratio + 1);
      const healthyFoodPortion = ratio * junkFoodPortion;
      this.setState({ healthyFood: healthyFoodPortion, junkFood: junkFoodPortion });
    }
  }

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
            {this.state.healthyFood == 0 && this.state.junkFood == 0 ? (
              <VictoryPie
                animate={{ duration: 2000, easing: 'bounce' }}
                width={370}
                data={[{ x: 'No data', y: 100 }]}
                style={{ labels: { fontSize: 18, fontWeight: 'bold', fill: 'rebeccapurple' } }}
              />
            ) : (
              <VictoryPie
                animate={{ duration: 2000, easing: 'bounce' }}
                colorScale={['#5fb660', 'peru']}
                width={370}
                data={[
                  { x: 'Healthy', y: this.state.healthyFood },
                  { x: 'Junk', y: this.state.junkFood },
                ]}
                labelRadius={60}
                style={{ labels: { fontSize: 18, fontWeight: 'bold', fill: 'rebeccapurple' } }}
              />
            )}
          </Center>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  items: state.consumed,
});

export default connect(mapStateToProps)(ConsumptionScreen);
