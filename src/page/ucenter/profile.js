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

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const headerData = {
      title: '个人资料',
      isArrow: true,
      arrowFun: this._pressArrow,
      arrowFunParam: {
        obj: this.props.navigation
      },
    };
    const { setHeader } = this.props;
    setHeader(headerData);
  }

  static navigationOptions = {
    title: '个人资料'
  }

  _pressArrow(param) {
    const { goBack } = param.obj;

    goBack();
  }

  render() {
    const { nickname, mobile, avatar } = this.props.user;

    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.list}>
          <TouchableHighlight underlayColor='#FAFAFA'>
            <View style={styles.listItemAvatar}>
              <Text style={styles.listItemTxt}>头像</Text>
              <Image style={styles.listItemAvatarImg}  source={{uri: avatar}} />
              <Image style={styles.iconArrowRight} source={require('../../images/icon_right_arrow.png')} />
            </View>
          </TouchableHighlight>
          <TouchableHighlight underlayColor='#FAFAFA'>
            <View style={styles.listItem}>
              <Text style={styles.listItemTxt}>昵称</Text>
              <Text style={styles.listItemVal}>{nickname}</Text>
              <Image style={styles.iconArrowRight} source={require('../../images/icon_right_arrow.png')} />
            </View>
          </TouchableHighlight>
          <TouchableHighlight underlayColor='#FAFAFA'>
            <View style={styles.listItemLast}>
              <Text style={styles.listItemTxt}>手机号</Text>
              <Text style={styles.listItemVal}>{mobile}</Text>
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
});

export default connect(
  state => ({
    user: state.user,
  }),
  (dispatch) => ({
    setHeader: (data) => dispatch(HeaderAction.setHeader(data)),
  })
)(Profile);
