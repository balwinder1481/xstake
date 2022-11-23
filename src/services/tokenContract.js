import abi from "../abis/token.json";
import { ethers } from "ethers";

const tokenAddress = "0xc4209d78E822A97C2eA87EA96303add7EDc3E8fE";

const getTokenContract = async (library) => {
    let contract = new ethers.Contract(tokenAddress, abi, library.getSigner());
    return contract;
}

export default getTokenContract;