require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-etherscan');
require('dotenv').config();

const { STAGING_ALCHEMY_KEY, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.info(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.4',
  defaultNetwork: 'rinkeby',
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  networks: {
    rinkeby: {
      url: STAGING_ALCHEMY_KEY,
      accounts: [PRIVATE_KEY],
    },
  },
  paths: {
    artifacts: './src/artifacts',
  },
};
