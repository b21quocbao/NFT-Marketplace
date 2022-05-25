import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import getUnixTime from "date-fns/getUnixTime";
import invariant from "tiny-invariant";
import { v4 } from "uuid";
import padStart from "lodash/padStart";
import padEnd from "lodash/padEnd";
import { hexDataLength, hexDataSlice } from '@ethersproject/bytes';

export const INFINITE_EXPIRATION_TIMESTAMP_SEC = BigNumber.from(2524604400);
export const DEFAULT_APP_ID = "314159";
export const ONE_TWENTY_EIGHT_BIT_LENGTH = 39;
export const RESERVED_APP_ID_PREFIX = "1001";
export const TWO_FIFTY_SIX_BIT_LENGTH = 78;
export const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";
const RESERVED_APP_ID_PREFIX_DIGITS = RESERVED_APP_ID_PREFIX.length;
export const ERC721ORDER_STRUCT_NAME = "ERC721Order";

export const ERC721ORDER_STRUCT_ABI = [
  { type: "uint8", name: "direction" },
  { type: "address", name: "maker" },
  { type: "address", name: "taker" },
  { type: "uint256", name: "expiry" },
  { type: "uint256", name: "nonce" },
  { type: "address", name: "erc20Token" },
  { type: "uint256", name: "erc20TokenAmount" },
  { type: "Fee[]", name: "fees" },
  { type: "address", name: "erc721Token" },
  { type: "uint256", name: "erc721TokenId" },
  { type: "Property[]", name: "erc721TokenProperties" },
];

export const FEE_ABI = [
  { type: "address", name: "recipient" },
  { type: "uint256", name: "amount" },
  { type: "bytes", name: "feeData" },
];

export const PROPERTY_ABI = [
  { type: "address", name: "propertyValidator" },
  { type: "bytes", name: "propertyData" },
];

const checkIfStringContainsOnlyNumbers = (val: string) => {
  const onlyNumbers = /^\d+$/.test(val);
  return onlyNumbers;
};

// uuids are 128bits
export const generateRandom128BitNumber = (base = 10): string => {
  const hex = "0x" + v4().replace(/-/g, "");
  const value = BigInt(hex);
  const valueBase10String = value.toString(base); // don't convert this to a number, will lose precision
  return valueBase10String;
};

export const generateRandomV4OrderNonce = (
  appId: string = DEFAULT_APP_ID
): string => {
  if (appId) {
    verifyAppIdOrThrow(appId);
  }
  const order128 = padStart(
    generateRandom128BitNumber(),
    ONE_TWENTY_EIGHT_BIT_LENGTH,
    "0"
  );
  const appId128 = padEnd(
    `${RESERVED_APP_ID_PREFIX}${appId}`,
    ONE_TWENTY_EIGHT_BIT_LENGTH,
    "0"
  );
  const final256BitNonce = `${appId128}${order128}`;
  invariant(
    final256BitNonce.length <= TWO_FIFTY_SIX_BIT_LENGTH,
    "Invalid nonce size"
  );
  return final256BitNonce;
};

export const verifyAppIdOrThrow = (appId: string) => {
  const isCorrectLength =
    appId.length <= ONE_TWENTY_EIGHT_BIT_LENGTH - RESERVED_APP_ID_PREFIX_DIGITS;
  const hasOnlyNumbers = checkIfStringContainsOnlyNumbers(appId);
  invariant(isCorrectLength, "appId must be 39 digits or less");
  invariant(
    hasOnlyNumbers,
    "appId must be numeric only (no alpha or special characters, only numbers)"
  );
};

export async function buildOrder(nft: any, erc20: any, orderData: any) {
  let expiry = INFINITE_EXPIRATION_TIMESTAMP_SEC.toString();
  if (orderData.expiry) {
    // If number is provided, assume given as unix timestamp
    if (typeof orderData.expiry === "number") {
      expiry = orderData.expiry.toString();
    } else {
      // If date is provided, convert to unix timestamp
      expiry = getUnixTime(orderData.expiry).toString();
    }
  }
  
  const erc721Order = {
    erc721Token: nft.tokenAddress.toLowerCase(),
    erc721TokenId: nft.tokenId,
    direction: parseInt(orderData.direction.toString()),
    erc20Token: erc20.tokenAddress.toLowerCase(),
    erc20TokenAmount: erc20.amount,
    maker: orderData.maker.toLowerCase(),
    // Defaults not required...
    erc721TokenProperties:
      orderData.tokenProperties?.map((property: any) => ({
        propertyData: property.propertyData,
        propertyValidator: property.propertyValidator,
      })) ?? [],
    fees:
      orderData.fees?.map((x: any) => {
        return {
          amount: x.amount.toString(),
          recipient: x.recipient.toLowerCase(),
          feeData: x.feeData?.toString() ?? "0x",
        };
      }) ?? [],
    expiry: expiry,
    nonce:
      orderData.nonce?.toString() ??
      generateRandomV4OrderNonce(orderData.appId),
    taker: orderData.taker?.toLowerCase() ?? NULL_ADDRESS,
  };

  return erc721Order;
}

export function parseRawSignature(rawSignature: string) {
  const hexSize = hexDataLength(rawSignature);
  // if (hexUtils.size(rpcSig) !== 65) {
  //     throw new Error(`Invalid RPC signature length: "${rpcSig}"`);
  // }
  if (hexSize !== 65) {
    throw new Error(
      `Invalid signature length, expected 65, got ${hexSize}.\n"Raw signature: ${rawSignature}"`
    );
  }
  // Some providers encode V as 0,1 instead of 27,28.
  const VALID_V_VALUES = [0, 1, 27, 28];
  // Some providers return the signature packed as V,R,S and others R,S,V.
  // Try to guess which encoding it is (with a slight preference for R,S,V).
  // let v = parseInt(rpcSig.slice(-2), 16);
  let v = parseInt(rawSignature.slice(-2), 16);

  if (VALID_V_VALUES.includes(v)) {
    // Format is R,S,V
    v = v >= 27 ? v : v + 27;
    return {
      // r: hexDataSlice.slice(rpcSig, 0, 32),
      // s: hexUtils.slice(rpcSig, 32, 64),
      r: hexDataSlice(rawSignature, 0, 32),
      s: hexDataSlice(rawSignature, 32, 64),
      v,
    };
  }
  // Format should be V,R,S
  // v = parseInt(rpcSig.slice(2, 4), 16);
  v = parseInt(rawSignature.slice(2, 4), 16);
  if (!VALID_V_VALUES.includes(v)) {
    throw new Error(
      `Cannot determine RPC signature layout from V value: "${rawSignature}"`
    );
  }
  v = v >= 27 ? v : v + 27;
  return {
    v,
    r: hexDataSlice(rawSignature, 1, 33),
    s: hexDataSlice(rawSignature, 33, 65),
  };
}

export async function signOrder(
  order: any,
  signer: any,
  chainId: number,
  exchangeContractAddress: string
) {
  const domain = {
    chainId: chainId,
    verifyingContract: exchangeContractAddress,
    name: "ZeroEx",
    version: "1.0.0",
  };
  const types = {
    [ERC721ORDER_STRUCT_NAME]: ERC721ORDER_STRUCT_ABI,
    Fee: FEE_ABI,
    Property: PROPERTY_ABI,
  };
  const value = order;

  console.log(order, 'Line #196 zeroEx.ts');


  const rawSignatureFromEoaWallet = await signer._signTypedData(
    domain,
    types,
    {
      // direction: 0,
      // erc20Token: "0x0000000000000000000000000000000000000000",
      // erc20TokenAmount: "1000000000000000000",
      // erc721Token: "0x15ce48b9e4e2a0e9eb17311879909c1d41926394",
      // erc721TokenId: "0",
      erc721TokenProperties: [],
      // expiry: "129837",
      fees: [],
      // maker: "0x46a5a09ebd4e6bc10cc56e7fbf7b305e8906ec4c",
      // nonce: "100131415900000000000000000000000000000263601019207452867914241571467422685369",
      // taker: "0x0000000000000000000000000000000000000000",
    }
  );

  
  // const ecSignature = parseRawSignature(rawSignatureFromEoaWallet);

  // const signedOrder = {
  //   ...order,
  //   signature: {
  //     signatureType: 2,
  //     r: ecSignature.r,
  //     s: ecSignature.s,
  //     v: ecSignature.v,
  //   },
  // };
  // return signedOrder;
}
