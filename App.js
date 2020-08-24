import React, {useState} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';

import params from './src/params';

import MineField from './src/components/MineField';

import {createMinedBoard} from './src/functions';

const App: () => React$Node = () => {
  const minesAmount = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmout();

    return Math.ceil(cols * rows * params.difficultLevel);
  };

  const createState = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmout();

    return {
      board: createMinedBoard(rows, cols, minesAmount()),
    };
  };

  const [board, setBoard] = useState(createState());

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <View style={styles.container}>
        <View style={styles.board}>
          <MineField board={board.board} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA',
  },
});

export default App;
