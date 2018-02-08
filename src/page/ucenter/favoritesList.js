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
import QuestionList from '../../component/questionList';

import { connect } from 'react-redux';
import HeaderAction from '../../action/header';

class MyQuestionList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const headerData = {
      title: '我的收藏',
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
    return (
      <View style={styles.container}>
        <Header />
        <View>
          <QuestionList navigation={this.props.navigation} type='mine' />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd',
  },
});

export default connect(
  state => ({
    user: state.user,
  }),
  (dispatch) => ({
    setHeader: (data) => dispatch(HeaderAction.setHeader(data)),
  })
)(MyQuestionList);
