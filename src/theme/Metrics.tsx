//
//  Metrics.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:47:10 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

const screenWidth = width < height ? width : height;
const screenHeight = width < height ? height : width;

const IPHONE_XS_HEIGHT = 812; // iPhone X and XS
const IPHONE_XR_HEIGHT = 896; // iPhone XR and XS Max
const IS_IPHONE_X =
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (screenHeight === IPHONE_XS_HEIGHT ||
    screenWidth === IPHONE_XS_HEIGHT ||
    screenHeight === IPHONE_XR_HEIGHT ||
    screenWidth === IPHONE_XR_HEIGHT);

var designedAtX = true;

const guidelineBaseWidth = designedAtX ? 375 : 414;
const guidelineBaseHeight = designedAtX ? 812 : 736;

const scaleHorizontal = (size) => (screenWidth / guidelineBaseWidth) * +size;
const scaleVertical = (size) => (screenHeight / guidelineBaseHeight) * size;

const heightRatio = (size) => scaleVertical(size);
const widthRatio = (size) => scaleHorizontal(size);

const generatedFontSize = (size) => scaleVertical(size);

const NAVBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;

export default {
  designedAtX,
  IS_IPHONE_X,
  STATUSBAR_HEIGHT,
  NAVBAR_HEIGHT,
  heightRatio,
  widthRatio,
  screenWidth,
  screenHeight,
  generatedFontSize,

  searchBarHeight: heightRatio(50),
  smallMargin: heightRatio(8),
  baseMargin: heightRatio(16),
  doubleBaseMargin: heightRatio(24),
  xDoubleBaseMargin: heightRatio(32),
  horizontalLineHeight: heightRatio(1),

  statusBarHeight: STATUSBAR_HEIGHT,
  navBarHeight: NAVBAR_HEIGHT + STATUSBAR_HEIGHT,

  tabBarHeight: 49, // Default tab bar height in iOS 10

  icons: {
    xTiny: heightRatio(12),
    tiny: heightRatio(16),
    small: heightRatio(24),
    normal: heightRatio(32),
    medium: heightRatio(48),
    large: heightRatio(64),
    xl: heightRatio(128),
  },
  images: {
    xSmall: heightRatio(15),
    small: heightRatio(20),
    medium: heightRatio(40),
    large: heightRatio(55),
    xLarge: heightRatio(70),
    avatar: heightRatio(90),
    logo: heightRatio(200),
    radius: heightRatio(100),
    coverWidth: screenWidth,
    coverHeight: screenWidth / 2,
  },
};
