const SHA256 = require('crypto-js/sha256');

class block {
    constructor(index, timestamp, prevHash = '', data){
        this.index = index;
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.data = data;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.prevHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock(){
    return new block(0, "01/01/2018", "0", "Genesis block");
  }

  getLatestBlock(){
      return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock){
      newBlock.prevHash = this.getLatestBlock().hash;
      newBlock.hash = newBlock.calculateHash();
      this.chain.push(newBlock);
  }

  isChainValid(){
      for (let i = 1; i < this.chain.length; i++) {
          const currentBlock = this.chain[i];
          const previousBlock = this.chain[i-1];
        
          if (currentBlock.hash !== currentBlock.calculateHash()) {
            return false;
          }

          if (currentBlock.prevHash !== previousBlock.hash) {
            return false;
          }
      }

      return true;
  }
}

let patacoin = new blockchain();
patacoin.addBlock(new block(1, "30/08/2018", '',{ amount: 4}));
patacoin.addBlock(new block(2, "31/08/2018", '',{ amount: 10}));

console.log(JSON.stringify(patacoin, null, 4));
console.log('Is Blockchain valid? ' + patacoin.isChainValid());
