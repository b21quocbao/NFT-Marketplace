/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  TestMintTokenERC20Transformer,
  TestMintTokenERC20TransformerInterface,
} from "../../../contracts/test/TestMintTokenERC20Transformer";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "context",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "taker",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "inputTokenBalance",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "ethBalance",
        type: "uint256",
      },
    ],
    name: "MintTransform",
    type: "event",
  },
  {
    inputs: [
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
    name: "transform",
    outputs: [
      {
        internalType: "bytes4",
        name: "success",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610ab4806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063832b24bb14610030575b600080fd5b61004a6004803603810190610045919061067a565b610060565b604051610057919061085b565b60405180910390f35b600061006a6104ac565b82806040019061007a9190610876565b81019061008791906106bb565b90507ff80919a60518fd23670a7f4bda005e75f5b9acf74a4130887693b500503a0b2330338560000160208101906100bf9190610628565b8660200160208101906100d29190610628565b8780604001906100e29190610876565b6100ef8860000151610460565b61018557876000015173ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b81526004016101309190610776565b60206040518083038186803b15801561014857600080fd5b505afa15801561015c573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061018091906106e4565b610187565b475b4760405161019c9897969594939291906107ba565b60405180910390a16101b18160000151610460565b1561020757600073ffffffffffffffffffffffffffffffffffffffff166108fc82604001519081150290604051600060405180830381858888f19350505050158015610201573d6000803e3d6000fd5b5061029f565b806000015173ffffffffffffffffffffffffffffffffffffffff1663a9059cbb600083604001516040518363ffffffff1660e01b815260040161024b929190610791565b602060405180830381600087803b15801561026557600080fd5b505af1158015610279573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061029d9190610651565b505b6102ac8160200151610460565b6104505780606001518160800151111561035257806020015173ffffffffffffffffffffffffffffffffffffffff16639dc29fac8460200160208101906102f39190610628565b83606001518460800151036040518363ffffffff1660e01b815260040161031b929190610791565b600060405180830381600087803b15801561033557600080fd5b505af1158015610349573d6000803e3d6000fd5b5050505061044f565b806020015173ffffffffffffffffffffffffffffffffffffffff166340c10f193083606001516040518363ffffffff1660e01b8152600401610395929190610832565b600060405180830381600087803b1580156103af57600080fd5b505af11580156103c3573d6000803e3d6000fd5b50505050806020015173ffffffffffffffffffffffffffffffffffffffff16639dc29fac8460200160208101906103fa9190610628565b83608001516040518363ffffffff1660e01b815260040161041c929190610791565b600060405180830381600087803b15801561043657600080fd5b505af115801561044a573d6000803e3d6000fd5b505050505b5b6313c9929e60e01b915050919050565b600073eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16149050919050565b6040518060a00160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff1681526020016000815260200160008152602001600081525090565b60008135905061051681610a0b565b92915050565b60008151905061052b81610a22565b92915050565b60008135905061054081610a39565b92915050565b60008135905061055581610a50565b92915050565b60006060828403121561056d57600080fd5b81905092915050565b600060a0828403121561058857600080fd5b61059260a06108cd565b905060006105a284828501610531565b60008301525060206105b684828501610546565b60208301525060406105ca848285016105fe565b60408301525060606105de848285016105fe565b60608301525060806105f2848285016105fe565b60808301525092915050565b60008135905061060d81610a67565b92915050565b60008151905061062281610a67565b92915050565b60006020828403121561063a57600080fd5b600061064884828501610507565b91505092915050565b60006020828403121561066357600080fd5b60006106718482850161051c565b91505092915050565b60006020828403121561068c57600080fd5b600082013567ffffffffffffffff8111156106a657600080fd5b6106b28482850161055b565b91505092915050565b600060a082840312156106cd57600080fd5b60006106db84828501610576565b91505092915050565b6000602082840312156106f657600080fd5b600061070484828501610613565b91505092915050565b610716816109b5565b82525050565b6107258161090b565b82525050565b6107348161093b565b82525050565b600061074683856108fa565b93506107538385846109eb565b61075c836109fa565b840190509392505050565b610770816109ab565b82525050565b600060208201905061078b600083018461071c565b92915050565b60006040820190506107a6600083018561070d565b6107b36020830184610767565b9392505050565b600060e0820190506107cf600083018b61071c565b6107dc602083018a61070d565b6107e9604083018961070d565b6107f6606083018861070d565b818103608083015261080981868861073a565b905061081860a0830185610767565b61082560c0830184610767565b9998505050505050505050565b6000604082019050610847600083018561071c565b6108546020830184610767565b9392505050565b6000602082019050610870600083018461072b565b92915050565b6000808335600160200384360303811261088f57600080fd5b80840192508235915067ffffffffffffffff8211156108ad57600080fd5b6020830192506001820236038313156108c557600080fd5b509250929050565b6000604051905081810181811067ffffffffffffffff821117156108f057600080fd5b8060405250919050565b600082825260208201905092915050565b60006109168261098b565b9050919050565b60006109288261098b565b9050919050565b60008115159050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b60006109728261090b565b9050919050565b60006109848261090b565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60006109c0826109c7565b9050919050565b60006109d2826109d9565b9050919050565b60006109e48261098b565b9050919050565b82818337600083830152505050565b6000601f19601f8301169050919050565b610a148161091d565b8114610a1f57600080fd5b50565b610a2b8161092f565b8114610a3657600080fd5b50565b610a4281610967565b8114610a4d57600080fd5b50565b610a5981610979565b8114610a6457600080fd5b50565b610a70816109ab565b8114610a7b57600080fd5b5056fea2646970667358221220a85add2aee9e848757a3df0051921a93f36d1fc27e89c8f467f112b6030849a464736f6c634300060c0033";

type TestMintTokenERC20TransformerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestMintTokenERC20TransformerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestMintTokenERC20Transformer__factory extends ContractFactory {
  constructor(...args: TestMintTokenERC20TransformerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TestMintTokenERC20Transformer> {
    return super.deploy(
      overrides || {}
    ) as Promise<TestMintTokenERC20Transformer>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): TestMintTokenERC20Transformer {
    return super.attach(address) as TestMintTokenERC20Transformer;
  }
  override connect(signer: Signer): TestMintTokenERC20Transformer__factory {
    return super.connect(signer) as TestMintTokenERC20Transformer__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestMintTokenERC20TransformerInterface {
    return new utils.Interface(_abi) as TestMintTokenERC20TransformerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestMintTokenERC20Transformer {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as TestMintTokenERC20Transformer;
  }
}
