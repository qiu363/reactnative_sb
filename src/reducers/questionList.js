'use strict';

import { ListView } from 'react-native'

let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
let dataSource = ds.cloneWithRows([]);

const initState = {
  status: 0,
  list: [],
  listPg: 1,
  listDs: dataSource,
  hotList: [],
  listHotPg: 1,
  hotListDs: dataSource,
  caseList: [],
  listCasePg: 1,
  caseListDs: dataSource,
  refreshStatus: 0,
};

const questionList = (state = initState, action) => {
  switch (action.type) {
    case 'QUESTION_LIST_LOADING':
      return {
        ...state,
        status: 0
      };
    case 'QUESTION_LIST_NEXT_LOADING':
      return {
        ...state,
        status: 2,
      };
    case 'QUESTION_LIST':
      let listPg = state.listPg;
      let listData = state.list;
      if (listPg === 1) {
        listData = action.list;
      } else {
        listData = listData.concat(action.list);
      }
      dataSource = ds.cloneWithRows(listData);
      listPg++;

      return {
        ...state,
        list: listData,
        listDs: dataSource,
        listPg: listPg,
        status: 1,
        refreshStatus: 0,
      };
    case 'QUESTION_LIST_HOT':
      let listHotPg = state.listHotPg;
      let listHotData = state.list;
      if (listHotPg === 1) {
        listHotData = action.list;
      } else {
        listHotData = listHotData.concat(action.list);
      }
      dataSource = ds.cloneWithRows(listHotData);
      listHotPg++;

      return {
        ...state,
        hotList: listHotData,
        hotListDs: dataSource,
        listHotPg: listHotPg,
        status: 1,
        refreshStatus: 0,
      };
    case 'QUESTION_LIST_CASE':
      let listCasePg = state.listCasePg;
      let listCaseData = state.list;
      if (listCasePg === 1) {
        listCaseData = action.list;
      } else {
        listCaseData = listCaseData.concat(action.list);
      }
      dataSource = ds.cloneWithRows(listCaseData);
      listCasePg++;

      return {
        ...state,
        caseList: listCaseData,
        caseListDs: dataSource,
        listCasePg: listCasePg,
        status: 1,
        refreshStatus: 0,
      };
    default:
      return {
        ...state,
      };
  }
}

export default questionList;
