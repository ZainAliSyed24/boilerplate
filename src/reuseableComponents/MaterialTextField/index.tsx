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
  StyleSheet,
  TextInput,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type PropsType = {
  label?: string;
  type?: string;
  error?: string;
  onRightPress?: () => void;
  rightIcon?: any;
  rightText?: string;
  value?: string | number;
  isEmpty?: boolean;
  labelBackgroundColor?: string;
  activeTextColor?: string;
  inactiveColor?: string;
  activeColor?: string;
  outlined?: boolean;
  textInputStyle?: object | [];
  style?: object | [];
  onFocus?: () => void;
  returnKeyType?: any;
  onSubmitEditing?: () => void;
};

type StateType = {
  isFocused: boolean;
  error?: string;
  val?: string | number;
  maxHeight?: number;
  minHeight?: number;
  expanded?: boolean;
  isDatePickerVisible?: boolean;
};

export default class MaterialTextField extends Component<PropsType, StateType> {
  static defaultProps = {
    label: 'placeholder',
    error: 'Error',
    type: 'text',
    onRightPress: () => {},
    rightIcon: null,
    rightText: '',
    value: '',
    labelBackgroundColor: 'transparent',
    activeTextColor: 'goldenrod',
    inactiveColor: '#aaa',
    activeColor: '#000',
    outlined: false,
    textInputStyle: {},
    style: {},
    onFocus: () => {},
    returnKeyType: 'default',
    onSubmitEditing: () => {},
  };

  constructor(props: PropsType) {
    super(props);
    this.state = {
      isFocused: false,
      error: '',
      val: props.value ? props.value : '',
      maxHeight: 0,
      minHeight: 52,
      expanded: false,
      isDatePickerVisible: false,
    };
  }
  _animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
  animation = new Animated.Value(0);

  componentDidMount() {
    if (this.props.onRef != null) {
      this.props.onRef(this.validate);
    }
    this.animation.setValue(this.state.minHeight);
  }
  handleFocus = () => {
    this.animate(1);
    this.props.onFocus();
  };
  handleBlur = () => this.animate(this.state.val ? 1 : 0);
  animate = toValue => {
    Animated.timing(this._animatedIsFocused, {
      toValue: toValue,
      duration: 200,
    }).start();

    Animated.spring(this.animation, {
      toValue: this.state.expanded
        ? 18 + this.state.minHeight
        : this.state.minHeight,
    }).start();
  };
  labelStyle = {
    position: 'absolute',
    left: 10,
    top: this._animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [13, -9],
    }),
    fontSize: this._animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [17, 14],
    }),
    color: this._animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [this.props.inactiveColor, this.props.activeColor],
    }),
    backgroundColor: this.props.labelBackgroundColor,
    paddingLeft: 5,
    paddingRight: 5,
    alignSelf: 'center',
  };

  borderColorStyle = {
    borderColor: this._animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [this.props.inactiveColor, this.props.activeColor],
    }),
  };
  colorStyle = {
    color: this._animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [this.props.inactiveColor, this.props.activeColor],
    }),
  };
  tintColorStyle = {
    tintColor: this._animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [this.props.inactiveColor, this.props.activeColor],
    }),
  };
  borderStyle = this.props.outlined
    ? {
        borderWidth: 1,
      }
    : {
        borderBottomWidth: 1,
      };
  _setMaxHeight(event) {
    if (
      event.nativeEvent.layout.height !==
      Math.round(event.nativeEvent.layout.height)
    ) {
      this.setState({
        maxHeight: Math.round(event.nativeEvent.layout.height),
      });
    }
  }
  _setMinHeight(event) {
    this.setState({
      minHeight: event.nativeEvent.layout.height,
    });
  }
  setText = value => {
    if (value === '') {
      this.animate(0);
    } else {
      this.animate(1);
    }
    this.setState({val: value});
  };

  getValue = () => this.state.val;

  clearValue = () => this.setState({val: ''});

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

  componentIcon = () => {
    if (this.props.rightIcon || this.state.expanded) {
      return (
        <Animated.Image
          resizeMode="contain"
          // source={this.state.expanded ? Images.icError : this.props.iconImg}
          source={
            this.state.expanded ? this.props.rightIcon : this.props.rightIcon
          }
          // style={[this.tintColorStyle, { width: 24, height: 24 }, { tintColor: this.state.expanded && '#B00020' }]}
          style={[{width: 24, height: 24}]}
        />
      );
    } else {
      return (
        <Animated.Text style={this.colorStyle}>
          {' '}
          {this.props.rightText}
        </Animated.Text>
      );
    }
  };
  focus = () => {
    this.textInput.focus();
  };
  render() {
    return (
      <Animated.View
        style={[{height: this.animation, marginTop: 12}, this.props.style]}>
        <DateTimePickerModal
          isVisible={this.state.isDatePickerVisible}
          mode="date"
          onConfirm={this.handleConfirm}
          onCancel={this.hideDatePicker}
        />
        <Animated.View
          style={[this.borderColorStyle, styles.borderStyle, this.borderStyle]}>
          <Animated.Text
            style={[this.props.labelStyle, this.labelStyle]}
            numberOfLines={1}>
            {this.props.label}
          </Animated.Text>
          {this.props.type === 'date' ? (
            <View style={styles.dateWrapper}>
              <Text style={styles.txtInputStyle}>{this.state.val}</Text>
              <TouchableOpacity
                onPress={this.showDatePicker}
                style={{paddingHorizontal: 16 / 2}}>
                <Image source={require('./calendar.png')} />
              </TouchableOpacity>
            </View>
          ) : (
            <></>
          )}
          <TextInput
            ref={ref => (this.textInput = ref)}
            style={[
              styles.txtInputStyle,
              this.props.textInputStyle,
              {color: this.props.activeTextColor},
            ]}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onChangeText={text => this.setState({val: text})}
            blurOnSubmit={false}
            value={this.state.val}
            multiline={this.props.multiline && true}
            maxLength={this.props.maxLength}
            editable={this.props.editable}
            autoCorrect={false}
            keyboardType={this.props.keyboardType}
            secureTextEntry={this.props.secureTextEntry}
            selectionColor={this.props.selectionColor}
            returnKeyType={this.props.returnKeyType}
            onSubmitEditing={this.props.onSubmitEditing}
          />
          {(this.props.rightText ||
            this.props.rightIcon ||
            this.state.expanded) && (
            <TouchableOpacity
              onPress={this.props.onRightPress}
              style={styles.iconStyle}>
              {this.componentIcon()}
            </TouchableOpacity>
          )}
        </Animated.View>
        {this.state.error !== '' && (
          <Text style={styles.errorStyle}>{this.state.error}</Text>
        )}
      </Animated.View>
    );
  }
}
const styles = StyleSheet.create({
  iconStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  txtInputStyle: {
    minHeight: 52,
    height: 52,
    // fontSize: 20,
    color: 'goldenrod',
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 15,
    alignSelf: 'stretch',
    flex: 1,
  },
  errorStyle: {
    color: '#B00020',
    paddingLeft: 15,
    marginTop: 5,
  },
  borderStyle: {
    borderRadius: 4,
    flexDirection: 'row',
  },
  dateWrapper: {
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
