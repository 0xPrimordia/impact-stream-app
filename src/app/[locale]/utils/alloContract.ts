import { alloContractDetails } from "../config/allo.config";
import { ViemClient } from "./client";

export type PoolData = {};

const client = ViemClient;
const alloContract = alloContractDetails();

export async function getAllo() {
  const network = await client.getChainId();

  return alloContractDetails()[network]?.proxy;
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
