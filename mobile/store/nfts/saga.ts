import { takeLatest, put, call } from "redux-saga/effects";
import {
  GET_NFTS,
  GET_MY_NFTS,
  GET_COLLECTION_NFTS,
  CREATE_NFT,
  SALE_NFT,
  BUY_NFT,
  BID_NFT,
  AUCTION_NFT,
  CONFIRM_NFT,
  CANCEL_NFT,
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
  auctionNftSuccess,
  auctionNft,
  auctionNftFail,
  cancelNftSuccess,
  cancelNftFail,
  cancelNft,
} from "./actions";
import { axiosInstance } from "../../helpers/axios";
import { addNft } from "./helper/ipfs";
import { getTotalSupply, mint } from "./helper/smartcontract/erc721";
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
        creator: payload.userAddress,
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

    const response = yield call(() =>
      axiosInstance.put("update-nft", {
        id: nft.id,
        status: "LIST",
        symbol: symbol,
        saleRoyaltyFee: saleRoyaltyFee,
        actionName: "List for sale",
        actionUserId: user.id,
        signedOrder,
      })
    );

    yield put(saleNftSuccess(`Nft #${nft.id} sold at ${Date.now()}`));
  } catch (error) {
    console.log(JSON.stringify(error), "Line #55 saga.ts");

    yield put(saleNftFail(error));
  }
}

function* onBuyNft({ payload }: ReturnType<typeof buyNft>) {
  try {
    const { nft, user, fillTx, etherProvider } = payload;
    const fillTxReceipt = yield call(() =>
      etherProvider.waitForTransaction(fillTx)
    );

    yield call(() =>
      axiosInstance.put("update-nft", {
        id: nft.id,
        status: "AVAILABLE",
        fillTxReceipt,
        actionName: "Buy",
        actionUserId: user.id,
        userId: user.id,
      })
    );

    yield put(buyNftSuccess(`Nft #${nft.id} bought at ${Date.now()}`));
  } catch (error) {
    console.log(JSON.stringify(error), "Line #55 saga.ts");

    yield put(buyNftFail(error));
  }
}

function* onBidNft({ payload }: ReturnType<typeof bidNft>) {
  try {
    const { nft, bidOrders, user } = payload;

    yield call(() =>
      axiosInstance.put("update-nft", {
        id: nft.id,
        bidOrders: bidOrders,
        actionName: "Bid",
        actionUserId: user.id,
      })
    );

    yield put(bidNftSuccess(`Nft #${nft.id} bidded at ${Date.now()}`));
  } catch (error) {
    console.log(JSON.stringify(error), "Line #55 saga.ts");

    yield put(bidNftFail(error));
  }
}

function* onConfirmNft({ payload }: ReturnType<typeof confirmNft>) {
  try {
    const { userId, nft, user, fillTx, etherProvider } = payload;

    const fillTxReceipt = yield call(() =>
      etherProvider.waitForTransaction(fillTx)
    );

    yield call(() =>
      axiosInstance.put("update-nft", {
        id: nft.id,
        status: "AVAILABLE",
        fillTxReceipt,
        userId: userId,
        actionName: "Confirm offer",
        actionUserId: user.id,
      })
    );

    yield put(confirmNftSuccess(`Nft #${nft.id} confirmed at ${Date.now()}`));
  } catch (error) {
    console.log(JSON.stringify(error), "Line #55 saga.ts");

    yield put(confirmNftFail(error));
  }
}

function* onAuctionNft({ payload }: ReturnType<typeof auctionNft>) {
  try {
    const {
      nft,
      user,
      symbol,
      erc20TokenAddress,
      bidRoyaltyFee,
      startingPrice,
      expiry,
    } = payload;

    yield call(() =>
      axiosInstance.put("update-nft", {
        id: nft.id,
        status: "AUCTION",
        symbol: symbol,
        erc20TokenAddress: erc20TokenAddress,
        bidRoyaltyFee: bidRoyaltyFee,
        startingPrice: toWei(startingPrice.toFixed(10).toString()),
        startAuctionTime: new Date(Date.now()),
        endAuctionTime: new Date(Date.now() + expiry * 1000),
        actionName: "List for auction",
        actionUserId: user.id,
      })
    );

    yield put(auctionNftSuccess(`Nft #${nft.id} auctioned at ${Date.now()}`));
  } catch (error) {
    console.log(JSON.stringify(error), "Line #55 saga.ts");

    yield put(auctionNftFail(error));
  }
}

function* onCancelNft({ payload }: ReturnType<typeof cancelNft>) {
  try {
    const { nft } = payload;

    yield call(() =>
      axiosInstance.put("update-nft", {
        id: nft.id,
        status: "AVAILABLE",
        signedOrder: null,
      })
    );

    yield put(cancelNftSuccess(`Nft #${nft.id} canceled at ${Date.now()}`));
  } catch (error) {
    console.log(JSON.stringify(error), "Line #55 saga.ts");

    yield put(cancelNftFail(error));
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
  yield takeLatest(AUCTION_NFT, onAuctionNft);
  yield takeLatest(CANCEL_NFT, onCancelNft);
}

export default NftSaga;
