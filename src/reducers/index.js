'use strict';

import { combineReducers } from 'redux';
import App from './app';
import User from './user';
import QuestionList from './questionList';
import IndexTab from './indexTab';
import Header from './header';
import Webview from './webview';

export default combineReducers({
  app: App,
  indexTab: IndexTab,
  user: User,
  questionList: QuestionList,
  header: Header,
  webview: Webview
});
