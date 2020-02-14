import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { RootNavigator } from './router';
import { Root, Footer, FooterTab, Button } from 'native-base';
import { Provider } from 'react-redux';
import store from './src/redux/configureStore';

import AutoCompleteAddress from './src/component/googleApiAddress';
console.disableYellowBox = true;

export default class App extends Component {

  render() {
    const RenderScreen = RootNavigator();
    return (
      <Provider store={store}>
        <Root>
        <RenderScreen />
        {/* <AutoCompleteAddress/> */}
        </Root>
      </Provider>
    );
  }
}
