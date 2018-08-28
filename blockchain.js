const SHA256 = require('crypto-js');

class block {
    constructor(index, timestamp, prevHash = '', data){
        this.index = index;
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.data = data;
        this.hash = '';
    }

    calculateHash(){
        return SHA256(this.index + this.prevHash + this.timestamp +JSON.stringify(this.data)).toString();
    }
}