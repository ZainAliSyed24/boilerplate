//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:13:09 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//

const type = 'qa'; //[dev, qa, release]

const constant = {
  //App Constants
  socketIP: '192.34.60.217',
  notificationAppId: 'a3002920-e8ca-497b-9a7e-be38257e3541',
  socketPort: '1233',
  baseURL: `http://retrocubedev.com/${type}/`,
  baseImageURL: `http://retrocubedev.com/${type}/`,
  applicationToken: 'api.Pd*!(5675',
  //Services Constants
  signup: 'user/create',
  login: 'user/login',
  forgotPassword: 'user/forgot/password',
  updateProfile: 'user/update',
  updatePassword: 'user/change/password',
  getUser: 'user/detail',

  //Socket Constants
  //     failure: { action: "failure", packet_code: 9900 },
  //Location Constants
  LOCATION_TIME_OUT: 10000,
  LOCATION_MAX_AGE: 1000,
  LOCATION_HIGH_ACCURACY: false,

  INPUT_TYPES: {
    NON_EMPTY: 'NON_EMPTY',
    NAME: 'NAME',
    EMAIL: 'EMAIL',
    PASSWORD: 'PASSWORD',
    PASSWORD_LOGIN: 'PASSWORD_LOGIN',
    NUMBER: 'NUMBER',
    DECIMAL: 'DECIMAL',
    NUMERIC: 'NUMERIC',
    PHONE: 'PHONE',
    DATE: 'date',
    dropdown: 'dropdown',
    TEXT_INPUT: 'TEXT',
  },

  STATUS_TYPES: {
    PENDING: 'Pending',
    ACHIEVED: 'Achieved',
  },
};

export default constant;
