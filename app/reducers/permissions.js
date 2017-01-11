'use strict';

import { GRANT_PERMISSION, REVOKE_PERMISSION } from '../actions/permissions';
import { UNDEFINED, indexOfProperty } from '../utils';

const permissionsPrefix = 'android.permission';
const defaultState = [
    {
        name: `${permissionsPrefix}.ACCESS_COARSE_LOCATION`,
        granted: false
    },
    {
        name: `${permissionsPrefix}.BLUETOOTH`,
        granted: false
    },
    {
        name: `${permissionsPrefix}.BLUETOOTH_ADMIN`,
        granted: false
    }
];

const changePermissionState = (permissions, name, state) => {
    let index = indexOfProperty(permissions, 'name', name);
    if (index === -1) return permissions;
    return [
        ...permissions.slice(0, index),
        {
            name: name,
            granted: state ? true : false
        },
        ...permissions.slice(index + 1)
    ];
};

const permissions = (state = defaultState, action) => {
    switch (action.type) {
        case GRANT_PERMISSION:
            let name = action.name;
            if (typeof name === UNDEFINED) return state;
            return changePermissionState(state, name, 1);
        case REVOKE_PERMISSION:
            name = action.name;
            if (typeof name === UNDEFINED) return state;
            return changePermissionState(state, name, 0);
        default:
            return state;
    }
};

module.exports = permissions;