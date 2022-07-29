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
      index: 2,
      cardBackgroundColor: 'rgb(247 , 246,251)',
      shimmerColor: 'rgb(152,157,182)',
      scale: 0.96,
    },

    {
      index: 1,
      cardBackgroundColor: 'rgb(252 , 136,141)',
      shimmerColor: 'rgb(145,54,39)',
      scale: 0.98,
    },
    {
      index: 0,
      cardBackgroundColor: 'rgb(185 , 208,255)',
      shimmerColor: 'rgb(93,113,192)',
      scale: 1,
    },
  ]);

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
            scale={item.scale}
            index={item?.index}
          />
        );
      })}
    </SafeAreaView>
  );
};

export default App;
