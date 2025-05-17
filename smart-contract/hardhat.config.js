require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  defaultNetwork: "arbitrum_sepolia",
  networks:{
    arbitrum_sepolia: {
      url: process.env.ARBITRUM_KEY,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 11155111
    }
  },
  paths: {
    sources: "./contracts",
  }
};
