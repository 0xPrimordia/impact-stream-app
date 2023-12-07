"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { PrivyWagmiConnector } from "@privy-io/wagmi-connector";
import { celo } from "viem/chains";
import { configureChains } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

const configureChainsConfig = configureChains(
  [celo],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: process.env.NEXT_PUBLIC_JSON_RPC_URL as string,
      }),
    }),
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string,
    }),
  ]
);

export function WagmiProvider({ children }: any) {
  // todo: what else do we need to do on login?
  const handleLogin = (user: any) => {
    console.log(`User ${user.id} logged in!`);
  };

  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
      onSuccess={handleLogin}
      config={{
        loginMethods: ["sms"],
        appearance: {
          theme: "light",
          logo: "/impact-stream-logo.svg",
        },
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      <PrivyWagmiConnector wagmiChainsConfig={configureChainsConfig}>
        {children}
      </PrivyWagmiConnector>
    </PrivyProvider>
  );
}
