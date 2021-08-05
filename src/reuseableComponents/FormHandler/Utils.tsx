import _ from "lodash";
import { INPUT_TYPES } from "./Constants";

function isEmpty(data: any) {
  return _.isEmpty(data);
}

function isEmailValid(email: string) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function isPasswordValid(password: string) {
  return password.length > 5;
}

function isInputValid(value, type, password) {
  switch (type) {
    case INPUT_TYPES.EMAIL: {
      return !isEmpty(value) && isEmailValid(value);
    }
    case INPUT_TYPES.PASSWORD: {
      return !isEmpty(value) && isPasswordValid(value);
    }
    case INPUT_TYPES.TEXT: {
      return !isEmpty(value);
    }
    case INPUT_TYPES.NUMBER: {
      return !isEmpty(value);
    }
    case INPUT_TYPES.CONFIRM_PASSWORD: {
      return !isEmpty(value) && value === password;
    }
    default: {
      return true;
    }
  }
}

function getError(type, val, originalError) {
  const { EMAIL, PASSWORD, CONFIRM_PASSWORD,PHONE } = INPUT_TYPES;

  if (!val.length) {
    if (type === EMAIL) {
      return "Email is required";
    }

    if (type === PASSWORD) {
      return "Password is required";
    }

    if (type === PHONE) {
      return "Phone Number is required";
    }

    if (type === CONFIRM_PASSWORD) {
      return "Confirm password is required";
    }
  }

  if (type === CONFIRM_PASSWORD && val.length < 6) {
    return "Password length must be greater than 6 characters";
  }

  if (type === CONFIRM_PASSWORD && val.length >= 6) {
    return "Confirm password and password don't match";
  }

  if (type === PASSWORD && val.length < 6) {
    return "Password length must be greater than 6 characters";
  }

  return originalError;
}

// showPassword is passed to input to as props
function isSecureTextEntry(childProps) {
  // handling password field
  if (
    childProps.type &&
    childProps.type === INPUT_TYPES.PASSWORD &&
    !childProps.showPassword
  ) {
    return true;
  }

  // handling confirm password field
  if (
    childProps.type &&
    childProps.type === INPUT_TYPES.CONFIRM_PASSWORD &&
    !childProps.showPassword
  ) {
    return true;
  }

  return false;
}

function getKeyboardType(childProps) {
  if (childProps.type) {
    switch (childProps.type) {
      case INPUT_TYPES.EMAIL: {
        return "email-address";
      }
      case INPUT_TYPES.NUMBER: {
        return "number-pad";
      }
      case INPUT_TYPES.PHONE: {
        return "phone-pad";
      }
      default:
        return "default";
    }
  }
  return "default";
}

export { getKeyboardType, isInputValid, isSecureTextEntry, getError };
