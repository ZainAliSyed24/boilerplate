//
//  navigatorHelper.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:20:00 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import React from 'react';
import {navigate, pop, toggleDrawer} from '../services/NavigationService';
import {ButtonView} from '../reuseableComponents';
import {Images, Metrics, AppStyles, Colors, Fonts} from '../theme';
import {Image, TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {push} from '../services/NavigationService';

const styles = StyleSheet.create({
  editBtn: {
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: Metrics.widthRatio(5),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.primary.themeLight,
    paddingVertical: Metrics.heightRatio(5),
    marginRight: Metrics.baseMargin,
  },
  notificationBtn: {
    backgroundColor: Colors.primary.themeDark,
    height: 10,
    width: 10,
    borderRadius: 10,
    position: 'absolute',
    right: 15,
    top: -5,
  },
  editBtnText: {
    // ...Fonts.font({
    //   fontFamily: Fonts.FontFamily.default,
    //   size: Fonts.Size.xxSmall,
    //   type: Fonts.Type.Regular,
    // }),
    color: Colors.primary.themeLight,
    lineHeight: 22,
  },
});

const headerColor = {
  headerStyle: {
    backgroundColor: Colors.secondary.azure,
    borderBottomWidth: 0,
  },
};
const removeBorder = {
  headerStyle: {
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
};
const headerTransparent = {
  headerTransparent: true,
};
const backImage = (title = '') => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <ButtonView style={{padding: Metrics.baseMargin}} onPress={pop}>
        <Image source={Images.icBack} />
      </ButtonView>
      <Text
        style={{
          // ...Fonts.font({
          //   type: Fonts.Type.Bold,
          //   fontFamily: Fonts.FontFamily.play,
          // }),
          fontSize: 16,
          color: Colors.text.black,
          marginLeft: Metrics.baseMargin,
          marginTop: -3,
        }}>
        {title}
      </Text>
    </View>
  );
};
const title = title => ({
  title,
  headerTitleStyle: {
    color: Colors.secondary.azure,
    // ...Fonts.font(
    //   Fonts.FontFamily.default,
    //   Fonts.Type.SemiBold,
    //   Fonts.Size.medium,
    // ),
  },
});
const defaultNavOptions = navOptions => {
  return {
    defaultNavigationOptions: ({navigation}) => navOptions,
  };
};
const navOptions = navOptions => {
  return {
    navigationOptions: ({navigation}) => navOptions,
  };
};

const navButton = (image, key = 'headerRight', navOptions, style) => {
  return {
    navigationOptions: ({navigation}) => {
      return {
        [key]: () => (
          <ImageButton
            source={image}
            style={{
              justifyContent: 'center',
              marginHorizontal: Metrics.smallMargin,
              height: 40,
              ...style,
            }}
            onPress={navigation.getParam('onPress', () =>
              global.log('onPress'),
            )}
          />
        ),
        ...navOptions,
      };
    },
  };
};
const dyanimcTitle = (navOptions = {}) => {
  return {
    navigationOptions: ({navigation}) => {
      console.log('navigation-navButton', navigation);
      return {
        title: navigation.getParam('title', ''),
        ...navOptions,
      };
    },
  };
};

const defaultHeader = props => {
  const screen = props?.route?.params?.screen;
  if (screen === 'Profile') {
    return {
      headerShown: false,
    };
  }
  return {
    headerLeft: () => (
      <ButtonView
        style={{paddingHorizontal: Metrics.widthRatio(20)}}
        onPress={() => toggleDrawer()}>
        <Image source={Images.icMenu} />
      </ButtonView>
    ),
    headerRight: () => (
      <ButtonView
        style={{paddingHorizontal: Metrics.widthRatio(20)}}
        onPress={() => {
          push('Notifications');
        }}>
        <Image source={Images.icNotification} />
        <View style={styles.notificationBtn}></View>
      </ButtonView>
    ),
    title: '',
    ...removeBorder,
    headerShown: true,
  };
};

const CustomHeader = titleHeader => ({
  headerLeft: () => (
    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
      <ButtonView
        style={{paddingHorizontal: Metrics.widthRatio(20)}}
        onPress={() => toggleDrawer()}>
        <Image source={Images.icMenu} />
      </ButtonView>
      <Text
        style={{
          paddingLeft: 12,
          // ...Fonts.font({
          //   type: Fonts.Type.Bold,
          //   fontFamily: Fonts.FontFamily.play,
          //   fontSize: Fonts.Size.xSmall,
          // }),
        }}>
        {titleHeader}
      </Text>
    </View>
  ),
  title: '',
  ...removeBorder,
  headerShown: true,
});

const titleHeader = title => ({
  headerLeft: () => backImage(title),
  title: '',
  ...removeBorder,
});

const EditHeader = () => ({
  ...defaultHeader(),
  headerRight: () => (
    <ButtonView
      onPress={() => navigate('ProfileStack', {screen: 'EditProfile'})}
      style={styles.editBtn}>
      <Text style={styles.editBtnText}>Edit Profile</Text>
    </ButtonView>
  ),
});

const MyDairySave = (title, onPress = {}) => ({
  ...titleHeader(title),
  headerRight: () => (
    <ButtonView onPress={onPress} style={styles.editBtn}>
      <Text style={styles.editBtnText}>Save</Text>
    </ButtonView>
  ),
});

export {
  headerColor,
  removeBorder,
  headerTransparent,
  backImage,
  title,
  defaultNavOptions,
  navOptions,
  navButton,
  dyanimcTitle,
  defaultHeader,
  EditHeader,
  MyDairySave,
  titleHeader,
  CustomHeader,
};
