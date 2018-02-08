'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';

import { connect } from 'react-redux';

const window = Dimensions.get('window');

class Bubble extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewHight: null,
      viewWidth: window.width/3*2
    };
  }

  render() {
    let { viewHight, viewWidth } = this.state;
    let { rowData, rowID, listView, user } = this.props;

    let content = JSON.parse(rowData.content);

    if (user.uid === rowData.fromUserId) {
      return (
        <View style={styles.rowRight}>
          <View>
            <Image
              capInsets={{top: 30, left: 13, bottom: 18, right: 13}}
              resizeMode='stretch'
              source={require('../../images/img_blue.png')}
              onLayout={(e) => {
                this.rightText.measure((x, y, width, height, left, top) => {
                  if (width != viewWidth || height != viewHight) {
                    this.setState({
                      viewHight: height,
                      viewWidth: width,
                    });
                  }
                });
              }}
              style={{width: viewWidth, height: viewHight}}
            >
              <Text
                ref={v => this.rightText = v}
                numberOfLines={0}
                style={styles.messagesRight}
              >
                {content.content}
              </Text>
            </Image>
          </View>
          <Image style={[styles.userImageRight, {marginRight: 10, marginLeft: 5}]} source={{uri: rowData.avatar}}/>
        </View>
      );
    } else {
      return (
        <View style={styles.rowLeft}>
          <Image style={[styles.userImageLeft, {marginRight: 5, marginLeft: 10}]} source={{uri: rowData.avatar}}/>
          <View>

            {
              rowData.author ?
              (
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.rowLeftNick}>{rowData.nickname}</Text>
                  <View style={styles.rowLeftAuthor}>
                    <Text style={styles.rowLeftAuthorTxt}>发布者</Text>
                  </View>
                </View>
              )
              :
              (
                <Text style={styles.rowLeftNick}>{rowData.nickname}</Text>
              )
            }
            <Image
              capInsets={{top: 30, left: 13, bottom: 18, right: 13}}
              resizeMode='stretch'
              source={require('../../images/img_white.png')}
              onLayout={(e) => {
                this.leftText.measure((x, y, width, height, left, top) => {
                  if (width != viewWidth || height != viewHight) {
                    this.setState({
                      viewHight: height,
                      viewWidth: width,
                    });
                  }
                });
              }}
              style={{width: viewWidth, height: viewHight}}
            >
              <Text
                ref={v => this.leftText = v}
                numberOfLines={0}
                style={styles.messagesLeft}
              >
                {content.content}
              </Text>
            </Image>
          </View>
        </View>
      );
    }

  }
}

const styles = StyleSheet.create({
  rowRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 14,
  },
  rowLeft: {
    flexDirection: 'row',
    marginTop: 14,
  },
  messagesRight: {
    alignSelf: 'flex-end',
    fontSize: 14,
    paddingLeft: 10,
    paddingRight: 15,
    paddingBottom: 10,
    paddingTop: 8,
    lineHeight: 18,
    backgroundColor: 'transparent',
    color: '#fff',
  },
  messagesLeft: {
    alignSelf: 'flex-start',
    fontSize: 14,
    paddingLeft: 15,
    paddingRight: 10,
    paddingBottom: 10,
    paddingTop: 8,
    lineHeight: 18,
    backgroundColor: 'transparent',
  },
  userImageLeft: {
    marginTop: 4,
    height: 34,
    width: 34,
    borderRadius: 17,
  },
  userImageRight: {
    height: 34,
    width: 34,
    borderRadius: 17,
  },
  rowLeftNick: {
    marginLeft: 8,
    marginBottom: 4,
    fontSize: 11,
    color: '#999',
  },
  rowLeftAuthor: {
    justifyContent: 'center',
    alignItems:'center',
    marginLeft: 6,
    paddingLeft: 2,
    paddingRight: 2,
    backgroundColor: '#e2791b',
    height: 13,
    borderRadius: 2,
  },
  rowLeftAuthorTxt: {
    color: '#fff',
    fontSize: 9,
  },
  rowRightNick: {
    marginLeft: 8,
    marginBottom: 4,
    fontSize: 11,
    color: '#999',
  },
});

export default connect(
  state => ({
    user: state.user,
  })
)(Bubble);
