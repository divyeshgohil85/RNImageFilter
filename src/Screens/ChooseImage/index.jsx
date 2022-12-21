import React, { useState } from 'react';
import {
  Image,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Constants from '../../Constants/Constants';
import Button from '../../Components/Button';
import Loader from '../../Components/Loader';
import ImagePicker from 'react-native-image-crop-picker';

const CreatePost = ({ navigation }) => {

  const [thumbnail, setThumbnail] = useState({});
  const [loaderVisible, setLoaderVisible] = useState(false);

  const onChooseImage = async (selectionType) => {


    const options = {
      cameraType: 'back',
      mediaType: selectionType,
      includeBase64: true,
    };
    const result = await launchImageLibrary(options);
    if (!result.didCancel && result.assets) {
      if (selectionType === 'photo') {
        const photoData = {
          uri: result.assets[0].uri,
          type: result.assets[0].type,
          name: result.assets[0].fileName,
        };
        setThumbnail(photoData);
      }
    }
    if (result.errorMessage) console.log('error');
  };

  const handleNextStepClick = async () => {
    if (!thumbnail.length) {
      setLoaderVisible(false);
      if (!Object.keys(thumbnail).length) {
        Alert.alert('Please add thumbnail image');
        return;
      } else {
        return ImagePicker.openCropper({
          includeBase64: true,
          path: thumbnail,
          cropping: false,
          freeStyleCropEnabled: true,
          compressImageQuality: 0.8,
          showCropFrame: true,
          mediaType: 'photo',
        }).then(image => {
          navigation.navigate('FilterScreen', { imageData: image });
        })
      }
    }
  };

  return (
    <SafeAreaView
      style={styles.safeView}>
      <View
        style={styles.imageView}>
        {Object.keys(thumbnail).length ? (
          <>
            <View
              style={styles.insideView}>
              <Image
                source={{ uri: thumbnail?.uri }}
                style={styles.thumbImage}
                resizeMode={'contain'}
              />
            </View>
            <View
              style={styles.editView}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => onChooseImage('photo')}
                style={{
                  ...styles.addLessonBtnContainer,
                  marginEnd: 7,
                }}>
                <Image
                  source={require('../../Assests/icon_edit.png')}
                  resizeMode="contain"
                  style={styles.editImage}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setThumbnail({})}
                style={styles.addLessonBtnContainer}>
                <Image
                  source={require('../../Assests/delete.png')}
                  resizeMode="contain"
                  style={styles.editImage}
                />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View style={{ ...styles.pickContainer, }}>
              <TouchableOpacity
                onPress={() => onChooseImage('photo')}
                activeOpacity={0.7}>
                <View style={styles.galleryView}>
                  <Image
                    source={require('../../Assests/Pick.png')}
                    style={styles.galleryImg}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={styles.postTextView}>
              <Text style={styles.introText}>
                {Constants.create_post_story}
              </Text>
            </View>
          </>
        )}
      </View>
      <View style={styles.buttonView}>
        <Button
          title={Constants.next}
          onclick={handleNextStepClick}
          style={styles.button_next}
        />
      </View>
      <Loader titleText={''} visible={loaderVisible} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button_next: {
    textTransform: 'uppercase',
    fontSize: wp('5%'),
    color: 'white',
    marginHorizontal: wp('7%')
  },
  editView: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: wp('5%'),
    alignSelf: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
  },
  imageView: {
    paddingHorizontal: wp('5%'),
    paddingVertical: wp('10%'),
    backgroundColor: '#FFFFFF',
    marginTop: wp('5%'),
    width: wp('100%'),
  },
  insideView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbImage: {
    width: wp('100%'),
    height: wp('80%'),
  },
  editImage: {
    width: wp('4.5%'),
    height: wp('4.5%'),
    tintColor: '#FFFFFF',
  },
  galleryView: {
    height: wp('20%'),
    width: wp('20%'),
    backgroundColor: '#FF701F',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  galleryImg: {
    height: wp('7%'),
    width: wp('7%'),
    tintColor: 'white'
  },
  postTextView: {
    marginTop: wp('5%'),
  },
  safeView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonView: {
    marginTop: wp('7%'),
    marginBottom: wp('3%')
  },
  pickContainer: {
    borderWidth: 1,
    borderColor: '#DFDFDF',
    marginTop: hp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    width: '100%',
    paddingVertical: wp('7%'),
  },
  addLessonBtnContainer: {
    backgroundColor: '#FF701F',
    borderRadius: 4,
    paddingHorizontal: wp('3%'),
    paddingVertical: wp('2%'),
  },
  introText: {
    textTransform: 'uppercase',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#1F1F1F',
    fontSize: wp('5%'),
  },
});

export default CreatePost;