'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import QuestionList from '../component/questionList';

import { connect } from 'react-redux';
import QuestionListAction from '../action/questionList';

class Index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollableTabView
        style={styles.container}
        tabBarUnderlineColor='#2a78bb'
        tabBarBackgroundColor='#fdfdfd'
        tabBarActiveTextColor='#2a78bb'
        tabBarInactiveTextColor='#222222'
        tabBarTextStyle={{fontSize: 16}}
      >
        <View tabLabel="最热" style={styles.tabView}>
          <QuestionList navigation={this.props.navigation} />
        </View>
        <View tabLabel="最新" style={styles.tabView}>
          <QuestionList navigation={this.props.navigation} type="hot" />
        </View>
        <View tabLabel="案例" style={styles.tabView}>
          <QuestionList navigation={this.props.navigation} type="case" />
        </View>
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  tabView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    flex: 1,
  },
});

export default connect(
  state => ({
    user: state.user,
  })
)(Index);
