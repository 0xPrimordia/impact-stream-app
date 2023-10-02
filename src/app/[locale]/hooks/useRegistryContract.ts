import { ViemClient } from "../utils/client";

export const useRegistryContract = async () => {
  const client = ViemClient;

  const blockNumber = await client.getBlockNumber();

  console.log(blockNumber.toString());

  const alloAddress = getAllo();

  return {
    alloAddress,
  };
};

function getAllo() {
  return "0xWAGMI";
}
