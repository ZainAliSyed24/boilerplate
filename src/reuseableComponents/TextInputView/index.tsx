//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:27:23 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TextInput,
  Platform,
} from 'react-native';

import moment from 'moment';
import PropTypes from 'prop-types';
import utility from '../../utility';

import constants from '../../constants';
import ModalPicker from '../ModalPicker';
import {Colors, Metrics, Images} from '../../theme';
import {ButtonView} from '../../reuseableComponents';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default class TextInputView extends Component {
  static propTypes = {
    type: PropTypes.string,
    selected: PropTypes.any,
    label: PropTypes.string,
    error: PropTypes.string,
    isEmpty: PropTypes.bool,
    onFocus: PropTypes.func,
    rightIcon: PropTypes.any,
    leftIcon: PropTypes.any,
    outlined: PropTypes.bool,
    rightText: PropTypes.string,
    minHeight: PropTypes.number,
    labelColor: PropTypes.string,
    onRightPress: PropTypes.func,
    placeholder: PropTypes.string,
    activeColor: PropTypes.string,
    inactiveColor: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    authField: PropTypes.bool,
    returnKeyType: PropTypes.string,
    onSubmitEditing: PropTypes.func,
    activeTextColor: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    labelBackgroundColor: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object),
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    textInputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  };

  static defaultProps = {
    label: '',
    value: '',
    style: {},
    options: [],
    selected: null,
    rightText: '',
    error: 'Error',
    rightIcon: null,
    outlined: false,
    onFocus: () => {},
    textInputStyle: {},
    activeColor: '#000',
    inactiveColor: '#aaa',
    activeTextColor: 'red',
    secureTextEntry: false,
    authField: false,
    onRightPress: () => {},
    returnKeyType: 'default',
    onSubmitEditing: () => {},
    labelBackgroundColor: '#fff',
    labelColor: Colors.primary.themeDark,
    type: constants.INPUT_TYPES.TEXT_INPUT,
    placeholderTextColor: Colors.text.brownGreyTwo,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      error: '',
      maxHeight: 0,
      minHeight: 52,
      isDatePickerVisible: false,
      showEye: props.secureTextEntry,
      val: props.value ? props.value : '',
      secureTextEntry: props.secureTextEntry,
      authField: props.authField,
      id: null,
    };
  }

  componentDidMount() {
    if (!this.state.secureTextEntry && this.props.type == 'PASSWORD') {
      this.setState({secureTextEntry: true});
    }
    if (this.props.onRef != null) {
      this.props.onRef(this.validate);
    }
  }
  handleFocus = () => {
    this.props.onFocus();
  };
  handleBlur = () => {};

  setFocus = () => this.textInput?.focus();

  styles = StyleSheet.create({
    labelStyle: {
      color: this.props.labelColor,
      backgroundColor: this.props.labelBackgroundColor || 'transparent',
      paddingLeft: 5,
      paddingRight: 5,
      //   ...Fonts.font({
      //     scale: false,
      //     type: Fonts.Type.Regular,
      //     size: Fonts.Size.xSmall,
      //     fontFamily: Fonts.FontFamily.default,
      //   }),
    },
    container: {
      minHeight:
        this.props.minHeight ||
        Metrics.heightRatio(this.props.multiline ? 90 : 52),
      borderBottomWidth: 1,
      borderColor: Colors.primary.veryLightPink,
      backgroundColor: '#FFFFFF',
    },
    txtInputStyle: {
      flex: 1,
      textAlignVertical: this.props.multiline ? 'top' : 'auto',
      paddingLeft: this.props.leftIcon ? 45 : 5,
      paddingBottom: 6,
      paddingRight: Metrics.widthRatio(15),
      maxHeight:
        this.props.minHeight > 130
          ? this.props.minHeight
          : Metrics.heightRatio(130),
      color: Colors.primary.black,
      lineHeight: Metrics.heightRatio(22),
      minHeight: this.props.minHeight
        ? this.props.minHeight - utility.isPlatformIOS()
          ? 20
          : 0
        : Metrics.heightRatio(this.props.multiline ? 90 : 60),
    },
  });

  setText = value => {
    this.setState({val: value});
  };

  setError = error => {
    this.setState({error});
  };

  getValue = () => {
    // console.log(this.state.id, 'test id')
    if (this.state.id != null) {
      return this.state.id;
    } else {
      return this.state.val;
    }
  };
  componentIcon = () => {
    if (this.props.rightIcon) {
      return (
        <Image
          resizeMode="contain"
          source={this.props.rightIcon}
          style={[{width: 24, height: 24}]}
        />
      );
    }
    return null;
  };
  focus = () => {
    this.textInput.focus();
  };

  showDatePicker = () => {
    this.setState({
      isDatePickerVisible: true,
    });
  };

  hideDatePicker = () => {
    this.setState({
      isDatePickerVisible: false,
    });
  };

  handleConfirm = date => {
    this.setState({
      val: moment(date).format('ddd, MMM DD, YYYY'),
    });
    this.hideDatePicker();
  };

  cBdata = data => {
    // console.warn('CBdata ', data)
    this.setState({id: data.id});
  };

  render() {
    const {
      type,
      style,
      label,
      options,
      editable,
      selected,
      multiline,
      rightText,
      rightIcon,
      leftIcon,
      maxLength,
      labelStyle,
      placeholder,
      keyboardType,
      onRightPress,
      returnKeyType,
      selectionColor,
      textInputStyle,
      activeTextColor,
      onSubmitEditing,
      placeholderTextColor,
    } = this.props;

    const {val, error, showEye, secureTextEntry, isDatePickerVisible} =
      this.state;

    const {INPUT_TYPES} = constants;

    return (
      <View style={[this.styles.container, style]}>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={this.handleConfirm}
          onCancel={this.hideDatePicker}
        />
        {label ? (
          <Text style={[this.styles.labelStyle, labelStyle]} numberOfLines={1}>
            {label}
          </Text>
        ) : (
          <></>
        )}
        {type === INPUT_TYPES.DATE ? (
          <View style={styles.dateWrapper}>
            <Text style={styles.textStyle}>{val}</Text>
            <ButtonView
              onPress={this.showDatePicker}
              style={{paddingHorizontal: Metrics.baseMargin / 2}}>
              <Image source={Images.icCalendar} />
            </ButtonView>
          </View>
        ) : type === INPUT_TYPES.dropdown ? (
          <ModalPicker
            selected={selected}
            options={options}
            wrapper={styles.dateWrapper}
            textStyle={styles.textStyle}
            value={this.state.val}
            cBdata={this.cBdata}
          />
        ) : (
          <>
            {leftIcon ? (
              <View style={styles.leftIconStyle}>
                <Image
                  source={leftIcon}
                  style={
                    this.props.type == 'EMAIL'
                      ? {
                          marginBottom: Metrics.heightRatio(2),
                          tintColor: placeholderTextColor,
                        }
                      : {
                          tintColor: placeholderTextColor,
                          marginBottom: Metrics.heightRatio(-1),
                        }
                  }
                />
              </View>
            ) : null}
            <TextInput
              ref={ref => (this.textInput = ref)}
              style={[this.styles.txtInputStyle, textInputStyle]}
              editable={editable}
              autoCorrect={false}
              blurOnSubmit={false}
              multiline={multiline}
              maxLength={maxLength}
              onBlur={this.handleBlur}
              placeholder={placeholder}
              onFocus={this.handleFocus}
              keyboardType={keyboardType}
              returnKeyType={returnKeyType}
              selectionColor={selectionColor}
              secureTextEntry={secureTextEntry}
              onSubmitEditing={onSubmitEditing}
              placeholderTextColor={placeholderTextColor}
              onChangeText={text => this.setState({val: text})}>
              <Text
                style={
                  !utility.isPlatformIOS()
                    ? [this.styles.txtInputStyle, textInputStyle]
                    : {}
                }>
                {val}
              </Text>
            </TextInput>
            {showEye ? (
              <ButtonView
                onPress={() =>
                  this.setState({secureTextEntry: !secureTextEntry})
                }
                style={styles.iconStyle}>
                <ImageHandler
                  source={secureTextEntry ? Images.icEyeClose : Images.icEye}
                />
              </ButtonView>
            ) : null}
            {error !== '' && <Text style={styles.errorStyle}>{error}</Text>}
          </>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  iconStyle: {
    right: 0,
    bottom: 10,
    marginRight: 15,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIconStyle: {
    left: 0,
    bottom: 10,
    marginLeft: 10,
    paddingLeft: 5,
    paddingBottom: 5,
    position: 'absolute',
    alignItems: 'center',
  },
  errorStyle: {
    marginVertical: 10,
    paddingLeft: 15,
    color: '#B00020',
    position: 'absolute',
    bottom: -30,
    left: -10,
  },
  dateWrapper: {
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    // ...Fonts.font({
    //   scale: false,
    //   type: Fonts.Type.Regular,
    //   size: Fonts.Size.small,
    //   fontFamily: Fonts.FontFamily.default,
    // }),
    color: Colors.text.brownGreyTwo,
  },
});
