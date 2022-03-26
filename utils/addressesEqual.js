/*
 * @Author: your name
 * @Date: 2022-03-08 21:52:53
 * @LastEditTime: 2022-03-08 21:52:53
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \solidity-tutorial-main\utils\addressesEqual.js
 */
export default function addressesEqual(addr1, addr2) {
  if(!addr1 || !addr2) return false;
  return addr1.toUpperCase() === addr2.toUpperCase();
}
