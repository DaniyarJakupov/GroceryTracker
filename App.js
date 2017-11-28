import React from 'react';
import { Dimensions, Platform } from 'react-native';
import styled from 'styled-components/native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import { Provider } from 'react-redux';
import store from './src/redux/store';

import WelcomeScreen from './src/screens/WelcomeScreen';
import SelectionScreen from './src/screens/SelectionScreen';
import RecipeScreen from './src/screens/RecipeScreen';

const Container = styled.View`
  flex: 1;
`;

const App = () => {
  const screenWidth = Dimensions.get('window').width;

  const InputTab = StackNavigator({
    Selection: {
      screen: SelectionScreen,
      headerMode: 'none',
      navigationOptions: {
        title: 'Select Items',
        tabBarIcon: ({ tintColor }) => <Icon name="camera" size={25} color={tintColor} />,
        headerBackTitle: null,
        headerLeft: null,
      },
    },
  });

  const ReportTab = TabNavigator(
    {
      Recipe: {
        screen: RecipeScreen,
        navigationOptions: {
          tabBarLabel: 'Recipe',
          tabBarIcon: ({ tintColor }) => <Icon name="list" size={25} color={tintColor} />,
        },
      },
    },
    {
      animationEnabled: Platform.OS === 'ios',
      swipeEnabled: Platform.OS === 'ios',
      // tabBarPosition: 'bottom',
      tabBarOptions: {
        activeTintColor: '#e91e63',
        showLabel: true,
        style: {
          backgroundColor: '#4F00BC',
        },
        indicatorStyle: {
          backgroundColor: '#e91e63',
        },
      },
    },
  );

  const Root = TabNavigator(
    {
      Welcome: {
        screen: WelcomeScreen,
      },
      Input: {
        screen: InputTab,
      },
      Report: {
        screen: ReportTab,
      },
    },
    {
      tabBarOptions: {
        style: {
          width: screenWidth,
        },
      },
      lazy: true,
      animationEnabled: Platform.OS === 'ios',
      swipeEnabled: false,
      navigationOptions: {
        tabBarVisible: false,
      },
    },
  );

  return (
    <Provider store={store}>
      <Container>
        <Root />
      </Container>
    </Provider>
  );
};

export default App;
