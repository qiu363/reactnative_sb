'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';

import { connect } from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, isArrow, arrowFun, arrowFunParam } = this.props.header;

    return (
      <View style={styles.header}>
        {
          isArrow ?
            (
              <TouchableHighlight underlayColor='#FAFAFA' onPress={() => arrowFun(arrowFunParam)}>
                <Image style={styles.headerArrow} source={require('../images/icon_return_key.png')} />
              </TouchableHighlight>
            )
            :
            null
        }
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
});

export default connect(
  state => ({
    user: state.user,
    header: state.header,
  }),
)(Header);
