import React, {useRef} from 'react';
import MainStack from './navigators/main-stack';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {Provider as PaperProvider} from 'react-native-paper';

const Application = () => {
  const nav = useRef<NavigationContainerRef>(null);
  return (
    <PaperProvider>
      <NavigationContainer ref={nav}>
        <MainStack />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Application;
