'use strict';

const initState = {
  tabName: '首页',
};

const indexTab = (state = initState, action) => {
  switch (action.type) {
    case 'SET_TAB':
      return {
        ...state,
        tabName: action.tabName,
      };
    default:
      return {
        ...state,
      };
  }
}

export default indexTab;
