import { ViemClient } from "../utils/client";

export const useAlloContract = async () => {
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

function getStrategy() {}

function createPool() {}

function allocate() {}

function setPayouts() {}

function distribute() {}
