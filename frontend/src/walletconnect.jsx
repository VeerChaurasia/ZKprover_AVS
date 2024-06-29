import React, { useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './walletconnect.css';

const WalletConnect = () => {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const account = await signer.getAddress();
        setAccount(account);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert('MetaMask not detected');
    }
  };

  return (
    <div className="home">
      <h1 className='Purpose'>Zkprover as an AVS</h1>
      <h3 className='heading'>Zkprover and Zkverifier based on EigenLayer</h3>
      {account ? (
        <>
          <p>Connected account: {account}</p>
          <Link to="/input">
            <button className="navigate-button">Go to Input Page</button>
          </Link>
        </>
      ) : (
        <button className="wallet-button" onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default WalletConnect;
