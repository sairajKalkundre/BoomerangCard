import React from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
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

export const CardView = ({cardBackgroundColor, shimmerColor, scale, index}) => {
  const {width} = useWindowDimensions();
  const pressed = useSharedValue('notYet');
  const rotation = useSharedValue(0);
  const startingPosition = 0;
  const x = useSharedValue(startingPosition);
  const y = useSharedValue(index * -10);
  const styles = StyleSheet.create({
    card: {
      height: 250,
      width: width - 50,
      borderRadius: 20,
      justifyContent: 'flex-end',
      position: 'absolute',
      bottom: 49,
    },
  });

  const uas = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: x.value},
        {translateY: y.value},
        {rotateZ: `${rotation.value}deg`},
        {scaleX: scale},
      ],
    };
  });

  const gesture = Gesture.Manual().onTouchesDown((e, manager) => {
    if (e.changedTouches[0].x > 190) {
      pressed.value = 'right';
    } else {
      pressed.value = 'left';
    }
  });

  function onFlipRightDown(event) {
    'worklet';
    x.value = withDelay(200, withTiming(0));
    y.value = withDelay(200, withSpring(0));
    rotation.value = withDelay(200, withTiming(-360));
  }

  function onFlipRightUP(event) {
    'worklet';
    if (event.translationY < startingPosition) {
      x.value = withTiming(0, {duration: 200});
      y.value = withTiming(-400, {duration: 200});
      rotation.value = withTiming(-180, {duration: 200});
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

  return (
    <GestureDetector gesture={gesture}>
      <PanGestureHandler onGestureEvent={eventHandler}>
        <Animated.View
          style={[styles.card, {backgroundColor: cardBackgroundColor}, uas]}>
          <View style={{flexDirection: 'row', margin: 30}}>
            <View
              style={{
                height: 60,
                width: 60,
                borderRadius: 30,
                backgroundColor: shimmerColor,
              }}
            />
            <View style={{marginTop: 5, marginLeft: 10}}>
              <View
                style={{
                  height: 20,
                  width: 120,
                  borderRadius: 10,
                  backgroundColor: shimmerColor,
                }}
              />
              <View
                style={{
                  height: 20,
                  width: 70,
                  borderRadius: 10,
                  backgroundColor: shimmerColor,
                  marginTop: 5,
                }}
              />
            </View>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </GestureDetector>
  );
};
