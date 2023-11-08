import { IChainIndex } from "@/app/types";
import * as chains from "viem/chains";

// Possible chains: 🫠
// arbitrum,arbitrumGoerli,aurora,auroraTestnet,avalanche,avalancheFuji,
// baseGoerli,boba,bronos,bronosTestnet,bsc,bscTestnet,canto,celo,
// celoAlfajores,celoCannoli,cronos,crossbell,dfk,dogechain,evmos,
// evmosTestnet,fantom,fantomTestnet,filecoin,filecoinCalibration,
// filecoinHyperspace,flare,flareTestnet,foundry,iotex,iotexTestnet,
// goerli,gnosis,gnosisChiado,haqqMainnet,haqqTestedge2,hardhat,harmonyOne,
// klaytn,lineaTestnet,localhost,mainnet,metis,metisGoerli,moonbaseAlpha,
// moonbeam,moonriver,nexi,okc,optimism,optimismGoerli,polygon,
// polygonMumbai,polygonZkEvm,polygonZkEvmTestnet,pulsechain,pulsechainV4,
// scrollTestnet,sepolia,skaleBlockBrawlers,skaleCalypso,skaleCalypsoTestnet,
// skaleChaosTestnet,skaleCryptoBlades,skaleCryptoColosseum,skaleEuropa,
// skaleEuropaTestnet,skaleExorde,skaleHumanProtocol,skaleNebula,
// skaleNebulaTestnet,skaleRazor,skaleTitan,skaleTitanTestnet,songbird,
// songbirdTestnet,shardeumSphinx,syscoin,taraxa,taraxaTestnet,telos,
// telosTestnet,thunderTestnet,wanchain,wanchainTestnet,xdc,xdcTestnet,
// zhejiang,zkSync,zkSyncTestnet,zoraTestnet

const chain: IChainIndex = chains;

// todo: update to celoAlfajores
const selectedChain = chain[process.env.NEXT_PUBLIC_CHAIN || "goerli"];

export const getChain = () => {
  return selectedChain;
};

export const getChainId = () => {
  return selectedChain.id;
};
