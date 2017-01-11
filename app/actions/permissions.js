'use strict';

export const GRANT_PERMISSION = 'GRANT_PERMISSION';
export const REVOKE_PERMISSION = 'REVOKE_PERMISSION';


export const grant_permission = (name) => ({
    type: GRANT_PERMISSION,
    name: name
});

export const revoke_permission = (name) => ({
    type: REVOKE_PERMISSION,
    name: name
});
