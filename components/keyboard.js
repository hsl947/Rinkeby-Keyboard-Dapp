/*
 * @Author: your name
 * @Date: 2022-03-08 16:19:26
 * @LastEditTime: 2022-03-10 11:00:30
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \solidity-tutorial-main\components\keyboard.js
 */
export default function Keyboard({kind, isPBT, filter}) {
  const kindDir = {
    0: 'sixty-percent',
    1: 'seventy-five-percent',
    2: 'eighty-percent',
    3: 'iso-105',
  }[kind]

  const fileName = isPBT ? 'PBT' : 'ABS'

  const imagePath = `keyboards/${kindDir}/${fileName}.png`;
  const alt = `${kindDir} keyboard with ${isPBT? "PBT" : "ABS"} keys ${filter? `with ${filter}` : ""}`;

  return (
    <div className="rounded-lg p-2 border border-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={"h-[230px] w-[360px] " + filter} src={imagePath} alt={alt} style={{objectFit: 'contain'}}/>
    </div>
  )}
