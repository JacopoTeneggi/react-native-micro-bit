'use strict';

import { ADD_UBIT } from '../actions/uBit';
import { UNDEFINED } from '../utils';

const defaultState = [];

const uBit = (state = defaultState, action) => {
    switch(action.type) {
        case ADD_UBIT:
            if (typeof uBit === UNDEFINED) return state;
            return [...state, action.uBit];
        default:
            return state;
    }
}

module.exports = uBit;