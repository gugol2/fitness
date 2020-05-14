import * as React from 'react';
import { View, Platform } from 'react-native';
import { ConnectedAddEntry } from './components/AddEntry';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { entries } from './reducers';
import { ConnectedHistory } from './components/History';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { purple, white } from './utils/colors';

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
          <Stack.Navigator
            initialRouteName='History'
            screenOptions={{
              headerTintColor: Platform.OS === 'ios' ? purple : white,
              headerStyle: {
                height: 56,
                backgroundColor: Platform.OS === 'ios' ? white : purple,
                shadowColor: 'rgba(0, 0, 0, 0.24)',
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowRadius: 6,
                shadowOpacity: 1,
              },
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen
              name='History'
              component={ConnectedHistory}
              options={{ title: 'My History' }}
            />
            <Stack.Screen
              name='Add Entry'
              component={ConnectedAddEntry}
              options={{ title: 'My Add Entry' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}
