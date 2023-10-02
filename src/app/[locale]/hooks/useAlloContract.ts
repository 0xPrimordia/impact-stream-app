import { alloContractDetails } from "../config/allo.config";
import { ViemClient } from "../utils/client";

export type PoolData = {};

const client = ViemClient;
const alloContract = alloContractDetails();

export const useAlloContract = async (poolData: PoolData) => {
  const network = await client.getChainId();
  const blockNumber = await client.getBlockNumber();

  console.log({
    blockNumber: blockNumber.toString(),
    network,
    allo: alloContract[network]?.proxy,
  });

  const alloAddress = getAllo();

  getStrategy(0, network);

  return {
    alloAddress,
    poolId: 0,
  };
};

function getAllo(): `0x${string}` {
  return "0xWAGMI";
}

async function getStrategy(
  poolId: number,
  networkId: number
): Promise<`0x${string}`> {
  const alloAddress = alloContract[networkId]?.proxy;
  const data = await client.readContract({
    address: alloAddress,
    abi: alloContract[networkId]?.abi,
    functionName: "getStrategy",
    args: [poolId],
  });

  console.log("DATA ********************", `0x${data.toString()}`);

  return `0x${data.toString()}`;
}

function allocate(networkId: number) {
  const alloAddress = alloContract[networkId]?.proxy;

  // allocate votes to a recipient
}

function setPayouts(networkId: number) {
  const alloAddress = alloContract[networkId]?.proxy;
  // set the payouts for the pool
}

function distribute(networkId: number) {
  const alloAddress = alloContract[networkId]?.proxy;
  // distribute the payouts
}
