/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  TestPermissionlessTransformerDeployerTransformer,
  TestPermissionlessTransformerDeployerTransformerInterface,
} from "../../../contracts/test/TestPermissionlessTransformerDeployerTransformer";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  PayableOverrides,
} from "ethers";

const _abi = [
  {
    inputs: [],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "CONSTRUCTOR_FAIL_VALUE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "deployer",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60a06040523373ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1660601b81525050610d05341415610080576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610077906100eb565b60405180910390fd5b61011c565b600061009260338361010b565b91507f546573745472616e73666f726d65724465706c6f7965725472616e73666f726d60008301527f65722f434f4e5354525543544f525f4641494c000000000000000000000000006020830152604082019050919050565b6000602082019050818103600083015261010481610085565b9050919050565b600082825260208201905092915050565b60805160601c61016761013860003980607f52506101676000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80637c9bc5e21461003b578063d5f3948814610059575b600080fd5b610043610077565b60405161005091906100da565b60405180910390f35b61006161007d565b60405161006e91906100bf565b60405180910390f35b610d0581565b7f000000000000000000000000000000000000000000000000000000000000000081565b6100aa816100f5565b82525050565b6100b981610127565b82525050565b60006020820190506100d460008301846100a1565b92915050565b60006020820190506100ef60008301846100b0565b92915050565b600061010082610107565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600081905091905056fea2646970667358221220c6ab82b3577fc71b95e3fe3a57f91337ee9d6ebcabc9b2ab2ec3ad9e3138671b64736f6c634300060c0033";

type TestPermissionlessTransformerDeployerTransformerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestPermissionlessTransformerDeployerTransformerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestPermissionlessTransformerDeployerTransformer__factory extends ContractFactory {
  constructor(
    ...args: TestPermissionlessTransformerDeployerTransformerConstructorParams
  ) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<TestPermissionlessTransformerDeployerTransformer> {
    return super.deploy(
      overrides || {}
    ) as Promise<TestPermissionlessTransformerDeployerTransformer>;
  }
  override getDeployTransaction(
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(
    address: string
  ): TestPermissionlessTransformerDeployerTransformer {
    return super.attach(
      address
    ) as TestPermissionlessTransformerDeployerTransformer;
  }
  override connect(
    signer: Signer
  ): TestPermissionlessTransformerDeployerTransformer__factory {
    return super.connect(
      signer
    ) as TestPermissionlessTransformerDeployerTransformer__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestPermissionlessTransformerDeployerTransformerInterface {
    return new utils.Interface(
      _abi
    ) as TestPermissionlessTransformerDeployerTransformerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestPermissionlessTransformerDeployerTransformer {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as TestPermissionlessTransformerDeployerTransformer;
  }
}
