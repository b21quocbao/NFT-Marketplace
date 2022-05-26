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
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";

export interface LiquidityProviderFeatureInterface extends utils.Interface {
  functions: {
    "FEATURE_NAME()": FunctionFragment;
    "FEATURE_VERSION()": FunctionFragment;
    "migrate()": FunctionFragment;
    "sandbox()": FunctionFragment;
    "sellToLiquidityProvider(address,address,address,address,uint256,uint256,bytes)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "FEATURE_NAME"
      | "FEATURE_VERSION"
      | "migrate"
      | "sandbox"
      | "sellToLiquidityProvider"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "FEATURE_NAME",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "FEATURE_VERSION",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "migrate", values?: undefined): string;
  encodeFunctionData(functionFragment: "sandbox", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "sellToLiquidityProvider",
    values: [
      string,
      string,
      string,
      string,
      BigNumberish,
      BigNumberish,
      BytesLike
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "FEATURE_NAME",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "FEATURE_VERSION",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "migrate", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "sandbox", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "sellToLiquidityProvider",
    data: BytesLike
  ): Result;

  events: {
    "LiquidityProviderSwap(address,address,uint256,uint256,address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "LiquidityProviderSwap"): EventFragment;
}

export interface LiquidityProviderSwapEventObject {
  inputToken: string;
  outputToken: string;
  inputTokenAmount: BigNumber;
  outputTokenAmount: BigNumber;
  provider: string;
  recipient: string;
}
export type LiquidityProviderSwapEvent = TypedEvent<
  [string, string, BigNumber, BigNumber, string, string],
  LiquidityProviderSwapEventObject
>;

export type LiquidityProviderSwapEventFilter =
  TypedEventFilter<LiquidityProviderSwapEvent>;

export interface LiquidityProviderFeature extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: LiquidityProviderFeatureInterface;

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
    FEATURE_NAME(overrides?: CallOverrides): Promise<[string]>;

    FEATURE_VERSION(overrides?: CallOverrides): Promise<[BigNumber]>;

    migrate(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    sandbox(overrides?: CallOverrides): Promise<[string]>;

    sellToLiquidityProvider(
      inputToken: string,
      outputToken: string,
      provider: string,
      recipient: string,
      sellAmount: BigNumberish,
      minBuyAmount: BigNumberish,
      auxiliaryData: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  FEATURE_NAME(overrides?: CallOverrides): Promise<string>;

  FEATURE_VERSION(overrides?: CallOverrides): Promise<BigNumber>;

  migrate(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  sandbox(overrides?: CallOverrides): Promise<string>;

  sellToLiquidityProvider(
    inputToken: string,
    outputToken: string,
    provider: string,
    recipient: string,
    sellAmount: BigNumberish,
    minBuyAmount: BigNumberish,
    auxiliaryData: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    FEATURE_NAME(overrides?: CallOverrides): Promise<string>;

    FEATURE_VERSION(overrides?: CallOverrides): Promise<BigNumber>;

    migrate(overrides?: CallOverrides): Promise<string>;

    sandbox(overrides?: CallOverrides): Promise<string>;

    sellToLiquidityProvider(
      inputToken: string,
      outputToken: string,
      provider: string,
      recipient: string,
      sellAmount: BigNumberish,
      minBuyAmount: BigNumberish,
      auxiliaryData: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {
    "LiquidityProviderSwap(address,address,uint256,uint256,address,address)"(
      inputToken?: null,
      outputToken?: null,
      inputTokenAmount?: null,
      outputTokenAmount?: null,
      provider?: null,
      recipient?: null
    ): LiquidityProviderSwapEventFilter;
    LiquidityProviderSwap(
      inputToken?: null,
      outputToken?: null,
      inputTokenAmount?: null,
      outputTokenAmount?: null,
      provider?: null,
      recipient?: null
    ): LiquidityProviderSwapEventFilter;
  };

  estimateGas: {
    FEATURE_NAME(overrides?: CallOverrides): Promise<BigNumber>;

    FEATURE_VERSION(overrides?: CallOverrides): Promise<BigNumber>;

    migrate(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    sandbox(overrides?: CallOverrides): Promise<BigNumber>;

    sellToLiquidityProvider(
      inputToken: string,
      outputToken: string,
      provider: string,
      recipient: string,
      sellAmount: BigNumberish,
      minBuyAmount: BigNumberish,
      auxiliaryData: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    FEATURE_NAME(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    FEATURE_VERSION(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    migrate(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    sandbox(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    sellToLiquidityProvider(
      inputToken: string,
      outputToken: string,
      provider: string,
      recipient: string,
      sellAmount: BigNumberish,
      minBuyAmount: BigNumberish,
      auxiliaryData: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}