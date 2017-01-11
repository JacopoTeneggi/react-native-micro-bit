'use strict';

import PermissionsAndroid from './permissionsAndroid';

export default class PermissionsService {
    constructor() {

    }

    checkPermission(permission, callback) {
        let name = permission.name;
        let p = PermissionsAndroid.checkPermission(name);
        callback(null, {
            name: name,
            promise: p
        });
    }

    requestPermission(permission, callback) {
        let name = permission.name;
        let p = PermissionsAndroid.requestPermission(name);
        callback(null, {
            name: name,
            promise: p
        });
    }
}