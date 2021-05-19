import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import CameraScreen from '../screens/camera';
import GalleryScreen from '../screens/gallery';
import HomeScreen from './bottom-tab';

export type MainStackParams = {
  Camera: undefined;
  Gallery: undefined;
  Home: undefined;
};

export type StackScreens = keyof MainStackParams;
export type MainStackScreenProps<T extends StackScreens> = StackScreenProps<
  MainStackParams,
  T
>;

enableScreens();
const {Navigator, Screen} = createNativeStackNavigator<MainStackParams>();

const MainStack = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Camera" component={CameraScreen} />
    <Screen name="Gallery" component={GalleryScreen} />
  </Navigator>
);

export default MainStack;
