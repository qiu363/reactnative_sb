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

class Setup extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { setHeader } = this.props;
    const headerData = {
      title: '关于机师帮',
      isArrow: true,
      arrowFun: this._pressArrow,
      arrowFunParam: {
        obj: this.props.navigation
      },
    };

    setHeader(headerData);
  }

  static navigationOptions = {
    title: '关于机师帮'
  }

  _pressArrow(param) {
    const { goBack } = param.obj;

    goBack();
  }

  _pressFunction() {
    const { navigate } = this.props.navigation;
    const webviewData = {
      title: '功能介绍',
      url: 'http://www.jsb001.com/app/webview/introduction/main.html',
    };

    navigate('Home', {
      router: 'webview',
      webviewData: webviewData,
    });
  }

  _pressRules() {
    const { navigate } = this.props.navigation;
    const webviewData = {
      title: '软件服务协议',
      url: 'http://www.jsb001.com/app/webview/agreement.html',
    };

    navigate('Home', {
      router: 'webview',
      webviewData: webviewData,
    });
  }

  render() {
    const { version, company, copyright, } = this.props.app;

    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.container}>
          <View style={styles.about}>
            <Image style={styles.aboutImg1} source={require('../../images/bg_logo.png')} />
            <Image style={styles.aboutImg2} source={require('../../images/about_slogan.png')} />
          </View>
          <View style={styles.list}>
            <TouchableHighlight underlayColor='#FAFAFA'>
              <View style={styles.listItem}>
                <Text style={styles.listItemTxt}>版本</Text>
                <Text style={styles.listItemVal}>{version}</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight underlayColor='#FAFAFA' onPress={() => this._pressFunction()}>
              <View style={styles.listItemLast}>
                <Text style={styles.listItemTxt}>功能介绍</Text>
                <Image style={styles.iconArrowRight} source={require('../../images/icon_right_arrow.png')} />
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.rule}>
          <TouchableHighlight underlayColor='#f0f0f0' onPress={() => this._pressRules()}>
            <Text style={styles.ruleLink}>机师帮软件服务协议</Text>
          </TouchableHighlight>
          <Text style={styles.ruleTxt}>{company} 版权所有</Text>
          <Text style={styles.ruleTxt}>Copyright{copyright}</Text>
        </View>
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
  about: {
    alignItems: 'center',
    marginTop: 50,
  },
  aboutImg1: {
    width: 95,
    height: 95,
  },
  aboutImg2: {
    width: 85,
    height: 30,
    marginTop: 15,
    marginBottom: 25,
  },
  rule: {
    alignItems: 'center',
    marginBottom: 8,
  },
  ruleLink: {
    lineHeight: 16,
    fontSize: 11,
    color: '#2a78bb',
  },
  ruleTxt: {
    lineHeight: 16,
    fontSize: 11,
    color: '#9d9d9d',
  },
});

export default connect(
  state => ({
    user: state.user,
    app: state.app,
  }),
  (dispatch) => ({
    setHeader: (data) => dispatch(HeaderAction.setHeader(data)),
  })
)(Setup);
