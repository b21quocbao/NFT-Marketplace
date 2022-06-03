import { call } from "redux-saga/effects";
import web3 from "web3";

const { toWei } = web3.utils;

export function* getTotalSupply(contract: any) {
  const totalSupply = yield call(() => contract.methods.totalSupply().call());

  return Number(totalSupply) + 1;
}

export function* mint(
  connector: any,
  contract: any,
  walletAddress: string,
  numNft: number,
  metadataUris: string[]
) {
  const encodeAbi = yield call(() =>
    contract.methods.mint(walletAddress, numNft, metadataUris).encodeABI()
  );

  return yield call(() =>
    connector.sendTransaction({
      from: walletAddress,
      to: contract.options.address,
      data: encodeAbi,
    })
  );
}
