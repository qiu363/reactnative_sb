'use strict';

import Toast from './toast';

const SERVERS_URL = 'http://api.dev.bjshanbang.com';
const API = {
  questionList: [ // 问题列表
    '/v2/groups/questions',
    'POST',
  ],
  questionListHot: [ // 热门问题列表
    '/v2/groups/questions/hot',
    'POST',
  ],
  questionListCase: [ // 案例列表
    '/v1/groups/questions/case',
    'POST',
  ],
  questionListMine: [ // 我的问题列表
    '/v2/groups/questions/my',
    'POST',
  ],
  mobileCaptcha: [ // 获取验证码
    '/v1/mobiles/[mobile]/captcha',
    'POST',
  ],
  login: [ // 登录
    '/v1/users/login',
    'PUT',
  ],
  friendsList: [ // 好友列表
    '/v1/friends',
    'GET',
  ],
  questionMessage: [ // 问题消息历史
    '/v1/messages/groups',
    'POST',
  ],
};
const HEADER = {
  'Content-Type': 'application/json',
  'Host': 'api.dev.bjshanbang.com',
  'User-Agent': 'jsb-ios',
};

export default (router, params = '', callback = () => {}, header = {}) => {
  let url = SERVERS_URL + API[router][0];

  let tmpHeader = HEADER;
  for (let k in header) {
    tmpHeader[k] = header[k];
  }
  if (!!global.SB.TOKEN) {
    tmpHeader['token'] = global.SB.TOKEN;
  }

  if (params._rpl) {
    url = url.replace(/\[.*?\]/, params.val);
    params = '';
  }

  if (typeof params === 'object') {
    params = JSON.stringify(params);
  }

  try {
    fetch(url, {
      method: API[router][1],
      body: params,
      headers: tmpHeader,
    })
    .then((response) => response.json())
    .then((responseData) => {
      callback(responseData);
    })
    .catch((error) => {
      Toast.toastBot('网络异常，请稍后再试');
      console.log(`Request - Error api:${url} error:${error}`);
    });
  } catch (e) {
    Toast.toastBot('网络异常，请稍后再试');
  }
}
