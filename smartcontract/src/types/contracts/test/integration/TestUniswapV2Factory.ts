/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../../../common";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";

export interface TestUniswapV2FactoryInterface extends utils.Interface {
  functions: {
    "POOL_INIT_CODE_HASH()": FunctionFragment;
    "createPool(address,address)": FunctionFragment;
    "creationParameters()": FunctionFragment;
    "getPool(address,address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "POOL_INIT_CODE_HASH"
      | "createPool"
      | "creationParameters"
      | "getPool"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "POOL_INIT_CODE_HASH",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "createPool",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "creationParameters",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPool",
    values: [string, string]
  ): string;

  decodeFunctionResult(
    functionFragment: "POOL_INIT_CODE_HASH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "createPool", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "creationParameters",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getPool", data: BytesLike): Result;

  events: {
    "PoolCreated(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "PoolCreated"): EventFragment;
}

export interface PoolCreatedEventObject {
  pool: string;
}
export type PoolCreatedEvent = TypedEvent<[string], PoolCreatedEventObject>;

export type PoolCreatedEventFilter = TypedEventFilter<PoolCreatedEvent>;

export interface TestUniswapV2Factory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TestUniswapV2FactoryInterface;

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
    POOL_INIT_CODE_HASH(overrides?: CallOverrides): Promise<[string]>;

    createPool(
      tokenA: string,
      tokenB: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    creationParameters(
      overrides?: CallOverrides
    ): Promise<[string, string] & { token0: string; token1: string }>;

    getPool(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<[string]>;
  };

  POOL_INIT_CODE_HASH(overrides?: CallOverrides): Promise<string>;

  createPool(
    tokenA: string,
    tokenB: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  creationParameters(
    overrides?: CallOverrides
  ): Promise<[string, string] & { token0: string; token1: string }>;

  getPool(
    arg0: string,
    arg1: string,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    POOL_INIT_CODE_HASH(overrides?: CallOverrides): Promise<string>;

    createPool(
      tokenA: string,
      tokenB: string,
      overrides?: CallOverrides
    ): Promise<string>;

    creationParameters(
      overrides?: CallOverrides
    ): Promise<[string, string] & { token0: string; token1: string }>;

    getPool(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {
    "PoolCreated(address)"(pool?: null): PoolCreatedEventFilter;
    PoolCreated(pool?: null): PoolCreatedEventFilter;
  };

  estimateGas: {
    POOL_INIT_CODE_HASH(overrides?: CallOverrides): Promise<BigNumber>;

    createPool(
      tokenA: string,
      tokenB: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    creationParameters(overrides?: CallOverrides): Promise<BigNumber>;

    getPool(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    POOL_INIT_CODE_HASH(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    createPool(
      tokenA: string,
      tokenB: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    creationParameters(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPool(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
