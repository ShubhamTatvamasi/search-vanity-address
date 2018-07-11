const fs = require('fs')
const EthereumUtil = require('ethereumjs-util')
const EthereumWallet = require('ethereumjs-wallet')

const target = '123'
let notAchieved = true

do {

  const wallet = EthereumWallet.generate()
  const publicKeyBuff = EthereumUtil.privateToAddress(wallet.privKey)

  const publicKey = EthereumUtil.bufferToHex(publicKeyBuff)
  const privateKey = EthereumUtil.bufferToHex(wallet.privKey)

  const answer = publicKey.slice(2, target.length + 2)

  if (answer === target) {
    const result = publicKey + '\n' + privateKey + '\n'
    fs.appendFile('result.txt', result, () => {})
    console.log(result)
    notAchieved = false
  }

} while (notAchieved)
