import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Platform,
  PermissionsAndroid
} from 'react-native';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Constants from '../../Constants/Constants';
import Button from '../../Components/Button';

const ViewImage = ({ route }) => {
  const [thumbnail, setThumbnail] = useState({});
  const [photos, setPhotos] = useState('');

  useEffect(() => {
    getImageFromNavigation()
  })

  const getImageFromNavigation = () => {
    if (route?.params?.imageString) {
      setThumbnail(route?.params?.imageString)
      setPhotos(route?.params?.imageString)
    }
  }
  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  async function savePicture() {
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
      return;
    }
    CameraRoll.save(photos, { type: 'photo' })
  };
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: photos !== '' ? photos : thumbnail?.path }}
        style={styles.imgView}
      />
      <View style={styles.buttonView}>
        <Button
          title={Constants.image_download}
          onclick={savePicture}
          style={{ textTransform: 'uppercase' }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imgView: {
    width: wp('100%'),
    height: hp('30%'),
    resizeMode: 'contain'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 30,
    marginVertical: hp('25%')
  },
  buttonView: {
    marginTop: wp('7%'),
    marginBottom: wp('3%'),
    width: wp('80%'),
  },
});

export default ViewImage;
