'use strict';

const initState = {
  token: '',
  uid: '',
  nickname: '',
  avatar: '',
  mobile: '',
  status: 0,
};

const user = (state = initState, action) => {
  switch (action.type) {
    case 'USER_LOADING':
      return {
        ...state,
        status: 0
      };
    case 'USER':
      return {
        ...state,
        token: action.token,
        uid: action.uid,
        nickname: action.nickname,
        avatar: action.avatar,
        mobile: action.mobile,
        status: 1,
      };
    default:
      return {
        ...state,
      };
  }
}

export default user;
