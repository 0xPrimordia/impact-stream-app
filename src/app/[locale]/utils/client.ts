import { createPublicClient, http } from "viem";
import { getChain } from "../config/network.config";

const transport = http(process.env.NEXT_PUBLIC_CHAIN_RPC);
export const ViemClient = createPublicClient({
  chain: getChain(),
  transport,
});
