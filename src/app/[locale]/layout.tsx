import "./globals.css";
import { Inter } from "next/font/google";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { WagmiProvider } from "./components/WagmiProvider";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import TinybaseWrapper from "./components/TinybaseWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Impact Stream App",
	description: "Submit and vote on funding proposals for your community",
};
export function generateStaticParams() {
	return [{ locale: "en" }, { locale: "fr" }, { locale: "ee" }];
}
export default async function RootLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode;
	params: { locale: string };
}) {
	let messages;
	try {
		messages = (await import(`../../messages/${locale}.json`)).default;
		console.log(messages);
	} catch (error) {
		notFound();
	}
	return (
		<html lang={locale}>
			<body className={inter.className + " p-8 pb-12 pt-28"}>
				<NextIntlClientProvider messages={messages} locale={locale}>
					<WagmiProvider>
						<TinybaseWrapper>
							<Navbar />
							{children}
							<Footer />
						</TinybaseWrapper>
					</WagmiProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
