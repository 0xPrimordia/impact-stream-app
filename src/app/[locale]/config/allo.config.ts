import { IContractDetails, IStrategyDetails } from "@/app/types";
import { alloAbi } from "../abis/allo";
import { registryAbi } from "../abis/registry";
import { qvImpactStreamStrategyAbi } from "../abis/qvImpactStreamStrategy";

// TODO: add the details for the latest deployments.
export const alloContractDetails = (): IContractDetails => {
  return {
    // Goerli
    [5]: {
      proxy: "0x1133eA7Af70876e64665ecD07C0A0476d09465a1",
      abi: alloAbi,
    },
    // Celo Alfajores
    [44787]: {
      proxy: "0x1133eA7Af70876e64665ecD07C0A0476d09465a1",
      abi: alloAbi,
    },
    // Celo Mainnet
    [42220]: {
      proxy: "0x1133eA7Af70876e64665ecD07C0A0476d09465a1",
      abi: alloAbi,
    },
  };
};

export const registryContractDetails = (): IContractDetails => {
  return {
    // Goerli
    [5]: {
      proxy: "0x4AAcca72145e1dF2aeC137E1f3C5E3D75DB8b5f3",
      abi: registryAbi,
    },
    // Celo Alfajores
    [44787]: {
      proxy: "0x4AAcca72145e1dF2aeC137E1f3C5E3D75DB8b5f3",
      abi: registryAbi,
    },
    // Celo Mainnet
    [42220]: {
      proxy: "0x4AAcca72145e1dF2aeC137E1f3C5E3D75DB8b5f3",
      abi: registryAbi,
    },
  };
};

export const strategyContractDetails = (): IStrategyDetails => {
  return {
    // Goerli
    [5]: {
      poolId: 7,
      address: "0x4751C362Fc1c6a6771B403Ea9624B00E0E20d68a",
      abi: qvImpactStreamStrategyAbi,
    },
    // Celo Alfajores
    [421613]: {
      poolId: 0,
      address: "0x0",
      abi: qvImpactStreamStrategyAbi,
    },
    // Celo Mainnet
    [42220]: {
      poolId: 0,
      address: "0x0",
      abi: qvImpactStreamStrategyAbi,
    },
  };
};
