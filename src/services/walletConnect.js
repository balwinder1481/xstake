
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
  
  const injected = new InjectedConnector({
    supportedChainIds: [137, 80001]
  });
  
  
  const ALL_SUPPORTED_CHAIN_IDS = [137, 80001];
  
  const NETWORK_URLS = {
    137: "https://polygon-rpc.com/",
    80001: "https://rpc-mumbai.maticvigil.com/"
  }
  
  
  const walletconnect = new WalletConnectConnector({
    supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
    rpc: NETWORK_URLS,
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
    chainId: 137
  });
  
  export const connectors = {
    injected: injected,
    walletConnect: walletconnect,
  };