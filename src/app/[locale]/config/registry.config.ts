import { IContractDetails } from "@/app/types";
import { registryAbi } from "../abis/registry";

export const registryContractDetails = (): IContractDetails => {
  return {
    [5]: {
      proxy: "0x4AAcca72145e1dF2aeC137E1f3C5E3D75DB8b5f3",
      abi: registryAbi,
    },
     // Celo Mainnet
     [42220]: {
      proxy: "0x0",
      abi: registryAbi,
    },
  };
};
