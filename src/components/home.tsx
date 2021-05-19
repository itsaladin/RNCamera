import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {BottomTabScreenProps} from '../navigators/bottom-tab';

const Home: React.FC<BottomTabScreenProps<'Home'>> = ({navigation}) => {
  return (
    <View style={styles.cameraComp}>
      <Button
        onPress={() => {
          navigation.navigate('Camera');
        }}
        title="Open Camera"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cameraComp: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default Home;
