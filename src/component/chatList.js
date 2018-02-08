'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableHighlight,
} from 'react-native';

import { connect } from 'react-redux';
import QuestionListAction from '../action/questionList';

class QuestionList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { getList, getHotList, getCaseList } = this.props;
    const { type } = this.props;
    if (type === 'hot') {
      getHotList('questionListHot');
    } else if (type === 'case') {
      getCaseList('questionListCase');
    } else {
      getList('questionList');
    }
  }

  _renderRow(rowData: object, sectionID: number, rowID: number) {
    return (
      <TouchableHighlight underlayColor='#FAFAFA' onPress={() => this._pressRow(rowData)}>
        <View style={styles.row}>
          <View style={styles.user}>
            <Image source={{uri: rowData.avatar}} style={styles.avatar}/>
            <Text style={styles.nick}>{rowData.nickname}</Text>
            <Text style={styles.time}>{rowData.createdAt}</Text>
          </View>
          <Text style={styles.title} numberOfLines={2}>
            {rowData.title}
          </Text>
          <View style={styles.info}>
            <Image source={{uri: rowData.brandIcon}} style={styles.thumb}/>
            <Text style={styles.infoCont}>{rowData.brandName}</Text>
            <Text style={styles.infoCont}>{rowData.typeName}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  _pressRow(rowData: object) {
    const { navigate } = this.props.navigation;

    navigate('QuestionDetail', {
      param: rowData
    });
  }

  render() {
    const { status, listDs, hotListDs, caseListDs } = this.props.questionList;
    const { type } = this.props;

    if (!status || status === 0) {
      return <View style={styles.container}></View>;
    }

    let dataSource = listDs;
    if (type === 'hot') {
      dataSource = hotListDs;
    } else if (type === 'case') {
      dataSource = caseListDs;
    }

    return (
      <ListView
        dataSource={dataSource}
        renderRow={this._renderRow.bind(this)}
        style={styles.list}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  list: {
    backgroundColor: '#f0f0f0',
  },
  row: {
    backgroundColor: '#fff',
    padding: 12,
    paddingBottom: 10,
    marginBottom: 5,
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
    alignItems: 'center',
    paddingTop: 5,
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
  }
});

export default connect(
  state => ({
    user: state.user,
    questionList: state.questionList,
  }),
  (dispatch) => ({
    getList: (router) => dispatch(QuestionListAction.getList(router)),
    getHotList: (router) => dispatch(QuestionListAction.getHotList(router)),
    getCaseList: (router) => dispatch(QuestionListAction.getCaseList(router)),
  }),
)(QuestionList);
