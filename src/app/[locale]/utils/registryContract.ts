import { ContractDetails, User } from "@/app/types";
import { ViemClient } from "./client";
import { registryContractDetails } from "../config/registry.config";
import { alloContractDetails } from "../config/allo.config";

const client = ViemClient;
const registryContract: ContractDetails = registryContractDetails();

export async function getAllo() {
  const network = await client.getChainId();

  return alloContractDetails()[network]?.proxy;
}

export async function createProfile() {
  const network = await client.getChainId();

  const registryAddress = registryContract[network]?.proxy;
}

function setProfileMetadata(data: User) {
  return "JSON string to store in IPFS and get a pointer?";
}
