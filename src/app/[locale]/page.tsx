"use client";
import Image from "next/image";
import { Wallet } from "./components/Wallet";
import withTinyBase from "./components/withTinyBase";



export default function Home() {
  const EnhancedWallet = withTinyBase(Wallet);
	return <EnhancedWallet/>;
}


