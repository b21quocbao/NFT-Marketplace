import { NEXT_PUBLIC_INFURA_PROJECT_ID_RPC } from "@env";

export function ensureIpfsUriPrefix(cidOrURI: any) {
  let uri = cidOrURI.toString();
  if (!uri.startsWith("ipfs://")) {
    uri = "ipfs://" + cidOrURI;
  }
  // Avoid the Nyan Cat bug (https://github.com/ipfs/go-ipfs/pull/7930)
  if (uri.startsWith("ipfs://ipfs/")) {
    uri = uri.replace("ipfs://ipfs/", "ipfs://");
  }
  return uri;
}

export function stripIpfsUriPrefix(cidOrURI: string) {
  if (cidOrURI.startsWith("ipfs://")) {
    return cidOrURI.slice("ipfs://".length);
  }
  return cidOrURI;
}

export function makeNFTMetadata(assetURI: string, options: any) {
  const { name, description } = options;
  assetURI = ensureIpfsUriPrefix(assetURI);
  return {
    name,
    description,
    image: assetURI,
  };
}

const chainIds = {
  "arbitrum-mainnet": 42161,
  avalanche: 43114,
  bsc: 56,
  bscTestnet: 97,
  hardhat: 31337,
  mainnet: 1,
  "optimism-mainnet": 10,
  "polygon-mainnet": 137,
  "polygon-mumbai": 80001,
  rinkeby: 4,
  ropsten: 3,
  goerli: 5,
  kovan: 42,
  opera: 250,
  ftmTestnet: 4002,
};

export function getChainConfig(chainId: number): string {
  let chain = "";
  for (const key in chainIds) {
    if (chainIds[key] == chainId) {
      chain = key;
    }
  }
  let jsonRpcUrl: string;
  switch (chain) {
    case "avalanche":
      jsonRpcUrl = "https://api.avax.network/ext/bc/C/rpc";
      break;
    case "bsc":
      jsonRpcUrl = "https://bsc-dataseed1.binance.org";
      break;
    case "bscTestnet":
      jsonRpcUrl = "https://data-seed-prebsc-1-s1.binance.org:8545/";
      break;
    case "opera":
      jsonRpcUrl = "https://rpc.ftm.tools";
      break;
    case "ftmTestnet":
      jsonRpcUrl = "https://rpc.testnet.fantom.network";
      break;
    default:
      jsonRpcUrl =
        "https://" + chain + `.infura.io/v3/${NEXT_PUBLIC_INFURA_PROJECT_ID_RPC}`;
  }
  return jsonRpcUrl;
}
