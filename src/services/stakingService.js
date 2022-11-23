import { ethers } from "ethers";
import { getContract } from "./contract";

export const getTotalUsers = async (library) => {
    const contract = await getContract(library);

    const totalUsers = ethers.BigNumber.from(await contract.totalStakers()).toNumber();
    return totalUsers;
}

export const getTotalStaked = async (library) => {
    const contract = await getContract(library);
    const totalStaked = ethers.utils.formatEther(await contract.totalStakedTokens());
    return totalStaked;
}

export const stakeToken = async (stakeAmount, referrer, library) => {
    if(referrer.length != 42) {
        throw new Error("Invalid Address");
    }
    const contract = await getContract(library);
    const txn = await contract.stakeToken(stakeAmount, referrer.toString());
    await txn.wait();
}

export const claimReward = async (library, positionId) => {
    try {
        const contract = await getContract(library);
        const txn = await contract.claimReward(positionId);
        await txn.wait();
    } catch (error) {
        throw error.reason;
    }
}

export const getUserAllStakes = async (library, userAddress) => {
    const contract = await getContract(library);
    try {
        const lastPosition = await contract.userLastStakePosition(userAddress);
        let userStakes = [];
        for(let i=1; i <= lastPosition; i++) {
            let data = {};
            const userStakeInfo = await contract.getUserStake(i);
            let amount = ethers.BigNumber.from(ethers.BigNumber.from(userStakeInfo["amount"]).div(ethers.BigNumber.from("1000000000000000000"))).toNumber();
            data.amount = amount;
            let claimed = ethers.BigNumber.from(ethers.BigNumber.from(userStakeInfo["claimed"]).div(ethers.BigNumber.from("1000000000000000000"))).toNumber();
            data.claimed = claimed;
            let endTS = ethers.BigNumber.from(userStakeInfo["endTS"]).toNumber();
            const endDate = getDate(endTS);
            data.endDate = endDate.toDateString();
    
            let startTS = ethers.BigNumber.from(userStakeInfo["startTS"]).toNumber();
            const startDate = getDate(startTS);
            data.startDate = startDate.toDateString();
            
            userStakes.push(data);
        }
        return userStakes;
    } catch (error) {
        
        throw error;
    }
}

function getDate(x) {
    const myDate = new Date(x * 1000);
    return myDate;
 }