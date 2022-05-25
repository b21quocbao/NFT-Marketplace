/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  TestSimpleFunctionRegistryFeatureImpl2,
  TestSimpleFunctionRegistryFeatureImpl2Interface,
} from "../../../contracts/test/TestSimpleFunctionRegistryFeatureImpl2";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

const _abi = [
  {
    inputs: [],
    name: "testFn",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x60a060405234801561001057600080fd5b503073ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1660601b8152505060805160601c60b761005e6000395060b76000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c806381a1923314602d575b600080fd5b60336047565b604051603e9190605e565b60405180910390f35b600061053a905090565b6058816077565b82525050565b6000602082019050607160008301846051565b92915050565b600081905091905056fea26469706673582212205f75e41133e438da6bc0e02b8a85fb0b540a6c051fc0cc80a9442fd901c9901764736f6c634300060c0033";

type TestSimpleFunctionRegistryFeatureImpl2ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestSimpleFunctionRegistryFeatureImpl2ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestSimpleFunctionRegistryFeatureImpl2__factory extends ContractFactory {
  constructor(
    ...args: TestSimpleFunctionRegistryFeatureImpl2ConstructorParams
  ) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TestSimpleFunctionRegistryFeatureImpl2> {
    return super.deploy(
      overrides || {}
    ) as Promise<TestSimpleFunctionRegistryFeatureImpl2>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): TestSimpleFunctionRegistryFeatureImpl2 {
    return super.attach(address) as TestSimpleFunctionRegistryFeatureImpl2;
  }
  override connect(
    signer: Signer
  ): TestSimpleFunctionRegistryFeatureImpl2__factory {
    return super.connect(
      signer
    ) as TestSimpleFunctionRegistryFeatureImpl2__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestSimpleFunctionRegistryFeatureImpl2Interface {
    return new utils.Interface(
      _abi
    ) as TestSimpleFunctionRegistryFeatureImpl2Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestSimpleFunctionRegistryFeatureImpl2 {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as TestSimpleFunctionRegistryFeatureImpl2;
  }
}
