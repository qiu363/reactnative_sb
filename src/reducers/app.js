'use strict';

const initState = {
  version: '1.0.0',
  company: '北京闪帮科技有限公司',
  copyright: '2016-' + new Date().getFullYear()
};

const app = (state = initState, action) => {
  switch (action.type) {
    default:
      return {
        ...state,
      };
  }
}

export default app;
