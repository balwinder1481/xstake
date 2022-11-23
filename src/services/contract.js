import abi from "../abis/staking.json";
import { ethers } from "ethers";

export const stakingContract = "0x901C20b7F24557666b731C4EF02dEee0b1e402dA";

export const getContract = async (library) => {
    let contract = new ethers.Contract(stakingContract, abi, library.getSigner());
    return contract;
}