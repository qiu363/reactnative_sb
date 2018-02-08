'use strict';

import React from 'react-native';
import Toast from 'react-native-root-toast';

export default {
  toastBot: (val = 'Message') => {
    return Toast.show(val, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  },
};
