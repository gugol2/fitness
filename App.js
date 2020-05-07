import * as React from 'react';
import { View } from 'react-native';
import { ConnectedAddEntry } from './components/AddEntry';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { entries } from './reducers';

export default function App(props) {
  const store = createStore(entries);

  return (
    <Provider store={store}>
      <View>
        <ConnectedAddEntry />
      </View>
    </Provider>
  );
}
