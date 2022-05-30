import { MongoClient, ObjectId } from "mongodb";
import { NftSwapV4 as NftSwap } from "@traderxyz/nft-swap-sdk";
import { Contract, ethers } from "ethers";
import { erc721ContractAddresses } from "../../contracts/erc721Contracts";
import { erc721ABI } from "../../contracts/abi/erc721ABI";

const chainIds: any = {
  42161: "arbitrum-mainnet",
  43114: "avalanche",
  56: "bsc",
  97: "bscTestnet",
  31337: "hardhat",
  1: "mainnet",
  10: "optimism-mainnet",
  137: "polygon-mainnet",
  80001: "polygon-mumbai",
  4: "rinkeby",
  3: "ropsten",
  5: "goerli",
  42: "kovan",
  250: "opera",
  4002: "ftmTestnet",
};

function getChainConfig(chain: string): string {
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
    case "local":
      jsonRpcUrl = "http://localhost:8545";
      break;
    default:
      jsonRpcUrl =
        "https://" + chain + ".infura.io/v3/" + process.env.INFURA_API_KEY;
  }
  return jsonRpcUrl;
}

async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const client = await MongoClient.connect(process.env.MONGODB_URI as string);

    const db = client.db();

    const data = req.body;

    const nftsCollection = db.collection("nfts");
    const usersCollection = db.collection("users");

    const nft: any = await nftsCollection.findOne({
      _id: new ObjectId(data.nftId),
    });

    const user: any = await usersCollection.findOne({
      _id: new ObjectId(data.userId),
    });
    
    const provider = new ethers.providers.JsonRpcProvider(
      getChainConfig(chainIds[Number(nft.chainId)])
    );
    
    const signer = new ethers.Wallet(
      process.env.ADMIN_WALLET_PRIVATE_KEY as string,
      provider
    );

    const nftSwapSdk = new NftSwap(provider, signer, nft.chainId);
    await nftSwapSdk.fillSignedOrder(nft.usdSignedOrder);

    const contract = new Contract(
      erc721ContractAddresses[Number(nft.chainId)] as string,
      erc721ABI,
      signer
    );

    await contract.transferFrom(
      process.env.NEXT_PUBLIC_ADMIN_WALLET,
      user.address,
      nft.tokenId
    );

    const result = await nftsCollection.updateOne(
      { _id: new ObjectId(data.nftId) },
      { $set: { userId: data.userId, status: "AVAILABLE" } }
    );

    console.log(result);

    res.status(201).json({ message: "Process payment success!" });
  }
}

export default handler;
