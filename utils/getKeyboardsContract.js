/*
 * @Author: your name
 * @Date: 2022-03-08 22:10:41
 * @LastEditTime: 2022-03-26 10:28:49
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \solidity-tutorial-main\utils\getKeyboardsContract.js
 */
import { ethers } from "ethers";

import abi from "../utils/Keyboards.json"

const contractAddress = '0xabb62bDEC0FE32430D3cc1859D736ab861127123';
const contractABI = abi.abi;

export default function getKeyboardsContract(ethereum) {
  if(ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  } else {
    return undefined;
  }
}
