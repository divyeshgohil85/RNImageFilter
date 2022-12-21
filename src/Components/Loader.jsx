import React from 'react';
import {View, Dimensions, ActivityIndicator, Text} from 'react-native';

const screenDimensions = Dimensions.get('window');

const Loader = ({visible, titleText}) => {
  return (
    <View
      style={{
        opacity: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: visible ? screenDimensions.height : 0,
        width: visible ? screenDimensions.width : 0,
        backgroundColor: visible ? '#00000020' : 'transparent',
        borderWidth: 0,
      }}>
      {visible && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: screenDimensions.width / 2,
            paddingVertical: 12,
            borderRadius: 10,
          }}>
          <ActivityIndicator size={'large'} color={'#fff'} />
          <Text
            style={{
              color: 'white',
              marginTop: 15,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {titleText !== undefined ? titleText : 'Loading'}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Loader;
