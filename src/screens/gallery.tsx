import {useFocusEffect} from '@react-navigation/core';
import React, {useCallback, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RNFS from 'react-native-fs';
import {folder} from './camera';

const {width, height} = Dimensions.get('window');

const GalleryScreen = () => {
  const [images, setImages] = useState<RNFS.ReadDirItem[]>();
  const [fCount, setFCount] = useState(0);
  const [lCount, setLCount] = useState(4);

  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useFocusEffect(
    useCallback(() => {
      const effect = async () => {
        const res = await RNFS.readDir(folder);
        // console.log(res.map(pic => pic.path));
        setImages(res);
        setTotalCount(res.length);
      };
      effect();
    }, []),
  );

  const cValue = 4;
  let sliceImg = images?.slice(fCount, lCount);

  const prevHandler = () => {
    // if (sliceImg!.length > 3) {
    setFCount(fCount - cValue);
    setLCount(lCount - cValue);
    setCurrentPage(currentPage - 1);
  };

  const nextHandler = () => {
    setFCount(fCount + cValue);
    setLCount(lCount + cValue);
    setCurrentPage(currentPage + 1);
    console.log(currentPage, totalCount);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.galleryText}>My Gallery</Text>

        <FlatList
          data={sliceImg}
          keyExtractor={item => item.name}
          numColumns={2}
          renderItem={({item}) => (
            <Image
              key={item.name}
              style={styles.imageItem}
              source={{uri: 'file://' + item.path}}
            />
          )}
        />
      </View>

      <View style={styles.actionContainer}>
        {currentPage > 1 ? (
          <TouchableOpacity
            onPress={() => {
              prevHandler();
            }}>
            <Text style={styles.actionBtn}> Prev </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => console.log('prev list empty')}>
            <Text style={styles.actionBtn}> Prev </Text>
          </TouchableOpacity>
        )}

        <Text style={styles.actionBtn}>
          {currentPage} / {Math.ceil(totalCount / 4)}
        </Text>

        {currentPage * 4 <= totalCount ? (
          <TouchableOpacity
            onPress={() => {
              nextHandler();
            }}>
            <Text style={styles.actionBtn}> Next </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              console.log('next list empty');
            }}>
            <Text style={styles.actionBtn}> Next </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 10,
    justifyContent: 'space-between',
  },
  imageItem: {
    flex: 1,
    margin: 5,
    width: width / 2,
    height: height / 3.5,
    borderRadius: 10,
  },
  galleryText: {
    fontSize: 18,
    marginBottom: 10,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    alignContent: 'flex-end',
  },
  actionBtn: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default GalleryScreen;
