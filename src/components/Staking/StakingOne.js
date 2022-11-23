import React, { useEffect, useState } from "react";
import axios from "axios";
import { connectors } from "../../services/walletConnect";
import { getBalance, approve } from "../../services/tokenService";
import { getTotalUsers, getTotalStaked, stakeToken, claimReward, getUserAllStakes } from "../../services/stakingService";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import queryString from 'query-string';
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
// import getWallet from '../../services/wallet';

const DOMAIN = "https://xswap.uk/staking?ref=";

function StakingOne(props) {
  const [referrer, setReferrer] = useState('0x0000000000000000000000000000000000000000');
  let location = useLocation();
  let navigate = useNavigate();
  let params = useParams();
  const [userBalance, setUserBalance] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalStaked, setTotalStaked] = useState(0);
  const [approveTokens, setApproveTokens] = useState(0);
  const [stakeAmount, setStakeAmount] = useState(0);
  const [withdraw, setWithdraw] = useState(0);
  const [userStakes, setUserStakes] = useState([]);
  const [data, setData] = useState([]);
  const [tabData, setTabData] = useState([]);
  const [tabContent, setTabContent] = useState([]);
  const [features, setFeatures] = useState([]);
  
  const { library, chainId, account, activate, deactivate, active, provider } = useWeb3React();
  useEffect(() => {
    if(library && account && chainId == 137) {
      getBalance(library, account).then(res => setUserBalance(res));
      getTotalUsers(library).then(res => setTotalUsers(res));
      getTotalStaked(library).then(res => setTotalStaked(res));
      getUserAllStakes(library, account).then(res => setUserStakes(res));
    }
    if (location.search) {
      const { ref } = queryString.parse(location.search);
      setReferrer(ref);
    }
    let input_btn_2;
    input_btn_2 = "Stake";
    setData({heading: 'Stake Your $XTK & Get amazing Rewards and returns', balance: `${userBalance} $XTK`, content: 'Once staked, you will unstake it after 365 days', note: '*APY is dynamic & Static.',
      input_btn_1: 'Approve', input_btn_2})
    setTabData([{id: 1, tabID: 'tab-one-tab', tabClass: 'tab-link active', tabLink: '#tab-one', title: 'Lock Period: 365 Days'}]);
    setTabContent([{id: 1, tabID: 'tab-one', tabClass: 'tab-pane fade show active', tabLink: 'tab-one', period: '365 Days',
      status: "Unlocked",
      // eslint-disable-next-line no-dupe-keys
      tabClass: "tab-pane fade show active",
      // eslint-disable-next-line no-dupe-keys
      tabID: "tab-one",
      // eslint-disable-next-line no-dupe-keys
      tabLink: "tab-one",
      // apy: "0%",
      fee: "30%"
    }])
    setFeatures([{
      id: 1, title: `${totalStaked} $XTK`, className: 'card no-hover staking-card', content: 'Total Value Locked'
    },
    {
      id: 2, title: '100%', className: 'card no-hover staking-card my-4', content: 'APY'
    },{
      id: 3, title: `${totalUsers}`, className: 'card no-hover staking-card', content: 'Number of Stakers'
    }
    ])
    
  }, [account, library, userBalance, totalStaked, totalUsers, chainId, location.search]);

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

  const approveXotic = async () => {
    if(!account) {
      alert('Connect Wallet');
    }
    if(approveTokens < 1) {
      alert('Enter valid amount');
    }
    try {
      const tokens = ethers.BigNumber.from(approveTokens).mul(ethers.BigNumber.from("1000000000000000000"));
      await approve(tokens, library);
    } catch (error) {
      alert(error)
    }
  }

  const stake = async () => {
    if(!account) {
      alert('Connect Wallet');
    }
    if(stakeAmount < 1) {
      alert('Enter valid amount');
    }
    try {
      const tokens = ethers.BigNumber.from(stakeAmount).mul(ethers.BigNumber.from("1000000000000000000"));
      await stakeToken(tokens, referrer, library);
    } catch (error) {
      alert(error)
    }
  }

  const claim = async (position) => {
    if(!account) {
      alert('Connect Wallet');
    }
    try {
      await claimReward(library, position);
    } catch (error) {
      alert(error);
    }
  }

  const handleCopy = (link) => {
    navigator.clipboard.writeText(link);
    alert("Copied to clipboard");
  }

  return (
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
      {(account)
       ? (
        <div className="container mb-3">
          <div className="row text-center">
            <div className="col-12">
            <h5 className="">Invite Link: <strong> {DOMAIN + account}</strong></h5>
          <button onClick={() => handleCopy(DOMAIN + account)} className="btn ml-lg-auto btn-bordered-white">
            Copy Referral Link
          </button>
          </div>
          </div>  
        </div> 
       ): ""}
      
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-7">
            <div className="card no-hover staking-card single-staking">
              <h6 className="m-0">{data.heading}</h6>
              <h6><span className="balance mt-0 mb-3">Your $XTK Balance: {data.balance}</span></h6>
              <ul
                className="nav nav-tabs staking-tabs border-0 my-3 my-md-4"
                id="myTab"
                role="tablist"
              >
                {tabData.map((item, idx) => {
                  return (
                    <li
                      key={`std_${idx}`}
                      className="nav-item"
                      role="presentation"
                    >
                      <a
                        className={item.tabClass}
                        id={item.tabID}
                        data-toggle="tab"
                        href={item.tabLink}
                        role="tab"
                        aria-selected="true"
                      >
                        {item.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
              <div className="tab-content mt-md-3" id="myTabContent">
                {tabContent.map((item, idx) => {
                  return (
                    <div
                      key={`stcd_${idx}`}
                      className={item.tabClass}
                      id={item.tabID}
                      role="tabpanel"
                    >
                      <div className="staking-tab-content">
                        {/* Info Box */}
                        <div className="info-box d-flex justify-content-between">
                          <div className="info-left">
                            <ul className="list-unstyled">
                              {(referrer != "0x0000000000000000000000000000000000000000")
                               ? (<li>
                                <strong>Referrer :</strong> {referrer}
                              </li>) : ""}
                              
                              {/* <li>
                                <strong>Lock period:</strong> {item.period}
                              </li> */}
                              <li>
                                <strong>Retrun: </strong> 100% Of Stake Value
                              </li>
                              {/* <li>
                                <strong>Extends lock on registration:</strong>{" "}
                                {item.lock}
                              </li> */}
                              {/* <li>
                                <strong>Early unstake fee:</strong> {item.fee}
                              </li> */}
                              {/* <li>
                                <strong>Status:</strong> {item.status}
                              </li> */}
                            </ul>
                          </div>
                          <div className="info-right d-flex flex-column">
                            <span>{item.apy}</span>
                            {/* <span>APY*</span> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="input-box my-4">
                <div className="input-area d-flex flex-column flex-md-row mb-3">
                  <div className="input-text">
                    <input onChange={(e) => setApproveTokens(e.target.value)} type="text" placeholder={0.0} />
                  </div>
                  <button onClick={approveXotic} className="btn input-btn mt-2 mt-md-0 ml-md-3">
                    {data.input_btn_1}
                  </button>
                </div>
                <div className="input-area d-flex flex-column flex-md-row">
                    <div className="input-text">
                      <input onChange={(e) => setStakeAmount(e.target.value)} type="text" placeholder={0.0} />
                    </div>
                    <button onClick={stake} className="btn input-btn mt-2 mt-md-0 ml-md-3">
                      {data.input_btn_2}
                    </button>
                </div>
              </div>
              <span>{data.content}</span>
              <span className="mt-0 mb-3">
                <strong>{data.note}</strong>
              </span>
              {/* <div className="input-area d-flex flex-column flex-md-row mt-3">
                   <div className="input-text">
                     <input onChange={(e) => setWithdraw(e.target.value)} type="text" placeholder={0.0} />
                   </div>
                   <button onClick={claim} className="btn input-btn mt-2 mt-md-0 ml-md-3">
                     Copy
                   </button>
                 </div> */}
            </div>
          </div>
          <div className="col-12 col-md-5">
            <div className="staking-items mt-4 mt-md-0">
              {/* Single Card */}
              {features.map((item, idx) => {
                return (
                  <div key={`fsd_${idx}`} className={item.className}>
                    <h3 className="m-0">{item.title}</h3>
                    <p>{item.content}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Stake Information */}
      <div className="container ">
          <div className="row leaderboard-area">
              <div className="col-12">
                  <div className="table-responsive">
                      <table className="table token-content table-borderless ">
                          <thead>
                          <tr>
                          <th scope="col">#</th>
                          <th scope="col">Stake Amount</th>
                          <th scope="col">Stake end period</th>
                          <th scope="col">Action</th>
                          </tr>
                          </thead>
                          <tbody>
                          {userStakes.map((s, i) => {
                                return (
                                  <tr key={i}>
                                    <td><th scope="row">{i + 1}</th></td>
                                    <td>{s.amount*2} $XTK</td>
                                    <td>{s.endDate}</td>
                                    <td>{(!s.claimed) ? (<button onClick={() => claim(i+1)} className="btn input-btn ">Withdraw</button>) : <></>}</td>
                                  </tr>
                                )
                              })}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </div>

      
      {/* End Stake Information */}

      {/* <div className="container mt-5">
        <div className="row">
        <table style={{color: 'white'}} className="table table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Stake Amount</th>
            <th scope="col">Return Amount</th>
            <th scope="col">Stake end period</th>

          </tr>
        </thead>
        <tbody>
          {userStakes.map((s, i) => {
            return (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{s.amount} $XTK</td>
                <td>{s.amount*2} $XTK</td>
                <td>{s.endDate}</td>
                <td>{(!s.claimed) ? (<button onClick={() => claim(i+1)} className="btn btn-sm">Withdraw</button>) : <></>}</td>
              </tr>
            )
          })}
          
        </tbody>
      </table>
        </div>
      
      </div> */}
    </section>
    
    
  );
}

export default StakingOne;
