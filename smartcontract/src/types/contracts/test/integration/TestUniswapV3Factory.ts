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
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";

export interface TestUniswapV3FactoryInterface extends utils.Interface {
  functions: {
    "POOL_INIT_CODE_HASH()": FunctionFragment;
    "createPool(address,address,uint24)": FunctionFragment;
    "creationParameters()": FunctionFragment;
    "getPool(address,address,uint24)": FunctionFragment;
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
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "creationParameters",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPool",
    values: [string, string, BigNumberish]
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

export interface TestUniswapV3Factory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TestUniswapV3FactoryInterface;

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
      fee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    creationParameters(
      overrides?: CallOverrides
    ): Promise<
      [string, string, number] & { token0: string; token1: string; fee: number }
    >;

    getPool(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;
  };

  POOL_INIT_CODE_HASH(overrides?: CallOverrides): Promise<string>;

  createPool(
    tokenA: string,
    tokenB: string,
    fee: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  creationParameters(
    overrides?: CallOverrides
  ): Promise<
    [string, string, number] & { token0: string; token1: string; fee: number }
  >;

  getPool(
    arg0: string,
    arg1: string,
    arg2: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    POOL_INIT_CODE_HASH(overrides?: CallOverrides): Promise<string>;

    createPool(
      tokenA: string,
      tokenB: string,
      fee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    creationParameters(
      overrides?: CallOverrides
    ): Promise<
      [string, string, number] & { token0: string; token1: string; fee: number }
    >;

    getPool(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
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
      fee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    creationParameters(overrides?: CallOverrides): Promise<BigNumber>;

    getPool(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
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
      fee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    creationParameters(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPool(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}