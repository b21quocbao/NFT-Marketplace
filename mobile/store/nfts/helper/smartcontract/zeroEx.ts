import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import invariant from "tiny-invariant";
import { v4 } from "uuid";
import padStart from "lodash/padStart";
import padEnd from "lodash/padEnd";
import { hexDataLength, hexDataSlice } from "@ethersproject/bytes";
import { zeroContractAddresses } from "../../../../contracts/zeroExContracts";
import BigNumber2 from "bignumber.js";
import { NATIVE_TOKEN, TradeDirection } from "../../../../constants/zeroEx";

export const INFINITE_EXPIRATION_TIMESTAMP_SEC = BigNumber.from(2524604400);
export const DEFAULT_APP_ID = "314159";
export const ONE_TWENTY_EIGHT_BIT_LENGTH = 39;
export const RESERVED_APP_ID_PREFIX = "1001";
export const TWO_FIFTY_SIX_BIT_LENGTH = 78;
export const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";
export const RESERVED_APP_ID_PREFIX_DIGITS = RESERVED_APP_ID_PREFIX.length;
export const ERC721ORDER_STRUCT_NAME = "ERC721Order";
export const ZERO_AMOUNT = BigNumber.from(0);

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
  const value = new BigNumber2(hex, 16);
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

export async function buildOrder(
  nft: {
    tokenAddress: string;
    tokenId: string;
  },
  erc20: {
    tokenAddress: string;
    amount: string;
  },
  orderData: {
    direction: number;
    maker: string;
    expiry?: number;
    tokenProperties?: any[];
    fees?: any[];
    nonce?: string;
    appId?: string;
    taker?: string;
  }
) {
  let expiry = INFINITE_EXPIRATION_TIMESTAMP_SEC.toString();
  if (orderData.expiry) {
    expiry = orderData.expiry.toString();
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

export async function signOrder(connector: any, signer: any, order: any) {
  const domain = {
    chainId: connector.chainId,
    verifyingContract: zeroContractAddresses[connector.chainId],
    name: "ZeroEx",
    version: "1.0.0",
  };

  const types = {
    [ERC721ORDER_STRUCT_NAME]: ERC721ORDER_STRUCT_ABI,
    Fee: FEE_ABI,
    Property: PROPERTY_ABI,
  };

  const rawSignature = await signer._signTypedData(domain, types, order);

  const ecSignature = parseRawSignature(rawSignature);

  const signedOrder = {
    ...order,
    signature: {
      signatureType: 2,
      r: ecSignature.r,
      s: ecSignature.s,
      v: ecSignature.v,
    },
  };
  return signedOrder;
}

export function getTotalFees(order: any): BigNumber {
  const fees = order.fees;
  let feesTotal = ZERO_AMOUNT;
  fees.forEach((fee: any) => {
    feesTotal = feesTotal.add(BigNumber.from(fee.amount));
  });
  return feesTotal;
}

function getErc20TotalIncludingFees(order: any): BigNumber {
  const fees = order.fees;
  // In 0x v4, fees are additive (not included in the original erc20 amount)
  let feesTotal = getTotalFees(order);
  const orderTotalCost = BigNumber.from(order.erc20TokenAmount).add(feesTotal);
  return orderTotalCost;
}

export async function fillSignedOrder(
  connector: any,
  contract: any,
  user: any,
  signedOrder: any
) {
  const canOrderTypeBeFilledWithNativeToken =
    signedOrder.direction === TradeDirection.SellNFT;
  const isNativeToken = signedOrder.erc20Token === NATIVE_TOKEN;
  const needsEthAttached = isNativeToken && canOrderTypeBeFilledWithNativeToken;
  const erc20TotalAmount = getErc20TotalIncludingFees(signedOrder);

  if (signedOrder.direction === 0) {
    const encodeAbi = await contract.methods
      .buyERC721(signedOrder, signedOrder.signature, "0x")
      .encodeABI();

    return connector.sendTransaction({
      from: user.address,
      to: contract.options.address,
      data: encodeAbi,
      value: needsEthAttached ? erc20TotalAmount : undefined,
    });
  } else {
    const encodeAbi = await contract.methods
      .sellERC721(
        signedOrder,
        signedOrder.signature,
        signedOrder.erc721TokenId,
        false,
        "0x"
      )
      .encodeABI();
    return connector.sendTransaction({
      from: user.address,
      to: contract.options.address,
      data: encodeAbi,
    });
  }
}
