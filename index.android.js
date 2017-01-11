'use strict';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { TabViewAnimated, TabBarTop } from 'react-native-tab-view';
import { createStore } from 'redux';

import Devices from './app/components/Devices';
import Settings from './app/components/Settings';

import permissions from './app/reducers/permissions';
import uBit from './app/reducers/uBit';

const permissionsStore = createStore(permissions);
const uBitStore = createStore(uBit);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabbar: {
    backgroundColor: '#2293f4'
  },
  indicator: {
    backgroundColor: '#ffeb3b',
  },
  label: {
    color: '#fff',
    fontWeight: '400',
  },
});

export default class BeaverProject extends Component {
  state = {
    index: 1,
    routes: [
      { key: '0', title: 'Devices' },
      { key: '1', title: 'Home' },
      { key: '2', title: 'Settings' },
    ],
  };

  _handleChangeTab = (index) => {
    this.setState({ index });
  };

  _renderHeader = (props) => {
    return <TabBarTop
      {...props}
      scrollEnabled
      indicatorStyle={styles.indicator}
      labelStyle={styles.label}
      style={styles.tabbar} />;
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
      case '0':
        return <Devices uBitStore={uBitStore} />;
      case '1':
        return <View style={[styles.page, { backgroundColor: '#fff' }]} />;
      case '2':
        return <Settings style={styles.page} permissionsStore={permissionsStore} />;
      default:
        return null;
    }
  };

  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}
        />
    );
  }
}

AppRegistry.registerComponent('BeaverProject', () => BeaverProject);
