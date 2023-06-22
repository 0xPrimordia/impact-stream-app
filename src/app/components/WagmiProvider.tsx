"use client";
import {
	WagmiConfig,
	createConfig,
	configureChains,
	mainnet,
	sepolia,
} from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";

const { publicClient, webSocketPublicClient } = configureChains(
	[mainnet, sepolia],
	[
		alchemyProvider({
			apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string,
		}),
	]
);

const config = createConfig({
	autoConnect: true,
	publicClient,
	webSocketPublicClient,
});

export function WagmiProvider({ children }: any) {
	return <WagmiConfig config={config}>{children}</WagmiConfig>;
}
