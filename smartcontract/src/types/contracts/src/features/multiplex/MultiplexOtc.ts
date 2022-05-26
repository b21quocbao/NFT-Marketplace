/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../../../../common";
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
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";

export interface MultiplexOtcInterface extends utils.Interface {
  functions: {
    "EIP712_DOMAIN_SEPARATOR()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "EIP712_DOMAIN_SEPARATOR"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "EIP712_DOMAIN_SEPARATOR",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "EIP712_DOMAIN_SEPARATOR",
    data: BytesLike
  ): Result;

  events: {
    "ExpiredOtcOrder(bytes32,address,uint64)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ExpiredOtcOrder"): EventFragment;
}

export interface ExpiredOtcOrderEventObject {
  orderHash: string;
  maker: string;
  expiry: BigNumber;
}
export type ExpiredOtcOrderEvent = TypedEvent<
  [string, string, BigNumber],
  ExpiredOtcOrderEventObject
>;

export type ExpiredOtcOrderEventFilter = TypedEventFilter<ExpiredOtcOrderEvent>;

export interface MultiplexOtc extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MultiplexOtcInterface;

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
    EIP712_DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<[string]>;
  };

  EIP712_DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    EIP712_DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "ExpiredOtcOrder(bytes32,address,uint64)"(
      orderHash?: null,
      maker?: null,
      expiry?: null
    ): ExpiredOtcOrderEventFilter;
    ExpiredOtcOrder(
      orderHash?: null,
      maker?: null,
      expiry?: null
    ): ExpiredOtcOrderEventFilter;
  };

  estimateGas: {
    EIP712_DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    EIP712_DOMAIN_SEPARATOR(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}