'use strict';

export default {
  setWebview: (data) => {
    return dispatch => {
      if (typeof data !== 'object') {
        data = {};
      }
      if (typeof data.title === 'undefined') {
        data.title = '机师帮';
      }
      if (typeof data.url === 'undefined') {
        data.url = 'http://www.jsb001.com/';
      }
      if (typeof data.method === 'undefined') {
        data.method = 'GET';
      }
      if (typeof data.body === 'undefined') {
        data.body = () => '';
      }
      if (typeof data.headers === 'undefined') {
        data.headers = {
          'User-Agent': 'shanbang'
        };
      } else {
        Object.assign({
          'User-Agent': 'shanbang'
        }, data.headers);
      }
      if (typeof data.scalesPageToFit === 'undefined') {
        data.scalesPageToFit = true;
      }
      if (typeof data.javaScriptEnabled === 'undefined') {
        data.javaScriptEnabled = false;
      }
      if (typeof data.onLoad === 'undefined') {
        data.onLoad = () => false;
      }
      if (typeof data.onError === 'undefined') {
        data.onError = () => false;
      }
      if (typeof data.onMessage === 'undefined') {
        data.onMessage = () => false;
      }

      dispatch({
        type: 'SET_WEBVIEW',
        param: data,
      });
    }
  },
}
