import React, {Component} from 'react';
import {
  getKeyboardType,
  isInputValid,
  isSecureTextEntry,
  getError,
} from './Utils';
import {INPUT_TYPES} from './Constants';

class Form extends Component {
  childReferences = [];
  childDetails = [];

  /* go through each input and check validation based on its type */
  checkValidation = () => {
    let isValid = true;
    for (let i = 0; i < this.childReferences.length; i++) {
      if (
        this.childReferences[i].getValue &&
        !isInputValid(
          this.childReferences[i].getValue(),
          this.childDetails[i].type,
          this.childDetails[i].type === INPUT_TYPES.CONFIRM_PASSWORD
            ? this.childReferences[i - 1].getValue()
            : '',
          !!this.childDetails[i].byPassValidation, // if by passing validation prop is active then only checking for empty validation
        )
      ) {
        this.childReferences[i].setError &&
          this.childReferences[i].setError(
            true,
            getError(
              this.childDetails[i].type,
              this.childReferences[i].getValue(),
              this.childDetails[i].error,
            ),
          );
        isValid = false;
      }
    }
    return isValid;
  };

  /* collecting user entered values from all inputs */
  getValues = () => {
    let data = {};
    this.childReferences.forEach((item, index) => {
      data[this.childDetails[index].identifier] = item.getValue();
    });
    return data;
  };

  clearInputs = () => {
    let data = {};
    this.childReferences.forEach((item, index) => {
      data[this.childDetails[index].identifier] = item.clearValue();
    });
    return data;
  };

  onSubmitForm = () => {
    return this.checkValidation() ? this.getValues() : undefined;
  };

  refCollector = ref => this.childReferences.push(ref);

  collectChildDetails = childProps => this.childDetails.push(childProps);

  /* handling onSubmit of each input when user moves to next input from keyboard */
  onSubmitEditing = index => ev => {
    if (
      index < this.childReferences.length - 1 &&
      this.childReferences[index + 1].setFocus
    ) {
      this.childReferences[index + 1].setFocus();
    }
  };

  render() {
    const wrappedChildrens = [];

    React.Children.map(this.props.children, (child, index) => {
      if (!child) {
        return;
      }
      /* holding details of input in an array for later use */
      child.props.type && this.collectChildDetails(child.props);
      /* cloning children and injecting some new props on them */
      wrappedChildrens.push(
        React.cloneElement(child, {
          key: child.props.identifier || `${child.props.type}_${index}`,
          ref: child.props.type ? this.refCollector : undefined,
          onSubmitEditing: this.onSubmitEditing(index),
          returnKeyType:
            index < this.props.children.length - 1 ? 'next' : 'done',
          keyboardType: getKeyboardType(child.props),
          secureTextEntry: isSecureTextEntry(child.props),
          blurOnSubmit: index < this.props.children.length - 1 ? false : true,
        }),
      );
    });

    return wrappedChildrens;
  }
}

export default Form;
