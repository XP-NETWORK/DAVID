require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")

const ALCHEMY_API_KEY = "qDt9cjvPgL-PpphIWQUi2AEIsIbFDtls";
const ROPSTEN_PRIVATE_KEY ="6f04862ea7afb6935f13f63eb93005f119ddde5c3603593b5425a8cb1b25d9e5";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: "https://speedy-nodes-nyc.moralis.io/3749d19c2c6dbb6264f47871/eth/ropsten",
      accounts: [`0x${ROPSTEN_PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: '4X9GWFUZN2KUPA5DHCBJB67HDSIR16GB2C',
  },
}; 

