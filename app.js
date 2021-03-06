const fs = require('fs')
const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const EthereumUtil = require('ethereumjs-util')
const EthereumWallet = require('ethereumjs-wallet')

const target = '123'
let achieved = false

if (cluster.isMaster) {

  console.log(`Master ${process.pid} is running`)

  for (let i = 0; i < numCPUs; i++) {
    worker = cluster.fork()
  }
  
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} finished`)
  })

} else {

  console.log(`Worker ${process.pid} started`)
  
  while (!achieved) {
      
    const wallet = EthereumWallet.generate()
    const publicKeyBuff = EthereumUtil.privateToAddress(wallet.privKey)
    
    const publicKey = EthereumUtil.bufferToHex(publicKeyBuff)
    const privateKey = EthereumUtil.bufferToHex(wallet.privKey)
    
    const answer = publicKey.slice(2, target.length + 2)
    
    if (answer === target) {
      achieved = true
      const result = publicKey + '\n' + privateKey + '\n'
      console.log(result)
      fs.appendFile('result.txt', result, () => {
        process.exit()
      })
    }
  }

}
