import * as React from 'react';
import { View } from 'react-native';
import { ConnectedAddEntry } from './components/AddEntry';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { entries } from './reducers';
import { ConnectedHistory } from './components/History';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App(props) {
  const store = createStore(
    entries,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  );

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='History'>
            <Stack.Screen name='History' component={ConnectedHistory} />
            <Stack.Screen name='Add Entry' component={ConnectedAddEntry} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}
