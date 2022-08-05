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
      pos: 2,
    },

    {
      cardBackgroundColor: 'rgb(252 , 136,141)',
      shimmerColor: 'rgb(145,54,39)',
      color: 'red',
      zindex: 1,
      pos: 1,
    },
    {
      cardBackgroundColor: 'rgb(185 , 208,255)',
      shimmerColor: 'rgb(93,113,192)',
      color: 'purple',
      zindex: 2,
      pos: 0,
    },
  ]);

  const onFinished = () => {
    let dupData = [...data];
    let dupThreeCardData = dupData.map((item, index) => {
      if (index === 0) {
        if (item?.zindex === 0 && item?.pos === 2) {
          return {...item, zindex: 1, pos: 1};
        } else if (item?.zindex === 1 && item?.pos === 1) {
          return {...item, zindex: 2, pos: 0};
        } else {
          return {...item, zindex: 0, pos: 2};
        }
      } else if (index === 1) {
        if (item?.zindex === 1 && item?.pos === 1) {
          return {...item, zindex: 2, pos: 0};
        } else if (item?.zindex === 2 && item?.pos === 0) {
          return {...item, zindex: 0, pos: 2};
        } else {
          return {...item, zindex: 1, pos: 1};
        }
      } else if (index === 2) {
        if (item?.zindex === 2 && item?.pos === 0) {
          return {...item, zindex: 0, pos: 2};
        } else if (item?.zindex === 0 && item?.pos === 2) {
          return {...item, zindex: 1, pos: 1};
        } else {
          return {...item, zindex: 2, pos: 0};
        }
      }
    });
    console.log({dupThreeCardData});
    setData(dupThreeCardData);
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
