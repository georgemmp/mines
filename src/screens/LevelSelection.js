import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Modal} from 'react-native';

import LevelButton from '../components/LevelButton';

export default (props) => {
  return (
    <Modal
      onRequestClose={props.onCancel}
      visible={props.isVisible}
      animationType="slide"
      transparent>
      <View style={styles.frame}>
        <View style={styles.container}>
          <Text style={styles.title}>Escolha um nível</Text>
          <LevelButton easy {...props} />
          <LevelButton normal {...props} />
          <LevelButton hard {...props} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  container: {
    backgroundColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
