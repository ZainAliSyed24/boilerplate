import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';

import PropTypes from 'prop-types';
import {ActionSheetCustom as ActionSheet} from 'react-native-actionsheet';
import {ButtonView} from '../../reuseableComponents';
import {Images, Colors} from '../../theme';

class ModalPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.selected
        ? props.options.find(ele => ele.id === props.selected).title
        : '',
      options: props.options,
    };
  }
  static propTypes = {
    value: PropTypes.string,
  };

  componentDidUpdate(prevProps) {
    // console.log(prevProps.value, this.props.value);
    if (this.props.options !== prevProps.options) {
      this.setState({options: this.props.options}, () => {
        this.onCheckChanged(this.props.selected);
      });
    }
    if (this.props.selected !== prevProps.selected) {
      this.setState({
        value:
          this.props.options.find(ele => ele.id === this.props.selected)
            ?.title || '',
      });
    }
  }

  onCheckChanged(id) {
    const index = this.state.options.findIndex(x => x.id === id);
    if (index && id) {
      this.handleActionSheetPress(index);
    } else {
      this.handleActionSheetPress(0);
    }
  }

  setFocus = () => this.onPress();
  getValue = () => {
    return this.state.value;
  };
  setError = () => {
    this.textInput?.setError(true, this.props.error);
  };
  onPress = () => this.pickActionSheet.show();

  handleActionSheetPress = index => {
    if (index !== this.state.options.length) {
      this.setState({
        value: `${this.state.options[index]?.title}`,
        id: `${this.state.options[index]?.id}`,
      });
      this.props.cBdata(this.state.options[index]);
    }
  };

  pickActionSheetRef = ref => (this.pickActionSheet = ref);

  _renderText = (text, checked) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {checked ? (
        <Image
          source={Images.icClose}
          style={{position: 'absolute', left: -40, top: -8}}
        />
      ) : null}
      <Text style={{color: Colors.text.black}}>{text}</Text>
    </View>
  );

  render() {
    let {options, value, textStyle} = this.state;
    console.log({value});
    const {isActiveEvent, wrapper} = this.props;
    return (
      <ButtonView onPress={this.onPress} style={[this.props.style, {flex: 1}]}>
        <View style={wrapper}>
          <Text style={[textStyle, {color: Colors.text.brownGreyTwo}]}>
            {value}
          </Text>
          {/* <Image source={Images.icExpandMore} /> */}
        </View>
        <ActionSheet
          visible={false}
          ref={this.pickActionSheetRef}
          title=""
          options={
            this.state.options.length
              ? [
                  ...this.state.options.map(item => {
                    const val = `${item.title}`;
                    return this._renderText(val, val === value);
                  }),
                  this._renderText('Discard'),
                ]
              : ['No Data Found']
          }
          cancelButtonIndex={this.state.options.length}
          onPress={this.handleActionSheetPress}
        />
      </ButtonView>
    );
  }
}

export default ModalPicker;
