'use strict';

import BleService from './ble';

export default class uBitBleService extends BleService {
    constructor(onuBitDiscover) {
        super((peripheral) => {
            if (this.checkIfuBit(peripheral) === true) onuBitDiscover(peripheral);
        })
    }

    checkIfuBit(peripheral) {
        return peripheral.advertisement.localName === 'BBC micro:bit' ? true : false;
    }
}