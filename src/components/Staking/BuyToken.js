import React, { useEffect, useState } from "react";
import axios from "axios";
import { connectors } from "../../services/walletConnect";
import { getBalance, approve } from "../../services/tokenService";
import { buyToken, sellToken, tokenBuyPrice, getMixedTransactions, tokenSellPrice } from "../../services/swapService";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import Footer from '../Footer/Footer';
import ModalSearch from '../Modal/ModalSearch';
import ModalMenu from '../Modal/ModalMenu';
import Header from '../Header/Header';

function BuyToken(props) {
  
  const [sellAmount, setSellAmount] = useState(0.0);
  const [buyAmount, setBuyAmount] = useState(0.0);
  const [buyPrice, setBuyPrice] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  const { library, chainId, account, activate, deactivate, active, provider } = useWeb3React();
  
  useEffect(() => {
    if(library && account && chainId == 137) {
      getMixedTransactions(library);
      tokenBuyPrice(library).then(res => setBuyPrice(res));
      tokenSellPrice(library).then(res => setPrice(res));
    }
  }, [account, chainId, library]);

  const connectMetaMask = async () => {
    let isCancelled = false;
    await activate(connectors.injected, () => {
      alert("Connection Rejected");
      isCancelled = true;
    });

    if (!isCancelled) {
      alert("Connected Successfully");
    }
  }

  const connectWalletConnect = async () => {
    let isCancelled = false;
    await activate(connectors.walletConnect, (error) => {
      console.log(error);
      window.alert("Connection Rejected");
      isCancelled = true;
    });
    if (!isCancelled) {
      window.alert("Connected Successfully");
    }
  }

  const buy = async () => {
    if(!account) {
      alert('Connect Wallet');
    }
    try {
      // const matic = ethers.BigNumber.from(amount).mul(ethers.BigNumber.from("1000000000000000000"));
      const matic = buyAmount;
      await buyToken(matic, library);
    } catch (error) {
      alert(error)
    }
  }

  const sell = async () => {
    if(!account) {
      alert('Connect Wallet');
    }
    try {
      const tokens = ethers.utils.parseEther(sellAmount);
      await sellToken(tokens, library);
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className="main">
    <Header />
    <section className="staking-area">
      <div style={{justifyContent: 'center'}} className="navbar-nav action flex-row mb-5">
        <li className="nav-item ml-2">
          <button onClick={connectWalletConnect} className="btn ml-lg-auto btn-bordered-white">
            <i className="icon-wallet mr-md-2"></i>Wallet Connect
          </button>
        </li>
        <li className="nav-item ml-2">
          <button onClick={connectMetaMask} className="btn ml-lg-auto btn-bordered-white">
            <i className="icon-wallet mr-md-2"></i>MetaMask
          </button>
        </li>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card no-hover staking-card single-staking">
              <h3 className="m-0">Buy $XTK</h3>
             
              <div className="input-box my-4">
                <div className="input-area d-flex flex-column flex-md-row mb-3">
                  <div className="input-text">
                    <input onChange={(e) => setBuyAmount(e.target.value)} type="number" placeholder={0.0} />
                  </div>
                  <button onClick={buy} className="btn input-btn mt-2 mt-md-0 ml-md-3">
                    Buy $XTK
                  </button>
                </div>
                
              </div>
              <p className="m-0 mb-3">$XTK Amount You will Get: {(buyPrice * buyAmount).toFixed(2)}</p>
              <h4 className="m-0">Buy Price: {buyPrice} $XTK per Matic</h4>
              <p className="m-0">{error}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <div className="card no-hover staking-card single-staking">
              <h3 className="m-0">Sell $XTK</h3>
             
              <div className="input-box my-4">
                <div className="input-area d-flex flex-column flex-md-row mb-3">
                  <div className="input-text">
                    <input onChange={(e) => setSellAmount(e.target.value)} type="number" placeholder={0.0} />
                  </div>
                  <button onClick={sell} className="btn input-btn mt-2 mt-md-0 ml-md-3">
                    Sell $XTK
                  </button>
                </div>
                
              </div>
              <p className="m-0 mb-3">Matic Amount You will Get: {(sellAmount / price).toFixed(2)}</p>
              <h4 className="m-0">Sell Price: {price} $XTK per Matic</h4>
              <p className="m-0">{error}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
    <ModalSearch />
    <ModalMenu />
    </div>
  );
}

export default BuyToken;
