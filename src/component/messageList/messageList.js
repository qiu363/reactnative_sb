'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableHighlight,
  RefreshControl,
} from 'react-native';
import BubbleText from 'react-native-message-bubble';
import Bubble from './bubble';
import Fch from '../../lib/fch';
import Toast from '../../lib/toast';

import { connect } from 'react-redux';
import UserAction from '../../action/user';

class MessageList extends Component {
  constructor(props) {
    super(props);

    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
    let dataSource = ds.cloneWithRows([]);
    this.state = {
      status: 0,
      list: [],
      listPg: 1,
      listDs: dataSource,
      refreshStatus: false,
      isEnd: false
    };
  }

  componentDidMount() {
    this._fetchData();
  }

  _loadNext() {
    const { status, isEnd, list } = this.state;
    const { type } = this.props;

    if (status === 1 && !isEnd) {
      let lastId = '';
      lastId = list[list.length - 1]['groupId'];

      let page = this.state.listPg;
      this.setState({
        listPg: ++page
      })

      this._fetchData(lastId);
    }
  }

  _fetchData(lastId = '') {
    const { groupId } = this.props;

    let fetchUrl = 'questionMessage';

    let data = {
      targetId: groupId
    };
    if (lastId !== '') {
      data.lastId = lastId;
    }

    this.setState({
      status: 2
    });

    Fch(fetchUrl, data, (responseData) => {
      if (responseData.status.code === -2) {
        let user = {
          token: '',
          uid: '',
          nickname: '',
          avatar: '',
          mobile: '',
        };
        const { login } = this.props;
        login(user);
        return false;
      } else if (responseData.status.code !== 0) {
        let toast = Toast.toastBot(responseData.status.msg);
      } else {
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });

        let { list, refreshStatus } = this.state;
        if (refreshStatus) {
          list = responseData.data;
        } else {
          list = list.concat(responseData.data);

          if (responseData.data.length === 0) {
            this.setState({
              isEnd: true
            });
          }
        }

        this.setState({
          list: list,
          listDs: ds.cloneWithRows(list)
        });
      }

      this.setState({
        refreshStatus: false,
        status: 1
      });
    });
  }

  _renderRow(rowData: object, sectionID: number, rowID: number) {
    return (
      <Bubble rowID={rowID} rowData={rowData} listView={this.listView} />
    );
  }

  _renderFoot() {
    const { status, isEnd } = this.state;

    return (
      <View style={styles.listFooter}></View>
    );
  }

  render() {
    const { status, listDs, refreshStatus, listPg } = this.state;
    const { type } = this.props;

    if (status === 0) {
      return <View style={styles.container}></View>;
    }

    return (
      <ListView
        ref={(listView) => this.listView = listView}
        dataSource={listDs}
        enableEmptySections={true}
        removeClippedSubviews={false}
        renderFooter={this._renderFoot.bind(this)}
        renderRow={this._renderRow.bind(this)}
        onLayout={(e) => {
          //listPg === 1 && this.listView && this.listView.scrollToEnd({animated: false});
        }}
        style={styles.list}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    paddingBottom: 15,
  },
  loading: {
    height:40,
    alignItems:'center',
    justifyContent:'flex-start',
  },
  loadingTxt: {
    color: '#999',
    fontSize: 12,
    marginTop: 10
  },
  listFooter: {
    height: 14,
  },
});

export default connect(
  state => ({
    user: state.user,
  }),
  (dispatch) => ({
    login: (user) => dispatch(UserAction.login(user)),
  }),
)(MessageList);
