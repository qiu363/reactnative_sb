'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Image
} from 'react-native';
import Header from '../component/header';
import MessageList from '../component/messageList/messageList';

import { connect } from 'react-redux';
import HeaderAction from '../action/header';

class QuestionMessage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let { isCase } = this.props.question;
    const headerData = {
      title: isCase ? '案例' : '问题',
      isArrow: true,
      arrowFun: this._pressArrow,
      arrowFunParam: {
        obj: this.props.navigation
      },
    };
    const { setHeader } = this.props;
    setHeader(headerData);
  }

  _pressArrow(param) {
    const { goBack } = param.obj;

    goBack();
  }

  render() {
    let { question } = this.props;
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.title}>
          <Image source={{uri: question.avatar}} style={styles.avatar}/>
          <Text style={styles.titleTxt} numberOfLines={1}>{question.title}</Text>
          <Image style={styles.titleArrow} source={require('../images/icon_right_arrow.png')} />
        </View>
        <MessageList groupId={question.groupId} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 42,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 23,
    height: 23,
    borderRadius: 12,
    marginLeft: 10,
    marginRight: 10,
  },
  titleTxt: {
    flex: 1,
    fontSize: 14,
    color: '#222',
  },
  titleArrow: {
    marginLeft: 15,
    marginRight: 10,
    width: 7,
    height: 14,
  }
});

export default connect(
  state => ({
    user: state.user,
  }),
  (dispatch) => ({
    setHeader: (data) => dispatch(HeaderAction.setHeader(data)),
  })
)(QuestionMessage);
