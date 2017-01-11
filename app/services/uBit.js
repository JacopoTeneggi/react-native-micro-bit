'use strict';

import uBitBleService from './uBitble';

class Service {
    constructor(UUID, char_UUID) {
        this.UUID = UUID;
        this.char_UUID = char_UUID;
    }
}

class uBit {
    constructor(peripheral) {
        this.peripheral = peripheral;
        this.ax = new Service('E95D0753251D470AA062FA1922DFA9A8', 'E95DCA4B251D470AA062FA1922DFA9A8');

        this.connect = this.peripheral.connect;// this should be good for method security (?)
    }
}

export default class uBitService extends uBitBleService {
    constructor(callback) {
        super((peripheral) => {
            let newuBit = new uBit(peripheral);
            callback(newuBit);
        });
    }
}
