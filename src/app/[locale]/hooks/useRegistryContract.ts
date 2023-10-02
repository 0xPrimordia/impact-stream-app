import { User } from "@/app/types";
import { ViemClient } from "../utils/client";
import { useState } from "react";
import { registryContractDetails } from "../config/registry.config";

export const useRegistryContract = async () => {
  const [user, setUser] = useState<User | null>(null);

  const client = ViemClient;
  const network = await client.getChainId();
  const registryContract = registryContractDetails();

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

function createProfile() {}

function setProfileMetadata(data: User) {
  return "JSON string to store in IPFS and get a pointer?";
}
