'use strict';

const initState = {
  title: '首页',
  isArrow: false,
  arrowFun: () => false,
  arrowFunParam: {},
  isRight: false,
  rightFun: () => false,
  rightFunParam: {},
};

const header = (state = initState, action) => {
  switch (action.type) {
    case 'SET_HEADER':
      return {
        ...state,
        title: action.param.title,
        isArrow: action.param.isArrow,
        arrowFun: action.param.arrowFun,
        arrowFunParam: action.param.arrowFunParam,
        isRight: action.param.isRight,
        rightFun: action.param.rightFun,
      };
    default:
      return {
        ...state,
      };
  }
}

export default header;
