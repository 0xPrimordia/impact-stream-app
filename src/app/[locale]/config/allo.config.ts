import { IContractDetails, IStrategyDetails } from "@/app/types";
import { alloAbi } from "../abis/allo";
import { registryAbi } from "../abis/registry";
import { qvImpactStreamStrategyAbi } from "../abis/qvImpactStreamStrategy";

// TODO: add the details for the latest deployments.
export const alloContractDetails = (): IContractDetails => {
  return {
    // Goerli
    [5]: {
      proxy: "0x0",
      implementation: "0x0",
      abi: alloAbi,
    },
    // Celo Alfajores
    [44787]: {
      proxy: "0x0",
      implementation: "0x0",
      abi: alloAbi,
    },
    // Celo Mainnet
    [42220]: {
      proxy: "0x0",
      implementation: "0x0",
      abi: alloAbi,
    },
  };
};

export const registryContractDetails = (): IContractDetails => {
  return {
    // Goerli
    [5]: {
      proxy: "0x0",
      implementation: "0x0",
      abi: registryAbi,
    },
    // Celo Alfajores
    [44787]: {
      proxy: "0x0",
      implementation: "0x0",
      abi: registryAbi,
    },
    // Celo Mainnet
    [42220]: {
      proxy: "0x0",
      implementation: "0x0",
      abi: registryAbi,
    },
  };
};

export const strategyContractDetails = (): IStrategyDetails => {
  return {
    // Goerli
    [5]: {
      poolId: 17,
      address: "0xc7C1C2d673c6C782B7Ca565422Ddb3A8F3EABCe5",
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
