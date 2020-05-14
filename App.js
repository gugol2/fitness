import * as React from 'react';
import { View, Platform, Button } from 'react-native';
import { ConnectedAddEntry } from './components/AddEntry';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { entries } from './reducers';
import { ConnectedHistory } from './components/History';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { purple, white } from './utils/colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// const Stack = createStackNavigator();
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
          >
            <Tab.Screen
              name='History'
              component={ConnectedHistory}
              options={{
                headerTitle: ({ tintColor }) => {
                  console.log('props are:', props);
                  return (
                    <Ionicons
                      name='ios-bookmarks'
                      size={30}
                      color={tintColor}
                    />
                  );
                },
                headerRight: ({ tintColor }) => (
                  <Button
                    onPress={() => alert('This is a button!')}
                    title='History'
                    color={{ tintColor }}
                  />
                ),
              }}
            />
            <Tab.Screen
              name='Add Entry'
              component={ConnectedAddEntry}
              options={{
                headerTitle: ({ tintColor }) => {
                  return (
                    <FontAwesome
                      name='plus-square'
                      size={30}
                      color={tintColor}
                    />
                  );
                },
                headerRight: ({ tintColor }) => {
                  return (
                    <Button
                      onPress={() => alert('This is a button!')}
                      title='Add Entry'
                      color={{ tintColor }}
                    />
                  );
                },
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}
