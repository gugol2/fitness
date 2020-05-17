import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { purple, white } from '../utils/colors';
import { Foundation } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { calculateDirection } from '../utils/helpers';

export const Live = () => {
  const [state, setState] = useState({
    coords: null,
    status: 'granted',
    direction: '',
  });

  const { status, coords, direction } = state;

  useEffect(() => {
    Permissions.getAsync(Permissions.LOCATION)
      .then(({ status }) => {
        if (status === 'granted') {
          return setLocation();
        }

        const newState = {
          ...state,
          status,
        };

        setState(newState);
      })
      .catch(error => {
        console.warn('Error getting Location permission: ', error);

        const newState = {
          ...state,
          status,
        };

        setState(newState);
      });
  }, []);

  const askPermission = () => {
    alert('You requested permission!!');
  };

  const setLocation = () => {
    Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        timeInterval: 1,
        distanceInterval: 1,
      },
      ({ coords }) => {
        const newDirection = calculateDirection(coords.heading);

        const newState = {
          ...state,
          coords,
          direction: newDirection,
        };

        setState(newState);
      },
    );
  };

  if (status === null) {
    return <ActivityIndicator style={{ marginTop: 30 }} />;
  }

  if (status === 'denied') {
    return (
      <View style={styles.center}>
        <Foundation name='alert' size={50} />
        <Text>
          You denied your location. You can fix this by visiting your settings
          and enabling location services for this app.
        </Text>
      </View>
    );
  }

  if (status === 'undetermined') {
    return (
      <View style={styles.center}>
        <Foundation name='alert' size={50} />
        <Text>You need to enable location services for this app.</Text>
        <TouchableOpacity style={styles.button} onPress={askPermission}>
          <Text style={styles.buttonText}>Enable</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.directionContainer}>
        <Text style={styles.header}>You're heading</Text>
        <Text style={styles.direction}>North</Text>
      </View>
      <View style={styles.metricContainer}>
        <View style={styles.metric}>
          <Text style={[styles.header, { color: white }]}>Altitude</Text>
          <Text style={[styles.subHeader, { color: white }]}>{200} feet</Text>
        </View>
        <View style={styles.metric}>
          <Text style={[styles.header, { color: white }]}>Speed</Text>
          <Text style={[styles.subHeader, { color: white }]}>{300} MPH</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  button: {
    padding: 10,
    backgroundColor: purple,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 20,
  },
  buttonText: {
    color: white,
    fontSize: 20,
  },
  directionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 35,
    textAlign: 'center',
  },
  direction: {
    color: purple,
    fontSize: 120,
    textAlign: 'center',
  },
  metricContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: purple,
  },
  metric: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  subHeader: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 5,
  },
});
