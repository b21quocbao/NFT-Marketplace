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

export interface SimpleFunctionRegistryFeatureInterface
  extends utils.Interface {
  functions: {
    "FEATURE_NAME()": FunctionFragment;
    "FEATURE_VERSION()": FunctionFragment;
    "_extendSelf(bytes4,address)": FunctionFragment;
    "bootstrap()": FunctionFragment;
    "extend(bytes4,address)": FunctionFragment;
    "getRollbackEntryAtIndex(bytes4,uint256)": FunctionFragment;
    "getRollbackLength(bytes4)": FunctionFragment;
    "rollback(bytes4,address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "FEATURE_NAME"
      | "FEATURE_VERSION"
      | "_extendSelf"
      | "bootstrap"
      | "extend"
      | "getRollbackEntryAtIndex"
      | "getRollbackLength"
      | "rollback"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "FEATURE_NAME",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "FEATURE_VERSION",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_extendSelf",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(functionFragment: "bootstrap", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "extend",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getRollbackEntryAtIndex",
    values: [BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getRollbackLength",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "rollback",
    values: [BytesLike, string]
  ): string;

  decodeFunctionResult(
    functionFragment: "FEATURE_NAME",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "FEATURE_VERSION",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_extendSelf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "bootstrap", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "extend", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getRollbackEntryAtIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRollbackLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "rollback", data: BytesLike): Result;

  events: {
    "ProxyFunctionUpdated(bytes4,address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ProxyFunctionUpdated"): EventFragment;
}

export interface ProxyFunctionUpdatedEventObject {
  selector: string;
  oldImpl: string;
  newImpl: string;
}
export type ProxyFunctionUpdatedEvent = TypedEvent<
  [string, string, string],
  ProxyFunctionUpdatedEventObject
>;

export type ProxyFunctionUpdatedEventFilter =
  TypedEventFilter<ProxyFunctionUpdatedEvent>;

export interface SimpleFunctionRegistryFeature extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: SimpleFunctionRegistryFeatureInterface;

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

    _extendSelf(
      selector: BytesLike,
      impl: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    bootstrap(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    extend(
      selector: BytesLike,
      impl: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getRollbackEntryAtIndex(
      selector: BytesLike,
      idx: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string] & { impl: string }>;

    getRollbackLength(
      selector: BytesLike,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { rollbackLength: BigNumber }>;

    rollback(
      selector: BytesLike,
      targetImpl: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  FEATURE_NAME(overrides?: CallOverrides): Promise<string>;

  FEATURE_VERSION(overrides?: CallOverrides): Promise<BigNumber>;

  _extendSelf(
    selector: BytesLike,
    impl: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  bootstrap(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  extend(
    selector: BytesLike,
    impl: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getRollbackEntryAtIndex(
    selector: BytesLike,
    idx: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  getRollbackLength(
    selector: BytesLike,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  rollback(
    selector: BytesLike,
    targetImpl: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    FEATURE_NAME(overrides?: CallOverrides): Promise<string>;

    FEATURE_VERSION(overrides?: CallOverrides): Promise<BigNumber>;

    _extendSelf(
      selector: BytesLike,
      impl: string,
      overrides?: CallOverrides
    ): Promise<void>;

    bootstrap(overrides?: CallOverrides): Promise<string>;

    extend(
      selector: BytesLike,
      impl: string,
      overrides?: CallOverrides
    ): Promise<void>;

    getRollbackEntryAtIndex(
      selector: BytesLike,
      idx: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    getRollbackLength(
      selector: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    rollback(
      selector: BytesLike,
      targetImpl: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "ProxyFunctionUpdated(bytes4,address,address)"(
      selector?: BytesLike | null,
      oldImpl?: null,
      newImpl?: null
    ): ProxyFunctionUpdatedEventFilter;
    ProxyFunctionUpdated(
      selector?: BytesLike | null,
      oldImpl?: null,
      newImpl?: null
    ): ProxyFunctionUpdatedEventFilter;
  };

  estimateGas: {
    FEATURE_NAME(overrides?: CallOverrides): Promise<BigNumber>;

    FEATURE_VERSION(overrides?: CallOverrides): Promise<BigNumber>;

    _extendSelf(
      selector: BytesLike,
      impl: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    bootstrap(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    extend(
      selector: BytesLike,
      impl: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getRollbackEntryAtIndex(
      selector: BytesLike,
      idx: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRollbackLength(
      selector: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    rollback(
      selector: BytesLike,
      targetImpl: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    FEATURE_NAME(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    FEATURE_VERSION(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    _extendSelf(
      selector: BytesLike,
      impl: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    bootstrap(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    extend(
      selector: BytesLike,
      impl: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getRollbackEntryAtIndex(
      selector: BytesLike,
      idx: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRollbackLength(
      selector: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    rollback(
      selector: BytesLike,
      targetImpl: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
