'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import configureStore from './src/store/index';

import Main from './src/main.ios';

global.SB = {
  DEBUG: 1,
  TOKEN: null,
  UID: '',
};

class Home extends Component {
  constructor(props) {
    super(props);

    this.store = configureStore();
  }

  render() {
    return (
      <Provider store={this.store}>
        <Main navigation={this.props.navigation} />
      </Provider>
    );
  }
}

// Router
const Router = StackNavigator(
  {
    Home: {screen: Home},
  },
  {
    navigationOptions: {
      header: null,
    },
  }
);

AppRegistry.registerComponent('shanbang', () => Router);
