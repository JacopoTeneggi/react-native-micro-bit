'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    ListView,
    View
} from 'react-native';

import { MKSwitch, MKColor } from 'react-native-material-kit';
import map from 'async/map';

import { GRANT_PERMISSION, REVOKE_PERMISSION } from '../actions/permissions';
import PermissionsService from '../services/permissions';
import { mapEach } from '../utils';

const styles = StyleSheet.create({
    switch: {
        marginTop: 2
    }
});

class PermissionsSwitch extends Component {
    constructor(props) {
        super(props);

        this.permission = props.permission;
        this.permissionsStore = props.permissionsStore;
        this.permissionsService = props.permissionsService;

        this.onCheckedChange = this.onCheckedChange.bind(this);
    };

    onCheckedChange(e) {
        let permissionsStore = this.permissionsStore;
        if (e.checked === true) this.permissionsService.requestPermission(this.permission, (err, result) => {
            let name = result.name;
            result.promise
                .then(result => {
                    console.log('Request result', result);
                    if (result === true || result === 'never_ask_again') {
                        permissionsStore.dispatch({
                            type: GRANT_PERMISSION,
                            name: name
                        })
                        return console.log(`Dispatching for ${name} with ${result}`);
                    }
                    return console.log(name, result);
                }, result => {
                    console.log('Request result', result);
                })
        });
    }

    render() {
        return (
            <MKSwitch checked={this.props.checked}
                style={styles.switch}
                onColor={MKColor.LightGreen}
                thumbOnColor={MKColor.Green}
                onCheckedChange={this.onCheckedChange}
                />
        );
    };
};

class PermissionsList extends Component {
    constructor(props) {
        super(props);

        const { permissionsStore } = props;
        const store = permissionsStore.getState();

        this.permissionsStore = permissionsStore;
        this.permissionsService = new PermissionsService();

        this.renderRow = this.renderRow.bind(this);
        this.render = this.render.bind(this);

        permissionsStore.subscribe(this.render);

        this._checkAllPermissions(store, this.permissionsService, this.permissionsStore);
    }

    _checkAllPermissions(store, permissionsService, permissionsStore) {
        map(store, permissionsService.checkPermission, (err, results) => {
            if (err) return console.log(err);
            mapEach(results, (item) => {
                let name = item.name;
                item.promise
                    .then(result => {
                        if (result === true) {
                            permissionsStore.dispatch({
                                type: GRANT_PERMISSION,
                                name: name
                            })
                            return console.log(`Dispatching for ${name} with ${result}`);
                        }
                        return console.log(name, result);
                    })
            })
        });
    }

    renderRow(data) {
        return (
            <View>
                <Text>{data.name}</Text>
                <PermissionsSwitch checked={data.granted} permission={data} permissionsStore={this.permissionsStore} permissionsService={this.permissionsService} />
            </View>
        )
    };

    render() {
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => { r1 !== r2; } });
        let store = this.permissionsStore.getState();
        ds = ds.cloneWithRows(store);
        return (
            <ListView
                dataSource={ds}
                renderRow={this.renderRow}
                />
        );
    };
};

export default class Settings extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <PermissionsList permissionsStore={this.props.permissionsStore} />
        );
    }
};