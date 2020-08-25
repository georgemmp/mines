import React, {useState, useEffect} from 'react';
import {StyleSheet, View, StatusBar, Alert} from 'react-native';

import params from './src/params';

import MineField from './src/components/MineField';
import Header from './src/components/Header';
import LevelSelection from './src/screens/LevelSelection';

import {
  createMinedBoard,
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines,
  invertFlag,
  flagsUsed,
} from './src/functions';

const App: () => React$Node = () => {
  useEffect(() => {
    setBoard(buildField());
  }, []);

  const [board, setBoard] = useState([]);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const [levelSelection, setLevelSelection] = useState(false);

  const minesAmount = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmout();

    return Math.ceil(cols * rows * params.difficultLevel);
  };

  const buildField = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmout();

    const buildedBoard = createMinedBoard(rows, cols, minesAmount());

    return buildedBoard;
  };

  const newGame = () => {
    setBoard(buildField());
  };

  const onOpenField = (row, column) => {
    const clone = cloneBoard(board);

    openField(clone, row, column);

    const lost = hadExplosion(clone);
    const won = wonGame(clone);

    if (lost) {
      showMines(clone);
      Alert.alert('Perdeu!', 'Você acabou explodindo!');
    }

    if (won) {
      Alert.alert('Parabéns!', 'Você passou sem se espedaçar todo!');
    }

    setBoard(clone);
    setLost(lost);
    setWon(won);
  };

  const onSelectField = (row, column) => {
    const clone = cloneBoard(board);
    invertFlag(clone, row, column);

    const won = wonGame(clone);

    if (won) {
      Alert.alert('Parabéns!', 'Você passou sem se espedaçar todo!');
    }

    setBoard(clone);
    setWon(won);
  };

  const onLevelSelected = (level) => {
    params.difficultLevel = level;
    setLevelSelection(false);
    buildField();
  };

  const showLevelSelect = () => {
    setLevelSelection(true);
  };

  const closeModal = () => {
    setLevelSelection(false);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <View style={styles.container}>
        <LevelSelection
          isVisible={levelSelection}
          onLevelSelected={onLevelSelected}
          onCancel={closeModal}
        />
        <Header
          flagsLeft={minesAmount() - flagsUsed(board)}
          onNewGame={() => newGame()}
          onFlagPress={() => showLevelSelect()}
        />
        <View style={styles.board}>
          <MineField
            board={board}
            onOpenField={onOpenField}
            onSelectField={onSelectField}
          />
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
