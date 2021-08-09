//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:49:50 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import {Alert, Linking} from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';
import _ from 'lodash';
import moment from 'moment';

export const convertUTCDateToLocalDate = date => {
  // console.warn('newDate',new Date(date))
  var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

  var offset = date.getTimezoneOffset() / 60;
  var hours = date.getHours();

  newDate.setHours(hours - offset);

  return newDate;
};

class utility {
  EdgePadding = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
  isPlatformAndroid = () => Platform.OS === 'android';
  isPlatformIOS = () => Platform.OS === 'ios';

  isEqual(value1, value2) {
    return _.isEqual(value1, value2);
  }
  isEmpty(value) {
    return _.isEmpty(value);
  }
  isUndefined(value) {
    return _.isUndefined(value);
  }
  isReplaceDash(str) {
    return str.replace(/-/gi, '');
  }
  isConcat(data1, data2) {
    return _.concat(data1, data2);
  }

  _getEngDate = (date, type) => {
    if (this.isEqual(type, 'year')) {
      return this._dateInYFormate(date);
    } else if (this.isEqual(type, 'month')) {
      return this._dateInMYFormate(date);
    } else if (this.isEqual(type, 'day')) {
      return this._dateToEngFormate(date);
    }
  };
  _getTimeFromDate = date => {
    // dateString *HAS* to be in this format "YYYY-MM-DD HH:MM:SS"
    let dateParam = date.split(/[\s-:]/);
    dateParam[1] = (parseInt(dateParam[1], 10) - 1).toString();

    let temp_date = convertUTCDateToLocalDate(new Date(...dateParam));

    return moment(temp_date).format('HH:mm:ss');
  };
  _dateToEngFormate = date => {
    return moment(date).format('MMM DD, YYYY');
  };
  _dayToEngFormate = date => {
    return moment(date).format('ddd, MMM DD, YYYY');
  };
  _dateInMYFormate = date => {
    return moment(date).format('MMMM, YYYY');
  };
  _dateInYFormate = date => {
    return moment(date).format('YYYY');
  };
  _getDate = (date, type) => {
    if (this.isEqual(type, 'year')) {
      return this._YDate(date);
    } else if (this.isEqual(type, 'month')) {
      return this._YMDate(date);
    } else if (this.isEqual(type, 'day')) {
      return this._YMDDate(date);
    }
  };
  _YDate = date => {
    let new_date = new Date(date);
    //Months are zero based
    let year = new_date.getFullYear();

    return `${year}`;
  };
  _YMDate = date => {
    let new_date = new Date(date);

    let month = new_date.getMonth() + 1;
    //Months are zero based
    let year = new_date.getFullYear();

    let dateString = `${year}-`;

    if (month < 10) {
      dateString += `0${month}`;
    } else {
      dateString += `${month}`;
    }

    return dateString;
  };
  _YMDDate = date => {
    let new_date = new Date(date);

    let day = new_date.getDate();
    let month = new_date.getMonth() + 1;
    //Months are zero based
    let year = new_date.getFullYear();

    let dateString = `${year}-`;

    if (month < 10) {
      dateString += `0${month}-`;
    } else {
      dateString += `${month}-`;
    }
    if (day < 10) {
      dateString += `0${day}`;
    } else {
      dateString += day;
    }
    return dateString;
  };

  _convertDate = date => {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    //Months are zero based
    let year = date.getFullYear();

    let dateString = `${year}-`;
    if (month < 10) {
      dateString += `0${month}-`;
    } else {
      dateString += `${month}-`;
    }
    if (day < 10) {
      dateString += `0${day}`;
    } else {
      dateString += day;
    }
    return dateString;
  };

  focusOnMapCoordinates = (map, markers, edgePadding = this.EdgePadding) => {
    options = {
      edgePadding: edgePadding,
      animated: true,
    };
    map.fitToCoordinates(markers, options);
  };
  openCall(url) {
    return Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => console.error('An error occurred', err));
  }
  animateToFirstLocationCentered = (map, points, duration = 2000) => {
    var minX, maxX, minY, maxY;
    // init first point
    (point => {
      minX = +point.latitude;
      maxX = +point.latitude;
      minY = +point.longitude;
      maxY = +point.longitude;
    })(points[0]);

    // calculate rect
    points.map(point => {
      minX = Math.min(minX, +point.latitude);
      maxX = Math.max(maxX, +point.latitude);
      minY = Math.min(minY, +point.longitude);
      maxY = Math.max(maxY, +point.longitude);
    });

    var midX = (minX + maxX) / 2;
    var midY = (minY + maxY) / 2;
    var midPoint = [midX, midY];

    var deltaX = maxX - minX;
    var deltaY = maxY - minY;
    map.animateToRegion(
      {
        latitude: +points[0].latitude,
        longitude: +points[0].longitude,
        latitudeDelta: deltaX * 2.5,
        longitudeDelta: deltaY * 2.5,
      },
      duration,
    );
  };
  validateEmail = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    }
    return true;
  };
  alerts = (title, description, onPress) => {
    Alert.alert(
      title,
      description,
      [
        {text: 'OK', onPress: onPress},
        {text: 'Cancel', onPress: () => {}},
      ],
      {
        cancelable: false,
      },
    );
  };
  // imagePickr = (cbSuccess) => {
  //   const options = {
  //     title: 'Select Profile',
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };
  //   launchImageLibrary(options, (response) => {
  //     console.log('res', response);
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //     } else {
  //       cbSuccess(response.uri);
  //     }
  //   });

  // }
}

export default new utility();
