"use client";
import { PrivyWagmiConnector } from "@privy-io/wagmi-connector";
import { configureChains, mainnet, sepolia } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { PrivyProvider } from "@privy-io/react-auth";

const configureChainsConfig = configureChains(
	[mainnet, sepolia],
	[
		alchemyProvider({
			apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string,
		}),
	]
);
export function WagmiProvider({ children }: any) {
	const handleLogin = (user:any) => {
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
