'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    ListView,
    View
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { getTheme, MKButton, MKColor } from 'react-native-material-kit';

import { ADD_UBIT } from '../actions/uBit';
import uBitService from '../services/uBit';

const styles = StyleSheet.create({
    fab: {
        width: 56,
        height: 56,
        borderRadius: 100,
        position: 'absolute',
        right: 19,
        bottom: 19
    }
});

const ColoredFab = MKButton.coloredFab()
    .withStyle(styles.fab)
    .withBackgroundColor(MKColor.Green)
    .build();

export default class Devices extends Component {
    constructor(props) {
        super(props);

        this.uBitStore = props.uBitStore;
        this.uBitService = new uBitService((newuBit) => {
            console.log('found new microbit');
            this.uBitStore.dispatch({
                type: ADD_UBIT,
                uBit: newuBit
            });
        });

        this.render = this.render.bind(this);

        this.uBitStore.subscribe(this.render);
    }

    renderRow(data) {
        console.log('rendering row');
        let theme = getTheme();
        return (
            <View style={theme.cardStyle}>
                <Text style={theme.cardTitleStyle}>New micro:bit</Text>
                <Text style={theme.cardContentStyle}>
                    New micro:bit found
                </Text>
                <View style={theme.cardMenuStyle}></View>
                <Text style={theme.cardActionStyle}>My Action</Text>
            </View>
        );
    }

    render() {
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => { r1 !== r2; } });
        let store = this.uBitStore.getState();
        ds = ds.cloneWithRows(store);
        return (
            <View style={{ flex: 1 }}>
                <ListView dataSource={ds}
                    renderRow={this.renderRow}
                    enableEmptySections={true} />
                <ColoredFab onPress={() => {
                    console.log('Fab pressed');
                    this.uBitService.restartScanning();
                } }>
                    <Icon name='refresh' size={24} color='#fff'></Icon>
                </ColoredFab>
            </View>
        );
    }
}