import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from '../components/home';
import GalleryScreen from '../screens/gallery';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MainStackParams} from './main-stack';

export type BottomTabParams = {
  Home: undefined;
  Gallery: undefined;
};

export type BottomTabScreens = keyof BottomTabParams;
export interface BottomTabScreenProps<T extends BottomTabScreens> {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParams, T>,
    StackNavigationProp<MainStackParams>
  >;
  route: RouteProp<BottomTabParams, T>;
}
const {Navigator, Screen} = createBottomTabNavigator<BottomTabParams>();

interface IconProps {
  focused: boolean;
  color: string;
}

const size = 24;

const HomeIcon: React.FC<IconProps> = ({color}) => {
  return <Icon name="home" size={size} color={color} />;
};

const GalleryIcon: React.FC<IconProps> = ({color}) => {
  return <Icon name="image-outline" size={size} color={color} />;
};

const BottomTab = () => {
  return (
    <Navigator>
      <Screen name="Home" component={Home} options={{tabBarIcon: HomeIcon}} />
      <Screen
        name="Gallery"
        component={GalleryScreen}
        options={{tabBarIcon: GalleryIcon}}
      />
    </Navigator>
  );
};

export default BottomTab;
