import { IContractDetails, IStrategyDetails } from "@/app/types";
import { alloAbi } from "../abis/allo";
import { qvImpactStreamStrategyAbi } from "../abis/qvImpactStreamStrategy";
import { registryAbi } from "../abis/registry";

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
      poolId: 8,
      address: "0x6dFE1e350b315E65f6216CC21e6940fcAA6ACa26",
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
      poolId: 5,
      address: "0xac7ea3B359137Da4B6CE414B092a517C3E1b7Bf3",
      abi: qvImpactStreamStrategyAbi,
    },
  };
};
