/*
 * @Author: your name
 * @Date: 2022-03-08 16:50:40
 * @LastEditTime: 2022-03-08 17:15:27
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \solidity-tutorial-main\hardhat.config.js
 */
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
// module.exports = {
//   solidity: "0.8.4",
// };
module.exports = {
  solidity: "0.8.4",
  networks: {
    'rinkeby': {
      url: process.env.NODE_API_URL,
      accounts: [process.env.RINKEBY_PRIVATE_KEY],
    },
  },
};
