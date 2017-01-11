'use strict';

export const UNDEFINED = 'undefined';

export const indexOfProperty = (array, property, value) => {
    if (typeof array === UNDEFINED || typeof property === UNDEFINED || typeof value === UNDEFINED) return 'Missing argument';
    let l = array.length;
    for (let i = 0; i < l; i++) {
        let curr = array[i];
        if (curr[property] === value) return i;
    };
    return -1;
}

export const mapEach = (array, f) => {
    let out = [];
    let l = array.length;
    for (let i = 0; i < l; i++) {
        out[i] = f(array[i]);
    }
    return out;
}