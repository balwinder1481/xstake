import { ethers } from 'ethers';
import getTokenContract from './tokenContract';
import {stakingContract} from './contract';

export const approve = async (amount, library) => {
    console.log(library);
    console.log(amount);
    const token = await getTokenContract(library);
    const amountToApprove  = ethers.BigNumber.from(amount).toString();
    const txn = await token.approve(stakingContract, amountToApprove, {gasPrice: ethers.utils.parseUnits('100', 'gwei')});
    await txn.wait();
}

export const getBalance = async (library, userAddress) => {
  const token = await getTokenContract(library);

  const balance = ethers.utils.formatEther(await token.balanceOf(userAddress));
  return balance;
}

export const checkAllowance = async (amount, contractAddress, library) => {
    const token = await getTokenContract(library);
    const allowance = await ethers.utils.formatEther(
      token.allowance(this.userAddress, contractAddress)
    );
    return allowance >= amount;
}