import { ethers } from 'ethers';
import {getSwapContract, swapContract} from './swapContract';
import getTokenContract from './tokenContract';

export const tokenBuyPrice = async (library) => {
    const contract = await getSwapContract(library);
    const price = ethers.utils.formatEther(await contract.tokenPerMaticBuy());
    return price;
}

export const tokenSellPrice = async (library) => {
    const contract = await getSwapContract(library);
    const price = ethers.utils.formatEther(await contract.tokenPerMaticSell());
    return price;
}

export const buyToken = async (amount, library) => {
    try {
        console.log(ethers.BigNumber.from(ethers.utils.parseEther(amount)).toString());
        const contract = await getSwapContract(library);
        const txn = await contract.buyTokens({value: ethers.utils.parseEther(amount)});
        await txn.wait();
    } catch (error) {
        throw error.reason;
    }
}

export const sellToken = async (amount, library) => {
    try {
        const contract = await getSwapContract(library);
        const token = await getTokenContract(library);
        let txn = await token.approve(swapContract, amount, {gasPrice: ethers.utils.parseUnits('100', 'gwei')});
        await txn.wait();
        txn = await contract.sellTokens(amount);
        await txn.wait();
    } catch (error) {
        throw error.reason;
    }
}

export const getMixedTransactions = async (library) => {
    const contract = await getSwapContract(library);
    const filters = contract.filters.BuyTokens();
    let events = await contract.queryFilter(filters);
    console.log(events);
}