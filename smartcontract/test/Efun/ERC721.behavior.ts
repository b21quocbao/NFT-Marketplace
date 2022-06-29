import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import { v4 as uuidv4 } from "uuid";
import { parse as uuidParse } from "uuid";
import web3 from "web3";

import { duration, increase } from "../utils/time";

function buf2hex(buffer: any) {
  // buffer is an ArrayBuffer
  return [...new Uint8Array(buffer)].map(x => x.toString(16).padStart(2, "0")).join("");
}

const { toWei, fromWei } = web3.utils;

export function shouldBehaveLikeEvent(): void {
  it("test", async function () {
    const tokenId = buf2hex(uuidParse(uuidv4())).substring(0, 24);
    const tokenId2 = buf2hex(uuidParse(uuidv4())).substring(0, 24);
    console.log(await this.erc721Token.ownerOf(this.signers.user1.address + tokenId), "owner of");
    console.log(this.signers.user1.address, "real owner of");
    console.log(await this.erc721Token.ownerOf(this.signers.user2.address + tokenId), "owner of");
    console.log(this.signers.user2.address, "real owner of");
    console.log(
      await this.erc721Token.isApprovedForAll(this.signers.user1.address, this.signers.exchange.address),
      "approve for all",
    );
    // console.log(
    //   await this.erc721Token
    //     .connect(this.signers.exchange)
    //     .transferFrom(this.signers.user1.address, this.signers.user2.address, this.signers.user1.address + tokenId),
    // );
    // console.log(
    //   await this.erc721Token
    //     .connect(this.signers.exchange)
    //     .transferFrom(this.signers.user2.address, this.signers.user3.address, this.signers.user1.address + tokenId),
    // );
    // console.log(
    //   await this.erc721Token
    //     .connect(this.signers.exchange)
    //     .transferFrom(this.signers.user2.address, this.signers.user3.address, this.signers.user1.address + tokenId2),
    // );
  });
}
