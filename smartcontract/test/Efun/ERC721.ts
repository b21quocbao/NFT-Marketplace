import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { artifacts, ethers, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";
import web3 from "web3";

import type { ERC721Token } from "../../src/types/contracts/ERC721Token";
import { Signers } from "../types";
import { shouldBehaveLikeEvent } from "./ERC721.behavior";

const { toWei } = web3.utils;

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.user1 = signers[1];
    this.signers.user2 = signers[2];
    this.signers.user3 = signers[3];
    this.signers.exchange = signers[4];
  });

  describe("Efun", function () {
    beforeEach(async function () {
      const erc721TokenArtifact: Artifact = await artifacts.readArtifact("ERC721Token");

      this.erc721Token = <ERC721Token>(
        await waffle.deployContract(this.signers.admin, erc721TokenArtifact, ["a", "b", this.signers.exchange.address])
      );
    });

    shouldBehaveLikeEvent();
  });
});
