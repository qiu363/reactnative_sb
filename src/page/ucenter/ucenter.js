'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableHighlight,
} from 'react-native';
import Header from '../../component/header';

import { connect } from 'react-redux';
import HeaderAction from '../../action/header';

class Ucenter extends Component {
  static navigationOptions = {
    title: '我的'
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const headerData = {
      title: '我的',
    };
    const { setHeader } = this.props;
    setHeader(headerData);
  }

  _pressNavigate(router) {
    const { navigate } = this.props.navigation;

    navigate('Home', {
      router: router
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <TouchableHighlight underlayColor='#FAFAFA' onPress={() => this._pressNavigate('profile')}>
          <View style={styles.userInfo}>
            <Image style={styles.userInfoAvatar} source={require('../../images/icon_personage_head_portrait.png')} />
            <Text style={styles.userInfoNickname}>小妮子</Text>
            <Image style={styles.iconArrowRight} source={require('../../images/icon_right_arrow.png')} />
          </View>
        </TouchableHighlight>
        <View style={styles.mylist}>
          <TouchableHighlight style={styles.mylistItem} underlayColor='#FAFAFA' onPress={() => this._pressNavigate('myQuestionList')}>
            <View style={styles.mylistView}>
              <Image style={styles.mylistIcon} source={require('../../images/icon_trouble.png')} />
              <Text style={styles.mylistTxt}>我的问题</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.mylistItem} underlayColor='#FAFAFA'>
            <View style={styles.mylistView}>
              <Image style={styles.mylistIcon1} source={require('../../images/icon_collect.png')} />
              <Text style={styles.mylistTxt}>我的收藏</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.mylistItem} underlayColor='#FAFAFA'>
            <View style={styles.mylistView}>
              <Image style={styles.mylistIcon2} source={require('../../images/icon_brand.png')} />
              <Text style={styles.mylistTxt}>关注品牌</Text>
            </View>
          </TouchableHighlight>
        </View>
        <TouchableHighlight underlayColor='#FAFAFA' onPress={() => this._pressNavigate('contacts')}>
          <View style={styles.contact}>
            <Text style={styles.contactTxt}>联系人</Text>
            <Image style={styles.iconArrowRight} source={require('../../images/icon_right_arrow.png')} />
          </View>
        </TouchableHighlight>
        <View style={styles.list}>
          <TouchableHighlight underlayColor='#FAFAFA'>
            <View style={styles.listItem}>
              <Text style={styles.listItemTxt}>意见反馈</Text>
              <Image style={styles.iconArrowRight} source={require('../../images/icon_right_arrow.png')} />
            </View>
          </TouchableHighlight>
          <TouchableHighlight underlayColor='#FAFAFA' onPress={() => this._pressNavigate('setup')}>
            <View style={styles.listItemLast}>
              <Text style={styles.listItemTxt}>设置</Text>
              <Image style={styles.iconArrowRight} source={require('../../images/icon_right_arrow.png')} />
            </View>
          </TouchableHighlight>
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
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
    borderStyle: 'solid',
  },
  userInfoAvatar: {
    width: 65,
    height: 65,
    borderRadius: 33,
    marginLeft: 12,
    marginRight: 10,
  },
  userInfoNickname: {
    flex: 1,
    fontSize: 16,
    color: '#222',
  },
  iconArrowRight: {
    width: 7,
    height: 13,
    marginRight: 12,
  },
  mylist: {
    flexDirection: 'row',
    height: 92,
    marginTop: 5,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
    borderStyle: 'solid',
  },
  mylistItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mylistView: {
    alignItems: 'center',
  },
  mylistIcon: {
    width: 22,
    height: 22,
  },
  mylistIcon1: {
    width: 24,
    height: 22,
  },
  mylistIcon2: {
    width: 28,
    height: 20,
  },
  mylistTxt: {
    marginTop: 15,
    fontSize: 14,
  },
  contact: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginTop: 5,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
    borderStyle: 'solid',
  },
  contactTxt: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#222',
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
});

export default connect(
  state => ({
    user: state.user,
  }),
  (dispatch) => ({
    setHeader: (data) => dispatch(HeaderAction.setHeader(data)),
  })
)(Ucenter);
