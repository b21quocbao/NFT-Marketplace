/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../../../../../../common";
import type { FunctionFragment, Result } from "@ethersproject/abi";
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

export declare namespace IBalancerV2BatchSwapVault {
  export type BatchSwapStepStruct = {
    poolId: BytesLike;
    assetInIndex: BigNumberish;
    assetOutIndex: BigNumberish;
    amount: BigNumberish;
    userData: BytesLike;
  };

  export type BatchSwapStepStructOutput = [
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    string
  ] & {
    poolId: string;
    assetInIndex: BigNumber;
    assetOutIndex: BigNumber;
    amount: BigNumber;
    userData: string;
  };

  export type FundManagementStruct = {
    sender: string;
    fromInternalBalance: boolean;
    recipient: string;
    toInternalBalance: boolean;
  };

  export type FundManagementStructOutput = [
    string,
    boolean,
    string,
    boolean
  ] & {
    sender: string;
    fromInternalBalance: boolean;
    recipient: string;
    toInternalBalance: boolean;
  };
}

export interface IBalancerV2BatchSwapVaultInterface extends utils.Interface {
  functions: {
    "batchSwap(uint8,(bytes32,uint256,uint256,uint256,bytes)[],address[],(address,bool,address,bool),int256[],uint256)": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "batchSwap"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "batchSwap",
    values: [
      BigNumberish,
      IBalancerV2BatchSwapVault.BatchSwapStepStruct[],
      string[],
      IBalancerV2BatchSwapVault.FundManagementStruct,
      BigNumberish[],
      BigNumberish
    ]
  ): string;

  decodeFunctionResult(functionFragment: "batchSwap", data: BytesLike): Result;

  events: {};
}

export interface IBalancerV2BatchSwapVault extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IBalancerV2BatchSwapVaultInterface;

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
    batchSwap(
      kind: BigNumberish,
      swaps: IBalancerV2BatchSwapVault.BatchSwapStepStruct[],
      assets: string[],
      funds: IBalancerV2BatchSwapVault.FundManagementStruct,
      limits: BigNumberish[],
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  batchSwap(
    kind: BigNumberish,
    swaps: IBalancerV2BatchSwapVault.BatchSwapStepStruct[],
    assets: string[],
    funds: IBalancerV2BatchSwapVault.FundManagementStruct,
    limits: BigNumberish[],
    deadline: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    batchSwap(
      kind: BigNumberish,
      swaps: IBalancerV2BatchSwapVault.BatchSwapStepStruct[],
      assets: string[],
      funds: IBalancerV2BatchSwapVault.FundManagementStruct,
      limits: BigNumberish[],
      deadline: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;
  };

  filters: {};

  estimateGas: {
    batchSwap(
      kind: BigNumberish,
      swaps: IBalancerV2BatchSwapVault.BatchSwapStepStruct[],
      assets: string[],
      funds: IBalancerV2BatchSwapVault.FundManagementStruct,
      limits: BigNumberish[],
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    batchSwap(
      kind: BigNumberish,
      swaps: IBalancerV2BatchSwapVault.BatchSwapStepStruct[],
      assets: string[],
      funds: IBalancerV2BatchSwapVault.FundManagementStruct,
      limits: BigNumberish[],
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
