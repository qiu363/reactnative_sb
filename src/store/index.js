'use strict';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers/index';
import { AsyncStorage } from 'react-native';
import { persistStore, autoRehydrate } from 'redux-persist';

let middleWars = [
  thunk
];

let createAppStore = applyMiddleware(...middleWars)(createStore);

export default function configureStore(initState, onComplete: () => void) {
  const store = autoRehydrate()(createAppStore)(reducers);
  let opt = {
    storage: AsyncStorage
  };
  persistStore(store, opt, onComplete);
  return store;
}
