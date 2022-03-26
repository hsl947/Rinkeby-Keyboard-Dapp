/*
 * @Author: your name
 * @Date: 2022-03-08 16:55:06
 * @LastEditTime: 2022-03-09 19:53:35
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \solidity-tutorial-main\scripts\start.js
 */
/**
async function main() {
  const [owner, somebodyElse] = await hre.ethers.getSigners();
  const keyboardsContractFactory = await hre.ethers.getContractFactory("Keyboards");
  const keyboardsContract = await keyboardsContractFactory.deploy();
  await keyboardsContract.deployed();

  const keyboardTxn1 = await keyboardsContract.create(0, true, "sepia");
  await keyboardTxn1.wait();

  const keyboardTxn2 = await keyboardsContract.connect(somebodyElse).create(1, false, "grayscale");
  await keyboardTxn2.wait();

  const balanceBefore = await hre.ethers.provider.getBalance(somebodyElse.address);
  console.log("somebodyElse balance before!", hre.ethers.utils.formatEther(balanceBefore));

  const tipTxn = await keyboardsContract.tip(1, {value: hre.ethers.utils.parseEther("1000")}); // tip the 2nd keyboard as owner!
  await tipTxn.wait();

  const balanceAfter = await hre.ethers.provider.getBalance(somebodyElse.address)
  console.log("somebodyElse balance after!", hre.ethers.utils.formatEther(balanceAfter));
}
 */

async function main() {
  const provider = hre.ethers.getDefaultProvider()
  const [owner, somebodyElse] = await hre.ethers.getSigners();
  const keyboardsContractFactory = await hre.ethers.getContractFactory("Keyboards");
  const keyboardsContract = await keyboardsContractFactory.deploy();
  await keyboardsContract.deployed();

  const keyboardTxn = await keyboardsContract.create(0, true, "sepia");
  await keyboardTxn.wait();

  const tipTxn = await keyboardsContract.connect(somebodyElse).tip(0, {value: hre.ethers.utils.parseEther("1")})
  const tipTxnReceipt = await tipTxn.wait();
  console.log(tipTxnReceipt.events);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
