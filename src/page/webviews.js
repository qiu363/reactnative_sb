'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  WebView,
  TouchableHighlight,
} from 'react-native';
import Header from '../component/header';

import { connect } from 'react-redux';
import WebviewAction from '../action/webview';

class Webviews extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { setWebview, webviewData } = this.props;

    setWebview(webviewData);
  }

  _pressArrow() {
    const { goBack } = this.props.navigation;

    goBack();
  }

  render() {
    const { title, url, method, headers, body, scalesPageToFit, javaScriptEnabled } = this.props.webview;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableHighlight underlayColor='#FAFAFA' onPress={this._pressArrow.bind(this)}>
            <Image style={styles.headerArrow} source={require('../images/icon_return_key.png')} />
          </TouchableHighlight>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        <WebView
          style={styles.webview}
          source={{
            uri: url,
            headers: headers,
            method: method,
            body: body,
          }}
          scalesPageToFit={scalesPageToFit}
          javaScriptEnabled={javaScriptEnabled}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    paddingTop: 20,
    backgroundColor: '#fdfdfd',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
    borderStyle: 'solid',
  },
  headerTitle: {
    flex: 1,
    marginLeft: 100,
    marginRight: 100,
    fontSize: 20,
    color: '#222',
    textAlign: 'center',
  },
  headerArrow: {
    position: 'absolute',
    top: -10,
    left: 12,
    width: 10,
    height: 19,
  },
  webview: {
    flex: 1,
  }
});

export default connect(
  state => ({
    user: state.user,
    webview: state.webview,
  }),
  (dispatch) => ({
    setWebview: (data) => dispatch(WebviewAction.setWebview(data)),
  })
)(Webviews);
