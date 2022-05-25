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

export interface TestMigratorInterface extends utils.Interface {
  functions: {
    "failingMigrate()": FunctionFragment;
    "revertingMigrate()": FunctionFragment;
    "succeedingMigrate()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "failingMigrate"
      | "revertingMigrate"
      | "succeedingMigrate"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "failingMigrate",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "revertingMigrate",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "succeedingMigrate",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "failingMigrate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "revertingMigrate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "succeedingMigrate",
    data: BytesLike
  ): Result;

  events: {
    "TestMigrateCalled(bytes,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "TestMigrateCalled"): EventFragment;
}

export interface TestMigrateCalledEventObject {
  callData: string;
  owner: string;
}
export type TestMigrateCalledEvent = TypedEvent<
  [string, string],
  TestMigrateCalledEventObject
>;

export type TestMigrateCalledEventFilter =
  TypedEventFilter<TestMigrateCalledEvent>;

export interface TestMigrator extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TestMigratorInterface;

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
    failingMigrate(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    revertingMigrate(overrides?: CallOverrides): Promise<[void]>;

    succeedingMigrate(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  failingMigrate(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  revertingMigrate(overrides?: CallOverrides): Promise<void>;

  succeedingMigrate(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    failingMigrate(overrides?: CallOverrides): Promise<string>;

    revertingMigrate(overrides?: CallOverrides): Promise<void>;

    succeedingMigrate(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "TestMigrateCalled(bytes,address)"(
      callData?: null,
      owner?: null
    ): TestMigrateCalledEventFilter;
    TestMigrateCalled(
      callData?: null,
      owner?: null
    ): TestMigrateCalledEventFilter;
  };

  estimateGas: {
    failingMigrate(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    revertingMigrate(overrides?: CallOverrides): Promise<BigNumber>;

    succeedingMigrate(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    failingMigrate(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    revertingMigrate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    succeedingMigrate(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
