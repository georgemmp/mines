import {Dimensions} from 'react-native';

const params = {
  blockSize: 30,
  borderSize: 5,
  fontSize: 15,
  headerRatio: 0.15, // 15 % da tela
  difficultLevel: 0.1,
  getColumnsAmount() {
    const width = Dimensions.get('window').width;
    return Math.floor(width / params.blockSize);
  },
  getRowsAmout() {
    const totalHeight = Dimensions.get('window').height;
    const boardHeight = totalHeight * (1 - params.headerRatio);
    return Math.floor(boardHeight / params.blockSize);
  },
};

export default params;
