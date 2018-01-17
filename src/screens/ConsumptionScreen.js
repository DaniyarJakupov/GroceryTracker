import React, { Component } from 'react';
import styled from 'styled-components/native';
import {
  Container,
  Body,
  Header,
  Content,
  Text,
  Title,
  List,
  ListItem,
  Separator,
} from 'native-base';
import { VictoryPie } from 'victory-native';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';

const Center = styled.View`
  justify-content: center;
  align-items: center;
`;
class ConsumptionScreen extends Component {
  state = {
    healthyFoodCount: 0,
    junkFoodCount: 0,
    healthyFood: [],
    junkFood: [],
  };

  componentWillReceiveProps(newProps) {
    this.setState({ healthyFood: newProps.items.healthyFood, junkFood: newProps.items.junkFood });
    const healthyFoodNumber = newProps.items.healthyFood.length;
    const junkFoodNumber = newProps.items.junkFood.length;
    if (healthyFoodNumber == 0) {
      this.setState({ junkFoodCount: 100 });
    } else if (junkFoodNumber == 0) {
      this.setState({ healthyFoodCount: 100 });
    } else {
      const ratio = healthyFoodNumber / junkFoodNumber;
      const junkFoodPortion = 100 / (ratio + 1);
      const healthyFoodPortion = ratio * junkFoodPortion;
      this.setState({ healthyFoodCount: healthyFoodPortion, junkFoodCount: junkFoodPortion });
    }
  }

  renderPieChart = () => {
    if (this.state.healthyFood == 0 && this.state.junkFood == 0) {
      return (
        <VictoryPie
          animate={{ duration: 2000, easing: 'bounce' }}
          width={370}
          data={[{ x: 'No data', y: 100 }]}
          style={{ labels: { fontSize: 18, fontWeight: 'bold', fill: 'rebeccapurple' } }}
        />
      );
    } else if (this.state.healthyFood == 0) {
      return (
        <VictoryPie
          animate={{ duration: 2000, easing: 'bounce' }}
          width={370}
          colorScale={['peru']}
          data={[{ x: 'Junk food', y: this.state.junkFoodCount }]}
          style={{ labels: { fontSize: 18, fontWeight: 'bold', fill: 'rebeccapurple' } }}
        />
      );
    } else if (this.state.junkFood == 0) {
      return (
        <VictoryPie
          animate={{ duration: 2000, easing: 'bounce' }}
          width={370}
          colorScale={['#5fb660']}
          data={[{ x: 'Healthy food', y: this.state.healthyFoodCount }]}
          style={{ labels: { fontSize: 18, fontWeight: 'bold', fill: 'rebeccapurple' } }}
        />
      );
    } else {
      return (
        <VictoryPie
          animate={{ duration: 2000, easing: 'bounce' }}
          colorScale={['#5fb660', 'peru']}
          width={370}
          data={[
            { x: 'Healthy food', y: this.state.healthyFoodCount },
            { x: 'Junk food', y: this.state.junkFoodCount },
          ]}
          labelRadius={60}
          style={{ labels: { fontSize: 18, fontWeight: 'bold', fill: 'rebeccapurple' } }}
        />
      );
    }
  };

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Consumed food for the last 7 days</Title>
          </Body>
        </Header>
        <Content>
          <ScrollView>
            <Center>{this.renderPieChart()}</Center>

            <Separator bordered>
              <Text style={{ fontSize: 20 }}>Consumed healthy food:</Text>
            </Separator>
            {this.state.healthyFood == 0 ? (
              <ListItem>
                <Text>No data</Text>
              </ListItem>
            ) : (
              this.state.healthyFood.map(item => (
                <ListItem key={item.name}>
                  <Text>{item.name}</Text>
                </ListItem>
              ))
            )}

            <Separator bordered>
              <Text style={{ fontSize: 20 }}>Consumed junk food: </Text>
            </Separator>
            {this.state.junkFood == 0 ? (
              <ListItem>
                <Text>No data</Text>
              </ListItem>
            ) : (
              this.state.junkFood.map(item => (
                <ListItem key={item.name}>
                  <Text>{item.name}</Text>
                </ListItem>
              ))
            )}
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  items: state.consumed,
});

export default connect(mapStateToProps)(ConsumptionScreen);
