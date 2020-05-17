import React, { useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { purple, white } from '../utils/colors';
import { Foundation } from '@expo/vector-icons';

export const Live = () => {
  const [state, setstate] = useState({
    coords: null,
    status: 'undetermined',
    direction: '',
  });

  const { status, coords, direction } = state;

  const askPermission = () => {
    alert('You requested permission!!');
  };

  if (status === null) {
    return <ActivityIndicator style={{ marginTop: 30 }} />;
  }

  if (status === 'denied') {
    return (
      <View>
        <Text>Denied</Text>
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
      <Text>Live</Text>
      <Text>{JSON.stringify(state)}</Text>
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
});