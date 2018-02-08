'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import App from './page/app';
import Login from './page/login';
import MyQuestionList from './page/ucenter/myQuestionList';
import Profile from './page/ucenter/profile';
import Contacts from './page/ucenter/contacts';
import FavoritesList from './page/ucenter/favoritesList';
import Setup from './page/ucenter/setup';
import About from './page/ucenter/about';
import Webviews from './page/webviews';
import QuestionMessage from './page/questionMessage';

import UserAction from './action/user';

class Main extends Component {
  constructor(props) {
    super(props);

    const { getUser } = this.props;
    getUser();
  }

  render() {
    const { status, token, uid } = this.props.user;
    let { params } = this.props.navigation.state;
    if (typeof params === 'undefined') {
      params = {};
    }

    global.SB = {
      TOKEN: token,
      UID: uid
    };

    if (status === 0) {
      return <View style={styles.container}></View>
    }

    // 登录
    if (!token) {
      return (
        <View style={styles.container}>
          <Login navigation={this.props.navigation} />
        </View>
      )
    }
    // 我的问题列表
    if (params.router === 'myQuestionList') {
      return (
        <View style={styles.container}>
          <MyQuestionList navigation={this.props.navigation} />
        </View>
      )
    }
    // 个人信息
    if (params.router === 'profile') {
      return (
        <View style={styles.container}>
          <Profile navigation={this.props.navigation} />
        </View>
      )
    }
    // 联系人
    if (params.router === 'contacts') {
      return (
        <View style={styles.container}>
          <Contacts navigation={this.props.navigation} />
        </View>
      )
    }
    // 设置
    if (params.router === 'setup') {
      return (
        <View style={styles.container}>
          <Setup navigation={this.props.navigation} />
        </View>
      )
    }
    // 收藏列表
    if (params.router === 'favoritesList') {
      return (
        <View style={styles.container}>
          <FavoritesList navigation={this.props.navigation} />
        </View>
      )
    }
    // Webview
    if (params.router === 'webview') {
      return (
        <View style={styles.container}>
          <Webviews webviewData={params.webviewData} navigation={this.props.navigation} />
        </View>
      )
    }
    // about
    if (params.router === 'about') {
      return (
        <View style={styles.container}>
          <About webviewData={params.webviewData} navigation={this.props.navigation} />
        </View>
      )
    }
    // 问题聊天
    if (params.router === 'questionMessage') {
      return (
        <View style={styles.container}>
          <QuestionMessage question={params.question} navigation={this.props.navigation} />
        </View>
      )
    }
    // 首页
    return (
      <View style={styles.container}>
        <App navigation={this.props.navigation} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default connect(
  state => ({
    user: state.user,
  }),
  (dispatch) => ({
    getUser: () => dispatch(UserAction.getUser()),
  })
)(Main);
