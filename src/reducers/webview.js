'use strict';

const initState = {
  title: '机师帮',
  url: 'http://www.jsb001.com/',
  method: 'GET',
  body: '',
  headers: {
    'User-Agent': 'shanbang'
  },
  scalesPageToFit: true,
  javaScriptEnabled: true,
  onLoad: () => false,
  onError: () => false,
  onMessage: () => false,
};

const webview = (state = initState, action) => {
  switch (action.type) {
    case 'SET_WEBVIEW':
      return {
        ...state,
        title: action.param.title,
        url: action.param.url,
        method: action.param.method,
        headers: action.param.headers,
        scalesPageToFit: action.param.scalesPageToFit,
        javaScriptEnabled: action.param.javaScriptEnabled,
        onLoad: action.param.onLoad,
        onError: action.param.onError,
        onMessage: action.param.onMessage,
      };
    default:
      return {
        ...state,
      };
  }
}

export default webview;
