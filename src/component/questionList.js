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
import Fch from '../lib/fch';
import Toast from '../lib/toast';

import { connect } from 'react-redux';
import UserAction from '../action/user';

class QuestionList extends Component {
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
      isEnd: false,
    };
  }

  componentWillMount() {
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
    const { type } = this.props;

    let fetchUrl = 'questionList';
    if (type === 'hot') {
      fetchUrl = 'questionListHot';
    }
    if (type === 'case') {
      fetchUrl = 'questionListCase';
    }
    if (type === 'mine') {
      fetchUrl = 'questionListMine';
    }

    let data = '';
    if (lastId !== '') {
      data = {
        lastId: lastId
      };
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

        let list = this.state.list;
        let refreshStatus = this.state.refreshStatus;
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
      })
    });
  }

  _renderFoot() {
    const { status, isEnd } = this.state;

    if (isEnd) {
      return (
        <View style={styles.loading}>
          <Image style={styles.loadingEnd} source={require('../images/bg_logo_bottom.png')} />
        </View>
      );
    } else if (status !== 0) {
      return (
        <View style={styles.loading}>
          <Text style={styles.loadingTxt}>
            加载中...
          </Text>
        </View>
      );
    } else {
      return (
        <View></View>
      );
    }
  }

  _pressRow(router) {
    const { navigate } = this.props.navigation;

    navigate('Home', {
      router: 'questionMessage',
      question: router
    });
  }

  _renderRow(rowData: object, sectionID: number, rowID: number) {
    return (
      <View style={styles.rowWrap}>
        <TouchableHighlight underlayColor='#eee' onPress={() => this._pressRow(rowData)}>
          <View style={styles.row}>
            <View style={styles.user}>
              <Image source={{uri: rowData.avatar}} style={styles.avatar}/>
              <Text style={styles.nick}>{rowData.nickname}</Text>
              <Text style={styles.time}>{rowData.createdAt}</Text>
            </View>
            <Text style={styles.title} numberOfLines={2}>
              {rowData.title.replace(/\n/g, '')}
            </Text>
            <View style={styles.info}>
              <View style={styles.carInfo}>
                <Image source={{uri: rowData.brandIcon}} style={styles.thumb}/>
                <Text style={styles.infoCont}  numberOfLines={1}>{rowData.brandName} {rowData.typeName} </Text>
              </View>
              <View style={styles.num}>
                <Image source={require('../images/icon_browes.png')} style={styles.numThumb}/>
                <Text style={styles.numCont}>{rowData.viewsNum}</Text>
                <Image source={require('../images/icon_reply.png')} style={styles.numThumb}/>
                <Text style={styles.numCont}>{rowData.replaysNum}</Text>
                <Image source={require('../images/icon_news.png')} style={styles.numThumb}/>
                <Text style={styles.numContLast}>{rowData.noticesNum}</Text>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  _onRefresh() {
    this.setState({
      refreshStatus: true
    });

    this._fetchData();
  }

  render() {
    const { status, listDs, refreshStatus } = this.state;
    const { type } = this.props;

    if (status === 0) {
      return <View style={styles.container}></View>;
    }

    return (
      <ListView
        dataSource={listDs}
        enableEmptySections={true}
        onEndReachedThreshold={30}
        renderRow={this._renderRow.bind(this)}
        onEndReached={this._loadNext.bind(this)}
        renderFooter={this._renderFoot.bind(this)}
        style={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshStatus}
            onRefresh={this._onRefresh.bind(this)}
            tintColor="#666"
            title='加载中...'
            colors={['#666', '#666', '#666']}
            progressBackgroundColor="#eee"
          />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  list: {
    backgroundColor: '#f0f0f0',
  },
  rowWrap: {
    marginBottom: 5,
  },
  row: {
    backgroundColor: '#fff',
    padding: 12,
    paddingBottom: 10,
  },
  user: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nick: {
    fontSize: 10,
    color: '#6f6f6f',
  },
  time: {
    position: 'absolute',
    top: 0,
    right: 0,
    lineHeight: 22,
    fontSize: 10,
    color: '#6f6f6f',
  },
  avatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
    marginRight: 10,
  },
  title: {
    lineHeight: 20,
    paddingTop: 6,
    paddingBottom: 2,
    fontSize: 14,
    color: '#222',
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 5,
  },
  carInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  infoCont: {
    marginRight: 5,
    color: '#e2791b',
    fontSize: 10,
  },
  thumb: {
    marginRight: 6,
    width: 10,
    height: 10,
  },
  num: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  numCont: {
    marginLeft: 5,
    marginRight: 12,
    color: '#9d9d9d',
    fontSize: 10,
  },
  numContLast: {
    marginLeft: 5,
    marginRight: 0,
    color: '#9d9d9d',
    fontSize: 10,
  },
  loading: {
    height:40,
    alignItems:'center',
    justifyContent:'flex-start',
  },
  loadingTxt: {
    color:'#999999',
    fontSize:12,
    marginTop:10
  },
  loadingEnd: {
    width: 150,
    height: 16,
    marginTop: 8,
    marginBottom: 15,
  },
});

export default connect(
  state => ({
    user: state.user,
  }),
  (dispatch) => ({
    login: (user) => dispatch(UserAction.login(user)),
  }),
)(QuestionList);
