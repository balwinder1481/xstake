import abi from "../abis/swap.json";
import { ethers } from "ethers";

export const swapContract = "0x9f8f6F3a10F8811bD8eaDc188b55a2821AA0326f";

export const getSwapContract = async (library) => {
    let contract = new ethers.Contract(swapContract, abi, library.getSigner());
    return contract;
}