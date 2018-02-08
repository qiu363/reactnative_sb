'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import Header from '../../component/header';

import { connect } from 'react-redux';
import HeaderAction from '../../action/header';
import WebviewAction from '../../action/webview';
import UserAction from '../../action/user';

class Setup extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { setHeader } = this.props;
    const headerData = {
      title: '设置',
      isArrow: true,
      arrowFun: this._pressArrow,
      arrowFunParam: {
        obj: this.props.navigation
      },
    };

    setHeader(headerData);
  }

  static navigationOptions = {
    title: '设置'
  }

  _pressArrow(param) {
    const { goBack } = param.obj;

    goBack();
  }

  _pressHelp() {
    const { navigate } = this.props.navigation;
    const webviewData = {
      title: '帮助',
      url: 'http://www.jsb001.com/app/webview/help/main.html',
    };

    navigate('Home', {
      router: 'webview',
      webviewData: webviewData,
    });
  }

  _pressNavigate(router) {
    const { navigate } = this.props.navigation;

    navigate('Home', {
      router: router
    });
  }

  _pressLogout() {
    let user = {
      token: '',
      uid: '',
      nickname: '',
      avatar: '',
      mobile: '',
    };
    const { login } = this.props;
    login(user);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.list}>
          <TouchableHighlight underlayColor='#FAFAFA'>
            <View style={styles.listItem}>
              <Text style={styles.listItemTxt}>清除缓存</Text>
              <Image style={styles.iconArrowRight} source={require('../../images/icon_right_arrow.png')} />
            </View>
          </TouchableHighlight>
          <TouchableHighlight underlayColor='#FAFAFA'>
            <View style={styles.listItemLast}>
              <Text style={styles.listItemTxt}>检查更新</Text>
              <Image style={styles.iconArrowRight} source={require('../../images/icon_right_arrow.png')} />
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.list}>
          <TouchableHighlight underlayColor='#FAFAFA' onPress={() => this._pressNavigate('about')}>
            <View style={styles.listItem}>
              <Text style={styles.listItemTxt}>关于机师帮</Text>
              <Image style={styles.iconArrowRight} source={require('../../images/icon_right_arrow.png')} />
            </View>
          </TouchableHighlight>
          <TouchableHighlight underlayColor='#FAFAFA' onPress={() => this._pressHelp()}>
            <View style={styles.listItemLast}>
              <Text style={styles.listItemTxt}>帮助</Text>
              <Image style={styles.iconArrowRight} source={require('../../images/icon_right_arrow.png')} />
            </View>
          </TouchableHighlight>
        </View>
        <TouchableHighlight underlayColor='#FAFAFA' onPress={() => this._pressLogout()}>
          <View style={styles.logout}>
            <Text style={styles.logoutTxt}>退出登录</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  list: {
    marginTop: 5,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
    borderStyle: 'solid',
  },
  listItemAvatar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 74,
    marginLeft: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
    borderStyle: 'solid',
  },
  listItemAvatarImg: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginLeft: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
    borderStyle: 'solid',
  },
  listItemLast: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginLeft: 12,
  },
  listItemTxt: {
    flex: 1,
    fontSize: 14,
    color: '#222',
  },
  listItemVal: {
    width: 100,
    marginRight: 10,
    color: '#6f6f6f',
    textAlign: 'right',
  },
  iconArrowRight: {
    width: 7,
    height: 13,
    marginRight: 12,
  },
  logout: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#2a78bb',
    borderRadius: 30,
  },
  logoutTxt: {
    fontSize: 16,
    color: '#fff',
  },
});

export default connect(
  state => ({
    user: state.user,
    webview: state.webview,
  }),
  (dispatch) => ({
    login: (user) => dispatch(UserAction.login(user)),
    setHeader: (data) => dispatch(HeaderAction.setHeader(data)),
    setWebview: (data) => dispatch(WebviewAction.setWebview(data)),
  })
)(Setup);
