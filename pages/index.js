/*
 * @Author: your name
 * @Date: 2022-03-08 16:19:26
 * @LastEditTime: 2022-03-10 10:56:55
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \solidity-tutorial-main\pages\index.js
 */
import { ethers } from "ethers";
import { useState, useEffect, useCallback } from "react";
import PrimaryButton from "../components/primary-button";
import Keyboard from "../components/keyboard";
import TipButton from "../components/tip-button";
import { UserCircleIcon } from "@heroicons/react/solid"
import addressesEqual from "../utils/addressesEqual";
import getKeyboardsContract from "../utils/getKeyboardsContract"
import { toast } from "react-hot-toast"

export default function Home() {
  const [ethereum, setEthereum] = useState(undefined);
  const [connectedAccount, setConnectedAccount] = useState(undefined);
  const [keyboards, setKeyboards] = useState([])
  const [newKeyboard, setNewKeyboard] = useState("") // this is new!
  const [keyboardsLoading, setKeyboardsLoading] = useState(false);
  // const { ethereum, connectedAccount, connectAccount } = useMetaMaskAccount();

  const handleAccounts = (accounts) => {
    if (accounts.length > 0) {
      const account = accounts[0];
      console.log('We have an authorized account: ', account);
      setConnectedAccount(account);
    } else {
      console.log("No authorized accounts yet")
    }
  };

  const keyboardsContract = getKeyboardsContract(ethereum);

  const getKeyboards = useCallback(async () => {
    if(!ethereum || !connectedAccount) return
    setKeyboardsLoading(true);
    try {
      const keyboards = await keyboardsContract.getKeyboards();
      console.log('Retrieved keyboards...', keyboards)
      setKeyboards(keyboards)
    } finally {
      setKeyboardsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedAccount, ethereum])

  const connectAccount = useCallback(async () => {
    if (!ethereum) {
      alert('MetaMask is required to connect an account');
      return;
    }

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    handleAccounts(accounts);
  }, [ethereum]);

  const addContractEventHandlers = () => {
    // if(!keyboardsContract || !connectedAccount) return
    keyboardsContract.on('KeyboardCreated', async (keyboard) => {
      if (connectedAccount && !addressesEqual(keyboard.owner, connectedAccount)) {
        toast('Somebody created a new keyboard!', { id: JSON.stringify(keyboard) }, { duration: 10000 })
      }
      await getKeyboards();
    })
    keyboardsContract.on('TipSent', (recipient, amount) => {
      console.log('recipient, amount: ', recipient, amount);
      if (addressesEqual(recipient, connectedAccount)) {
        toast(`You received a tip of ${ethers.utils.formatEther(amount)} eth!`, { id: recipient + amount });
      }
    })
  }

  // useEffect(addContractEventHandlers, [connectedAccount, ethereum, getKeyboards]);

  useEffect(() => {
    setEthereum(window.ethereum);
  }, []);

  useEffect(() => {
    if(!ethereum) return
    connectAccount()
  }, [connectAccount, ethereum]);

  useEffect(() => {
    if(!connectedAccount) return
    addContractEventHandlers()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedAccount]);

  useEffect(() => {
    getKeyboards();
  }, [connectedAccount, getKeyboards])

  if (!ethereum) {
    return <p>Please install MetaMask to connect to this site</p>
  }

  if (!connectedAccount) {
    return <PrimaryButton onClick={connectAccount}>Connect MetaMask Wallet</PrimaryButton>
  }

  if (keyboards.length > 0) {
    return (
      <div className="flex flex-col gap-4">
        <PrimaryButton type="link" href="/create">Create a Keyboard!</PrimaryButton>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
        {keyboards.map(
          ([kind, isPBT, filter, owner], i) => (
            <div key={i} className="relative">
              <Keyboard kind={kind} isPBT={isPBT} filter={filter} />
              <span className="absolute top-1 right-6">
              {addressesEqual(owner, connectedAccount) ?
                <UserCircleIcon className="h-5 w-5 text-indigo-100" /> :
                <TipButton keyboardsContract={keyboardsContract} index={i} />
              }
              </span>
            </div>
          )
        )}

        </div>
      </div>
    )
  }

  // this is the new one
  if (keyboardsLoading) {
    return (
      <div className="flex flex-col gap-4">
        <PrimaryButton type="link" href="/create">Create a Keyboard!</PrimaryButton>
        <p>Loading Keyboards...</p>
      </div>
    )
  }

  // No keyboards yet
  return (
    <div className="flex flex-col gap-4">
      <PrimaryButton type="link" href="/create">Create a Keyboard!</PrimaryButton>
      <p>No keyboards yet!</p>
    </div>
  )
}
