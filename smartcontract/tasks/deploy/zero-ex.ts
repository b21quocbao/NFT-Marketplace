import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

import type { ERC721Token } from "../../src/types/contracts/ERC721Token";
import type { ERC20Token } from "../../src/types/contracts/Erc20Token.sol/ERC20Token";
import type { ZeroEx } from "../../src/types/contracts/src/ZeroEx";
import type { BootstrapFeature } from "../../src/types/contracts/src/features/BootstrapFeature";
import type { ERC721Token__factory } from "../../src/types/factories/contracts/ERC721Token__factory";
import type { ERC20Token__factory } from "../../src/types/factories/contracts/Erc20Token.sol/ERC20Token__factory";
import type { ZeroEx__factory } from "../../src/types/factories/contracts/src/ZeroEx__factory";
import type { BootstrapFeature__factory } from "../../src/types/factories/contracts/src/features/BootstrapFeature__factory";

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
  .addParam("name", "Token Name")
  .addParam("symbol", "Token symbol")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();

    const erc721Factory: ERC721Token__factory = <ERC721Token__factory>await ethers.getContractFactory("ERC721Token");
    const erc721: ERC721Token = <ERC721Token>(
      await erc721Factory.connect(signers[0]).deploy(taskArguments.name, taskArguments.symbol)
    );
    await erc721.deployed();
    console.log("ERC721 deployed to: ", erc721.address);
  });

task("deploy:ERC20")
  .addParam("name", "Token Name")
  .addParam("symbol", "Token symbol")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();

    const erc20Factory: ERC20Token__factory = <ERC20Token__factory>await ethers.getContractFactory("ERC20Token");
    const erc20: ERC20Token = <ERC20Token>(
      await erc20Factory
        .connect(signers[0])
        .deploy(taskArguments.name, taskArguments.symbol, "100000000000000000000000")
    );
    await erc20.deployed();
    console.log("ERC20 deployed to: ", erc20.address);
  });
