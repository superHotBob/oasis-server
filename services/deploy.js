// Import {ethers} from "hardhat";
const {ethers} = require('hardhat')
// const {ethers} = pkg

module.exports = async function main (next) {
  const [deployer] = await ethers.getSigners()

  console.log('Deploying contracts with the account:', deployer.address)

  console.log('Account balance:', (await deployer.getBalance()).toString())

  const NFTMinter = await ethers.getContractFactory('NFTMinter')
  const token = await NFTMinter.deploy()

  console.log('Token address:', token.address)
  next()
}

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error)
//     process.exit(1)
//   })
