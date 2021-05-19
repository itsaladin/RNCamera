import {MainStackScreenProps} from '@/navigators/main-stack';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  BackHandler,
  Dimensions,
  PermissionsAndroid,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import RNFS from 'react-native-fs';
import {IconButton} from 'react-native-paper';
import {white} from '../constant/colors';

// const folder = RNFS.ExternalStorageDirectoryPath + '/RNCamera';
export const folder = RNFS.ExternalDirectoryPath + '/RNCamera';

const {width} = Dimensions.get('window');

const CameraScreen: React.FC<MainStackScreenProps<'Camera'>> = ({
  navigation,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  let cameraRef = useRef<RNCamera>(null);
  const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back);
  const [flash, setFlash] = useState(RNCamera.Constants.FlashMode.off);

  useEffect(() => {
    const effect = async () => {
      // console.log(await RNFS.getAllExternalFilesDirs());
      const read = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      const write = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );

      if (!read || !write) {
        const readGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'RNCamera Read Permission',
            message:
              'RNCamera needs access to your external storage so it can read from the gallery',
            // buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        const writeGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'RNCamera Write Permission',
            message:
              'RNCamera needs access to your external storage so it can write to the gallery',
            // buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (readGranted !== 'granted' || writeGranted !== 'granted') {
          return Alert.alert(
            'Insufficient Permission',
            'Please grant required permissions',
            [
              {
                onPress: () => BackHandler.exitApp(),
                text: 'Exit App',
                style: 'destructive',
              },
            ],
          );
        }
      }
      // Create RNCamera Folder if Doesn't exist
      if (!(await RNFS.exists(folder))) {
        console.log(folder);
        await RNFS.mkdir(folder);
      }
    };
    effect();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      const data = await cameraRef?.current?.takePictureAsync({
        quality: 0.5,
      });

      if (data) {
        console.log(JSON.stringify(data, null, 2));
        await RNFS.moveFile(
          data.uri,
          folder + '/' + Date.now() + '.' + data.uri.split('.').pop(),
        );
        navigation.navigate('Gallery');
      }
    }
  };

  const flipCamera = () => {
    if (cameraType === RNCamera.Constants.Type.back) {
      setCameraType(RNCamera.Constants.Type.front);
    } else {
      setCameraType(RNCamera.Constants.Type.back);
    }
  };

  const toggleFlash = () => {
    if (flash === RNCamera.Constants.FlashMode.off) {
      setFlash(RNCamera.Constants.FlashMode.on);
    } else {
      setFlash(RNCamera.Constants.FlashMode.off);
    }
  };

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        <RNCamera
          ref={cameraRef}
          style={styles.preview}
          type={cameraType}
          flashMode={flash}
          captureAudio={false}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}>
          <View style={styles.actionContainer}>
            <View>
              {flash === RNCamera.Constants.FlashMode.on ? (
                <IconButton
                  icon="flashlight"
                  color={white}
                  style={styles.action}
                  size={25}
                  onPress={() => {
                    toggleFlash();
                  }}
                />
              ) : (
                <IconButton
                  icon="flashlight-off"
                  color={white}
                  style={styles.action}
                  size={25}
                  onPress={() => {
                    toggleFlash();
                  }}
                />
              )}
            </View>
            <IconButton
              icon="camera-iris"
              color={white}
              size={45}
              style={styles.action}
              onPress={() => {
                takePicture();
              }}
            />

            <IconButton
              icon="camera-retake-outline"
              color={white}
              size={25}
              style={styles.action}
              onPress={() => {
                flipCamera();
              }}
            />
          </View>
        </RNCamera>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
  },
  actionTxt: {
    fontSize: 14,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  action: {
    marginHorizontal: width / 15,
  },
});

export default CameraScreen;
