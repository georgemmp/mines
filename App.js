import React, {useState, useEffect} from 'react';
import {StyleSheet, View, StatusBar, Alert} from 'react-native';

import params from './src/params';

import MineField from './src/components/MineField';

import {
  createMinedBoard,
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines,
} from './src/functions';

const App: () => React$Node = () => {
  const minesAmount = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmout();

    return Math.ceil(cols * rows * params.difficultLevel);
  };

  useEffect(() => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmout();

    setBoard(createMinedBoard(rows, cols, minesAmount()));
  }, []);

  const [board, setBoard] = useState([[]]);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);

  const onOpenField = (row, column) => {
    const clone = cloneBoard(board);

    openField(clone, row, column);

    const l = hadExplosion(clone);
    const w = wonGame(clone);

    if (l) {
      showMines(clone);
      Alert.alert('Perdeu!', 'Você acabou explodindo!');
    }

    if (w) {
      Alert.alert('Parabéns!', 'Você passou sem se espedaçar todo!');
    }

    setBoard(clone);
    setLost(l);
    setWon(w);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <View style={styles.container}>
        <View style={styles.board}>
          <MineField board={board} onOpenField={onOpenField} />
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
