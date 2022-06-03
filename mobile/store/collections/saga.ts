import { takeLatest, put, call } from "redux-saga/effects";
import {
  ADD_COLLECTION,
  GET_COLLECTIONS,
  GET_MY_COLLECTIONS,
  GET_SUPPORT_COLLECTIONS,
} from "./actionTypes";
import {
  getCollectionsSuccess,
  getCollectionsFail,
  getMyCollectionsSuccess,
  getMyCollectionsFail,
  addCollection,
  addCollectionSuccess,
  getSupportCollectionsSuccess,
  getSupportCollectionsFail,
  getSupportCollections,
  getMyCollections,
} from "./actions";
import { axiosInstance, ipfsAxiosInstance } from "../../helpers/axios";
import {
  NEXT_PUBLIC_INFURA_PROJECT_ID,
  NEXT_PUBLIC_INFURA_PROJECT_SECRET,
} from "@env";

function* addImage(data: any) {
  const formData = new FormData();

  formData.append("file", {
    uri: data.uri,
    type: data.type,
    name: data.fileName,
  } as any);

  return yield call(() =>
    ipfsAxiosInstance.post("add?pin=true", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      auth: {
        username: NEXT_PUBLIC_INFURA_PROJECT_ID,
        password: NEXT_PUBLIC_INFURA_PROJECT_SECRET,
      },
    })
  );
}

function* onGetCollections() {
  try {
    const response = yield call(() => axiosInstance.get("collections", {}));

    yield put(getCollectionsSuccess(response.data));
  } catch (error) {
    console.log(JSON.stringify(error), "Line #55 saga.ts");

    yield put(getCollectionsFail(error));
  }
}

function* onGetMyCollections({ payload }: ReturnType<typeof getMyCollections>) {
  try {
    const response = yield call(() =>
      axiosInstance.get("collections", { params: payload })
    );

    yield put(getMyCollectionsSuccess(response.data));
  } catch (error) {
    console.log(JSON.stringify(error), "Line #55 saga.ts");

    yield put(getMyCollectionsFail(error));
  }
}

function* onGetSupportCollections({
  payload,
}: ReturnType<typeof getSupportCollections>) {
  try {
    const response = yield call(() =>
      axiosInstance.get("collections", { params: payload })
    );

    yield put(getSupportCollectionsSuccess(response.data));
  } catch (error) {
    console.log(JSON.stringify(error), "Line #55 saga.ts");

    yield put(getSupportCollectionsFail(error));
  }
}

function* onAddCollection({ payload }: ReturnType<typeof addCollection>) {
  try {
    const ipfsResponse = yield call(addImage, payload.image.value);

    const response = yield call(() =>
      axiosInstance.post("new-collection", {
        imageUrl: `https://ipfs.infura.io/ipfs/${ipfsResponse.data.Hash}`,
        name: payload.name.value,
        description: payload.description.value,
        chainId: payload.chainId.value,
        userId: payload.userId,
      })
    );

    yield put(addCollectionSuccess(response.data));
  } catch (error) {
    console.log(JSON.stringify(error), "Line #55 saga.ts");

    yield put(getMyCollectionsFail(error));
  }
}

function* CollectionSaga() {
  yield takeLatest(GET_COLLECTIONS, onGetCollections);
  yield takeLatest(GET_MY_COLLECTIONS, onGetMyCollections);
  yield takeLatest(GET_SUPPORT_COLLECTIONS, onGetSupportCollections);
  yield takeLatest(ADD_COLLECTION, onAddCollection);
}

export default CollectionSaga;
