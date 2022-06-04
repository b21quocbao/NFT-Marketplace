import { takeLatest, put, call } from "redux-saga/effects";
import {
  GET_NFTS,
  GET_MY_NFTS,
  GET_COLLECTION_NFTS,
  CREATE_NFT,
  SALE_NFT,
  BUY_NFT,
  BID_NFT,
  CONFIRM_NFT,
} from "./actionTypes";
import {
  getNftsSuccess,
  getNftsFail,
  getNfts,
  getMyNftsSuccess,
  getMyNftsFail,
  getCollectionNftsSuccess,
  getCollectionNftsFail,
  getCollectionNfts,
  createNft,
  createNftSuccess,
  createNftFail,
  confirmNft,
  confirmNftSuccess,
  confirmNftFail,
  buyNftFail,
  buyNftSuccess,
  buyNft,
  saleNft,
  saleNftSuccess,
  saleNftFail,
  bidNftSuccess,
  bidNft,
  bidNftFail,
} from "./actions";
import { axiosInstance } from "../../helpers/axios";
import { addNft } from "./helper/ipfs";
import {
  approveTokenOrNftByAsset,
  getTotalSupply,
  loadApprovalStatus,
  mint,
} from "./helper/smartcontract/erc721";
import { buildOrder, signOrder } from "./helper/smartcontract/zeroEx";
import Web3 from "web3";

const { toWei } = Web3.utils;

function* onGetNfts() {
  try {
    const response = yield call(() => axiosInstance.get("nfts", {}));

    yield put(getNftsSuccess(response.data));
  } catch (error) {
    console.log(JSON.stringify(error), "Line #55 saga.ts");

    yield put(getNftsFail(error));
  }
}

function* onGetMyNfts({ payload }: ReturnType<typeof getNfts>) {
  try {
    const response = yield call(() =>
      axiosInstance.get("nfts", { params: payload })
    );

    yield put(getMyNftsSuccess(response.data));
  } catch (error) {
    console.log(JSON.stringify(error), "Line #55 saga.ts");

    yield put(getMyNftsFail(error));
  }
}

function* onGetCollectionNfts({
  payload,
}: ReturnType<typeof getCollectionNfts>) {
  try {
    const response = yield call(() =>
      axiosInstance.get("nfts", { params: payload })
    );

    yield put(getCollectionNftsSuccess(response.data));
  } catch (error) {
    console.log(JSON.stringify(error), "Line #55 saga.ts");

    yield put(getCollectionNftsFail(error));
  }
}

function* onCreateNft({ payload }: ReturnType<typeof createNft>) {
  try {
    const { assetUrl, metadataUrl } = yield call(() =>
      addNft(payload.image.value, payload.name.value, payload.description.value)
    );
    const totalSupply = yield call(() => getTotalSupply(payload.contract));

    yield call(() =>
      mint(payload.connector, payload.contract, payload.userAddress, 1, [
        metadataUrl,
      ])
    );

    const response = yield call(() =>
      axiosInstance.post("new-nft", {
        imageUrls: [assetUrl],
        assetURIs: [assetUrl],
        metadataURIs: [metadataUrl],
        assets: [
          { name: payload.name.value, description: payload.description.value },
        ],
        collectionId: payload.collectionId.value,
        chainId: payload.chainId,
        status: "AVAILABLE",
        tokenId: totalSupply,
        userId: payload.userId,
      })
    );

    yield put(createNftSuccess(response.data));
  } catch (error) {
    console.log(JSON.stringify(error), "Line #55 saga.ts");

    yield put(createNftFail(error));
  }
}

function* onSaleNft({ payload }: ReturnType<typeof saleNft>) {
  try {
    const { nft, user, saleRoyaltyFee, signedOrder, symbol } = payload;

    yield call(() =>
      axiosInstance.post("/api/update-nft", {
        id: nft.id,
        status: "LIST",
        symbol: symbol,
        saleRoyaltyFee: saleRoyaltyFee,
        signedOrder,
      })
    );
    const response = yield call(() =>
      axiosInstance.post("/api/new-action", {
        userId: user.id,
        nftId: nft.id,
        name: "List for sale",
      })
    );

    yield put(saleNftSuccess(response.data));
  } catch (error) {
    console.log(JSON.stringify(error), "Line #55 saga.ts");

    yield put(saleNftFail(error));
  }
}

function* onBuyNft({ payload }: ReturnType<typeof buyNft>) {
  try {
    const { nft, user, fillTxReceipt } = payload;

    yield call(() =>
      axiosInstance.post("/api/update-nft", {
        id: nft.id,
        status: "AVAILABLE",
        fillTxReceipt,
        userId: user.id,
      })
    );
    yield call(() =>
      axiosInstance.post("/api/new-action", {
        userId: user.id,
        nftId: nft.id,
        name: "Buy",
      })
    );

    yield put(buyNftSuccess({}));
  } catch (error) {
    console.log(JSON.stringify(error), "Line #55 saga.ts");

    yield put(buyNftFail(error));
  }
}

function* onBidNft({ payload }: ReturnType<typeof bidNft>) {
  try {
    yield put(bidNftSuccess({}));
  } catch (error) {
    console.log(JSON.stringify(error), "Line #55 saga.ts");

    yield put(bidNftFail(error));
  }
}

function* onConfirmNft({ payload }: ReturnType<typeof confirmNft>) {
  try {
    yield put(confirmNftSuccess({}));
  } catch (error) {
    console.log(JSON.stringify(error), "Line #55 saga.ts");

    yield put(confirmNftFail(error));
  }
}

function* NftSaga() {
  yield takeLatest(GET_NFTS, onGetNfts);
  yield takeLatest(GET_MY_NFTS, onGetMyNfts);
  yield takeLatest(GET_COLLECTION_NFTS, onGetCollectionNfts);
  yield takeLatest(CREATE_NFT, onCreateNft);
  yield takeLatest(SALE_NFT, onSaleNft);
  yield takeLatest(BUY_NFT, onBuyNft);
  yield takeLatest(BID_NFT, onBidNft);
  yield takeLatest(CONFIRM_NFT, onConfirmNft);
}

export default NftSaga;
