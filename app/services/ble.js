'use strict';

import noble from 'react-native-ble';

const POWERED_ON = 'poweredOn';

export default class BleService {
    constructor(onDiscover) {
        noble.on('stateChange', this.onStateChanged);
        noble.on('discover', onDiscover);
    }

    onStateChanged(state) {
        if (state === POWERED_ON) {
            noble.startScanning();
            console.log('Scanning...');
        }
        else noble.stopScanning();
    }

    restartScanning() {
        if (noble.state === POWERED_ON) noble.startScanning();
    }
}