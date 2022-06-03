import { call } from "redux-saga/effects";

export function* getTotalSupply(contract: any) {
  const totalSupply = yield call(() => contract.methods.totalSupply().call());

  return Number(totalSupply) + 1;
}
