/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  TestFillQuoteTransformerHost,
  TestFillQuoteTransformerHostInterface,
} from "../../../contracts/test/TestFillQuoteTransformerHost";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IERC20Transformer",
        name: "transformer",
        type: "address",
      },
      {
        internalType: "contract TestMintableERC20Token",
        name: "inputToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "inputTokenAmount",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "executeTransform",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20Transformer",
        name: "transformer",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address payable",
            name: "sender",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct IERC20Transformer.TransformContext",
        name: "context",
        type: "tuple",
      },
    ],
    name: "rawExecuteTransform",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610abf806100206000396000f3fe60806040526004361061002d5760003560e01c8063844e7c5b14610039578063a22ad39e1461006257610034565b3661003457005b600080fd5b34801561004557600080fd5b50610060600480360381019061005b919061052c565b61007e565b005b61007c60048036038101906100779190610485565b610210565b005b600060608373ffffffffffffffffffffffffffffffffffffffff1663832b24bb60e01b846040516024016100b29190610803565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505060405161011c9190610773565b600060405180830381855af49150503d8060008114610157576040519150601f19603f3d011682016040523d82523d6000602084013e61015c565b606091505b5091509150816101705761016f81610386565b5b6313c9929e60e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916818060200190518101906101ab919061045c565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161461020a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610201906107e3565b60405180910390fd5b50505050565b60008514610286578573ffffffffffffffffffffffffffffffffffffffff166340c10f1930876040518363ffffffff1660e01b815260040161025392919061078a565b600060405180830381600087803b15801561026d57600080fd5b505af1158015610281573d6000803e3d6000fd5b505050505b3073ffffffffffffffffffffffffffffffffffffffff1663844e7c5b8860405180606001604052808873ffffffffffffffffffffffffffffffffffffffff1681526020018773ffffffffffffffffffffffffffffffffffffffff16815260200186868080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050508152506040518363ffffffff1660e01b815260040161034b9291906107b3565b600060405180830381600087803b15801561036557600080fd5b505af1158015610379573d6000803e3d6000fd5b5050505050505050505050565b805160208201fd5b60008135905061039d81610a16565b92915050565b6000815190506103b281610a2d565b92915050565b60008083601f8401126103ca57600080fd5b8235905067ffffffffffffffff8111156103e357600080fd5b6020830191508360018202830111156103fb57600080fd5b9250929050565b60008135905061041181610a44565b92915050565b60008135905061042681610a5b565b92915050565b60006060828403121561043e57600080fd5b81905092915050565b60008135905061045681610a72565b92915050565b60006020828403121561046e57600080fd5b600061047c848285016103a3565b91505092915050565b600080600080600080600060c0888a0312156104a057600080fd5b60006104ae8a828b01610402565b97505060206104bf8a828b01610417565b96505060406104d08a828b01610447565b95505060606104e18a828b0161038e565b94505060806104f28a828b0161038e565b93505060a088013567ffffffffffffffff81111561050f57600080fd5b61051b8a828b016103b8565b925092505092959891949750929550565b6000806040838503121561053f57600080fd5b600061054d85828601610402565b925050602083013567ffffffffffffffff81111561056a57600080fd5b6105768582860161042c565b9150509250929050565b61058981610969565b82525050565b610598816108dd565b82525050565b60006105aa8385610830565b93506105b78385846109c3565b6105c083610a05565b840190509392505050565b60006105d682610825565b6105e08185610830565b93506105f08185602086016109d2565b6105f981610a05565b840191505092915050565b600061060f82610825565b6106198185610841565b93506106298185602086016109d2565b80840191505092915050565b61063e8161097b565b82525050565b6000610651602e8361084c565b91507f546573745472616e73666f726d6572486f73742f494e56414c49445f5452414e60008301527f53464f524d45525f524553554c540000000000000000000000000000000000006020830152604082019050919050565b6000606083016106bd600084018461085d565b6106ca600086018261058f565b506106d8602084018461085d565b6106e5602086018261058f565b506106f36040840184610874565b858303604087015261070683828461059e565b925050508091505092915050565b600060608301600083015161072c600086018261058f565b50602083015161073f602086018261058f565b506040830151848203604086015261075782826105cb565b9150508091505092915050565b61076d8161095f565b82525050565b600061077f8284610604565b915081905092915050565b600060408201905061079f6000830185610580565b6107ac6020830184610764565b9392505050565b60006040820190506107c86000830185610635565b81810360208301526107da8184610714565b90509392505050565b600060208201905081810360008301526107fc81610644565b9050919050565b6000602082019050818103600083015261081d81846106aa565b905092915050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b600082825260208201905092915050565b600061086c602084018461038e565b905092915050565b6000808335600160200384360303811261088d57600080fd5b83810192508235915060208301925067ffffffffffffffff8211156108b157600080fd5b6001820236038413156108c357600080fd5b509250929050565b60006108d68261093f565b9050919050565b60006108e88261093f565b9050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b6000610926826108cb565b9050919050565b6000610938826108cb565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60006109748261099f565b9050919050565b60006109868261098d565b9050919050565b60006109988261093f565b9050919050565b60006109aa826109b1565b9050919050565b60006109bc8261093f565b9050919050565b82818337600083830152505050565b60005b838110156109f05780820151818401526020810190506109d5565b838111156109ff576000848401525b50505050565b6000601f19601f8301169050919050565b610a1f816108dd565b8114610a2a57600080fd5b50565b610a36816108ef565b8114610a4157600080fd5b50565b610a4d8161091b565b8114610a5857600080fd5b50565b610a648161092d565b8114610a6f57600080fd5b50565b610a7b8161095f565b8114610a8657600080fd5b5056fea26469706673582212200d95528d7af9a64b242c84a1b8d192b47234cfc81e0be5aac1d5e03960cb9cef64736f6c634300060c0033";

type TestFillQuoteTransformerHostConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestFillQuoteTransformerHostConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestFillQuoteTransformerHost__factory extends ContractFactory {
  constructor(...args: TestFillQuoteTransformerHostConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TestFillQuoteTransformerHost> {
    return super.deploy(
      overrides || {}
    ) as Promise<TestFillQuoteTransformerHost>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): TestFillQuoteTransformerHost {
    return super.attach(address) as TestFillQuoteTransformerHost;
  }
  override connect(signer: Signer): TestFillQuoteTransformerHost__factory {
    return super.connect(signer) as TestFillQuoteTransformerHost__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestFillQuoteTransformerHostInterface {
    return new utils.Interface(_abi) as TestFillQuoteTransformerHostInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestFillQuoteTransformerHost {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as TestFillQuoteTransformerHost;
  }
}