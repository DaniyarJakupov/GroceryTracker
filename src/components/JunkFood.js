import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';

export default class JunkFood extends Component {
  state = {};

  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem>
              <Text>Pizza</Text>
            </ListItem>
            <ListItem>
              <Text>Hamburgers</Text>
            </ListItem>
            <ListItem>
              <Text>Pepsy</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
