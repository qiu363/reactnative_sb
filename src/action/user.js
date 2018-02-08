'use strict';

import Async from './async';
import AscStorage from '../lib/ascStorage';

export default {
  getUser: () => {
    return async (dispatch) => {
      dispatch({type: 'USER_LOADING'});

      if (global.SB.DEBUG === 0) {
        let userData = await AscStorage.getUser();

        dispatch({
          ...userData,
          type: 'USER'
        });
      } else {
        let userData = {
          token: '10e11060654a11e7aa687d150662ace6',
          uid: '7c0de52016d511e7b8a171e16ac61c6b',
          nickname: '1111',
          avatar: 'http://images.bjshanbang.com/node.png',
          mobile: '13000000000',
        };

        dispatch({
          ...userData,
          type: 'USER'
        });
      }
    }
  },
  login: (data) => {
    return async (dispatch) => {
      await AscStorage.setItem('token', data.token);
      await AscStorage.setItem('uid', data.uid);
      await AscStorage.setItem('nickname', data.nickname);
      await AscStorage.setItem('avatar', data.avatar);
      await AscStorage.setItem('mobile', data.mobile);

      dispatch({
        ...data,
        type: 'USER'
      });
    }
  },
}
