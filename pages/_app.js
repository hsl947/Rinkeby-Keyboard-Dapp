/*
 * @Author: your name
 * @Date: 2022-03-08 16:19:26
 * @LastEditTime: 2022-03-09 20:08:50
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \solidity-tutorial-main\pages\_app.js
 */
import { Toaster } from 'react-hot-toast'
import MetaMaskAccountProvider from '../components/meta-mask-account-provider'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <MetaMaskAccountProvider>
      <Toaster />
      <Component {...pageProps} />
    </MetaMaskAccountProvider>
  )
}

export default MyApp
