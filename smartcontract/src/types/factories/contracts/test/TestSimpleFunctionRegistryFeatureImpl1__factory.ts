/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  TestSimpleFunctionRegistryFeatureImpl1,
  TestSimpleFunctionRegistryFeatureImpl1Interface,
} from "../../../contracts/test/TestSimpleFunctionRegistryFeatureImpl1";
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
  "0x60a060405234801561001057600080fd5b503073ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1660601b8152505060805160601c60b761005e6000395060b76000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c806381a1923314602d575b600080fd5b60336047565b604051603e9190605e565b60405180910390f35b6000610539905090565b6058816077565b82525050565b6000602082019050607160008301846051565b92915050565b600081905091905056fea2646970667358221220a20318208fd44a54c8a65954b8df57825d3eab972b20a1abd9e4599508b346fa64736f6c634300060c0033";

type TestSimpleFunctionRegistryFeatureImpl1ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestSimpleFunctionRegistryFeatureImpl1ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestSimpleFunctionRegistryFeatureImpl1__factory extends ContractFactory {
  constructor(
    ...args: TestSimpleFunctionRegistryFeatureImpl1ConstructorParams
  ) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TestSimpleFunctionRegistryFeatureImpl1> {
    return super.deploy(
      overrides || {}
    ) as Promise<TestSimpleFunctionRegistryFeatureImpl1>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): TestSimpleFunctionRegistryFeatureImpl1 {
    return super.attach(address) as TestSimpleFunctionRegistryFeatureImpl1;
  }
  override connect(
    signer: Signer
  ): TestSimpleFunctionRegistryFeatureImpl1__factory {
    return super.connect(
      signer
    ) as TestSimpleFunctionRegistryFeatureImpl1__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestSimpleFunctionRegistryFeatureImpl1Interface {
    return new utils.Interface(
      _abi
    ) as TestSimpleFunctionRegistryFeatureImpl1Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestSimpleFunctionRegistryFeatureImpl1 {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as TestSimpleFunctionRegistryFeatureImpl1;
  }
}