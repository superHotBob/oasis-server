const {NFTStorage, File} = require('nft.storage')
const fs = require('fs')

// Const dotenv =  require('dotenv')
// Const path = require('path')
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDRmODNkQTc1ODYxNzU4YzFEMjRhMEM4RTg4QjNmMzhlYjM3ODdCNDUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0NTUwNzc5MzI5OSwibmFtZSI6Im5mdCJ9.3EZe3Bcxay2KRSW4aJLOHhovrZYMbR6UMrks9GscKV8'
const client = new NFTStorage({ token: apiKey })
const contractAddress = '0x9764e39a7142E9c5AabA4EFF53C1329B3dE335C0'
module.exports = async function nftcreate (req, res, next) {
  const name = req.body.name
  const hash = req.body.address
  const description = req.body.description
  //   Const file = req.body.file

  const metadata = await client.store({
    name: name,
    description: description,
    image: new File(
      [await fs.promises.readFile('panda.jpg')],
      'panda.jpg',
      { type: 'image/jpg' }
    )
  })
  console.log('Metadata stored on Filecoin and IPFS with URL:', metadata.url)
  req.metadata = metadata 
  res.json({metadata: metadata.url, contractAddress: contractAddress})
}
