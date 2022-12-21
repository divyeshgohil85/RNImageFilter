import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Button = (props) => {
  const { title, onclick, style } = props;

  return (
    <TouchableOpacity style={[styles.btnContainer, style]} onPress={() => onclick()}>
      <Text style={[styles.btnText, style]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: '#FF701F',
    borderRadius: 4,
    height: hp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#FFFFFF',
  },
});

export default Button;
