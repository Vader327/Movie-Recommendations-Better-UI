import React from "react";
import HomeScreen from "./screens/Home";
import RecommendedMoviesScreen from "./screens/Recommendation";
import PopularMoviesScreen from "./screens/Popular";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";

export default class App extends React.Component{
  render(){
    return <AppContainer />;
  }
}

const AppTopNavigation = createMaterialTopTabNavigator({
  RecommendedMovies: {
    screen: RecommendedMoviesScreen,
    navigationOptions: {
      tabBarLabel: "Recommended",
    }
  },
  PopularMovies: {
    screen: PopularMoviesScreen,
    navigationOptions: {
      tabBarLabel: "Popular",
    }
  }
}, {
  tabBarOptions: {
    indicatorStyle: {backgroundColor: '#fff', height: 3},
    style: {backgroundColor: '#ff416c', borderTopWidth: 0, shadowColor: "#ff416c", shadowOpacity: 1, shadowRadius: 20,
    shadowOffset: {width: 0, height: 5}, elevation: 10},
    labelStyle: {fontWeight: 'bold'}
  }
});

const AppStackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: false
      }
    },
    AppTopNav: {
      screen: AppTopNavigation,
      navigationOptions: {
        headerBackTitle: null,
        headerTintColor: "#fff",
        headerTitle: "Browse",
        headerStyle: {
          backgroundColor: "#ff416c",
          shadowRadius: 0,
          shadowOffset: {height: 0}
        },
        headerTitleStyle: {
          color: "#fff",
          fontWeight: "bold",
          fontSize: 20
        }
      }
    }
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppStackNavigator);
