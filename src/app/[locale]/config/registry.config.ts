import { IContractDetails } from "@/app/types";
import { registryAbi } from "../abis/registry";

export const registryContractDetails = (): IContractDetails => {
  return {
    [5]: {
      proxy: "0xBC23124Ed2655A1579291f7ADDE581fF18327D41",
      abi: registryAbi,
    },
  };
};
