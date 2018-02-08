'use strict';

import Async from './async';
import Fch from '../lib/fch';
import Toast from '../lib/toast';
import Login from '../lib/login';

export default {
  getList: (lastId = '') => {
    return dispatch => {
      let data = '';
      if (lastId !== '') {
        data = {
          lastId: lastId
        };
        dispatch({
          type: 'QUESTION_LIST_LOADING'
        });
      } else {
        dispatch({
          type: 'QUESTION_LIST_NEXT_LOADING'
        });
      }

      Fch('questionList', data, (responseData) => {
        if (responseData.status.code === -2) {
          let user = {
            token: '',
            uid: '',
            nickname: '',
            avatar: '',
          };
          dispatch(
            Async('USER', {
              user: user
            })
          );
        } else if (responseData.status.code !== 0) {
          let toast = Toast.toastBot(responseData.status.msg);
        } else {
          dispatch(
            Async('QUESTION_LIST', {
              list: responseData.data,
            })
          );
        }
      });
    }
  },
  getHotList: (lastId = '') => {
    return dispatch => {
      let data = '';
      if (lastId !== '') {
        data = {
          lastId: lastId
        };
        dispatch({
          type: 'QUESTION_LIST_LOADING'
        });
      } else {
        dispatch({
          type: 'QUESTION_LIST_NEXT_LOADING'
        });
      }

      Fch('questionListHot', data, (responseData) => {
        if (responseData.status.code === -2) {
          let user = {
            token: '',
            uid: '',
            nickname: '',
            avatar: '',
          };
          dispatch(
            Async('USER', {
              user: user
            })
          );
        } else if (responseData.status.code !== 0) {
          let toast = Toast.toastBot(responseData.status.msg);
        } else {
          dispatch(
            Async('QUESTION_LIST_HOT', {
              list: responseData.data,
            })
          );
        }
      });
    }
  },
  getCaseList: (lastId = '') => {
    return dispatch => {
      let data = '';
      if (lastId !== '') {
        data = {
          lastId: lastId
        };
        dispatch({
          type: 'QUESTION_LIST_LOADING'
        });
      } else {
        dispatch({
          type: 'QUESTION_LIST_NEXT_LOADING'
        });
      }

      Fch('questionListCase', data, (responseData) => {
        if (responseData.status.code === -2) {
          let user = {
            token: '',
            uid: '',
            nickname: '',
            avatar: '',
          };
          dispatch(
            Async('USER', {
              user: user
            })
          );
        } else if (responseData.status.code !== 0) {
          let toast = Toast.toastBot(responseData.status.msg);
        } else {
          dispatch(
            Async('QUESTION_LIST_CASE', {
              list: responseData.data,
            })
          );
        }
      });
    }
  },
}
