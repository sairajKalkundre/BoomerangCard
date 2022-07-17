/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const App = () => {
  const {height, width} = useWindowDimensions();
  const rotation = useSharedValue(0);
  const startingPosition = 0;
  const x = useSharedValue(startingPosition);
  const y = useSharedValue(startingPosition);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotateZ: `${rotation.value}deg`}],
    };
  });

  const uas = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: x.value},
        {translateY: y.value},
        {rotateZ: `${rotation.value}deg`},
      ],
    };
  });

  const pressed = useSharedValue('notYet');

  function onFlipRightDown(event) {
    'worklet';
    x.value = withDelay(500, withTiming(0));
    y.value = withDelay(500, withSpring(0));
    rotation.value = withDelay(500, withTiming(-360));
  }

  function onFlipRightUP(event) {
    'worklet';
    if (event.translationY < startingPosition) {
      x.value = withTiming(0, {duration: 500});
      y.value = withTiming(-400, {duration: 500});
      rotation.value = withTiming(-180, {duration: 500});
      onFlipRightDown(event);
    } else {
      rotation.value = 0;
      x.value = withSpring(startingPosition);
      y.value = withSpring(startingPosition);
    }
  }

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      // pressed.value = true;
    },
    onActive: (event, ctx) => {
      console.log(event);
      if (pressed.value === 'right') {
        console.log('ran');
        rotation.value = -5;
        x.value = startingPosition + event.translationX;
        y.value = startingPosition + event.translationY;
      }
    },
    onEnd: (event, ctx) => {
      console.log('event', event);
      // rotation.value = 0;
      // x.value = withSpring(startingPosition);
      // y.value = withSpring(startingPosition);
      if (pressed.value === 'right') {
        onFlipRightUP(event);
      }
    },
  });

  const gesture = Gesture.Manual().onTouchesDown((e, manager) => {
    if (e.changedTouches[0].x > 190) {
      pressed.value = 'right';
    } else {
      pressed.value = 'left';
    }
  });

  const styles = StyleSheet.create({
    card1: {
      height: 250,
      width: width - 50,
      backgroundColor: 'rgb(185 , 208,255)',
      borderRadius: 20,
      justifyContent: 'flex-end',
    },
    ball: {
      height: 100,
      width: 100,
      borderRadius: 50,
      backgroundColor: 'white',
    },
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}>
      <StatusBar barStyle={'light-content'} />

      {/*<TouchableOpacity*/}
      {/*  style={{*/}
      {/*    backgroundColor: 'white',*/}
      {/*    height: 50,*/}
      {/*    width: 100,*/}
      {/*    marginBottom: 100,*/}
      {/*  }}*/}
      {/*  onPress={() => {*/}
      {/*    rotation.value = withRepeat(withTiming(180), 5, false);*/}
      {/*  }}>*/}
      {/*  <Text>Hello</Text>*/}
      {/*</TouchableOpacity>*/}
      {/*Card 2*/}
      <View
        style={{
          height: 250,
          width: width - 90,
          backgroundColor: 'rgb(247 , 246,251)',
          borderRadius: 20,
          justifyContent: 'flex-end',
          position: 'absolute',
          bottom: 49,
        }}>
        <View style={{flexDirection: 'row', margin: 30}}>
          <View
            style={{
              height: 60,
              width: 60,
              borderRadius: 30,
              backgroundColor: 'rgb(152,157,182)',
            }}
          />
          <View style={{marginTop: 5, marginLeft: 10}}>
            <View
              style={{
                height: 20,
                width: 120,
                borderRadius: 10,
                backgroundColor: 'rgb(152,157,182)',
              }}
            />
            <View
              style={{
                height: 20,
                width: 70,
                borderRadius: 10,
                backgroundColor: 'rgb(152,157,182)',
                marginTop: 5,
              }}
            />
          </View>
        </View>
      </View>
      {/*Card 3*/}
      <View
        style={{
          height: 250,
          width: width - 70,
          backgroundColor: 'rgb(252 , 136,141)',
          borderRadius: 20,
          justifyContent: 'flex-end',
          position: 'absolute',
          bottom: 43,
        }}>
        <View style={{flexDirection: 'row', margin: 30}}>
          <View
            style={{
              height: 60,
              width: 60,
              borderRadius: 30,
              backgroundColor: 'rgb(145,54,39)',
            }}
          />
          <View style={{marginTop: 5, marginLeft: 10}}>
            <View
              style={{
                height: 20,
                width: 120,
                borderRadius: 10,
                backgroundColor: 'rgb(145,54,39)',
              }}
            />
            <View
              style={{
                height: 20,
                width: 70,
                borderRadius: 10,
                backgroundColor: 'rgb(145,54,39)',
                marginTop: 5,
              }}
            />
          </View>
        </View>
      </View>
      <GestureDetector gesture={gesture}>
        <PanGestureHandler onGestureEvent={eventHandler}>
          <Animated.View style={[styles.card1, uas]}>
            <View style={{flexDirection: 'row', margin: 30}}>
              <View
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 30,
                  backgroundColor: 'rgb(93,113,192)',
                }}
              />
              <View style={{marginTop: 5, marginLeft: 10}}>
                <View
                  style={{
                    height: 20,
                    width: 120,
                    borderRadius: 10,
                    backgroundColor: 'rgb(93,113,192)',
                  }}
                />
                <View
                  style={{
                    height: 20,
                    width: 70,
                    borderRadius: 10,
                    backgroundColor: 'rgb(93,113,192)',
                    marginTop: 5,
                  }}
                />
              </View>
            </View>
          </Animated.View>
        </PanGestureHandler>
      </GestureDetector>
    </SafeAreaView>
  );
};

export default App;
