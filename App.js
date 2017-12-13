import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation';
import { Icon } from 'react-native-elements';

import { Provider } from 'react-redux';
import store from './src/redux/store';

import WelcomeScreen from './src/screens/WelcomeScreen';
import SelectionScreen from './src/screens/SelectionScreen';
import RecipeScreen from './src/screens/RecipeScreen';
import SetupScreen from './src/screens/SetupScreen';
import GroceriesScreen from './src/screens/GroceriesScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import ProfileScreen from './src/screens/ProfileScreen';

import { colors } from './src/utils/constants';

const Container = styled.View`
  flex: 1;
`;

const App = () => {
  const screenWidth = Dimensions.get('window').width;

  const StackGroceries = StackNavigator(
    {
      Groceries: {
        screen: GroceriesScreen,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => <Icon name="shopping-cart" size={25} color={tintColor} />,
        },
      },
      Recipes: {
        screen: RecipeScreen,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => <Icon name="search" size={25} color={tintColor} />,
        },
      },
    },
    {
      headerMode: 'none',
      cardStyle: {
        backgroundColor: colors.white,
      },
    },
  );

  const Tabs = TabNavigator(
    {
      Groceries: {
        screen: StackGroceries,
      },
      Notifications: {
        screen: NotificationsScreen,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => <Icon name="notifications" size={25} color={tintColor} />,
        },
      },
      Profile: {
        screen: ProfileScreen,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => <Icon name="perm-identity" size={25} color={tintColor} />,
        },
      },
    },
    {
      lazy: false,
      tabBarPosition: 'bottom',
      swipeEnabled: false,
      animationEnabled: true,
      navigationOptions: {
        headerVisible: false,
      },
      tabBarComponent: TabBarBottom,
      tabBarOptions: {
        showIcon: true,
        showLabel: false,
        activeTintColor: colors.primary,
        inactiveTintColor: colors.lightGrey,
        pressColor: colors.primary,
      },
    },
  );

  const Root = StackNavigator(
    {
      Welcome: {
        screen: WelcomeScreen,
      },
      Setup: {
        screen: SetupScreen,
      },
      Selection: {
        screen: SelectionScreen,
      },
      Tabs: {
        screen: Tabs,
      },
    },
    {
      headerMode: 'none',
      cardStyle: {
        backgroundColor: colors.white,
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
