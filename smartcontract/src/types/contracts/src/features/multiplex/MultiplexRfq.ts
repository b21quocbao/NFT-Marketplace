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

export interface MultiplexRfqInterface extends utils.Interface {
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
    "ExpiredRfqOrder(bytes32,address,uint64)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ExpiredRfqOrder"): EventFragment;
}

export interface ExpiredRfqOrderEventObject {
  orderHash: string;
  maker: string;
  expiry: BigNumber;
}
export type ExpiredRfqOrderEvent = TypedEvent<
  [string, string, BigNumber],
  ExpiredRfqOrderEventObject
>;

export type ExpiredRfqOrderEventFilter = TypedEventFilter<ExpiredRfqOrderEvent>;

export interface MultiplexRfq extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MultiplexRfqInterface;

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
    "ExpiredRfqOrder(bytes32,address,uint64)"(
      orderHash?: null,
      maker?: null,
      expiry?: null
    ): ExpiredRfqOrderEventFilter;
    ExpiredRfqOrder(
      orderHash?: null,
      maker?: null,
      expiry?: null
    ): ExpiredRfqOrderEventFilter;
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