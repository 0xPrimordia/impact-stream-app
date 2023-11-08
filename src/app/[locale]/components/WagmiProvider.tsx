"use client";

import { PrivyWagmiConnector } from "@privy-io/wagmi-connector";
import { configureChains, mainnet, sepolia } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { PrivyProvider } from "@privy-io/react-auth";
import { celo, celoAlfajores, goerli } from "viem/chains";

const configureChainsConfig = configureChains(
  [mainnet, goerli, sepolia],
  [
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
