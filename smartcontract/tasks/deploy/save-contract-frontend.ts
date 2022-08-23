import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";
import { promises as fs } from 'fs';
const path = require('path');

task("save:contract:FE").setAction(async function (taskArguments: TaskArguments, { ethers, artifacts }) {
  const { abi: erc721ABI } = await artifacts.readArtifact("ERC721Token");
  const { abi: erc1155ABI } = await artifacts.readArtifact("ERC1155Token");
  const { abi: erc20ABI } = await artifacts.readArtifact("ERC20Token");
  const { abi: zeroExABI } = await artifacts.readArtifact("IZeroEx");
  
  const contractsDir = path.join(__dirname, "/../../../frontend/contracts/abi");

  await fs.writeFile(contractsDir + `/erc721ABI.json`, JSON.stringify(erc721ABI));
  await fs.writeFile(contractsDir + `/erc1155ABI.json`, JSON.stringify(erc1155ABI));
  await fs.writeFile(contractsDir + `/erc20ABI.json`, JSON.stringify(erc20ABI));
  await fs.writeFile(contractsDir + `/zeroExABI.json`, JSON.stringify(zeroExABI));
});
