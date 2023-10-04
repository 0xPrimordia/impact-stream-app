import { createPublicClient, http } from "viem";
import { goerli } from "wagmi";

export const ViemClient = createPublicClient({
  chain: goerli,
  transport: http(),
});
