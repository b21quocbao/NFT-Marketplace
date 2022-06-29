import { task } from "hardhat/config";
import web3 from "web3";

import { GroupPredict__factory } from "../../src/types";
import { Event__factory } from "../../src/types/factories/contracts/Event__factory";
import { Prediction__factory } from "../../src/types/factories/contracts/Prediction__factory";

const { toWei, fromWei } = web3.utils;

task("test:ERC721").setAction(async function (_taskArgs, hre) {
  const { ethers } = hre;
  const [deployer] = await ethers.getSigners();

  const prediction = await Prediction__factory.connect("0x522608829526221417EDC35194A9060De79428C4", deployer);

  const { timestamp } = await ethers.provider.getBlock("latest");

  const tx = await prediction.createSingleEvent(
    timestamp + 60,
    timestamp + 7 * 24 * 3600,
    timestamp + 10 * 24 * 3600,
    "0x3c1f84dEEF00F0EE6DDEcDe585A4e2dA7C234208",
    [10000, 10000],
    "",
    ["0x0000000000000000000000000000000000000000"],
    [toWei("0.0001")],
    {
      value: toWei("0.0001"),
    },
  );
  console.log("\x1b[36m%s\x1b[0m", "tx", tx);
});

