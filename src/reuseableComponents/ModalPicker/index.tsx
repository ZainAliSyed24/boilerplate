import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {ActionSheetCustom as ActionSheet} from 'react-native-actionsheet';

interface PropsType {
  value: string;
  options: [any];
  selected: number | string;
  cBdata: any;
  error: any;
  style: object;
  wrapper: object;
  textStyle: object;
}

type StateType = {
  id: number;
  value: string;
  options: any;
};

class ModalPicker extends Component<PropsType, StateType> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: props.selected
        ? props.options.find(ele => ele.id === props.selected).title
        : '',
      options: props.options,
    };
  }

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

  _renderText = (text: string, checked: boolean) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {checked ? (
        <Image
          source={require('./checked.png')}
          style={{position: 'absolute', left: -52, top: 0}}
        />
      ) : null}
      <Text style={{color: '#000'}}>{text}</Text>
    </View>
  );

  render() {
    let {value} = this.state;

    const {wrapper, textStyle} = this.props;
    return (
      <TouchableOpacity
        onPress={this.onPress}
        style={[this.props.style, {flex: 1}]}>
        <View style={wrapper}>
          <Text style={[textStyle, {fontSize: 16, color: 'goldenrod'}]}>
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
                  this._renderText('Discard', false),
                ]
              : ['No Data Found']
          }
          cancelButtonIndex={this.state.options.length}
          onPress={this.handleActionSheetPress}
        />
      </TouchableOpacity>
    );
  }
}

export default ModalPicker;
