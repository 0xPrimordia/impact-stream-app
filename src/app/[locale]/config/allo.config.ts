import { ContractDetails } from "@/app/types";
import { alloAbi } from "../abis/allo";

export const alloContractDetails = (): ContractDetails => {
  return {
    [5]: {
      proxy: "0xbb6B237a98D907b04682D8567F4a8d0b4b611a3b",
      implementation: "0x9c6455ccdbe69e0a9352f9cef9d2204c46bec977",
      abi: alloAbi,
    },
  };
};
