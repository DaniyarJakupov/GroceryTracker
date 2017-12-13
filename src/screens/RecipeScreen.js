import React, { Component } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { connect } from 'react-redux';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Title,
  Spinner,
} from 'native-base';
import { Rating } from 'react-native-elements';

import { fetchRecipes } from '../redux/actions';

class RecipeScreen extends Component {
  static navigationOptions = {
    title: 'Recipes',
  };

  state = {
    items: [],
    recipes: [],
  };

  componentWillMount() {
    this.setState((prevState, props) => ({ recipes: this.props.recipes }));
  }

  componentDidMount() {
    console.log(this.props.recipes);
  }

  componentWillReceiveProps(nextProps) {
    //this.setState((prevState, props) => ({ recipes: nextProps.recipes }));
    // setTimeout(() => {
    //   this.state.recipes.map(recipe => console.log(recipe));
    // }, 1000);
  }

  render() {
    if (this.state.recipes[0]) {
      return (
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>Recipes</Title>
            </Body>
            <Right />
          </Header>
          <Content>
            <Card>
              <CardItem header>
                <Text>You are searching for recipes with these ingredients:</Text>
              </CardItem>
              <CardItem bordered>
                <Body>
                  {this.props.items.map(item => (
                    <Text key={item.name} style={{ color: 'rebeccapurple' }}>
                      {item.name}{' '}
                    </Text>
                  ))}
                </Body>
              </CardItem>
            </Card>

            {this.state.recipes.map(recipe => <RecipeCard recipe={recipe} key={recipe.id} />)}
          </Content>
        </Container>
      );
    }
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Recipes</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Spinner color="red" />
        </Content>
      </Container>
    );
  }
}

function RecipeCard({ recipe }) {
  // console.log(recipe);
  d = Number(recipe.totalTimeInSeconds);
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);
  const hDisplay = h > 0 ? h + (h == 1 ? ' hour ' : ' hours ') : '';
  const mDisplay = m > 0 ? m + (m == 1 ? ' minute ' : ' minutes ') : '';
  const sDisplay = s > 0 ? s + (s == 1 ? ' second ' : ' seconds') : '';
  const totalTime = hDisplay + mDisplay + sDisplay;

  const sImg = recipe.smallImageUrls[0];
  const bigImg = sImg.replace(/s90/g, 's360').replace(/https/g, 'http');
  const correctImg = bigImg.replace(/http/g, 'https');
  console.log(correctImg);

  return (
    <Card style={{ flex: 0 }}>
      <CardItem>
        <Left>
          <Body>
            <Text>{recipe.recipeName}</Text>
            <Text note>Preparation time: {totalTime} </Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem>
        <Body>
          <Left>
            <Image
              source={{
                uri: correctImg,
              }}
              style={{ height: 200, width: 200, flex: 1 }}
            />
          </Left>
        </Body>
      </CardItem>
      <CardItem>
        <Left>
          {/* <Button transparent textStyle={{ color: '#87838B' }}>
            <Icon name="logo-github" />
            <Text>1,926 stars</Text>
          </Button> */}
          <Rating
            showRating
            type="star"
            fractions={1}
            startingValue={recipe.rating}
            imageSize={20}
          />
        </Left>
      </CardItem>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
});

const mapStateToProps = state => {
  return {
    recipes: state.recipes,
    items: state.items,
  };
};

export default connect(mapStateToProps, { fetchRecipes })(RecipeScreen);
