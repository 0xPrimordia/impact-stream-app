import { IContractDetails, IStrategyDetails } from "@/app/types";
import { alloAbi } from "../abis/allo";
import { qvImpactStreamStrategyAbi } from "../abis/qvImpactStreamStrategy";

export const alloContractDetails = (): IContractDetails => {
  return {
    [5]: {
      proxy: "0xbb6B237a98D907b04682D8567F4a8d0b4b611a3b",
      implementation: "0x9c6455ccdbe69e0a9352f9cef9d2204c46bec977",
      abi: alloAbi,
    },
  };
};

export const strategyContractDetails = (): IStrategyDetails => {
  return {
    [5]: {
      poolId: 17,
      address: "0xc7C1C2d673c6C782B7Ca565422Ddb3A8F3EABCe5",
      abi: qvImpactStreamStrategyAbi,
    },
  };
};
