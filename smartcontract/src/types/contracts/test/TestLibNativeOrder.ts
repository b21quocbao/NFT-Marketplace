/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../../common";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";

export declare namespace LibNativeOrder {
  export type LimitOrderStruct = {
    makerToken: string;
    takerToken: string;
    makerAmount: BigNumberish;
    takerAmount: BigNumberish;
    takerTokenFeeAmount: BigNumberish;
    maker: string;
    taker: string;
    sender: string;
    feeRecipient: string;
    pool: BytesLike;
    expiry: BigNumberish;
    salt: BigNumberish;
  };

  export type LimitOrderStructOutput = [
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    string,
    string,
    string,
    string,
    string,
    BigNumber,
    BigNumber
  ] & {
    makerToken: string;
    takerToken: string;
    makerAmount: BigNumber;
    takerAmount: BigNumber;
    takerTokenFeeAmount: BigNumber;
    maker: string;
    taker: string;
    sender: string;
    feeRecipient: string;
    pool: string;
    expiry: BigNumber;
    salt: BigNumber;
  };

  export type RfqOrderStruct = {
    makerToken: string;
    takerToken: string;
    makerAmount: BigNumberish;
    takerAmount: BigNumberish;
    maker: string;
    taker: string;
    txOrigin: string;
    pool: BytesLike;
    expiry: BigNumberish;
    salt: BigNumberish;
  };

  export type RfqOrderStructOutput = [
    string,
    string,
    BigNumber,
    BigNumber,
    string,
    string,
    string,
    string,
    BigNumber,
    BigNumber
  ] & {
    makerToken: string;
    takerToken: string;
    makerAmount: BigNumber;
    takerAmount: BigNumber;
    maker: string;
    taker: string;
    txOrigin: string;
    pool: string;
    expiry: BigNumber;
    salt: BigNumber;
  };
}

export interface TestLibNativeOrderInterface extends utils.Interface {
  functions: {
    "getLimitOrderStructHash((address,address,uint128,uint128,uint128,address,address,address,address,bytes32,uint64,uint256))": FunctionFragment;
    "getRfqOrderStructHash((address,address,uint128,uint128,address,address,address,bytes32,uint64,uint256))": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "getLimitOrderStructHash" | "getRfqOrderStructHash"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getLimitOrderStructHash",
    values: [LibNativeOrder.LimitOrderStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "getRfqOrderStructHash",
    values: [LibNativeOrder.RfqOrderStruct]
  ): string;

  decodeFunctionResult(
    functionFragment: "getLimitOrderStructHash",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRfqOrderStructHash",
    data: BytesLike
  ): Result;

  events: {};
}

export interface TestLibNativeOrder extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TestLibNativeOrderInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    getLimitOrderStructHash(
      order: LibNativeOrder.LimitOrderStruct,
      overrides?: CallOverrides
    ): Promise<[string] & { structHash: string }>;

    getRfqOrderStructHash(
      order: LibNativeOrder.RfqOrderStruct,
      overrides?: CallOverrides
    ): Promise<[string] & { structHash: string }>;
  };

  getLimitOrderStructHash(
    order: LibNativeOrder.LimitOrderStruct,
    overrides?: CallOverrides
  ): Promise<string>;

  getRfqOrderStructHash(
    order: LibNativeOrder.RfqOrderStruct,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    getLimitOrderStructHash(
      order: LibNativeOrder.LimitOrderStruct,
      overrides?: CallOverrides
    ): Promise<string>;

    getRfqOrderStructHash(
      order: LibNativeOrder.RfqOrderStruct,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {};

  estimateGas: {
    getLimitOrderStructHash(
      order: LibNativeOrder.LimitOrderStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRfqOrderStructHash(
      order: LibNativeOrder.RfqOrderStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getLimitOrderStructHash(
      order: LibNativeOrder.LimitOrderStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRfqOrderStructHash(
      order: LibNativeOrder.RfqOrderStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
