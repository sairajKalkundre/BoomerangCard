/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {CardView} from './src/CardView';

const App = () => {
  const [data, setData] = useState([
    {
      cardBackgroundColor: 'rgb(247 , 246,251)',
      shimmerColor: 'rgb(152,157,182)',
      color: 'white',
      zindex: 0,
      pos: 1,
    },

    {
      cardBackgroundColor: 'rgb(252 , 136,141)',
      shimmerColor: 'rgb(145,54,39)',
      color: 'red',
      zindex: 1,
      pos: 0,
    },
  ]);

  const onFinished = () => {
    let dupData = [...data];
    let arr = dupData.map((zind, index, array) =>
      zind.zindex === 0
        ? {...zind, zindex: 1, pos: 0}
        : {...zind, zindex: 0, pos: 1},
    );
    setData(arr);
    console.log({arr});
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}>
      <StatusBar barStyle={'light-content'} />

      {data.map(item => {
        return (
          <CardView
            cardBackgroundColor={item?.cardBackgroundColor}
            shimmerColor={item?.shimmerColor}
            index={item?.pos}
            zIndexValue={item?.zindex}
            onFinish={onFinished}
          />
        );
      })}
    </SafeAreaView>
  );
};

export default App;
