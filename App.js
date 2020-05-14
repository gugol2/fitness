import * as React from 'react';
import { View, Platform, Button } from 'react-native';
import { ConnectedAddEntry } from './components/AddEntry';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { entries } from './reducers';
import { ConnectedHistory } from './components/History';
import { NavigationContainer } from '@react-navigation/native';
import { purple, white } from './utils/colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App(props) {
  const store = createStore(
    entries,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  );

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <View style={{ height: 20 }} />

        <NavigationContainer>
          <Tab.Navigator
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
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
            }}
          >
            <Tab.Screen
              name='History'
              component={ConnectedHistory}
              options={{
                tabBarIcon: ({ tintColor }) => (
                  <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
                ),
              }}
            />
            <Tab.Screen
              name='Add Entry'
              component={ConnectedAddEntry}
              options={{
                tabBarIcon: ({ tintColor }) => (
                  <FontAwesome name='plus-square' size={30} color={tintColor} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}
