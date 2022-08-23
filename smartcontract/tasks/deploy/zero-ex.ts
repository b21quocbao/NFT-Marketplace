import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";
import web3 from "web3";

import type { ERC721Token } from "../../src/types/contracts/ERC721Token";
import type { ERC1155Token } from "../../src/types/contracts/ERC1155Token";
import type { ERC20Token } from "../../src/types/contracts/Erc20Token.sol/ERC20Token";
import type { ZeroEx } from "../../src/types/contracts/src/ZeroEx";
import type { BootstrapFeature } from "../../src/types/contracts/src/features/BootstrapFeature";
import type { ERC721Token__factory } from "../../src/types/factories/contracts/ERC721Token__factory";
import type { ERC1155Token__factory } from "../../src/types/factories/contracts/ERC1155Token__factory";
import type { ERC20Token__factory } from "../../src/types/factories/contracts/Erc20Token.sol/ERC20Token__factory";
import type { ZeroEx__factory } from "../../src/types/factories/contracts/src/ZeroEx__factory";
import type { BootstrapFeature__factory } from "../../src/types/factories/contracts/src/features/BootstrapFeature__factory";

const { toWei, fromWei } = web3.utils;

const addresses = {
  1: {
    exchange: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
    wrappedNativeToken: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  },
  3: {
    exchange: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
    wrappedNativeToken: "0xc778417e063141139fce010982780140aa0cd5ab",
  },
  4: {
    exchange: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
    wrappedNativeToken: "0xc778417e063141139fce010982780140aa0cd5ab",
  },
  8: {
    exchange: "0x19aaD856cE8c4C7e813233b21d56dA97796cC052",
    wrappedNativeToken: "0x1FA6A37c64804C0D797bA6bC1955E50068FbF362",
  },
  10: {
    exchange: "0xdef1abe32c034e558cdd535791643c58a13acc10",
    wrappedNativeToken: "0x4200000000000000000000000000000000000006",
  },
  250: {
    exchange: "0xdef189deaef76e379df891899eb5a00a94cbc250",
    wrappedNativeToken: "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83",
  },
  42220: {
    exchange: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
    wrappedNativeToken: "0x471EcE3750Da237f93B8E339c536989b8978a438",
  },
  42161: {
    exchange: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
    wrappedNativeToken: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
  },
  42: {
    exchange: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
    wrappedNativeToken: "0xd0a1e359811322d97991e03f863a0c30c2cf029c",
  },
  56: {
    exchange: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
    wrappedNativeToken: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
  },
  1337: {
    exchange: "0x5315e44798395d4a952530d131249fe00f554565",
    wrappedNativeToken: "0x0b1ba0af832d7c05fd64161e0db78e85978e8082",
  },
  137: {
    exchange: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
    wrappedNativeToken: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
  },
  80001: {
    exchange: "0x4fb72262344034e034fce3d9c701fd9213a55260",
    wrappedNativeToken: "0x9c3c9283d3e44854697cd22d3faa240cfb032889",
  },
  43114: {
    exchange: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
    wrappedNativeToken: "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7",
  },
  15442: {
    exchange: "0xbe9FD65Fc80b3713504fb688f6f10672605A944f",
    wrappedNativeToken: "0x94A36ABfb99Fefb5B0d8AFE6d4EF4517A50E94fB",
  },
} as any;

task("deploy:ZeroEx").setAction(async function (taskArguments: TaskArguments, { ethers }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();

  const bootstrapFeatureFactory: BootstrapFeature__factory = <BootstrapFeature__factory>(
    await ethers.getContractFactory("BootstrapFeature")
  );
  const bootstrapFeature: BootstrapFeature = <BootstrapFeature>(
    await bootstrapFeatureFactory.connect(signers[0]).deploy(signers[0].address)
  );
  await bootstrapFeature.deployed();
  console.log("BootstrapFeature deployed to: ", bootstrapFeature.address);

  const zeroExFactory: ZeroEx__factory = <ZeroEx__factory>await ethers.getContractFactory("ZeroEx");
  const zeroEx: ZeroEx = <ZeroEx>await zeroExFactory.connect(signers[0]).deploy(bootstrapFeature.address);
  await zeroEx.deployed();
  console.log("ZeroEx deployed to: ", zeroEx.address);
});

task("deploy:ERC721")
  .addParam("symbol", "Contract symbol")
  .addParam("name", "Contract name")
  .setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
    if (network.config.chainId) {
      const signers: SignerWithAddress[] = await ethers.getSigners();

      const erc721Factory: ERC721Token__factory = <ERC721Token__factory>await ethers.getContractFactory("ERC721Token");
      const erc721: ERC721Token = <ERC721Token>(
        await erc721Factory
          .connect(signers[0])
          .deploy(taskArguments.name, taskArguments.symbol, addresses[network.config.chainId].exchange)
      );
      await erc721.deployed();
      console.log("ERC721 deployed to: ", erc721.address);
    }
  });
  
task("deploy:ERC1155")
  .setAction(async function (taskArguments: TaskArguments, { ethers, network }) {
    if (network.config.chainId) {
      const signers: SignerWithAddress[] = await ethers.getSigners();

      const erc1155Factory: ERC1155Token__factory = <ERC1155Token__factory>await ethers.getContractFactory("ERC1155Token");
      const erc1155: ERC1155Token = <ERC1155Token>(
        await erc1155Factory
          .connect(signers[0])
          .deploy(addresses[network.config.chainId].exchange)
      );
      await erc1155.deployed();
      console.log("ERC1155 deployed to: ", erc1155.address);
    }
  });

task("deploy:ERC20")
  .addParam("symbol", "Contract symbol")
  .addParam("name", "Contract name")
  .addParam("supply", "Token supply")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();

    const erc20Factory: ERC20Token__factory = <ERC20Token__factory>await ethers.getContractFactory("ERC20Token");
    const erc20: ERC20Token = <ERC20Token>(
      await erc20Factory
        .connect(signers[0])
        .deploy(taskArguments.name, taskArguments.symbol, toWei(Number(taskArguments.supply).toString()))
    );
    await erc20.deployed();
    console.log("ERC20 deployed to: ", erc20.address);
  });
