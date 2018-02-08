'use strict';

export default {
  setHeader: (data) => {
    return dispatch => {
      if (typeof data !== 'object') {
        data = {};
      }
      if (typeof data.title === 'undefined') {
        data.title = '首页';
      }
      if (typeof data.isArrow === 'undefined') {
        data.isArrow = false;
      }
      if (typeof data.arrowFun === 'undefined') {
        data.arrowFun = () => false;
      }
      if (typeof data.arrowFunParam === 'undefined') {
        data.arrowFunParam = {};
      }
      if (typeof data.isRight === 'undefined') {
        data.isRight = false;
      }
      if (typeof data.rightFun === 'undefined') {
        data.rightFun = () => false;
      }
      if (typeof data.rightFunParam === 'undefined') {
        data.rightFunParam = {};
      }

      dispatch({
        type: 'SET_HEADER',
        param: data,
      });
    }
  },
}
