import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

export default (props) => {
  const {easy, normal, hard} = props;
  console.log(props);
  return (
    <>
      {easy ? (
        <TouchableOpacity
          style={styles.button}
          style={[styles.button, styles.bgEasy]}
          onPress={() => props.onLevelSelected(0.1)}>
          <Text style={styles.buttonLabel}>Fácil</Text>
        </TouchableOpacity>
      ) : normal ? (
        <TouchableOpacity
          style={styles.button}
          style={[styles.button, styles.bgNormal]}
          onPress={() => props.onLevelSelected(0.2)}>
          <Text style={styles.buttonLabel}>Intermediário</Text>
        </TouchableOpacity>
      ) : hard ? (
        <TouchableOpacity
          style={styles.button}
          style={[styles.button, styles.bgHard]}
          onPress={() => props.onLevelSelected(0.3)}>
          <Text style={styles.buttonLabel}>Difícil</Text>
        </TouchableOpacity>
      ) : (
        false
      )}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    padding: 5,
  },
  buttonLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EEE',
  },
  bgEasy: {
    backgroundColor: '#49b65d',
  },
  bgNormal: {
    backgroundColor: '#2765F7',
  },
  bgHard: {
    backgroundColor: '#F26337',
  },
});
