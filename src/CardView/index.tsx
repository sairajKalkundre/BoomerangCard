import React from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {mix} from 'react-native-redash';

export const CardView = ({
  cardBackgroundColor,
  shimmerColor,
  index,
  zIndexValue,
  onFinish,
}) => {
  const {width} = useWindowDimensions();
  const pressed = useSharedValue('notYet');
  const rotation = useSharedValue(0);
  const startingPosition = 0;
  const x = useSharedValue(startingPosition);
  const y = useSharedValue(0);
  const scale = useSharedValue(0);
  y.value = withTiming(mix(index, 0, -7));
  console.log('y', y.value + '&&' + cardBackgroundColor + '$$' + index);
  scale.value = withSpring(mix(zIndexValue, 0.94, 1));
  const styles = StyleSheet.create({
    card: {
      height: 240,
      width: width - 80,
      borderRadius: 20,
      justifyContent: 'flex-end',
      position: 'absolute',
      bottom: 50,
    },
  });

  const uas = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: x.value},
        {translateY: y.value},
        {rotateZ: `${rotation.value}deg`},
        {scaleX: scale.value},
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

  function onFlipLeftUP(event) {
    'worklet';
    if (event.translationY < startingPosition) {
      rotation.value = withTiming(360, {duration: 500});
      x.value = withTiming(0, {duration: 200});
      y.value = withTiming(-400, {duration: 200}, finished => {
        if (finished) {
          runOnJS(onFinish)();
        }
      });
    } else {
      rotation.value = 0;
      x.value = withSpring(startingPosition);
      y.value = withSpring(startingPosition);
    }
  }

  function onFlipRightUP(event) {
    'worklet';
    if (event.translationY < startingPosition) {
      rotation.value = withTiming(-360, {duration: 500});
      x.value = withTiming(0, {duration: 200});
      y.value = withTiming(-400, {duration: 200}, finished => {
        if (finished) {
          runOnJS(onFinish)();
        }
      });
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
      if (pressed.value === 'right') {
        rotation.value = -5;
        x.value = startingPosition + event.translationX;
        y.value = startingPosition + event.translationY;
      } else {
        rotation.value = 5;
        x.value = startingPosition + event.translationX;
        y.value = startingPosition + event.translationY;
      }
    },
    onEnd: (event, ctx) => {
      if (pressed.value === 'right') {
        onFlipRightUP(event);
      } else {
        onFlipLeftUP(event);
      }
    },
  });

  return (
    <GestureDetector gesture={gesture}>
      <PanGestureHandler onGestureEvent={eventHandler}>
        <Animated.View
          style={[
            styles.card,
            {backgroundColor: cardBackgroundColor},
            {zIndex: zIndexValue},
            uas,
          ]}>
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
