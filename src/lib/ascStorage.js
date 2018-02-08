'use strict';

import React, {
  AsyncStorage,
} from 'react-native';

const KEY = {
  token: 'token',
  uid: 'uid',
  nickname: 'nickname',
  avatar: 'avatar',
};

export default {
  setItem: async (key = 'def', val = '') => {
    await AsyncStorage.setItem(key, val);
  },
  getItem: async (key = 'def') => {
    return await AsyncStorage.getItem(key);
  },
  getUser: async () => {
    let token = await AsyncStorage.getItem(KEY.token);
    let uid = await AsyncStorage.getItem(KEY.uid);
    let nickname = await AsyncStorage.getItem(KEY.nickname);
    let avatar = await AsyncStorage.getItem(KEY.avatar);

    return {
      token: token,
      uid: uid,
      nickname: nickname,
      avatar: avatar,
    }
  },
};
