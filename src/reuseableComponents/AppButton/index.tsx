import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

const AppButton = (props: any) => {
  return !props.backgroundImage ? (
    <TouchableOpacity
      style={[
        styles.btn,
        {backgroundColor: props.item.backgroundColor || 'blue'},
      ]}
      onPress={props.onPress}>
      <View style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}>
        <Text
          style={[styles.txtTitle, {color: props.item.textColor || '#FFFFFF'}]}>
          {props.item.title}
        </Text>
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={props.onPress} style={styles.btn}>
      <ImageBackground
        resizeMode="stretch"
        source={props.backgroundImage}
        style={styles.img}>
        <Text
          style={[styles.txtTitle, {color: props.item.textColor || '#FFFFFF'}]}>
          {props.item.title}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: '80%',
    height: '5%',
    marginVertical: 10,
    borderRadius: 40,
  },
  viDashboard: {
    width: '80%',
    height: '15%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  absoluteView: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'transparent',
  },
  img: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});

export default AppButton;
