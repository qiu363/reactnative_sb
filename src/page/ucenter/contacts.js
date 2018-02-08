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
import Fch from '../../lib/fch';
import Toast from '../../lib/toast';
import Header from '../../component/header';

import { connect } from 'react-redux';
import HeaderAction from '../../action/header';
import UserAction from '../../action/user';

class Contacts extends Component {
  constructor(props) {
    super(props);

    let defList = [
      {
        "uid": "friend",
        "nickname": "好友申请",
        "avatar": "",
        "letter": 0
      },
      {
        "uid": "group",
        "nickname": "群组",
        "avatar": "",
        "letter": 0
      },
    ];
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
    let dataSource = ds.cloneWithRows(defList);
    this.state = {
      status: 0,
      list: defList,
      hasContact: false,
      dataSource: dataSource,
    };
  }

  componentWillMount() {
    const headerData = {
      title: '联系人',
      isArrow: true,
      arrowFun: this._pressArrow,
      arrowFunParam: {
        obj: this.props.navigation
      },
    };
    const { setHeader } = this.props;
    setHeader(headerData);

    this._fetchData();
  }

  static navigationOptions = {
    title: '联系人'
  }

  _pressArrow(param) {
    const { goBack } = param.obj;

    goBack();
  }

  _fetchData() {
    Fch('friendsList', '', (responseData) => {
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
      } else if (responseData.status.code !== 0) {
        let toast = Toast.toastBot(responseData.status.msg);
      } else {
        if (responseData.data.length === 0) {
          this.setState({
            status: 1,
            hasContact: false,
          });
        } else {
          let friendsList = this.state.list;
          friendsList = friendsList.concat(responseData.data);
          let tmpFriendsList = [];
          for (let i = 0; i < friendsList.length; i++) {
            let friendsKey = friendsList[i]['letter'];
            if (friendsList[i].uid !== 'friend' && friendsList[i].uid !== 'group') {
              friendsKey = friendsList[i]['letter'] + '0';
            }

            if (!tmpFriendsList[friendsKey]) {
              tmpFriendsList[friendsKey] = [
                friendsList[i]
              ];
            } else {
              tmpFriendsList[friendsKey].push(friendsList[i]);
            }
          }

          let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2,
            sectionHeaderHasChanged: (r1, r2) => r1 != r2,
          });
          let dataSource = ds.cloneWithRowsAndSections(tmpFriendsList);
          dataSource.sectionIdentities.sort();
          this.setState({
            status: 1,
            hasContact: true,
            list: friendsList,
            dataSource: dataSource,
          });
        }
      }
    });
  }

  _renderSectionHeader(rowData: object, sectionID: number, rowID: number) {
    if (sectionID === '0' || sectionID === 's1') {
      return;
    } else {
      let tmpSectionId = sectionID.replace(/0$/, '');
      return (
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTxt}>{tmpSectionId}</Text>
        </View>
      );
    }
  }

  _renderRow(rowData: object, sectionID: number, rowID: number) {
    if (rowData.uid === 'friend') {
      return (
        <TouchableHighlight underlayColor='#FAFAFA'>
          <View style={styles.listItem}>
            <Image style={styles.listImg} source={require('../../images/img_friend.png')} />
            <View style={styles.listTxtWrap}>
              <Text style={styles.listTxt}>{rowData.nickname}</Text>
            </View>
          </View>
        </TouchableHighlight>
      );
    }
    if (rowData.uid === 'group') {
      return (
        <TouchableHighlight underlayColor='#FAFAFA'>
          <View style={styles.listItem}>
            <Image style={styles.listImg} source={require('../../images/img_group.png')} />
            <View style={styles.listTxtWrapNb}>
              <Text style={styles.listTxt}>{rowData.nickname}</Text>
            </View>
          </View>
        </TouchableHighlight>
      );
    }
    let { rowIdentities, sectionIdentities } = this.state.dataSource;
    sectionIdentities = sectionIdentities.indexOf(sectionID);
    return (
      <TouchableHighlight underlayColor='#FAFAFA'>
        <View style={styles.listItem}>
          <Image style={styles.listImg} source={{uri: rowData.avatar}} />
          {
            rowIdentities[sectionIdentities][rowIdentities[sectionIdentities].length - 1] === rowID ?
            (
              <View style={styles.listTxtWrapNb}>
                <Text style={styles.listTxt}>{rowData.nickname}</Text>
              </View>
            )
            :
            (
              <View style={styles.listTxtWrap}>
                <Text style={styles.listTxt}>{rowData.nickname}</Text>
              </View>
            )
          }

        </View>
      </TouchableHighlight>
    );
  }

  _renderHeader() {
    return <View style={styles.listWrap}></View>;
  }

  _renderFoot() {
    const { status, hasContact } = this.state;

    if (status === 1 && !hasContact) {
      return (
        <View style={styles.noContact}>
          <Text style={styles.noContactTxt}>
            暂无联系人
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.listEnd}></View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          enableEmptySections={true}
          renderRow={this._renderRow.bind(this)}
          renderFooter={this._renderFoot.bind(this)}
          renderHeader={this._renderHeader.bind(this)}
          renderSectionHeader={this._renderSectionHeader.bind(this)}
        >
        </ListView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  listWrap: {
    paddingTop: 5,
  },
  sectionTitle: {
    flex: 1,
    justifyContent: 'center',
    height: 25,
    backgroundColor: '#f0f0f0',
  },
  sectionTxt: {
    lineHeight: 25,
    marginLeft: 12,
    fontSize: 14,
    color: '#999',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#fff',
  },
  listImg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginLeft: 12,
  },
  listTxtWrap: {
    flex: 1,
    height: 50,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
    borderStyle: 'solid',
  },
  listTxtWrapNb: {
    flex: 1,
    height: 50,
    marginLeft: 10,
  },
  listTxt: {
    lineHeight: 49,
    fontSize: 14,
    color: '#222',
  },
  listEnd: {
    height: 10,
  },
  noContact: {
    flex: 1,
    alignItems: 'center',
    marginTop: 25,
  },
  noContactTxt: {
    fontSize: 15,
    color: '#a9a9a9',
  }
});

export default connect(
  state => ({
    user: state.user,
  }),
  (dispatch) => ({
    login: (user) => dispatch(UserAction.login(user)),
    setHeader: (data) => dispatch(HeaderAction.setHeader(data)),
  })
)(Contacts);
