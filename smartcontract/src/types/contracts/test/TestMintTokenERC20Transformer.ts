/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../../common";
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

export declare namespace IERC20Transformer {
  export type TransformContextStruct = {
    sender: string;
    recipient: string;
    data: BytesLike;
  };

  export type TransformContextStructOutput = [string, string, string] & {
    sender: string;
    recipient: string;
    data: string;
  };
}

export interface TestMintTokenERC20TransformerInterface
  extends utils.Interface {
  functions: {
    "transform((address,address,bytes))": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "transform"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "transform",
    values: [IERC20Transformer.TransformContextStruct]
  ): string;

  decodeFunctionResult(functionFragment: "transform", data: BytesLike): Result;

  events: {
    "MintTransform(address,address,address,address,bytes,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "MintTransform"): EventFragment;
}

export interface MintTransformEventObject {
  context: string;
  caller: string;
  sender: string;
  taker: string;
  data: string;
  inputTokenBalance: BigNumber;
  ethBalance: BigNumber;
}
export type MintTransformEvent = TypedEvent<
  [string, string, string, string, string, BigNumber, BigNumber],
  MintTransformEventObject
>;

export type MintTransformEventFilter = TypedEventFilter<MintTransformEvent>;

export interface TestMintTokenERC20Transformer extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TestMintTokenERC20TransformerInterface;

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
    transform(
      context: IERC20Transformer.TransformContextStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  transform(
    context: IERC20Transformer.TransformContextStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    transform(
      context: IERC20Transformer.TransformContextStruct,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {
    "MintTransform(address,address,address,address,bytes,uint256,uint256)"(
      context?: null,
      caller?: null,
      sender?: null,
      taker?: null,
      data?: null,
      inputTokenBalance?: null,
      ethBalance?: null
    ): MintTransformEventFilter;
    MintTransform(
      context?: null,
      caller?: null,
      sender?: null,
      taker?: null,
      data?: null,
      inputTokenBalance?: null,
      ethBalance?: null
    ): MintTransformEventFilter;
  };

  estimateGas: {
    transform(
      context: IERC20Transformer.TransformContextStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    transform(
      context: IERC20Transformer.TransformContextStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}