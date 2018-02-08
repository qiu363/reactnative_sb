'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import { connect } from 'react-redux';

import Index from './index';
import Notice from './notice';
import Ucenter from './ucenter/ucenter';
import Login from './login';

import UserAction from '../action/user';
import IndexTabAction from '../action/indexTab';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { tabName } = this.props.indexTab;
    const { setTab } = this.props;

    return (
      <View style={styles.container}>
        <TabNavigator style={styles.tab}>
            <TabNavigator.Item
                selected={tabName === '首页'}
                title='首页'
                titleStyle={styles.tabText}
                selectedTitleStyle={styles.selectedTabText}
                renderIcon={() => <Image style={styles.icon} source={require('../images/tab_not_click_home.png')} />}
                renderSelectedIcon={() => <Image style={styles.icon} source={require('../images/tab_click_home.png')} />}
                onPress={() => setTab('首页')}>
                <Index navigation={this.props.navigation} />
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={tabName === '通知'}
                title='通知'
                titleStyle={styles.tabText}
                selectedTitleStyle={styles.selectedTabText}
                renderIcon={() => <Image style={styles.iconNotice} source={require('../images/tab_not_click_message.png')} />}
                renderSelectedIcon={() => <Image style={styles.iconNotice} source={require('../images/tab_click_message.png')} />}
                onPress={() => setTab('通知')}>
                <Notice navigation={this.props.navigation} />
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={tabName === '我的'}
                title='我的'
                titleStyle={styles.tabText}
                selectedTitleStyle={styles.selectedTabText}
                renderIcon={() => <Image style={styles.iconMine} source={require('../images/tab_not_click_mine.png')} />}
                renderSelectedIcon={() => <Image style={styles.iconMine} source={require('../images/tab_click_mine.png')} />}
                onPress={() => setTab('我的')}>
                <Ucenter navigation={this.props.navigation} />
            </TabNavigator.Item>
        </TabNavigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tab: {
    backgroundColor: '#fafafa',
  },
  tabText: {
    paddingTop: 1,
    paddingBottom: 3,
    color: '#646464',
    fontSize: 10
  },
  selectedTabText: {
    paddingTop: 1,
    paddingBottom: 3,
    color: '#2a78bb',
    fontSize: 10
  },
  icon: {
    width: 20,
    height: 23,
  },
  iconNotice: {
    width: 20,
    height: 23,
  },
  iconMine: {
    width: 23,
    height: 23
  },
});

export default connect(
  state => ({
    user: state.user,
    indexTab: state.indexTab
  }),
  (dispatch) => ({
    setTab: (tabName) => dispatch(IndexTabAction.setTab(tabName)),
  })
)(App);
