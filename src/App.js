import React from 'react';

// importing MyRouts where we located all of our theme
import MyRouts from './routers/routes';
import { ethers } from 'ethers';
import { Web3ReactProvider } from '@web3-react/core';
import { Buffer } from 'buffer';
const getLibrary = (provider) => {
  return new ethers.providers.Web3Provider(provider);
}
function App() {

  window.Buffer = Buffer;
  return (
    <div>
      <Web3ReactProvider getLibrary={getLibrary}>
        <MyRouts />
      </Web3ReactProvider>
    </div>
  );
}

export default App;