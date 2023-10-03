"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ethers } from 'ethers'; // Uncomment this line
import creator from "../creator.jpg";
import imageEth from "../ether-logo.png";

const Home = () => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [balance, setBalance] = useState("");

    const failMessage = "Please install MetaMask and connect your wallet";
    const successMessage = "Your account is successfully connected to MetaMask";

    const INFURA_ID = "75055e75f0a14d2d9b4e51ac37a2956d";


    const checkIfWalletConnected = async () => {
        if (!window.ethereum) {
            console.log(failMessage);
            return;
        }

        const accounts = await window.ethereum.request({ method: "eth_accounts" });

        if (accounts.length) {
            setCurrentAccount(accounts[0]);

            const address = "0x4838b106fce9647bdf1e7877bf73ce8b0bad5f97";
            const balance = await provider.getBalance(address);
            const showBalance = `${ethers.utils.formatEther(balance)} ETH`;
            console.log(balance);
        } else {
            console.log("Fail");
        }
    };

    const cWallet = async () => {
        if (!window.ethereum) {
            console.log(failMessage);
            return;
        }

        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setCurrentAccount(accounts[0]);
        window.location.reload();
    };

    useEffect(() => {
        checkIfWalletConnected();
    }, []);

    return (
        <div className='card_container'>
            {!currentAccount ? "" : <span className='pro'>PRO</span>}
            <Image src={creator} alt="profile" width={80} height={80} />
            <h3>Check Ethers</h3>

            {!currentAccount ? (
              <div>
                <div className='message'>
                  <p>{failMessage}</p>
                </div>

                <Image src={imageEth} alt='ether' width={100} height={100} />
                <p>Welcome to ether account checker</p>
              </div>
            ):(
              <div>
                <h6>Verified <span className='tick'>&#10004;</span></h6>
                </div>
            )}
        </div>
    );
}

export default Home;
