import * as React from 'react';
import { View, Platform } from 'react-native';
import { ConnectedAddEntry } from './components/AddEntry';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { entries } from './reducers';
import { ConnectedHistory } from './components/History';
import { NavigationContainer } from '@react-navigation/native';
import { purple, white } from './utils/colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CustomStatusBar } from './components/CustomStatusBar';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { ConnectedEntryDetail } from './components/EntryDetail';

// const Tab = createBottomTabNavigator();
const Tab =
  Platform.OS === 'ios'
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator();

const Stack = createStackNavigator();
const MainNav = () => (
  <Stack.Navigator headerMode='screen'>
    <Stack.Screen
      name='Home'
      component={TabNav}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name='EntryDetail'
      component={ConnectedEntryDetail}
      options={{
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
          height: 56,
        },
        headerTitleStyle: {
          // padding: 10,
        },
      }}
    />
  </Stack.Navigator>
);

const TabNav = () => (
  <Tab.Navigator
    initialRouteName='History'
    tabBarOptions={{
      activeTintColor: Platform.OS === 'ios' ? purple : white,
      style: {
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
    }}
  >
    <Tab.Screen
      name='Add Entry'
      component={ConnectedAddEntry}
      options={{
        tabBarIcon: ({ color }) => (
          <FontAwesome name='plus-square' size={30} color={color} />
        ),
        title: 'Add Entry',
      }}
    />
    <Tab.Screen
      name='History'
      component={ConnectedHistory}
      options={{
        tabBarIcon: ({ color }) => (
          <Ionicons name='ios-bookmarks' size={30} color={color} />
        ),
        title: 'History',
      }}
    />
  </Tab.Navigator>
);

export default function App(props) {
  const store = createStore(
    entries,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  );

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <CustomStatusBar backgroundColor={purple} barStyle='light-content' />

        <NavigationContainer>
          <MainNav />
        </NavigationContainer>
      </View>
    </Provider>
  );
}
