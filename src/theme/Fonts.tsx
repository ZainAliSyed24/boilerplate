//
//  Fonts.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:47:26 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import {Platform} from 'react-native';
import Metrics from './Metrics';

export default class Fonts {
  static FontFamily = {
    default: 'Gibson',
  };

  static Type = {
    BoldItalic: 'BoldItalic',
    Regular: 'Regular',
    SemiboldIt: 'SemiboldIt',
    Medium: 'Medium',
    Italic: 'Italic',
    Bold: 'Bold',
    LightIt: 'LightIt',
    SemiBold: 'SemiBold',
    Light: 'Light',
  };

  static Size = {
    xxxSmall: 11,
    xxSmall: 13,
    xSmall: 14,
    xxxxSmall: 12,
    small: 15,
    xnormal: 16,
    normal: 17,
    xxnormal: 18,
    medium: 19,
    xMedium: 20,
    large: 21,
    xxxxLarge: 22,
    xLarge: 23,
    midLarge: 26,
    xxLarge: 28,
    xxxLarge: 31,
    huge: 34,
    xhuge: 37,
    xxhuge: 40,
    xxxhuge: 43,
  };

  static font = ({
    scale = true,
    fontFamily = Fonts.FontFamily.default,
    type = Fonts.Type.Regular,
    size = Fonts.Size.xxxxSmall,
  }) => {
    return {
      fontFamily: fontFamily + '-' + type,
      fontSize: Metrics.heightRatio(Platform.OS == 'ios' ? size : size + 2),
    };
  };
  // fontSize: scale ? Metrics.heightRatio(size) : size
  static FontSize = size => {
    return Metrics.heightRatio(size) < 11 ? 11 : Metrics.heightRatio(size);
  };
}
