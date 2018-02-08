'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Fch from '../lib/fch';
import Toast from '../lib/toast';
import AscStorage from '../lib/ascStorage';

import { connect } from 'react-redux';
import UserAction from '../action/user';

const timer = '';

class Captcha extends Component {
  constructor(props) {
    super(props);

    this.state = {
      times: 60,
      isCaptcha: false,
    };
    this.timer = '';
  }

  _getYzm() {
    if (!/^1[34578]\d{9}$/.test(this.props.mobile)) {
      let toast = Toast.toastBot('请填写正确的手机号码');
      return false;
    }

    if (!this.state.isCaptcha) {
      this.setState({
        isCaptcha: true
      });

      timer = setInterval(() => {
        let tmpTimes = this.state.times;
        tmpTimes--;
        this.setState({
          times: tmpTimes
        });
        if (this.state.times <= 0) {
          this.setState({
            isCaptcha: false,
            times: 60,
          });
          clearInterval(timer);
        }
      }, 1000);

      Fch('mobileCaptcha', {
        _rpl: true,
        val: this.props.mobile
      }, (responseData) => {
        console.log(responseData);
      });
    }
  }

  render() {
    return (
      !this.state.isCaptcha ?
      (
        <TouchableOpacity activeOpacity={0.6} style={styles.yzm} onPress={this._getYzm.bind(this)}>
          <Text style={styles.yzmTxt}>获取验证码</Text>
        </TouchableOpacity>
      )
      : (
        <TouchableOpacity activeOpacity={1} style={styles.yzmSel}>
          <Text style={styles.yzmTxtSel}>{this.state.times}秒后重新获取</Text>
        </TouchableOpacity>
      )
    )
  }
}

class LoginButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  _login() {
    if (!/^1[34578]\d{9}$/.test(this.props.mobile)) {
      let toast = Toast.toastBot('请填写正确的手机号码');
      return false;
    }
    if (this.props.captcha === '') {
      let toast = Toast.toastBot('请填写正确的验证码');
      return false;
    }

    this.setState({
      isLoading: true
    });

    Fch('login', {
      mobile: this.props.mobile,
      captcha: this.props.captcha,
    }, (responseData) => {
      if (responseData.status.code !== 0) {
        this.setState({
          isLoading: false
        });
        let toast = Toast.toastBot(responseData.status.msg);
      } else {
        responseData.data.user.token = responseData.data.token;

        clearInterval(timer);

        const { login } = this.props;
        login(responseData.data.user);
      }
    });
  }

  render() {
    return (
      !this.state.isLoading ?
      (
        <TouchableOpacity activeOpacity={0.6} style={styles.btn} onPress={this._login.bind(this)}>
          <Text style={styles.btnTxt}>登录</Text>
        </TouchableOpacity>
      )
      : (
        <TouchableOpacity activeOpacity={1} style={styles.disableBtn}>
          <Text style={styles.btnTxt}>登录</Text>
        </TouchableOpacity>
      )
    )
  }
}

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobile: '',
      captcha: '',
    };
  }

  static navigationOptions = {
    title: '登录',
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
    return (
      <View style={styles.container}>
        <Image source={require('../images/bg_log_in.png')} style={styles.bg}>
          <View style={styles.loginTop}></View>
          <View style={styles.loginBottom}>
            <View>
              <Image source={require('../images/icon_user.png')} style={styles.loginImg} />
            </View>
            <View style={styles.txtWrap}>
              <Image source={require('../images/icon_mobile.png')} style={styles.txtIcon} />
              <TextInput style={styles.txtIpt} placeholder='请输入手机号' onChangeText={(text) => this.setState({mobile: text})}>
              </TextInput>
            </View>
            <View style={styles.txtWrap}>
              <Image source={require('../images/icon_lock.png')} style={styles.txtIconYzm} />
              <TextInput style={styles.txtIpt} placeholder='请输入验证码' onChangeText={(text) => this.setState({captcha: text})}>
              </TextInput>
              <Captcha mobile={this.state.mobile} />
            </View>
            <View style={styles.btnWrap}>
              <LoginButton
                mobile={this.state.mobile}
                captcha={this.state.captcha}
                login={this.props.login}
              />
            </View>
          </View>
          <View style={styles.loginRule}>
            <Text style={styles.loginRuleTxt}>点击登录按钮，即表示你同意</Text>
            <TouchableOpacity activeOpacity={0.6} style={styles.loginRuleBtn} onPress={() => this._pressRules()}>
              <Text style={styles.loginRuleBtnTxt}>机师帮软件服务协议</Text>
            </TouchableOpacity>
          </View>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bg: {
    flex: 1,
    width:null,
    width:null,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  loginTop: {
    flex: 0.6,
  },
  loginBottom: {
    flex: 2,
    alignItems: 'center',
  },
  loginImg: {
    width: 50,
    height: 50,
    marginBottom: 31,
  },
  txtWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 26,
    borderStyle: 'solid',
    borderColor: '#2a78bb',
    borderWidth: 1,
    borderRadius: 40,
  },
  txtIcon: {
    width: 14,
    height: 21,
    marginLeft: 20,
    marginRight: 10,
  },
  txtIconYzm: {
    width: 16,
    height: 21,
    marginLeft: 20,
    marginRight: 10,
  },
  txtIpt: {
    flex: 1,
    height: 42,
    lineHeight: 42,
    borderWidth: 0,
    textAlign: 'left',
    fontSize: 14,
    color: '#222',
  },
  yzm: {
    width: 95,
    paddingLeft: 5,
    borderLeftColor: '#2a78bb',
    borderStyle: 'solid',
    borderLeftWidth: 1,
  },
  yzmSel: {
    width: 126,
    paddingLeft: 5,
    borderLeftColor: '#2a78bb',
    borderStyle: 'solid',
    borderLeftWidth: 1,
  },
  yzmTxt: {
    color: '#30a73f',
  },
  yzmTxtSel: {
    color: '#c0c0c0',
  },
  btnWrap: {
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 5,
  },
  btn: {
    flex: 1,
    height: 44,
    alignItems: 'center',
    backgroundColor: '#2a78bb',
    borderRadius: 40,
  },
  disableBtn: {
    flex: 1,
    height: 44,
    alignItems: 'center',
    backgroundColor: '#c0c0c0',
    borderRadius: 40,
  },
  btnTxt: {
    height: 44,
    lineHeight: 44,
    color: '#fff',
    fontSize: 16,
  },
  loginRule: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 13,
  },
  loginRuleTxt: {
    fontSize: 11,
    color: "#a2a2a2",
  },
  loginRuleBtnTxt: {
    fontSize: 11,
    color: '#2a78bb',
  },
});

export default connect(
  state => ({
    user: state.user,
  }),
  (dispatch) => ({
    login: (user) => dispatch(UserAction.login(user)),
  })
)(Login);
