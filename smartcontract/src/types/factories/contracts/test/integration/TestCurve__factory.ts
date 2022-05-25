/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  TestCurve,
  TestCurveInterface,
} from "../../../../contracts/test/integration/TestCurve";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  PayableOverrides,
  BigNumberish,
} from "ethers";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IERC20TokenV06",
        name: "sellToken_",
        type: "address",
      },
      {
        internalType: "contract TestMintableERC20Token",
        name: "buyToken_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "buyAmount_",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes4",
        name: "selector",
        type: "bytes4",
      },
      {
        indexed: false,
        internalType: "int128",
        name: "fromCoinIdx",
        type: "int128",
      },
      {
        indexed: false,
        internalType: "int128",
        name: "toCoinIdx",
        type: "int128",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "sellAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "minBuyAmount",
        type: "uint256",
      },
    ],
    name: "CurveCalled",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "BASE_SWAP_SELECTOR",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "BUY_TOKEN_COIN_IDX",
    outputs: [
      {
        internalType: "int128",
        name: "",
        type: "int128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ETH_COIN_IDX",
    outputs: [
      {
        internalType: "int128",
        name: "",
        type: "int128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "RETURN_BOUGHT_AMOUNT_SELECTOR_FLAG",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SELL_TOKEN_COIN_IDX",
    outputs: [
      {
        internalType: "int128",
        name: "",
        type: "int128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "buyAmount",
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
    name: "buyToken",
    outputs: [
      {
        internalType: "contract TestMintableERC20Token",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "sellToken",
    outputs: [
      {
        internalType: "contract IERC20TokenV06",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x608060405260405162000c5a38038062000c5a833981810160405281019062000029919062000100565b82600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550806000819055505050506200020a565b600081519050620000cc81620001bc565b92915050565b600081519050620000e381620001d6565b92915050565b600081519050620000fa81620001f0565b92915050565b6000806000606084860312156200011657600080fd5b60006200012686828701620000bb565b93505060206200013986828701620000d2565b92505060406200014c86828701620000e9565b9150509250925092565b6000620001638262000192565b9050919050565b6000620001778262000156565b9050919050565b60006200018b8262000156565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b620001c7816200016a565b8114620001d357600080fd5b50565b620001e1816200017e565b8114620001ed57600080fd5b50565b620001fb81620001b2565b81146200020757600080fd5b50565b610a40806200021a6000396000f3fe60806040526004361061007f5760003560e01c8063a48217191161004e578063a482171914610452578063bbb702ae1461047d578063c3f1bb85146104a8578063fcb3db13146104d357610086565b80631fa70531146103a65780633eebbc51146103d157806387a2bbf2146103fc5780639769f0b01461042757610086565b3661008657005b6000803681019061009791906105ef565b905060008060e01b600160e01b83167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614159050600063ffff000060e01b83169050631234000060e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161461015e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610155906107e1565b60405180910390fd5b60008060008060003660049080926101789392919061088e565b8101906101859190610618565b93509350935093506000600f0b84600f0b141561024f57600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330856040518463ffffffff1660e01b81526004016101fb93929190610715565b602060405180830381600087803b15801561021557600080fd5b505af1158015610229573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061024d91906105c6565b505b6001600f0b83600f0b14156102f457600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166340c10f19336000546040518363ffffffff1660e01b81526004016102bd92919061074c565b600060405180830381600087803b1580156102d757600080fd5b505af11580156102eb573d6000803e3d6000fd5b5050505061034e565b6002600f0b83600f0b141561034d573373ffffffffffffffffffffffffffffffffffffffff166108fc6000549081150290604051600060405180830381858888f1935050505015801561034b573d6000803e3d6000fd5b505b5b7fc4eb16056644b46322b49cec42ed1d0c9c49ede515361f6b3b9f09aeff9b50053488868686866040516103879695949392919061081c565b60405180910390a185156103a15760005460005260206000f35b600080f35b3480156103b257600080fd5b506103bb6104fe565b6040516103c89190610801565b60405180910390f35b3480156103dd57600080fd5b506103e6610504565b6040516103f39190610775565b60405180910390f35b34801561040857600080fd5b5061041161050f565b60405161041e9190610775565b60405180910390f35b34801561043357600080fd5b5061043c610517565b6040516104499190610790565b60405180910390f35b34801561045e57600080fd5b5061046761053d565b60405161047491906107ab565b60405180910390f35b34801561048957600080fd5b50610492610563565b60405161049f91906107c6565b60405180910390f35b3480156104b457600080fd5b506104bd610568565b6040516104ca91906107c6565b60405180910390f35b3480156104df57600080fd5b506104e861056d565b6040516104f591906107c6565b60405180910390f35b60005481565b631234000060e01b81565b600160e01b81565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600181565b600081565b600281565b600081519050610581816109ae565b92915050565b600081359050610596816109c5565b92915050565b6000813590506105ab816109dc565b92915050565b6000813590506105c0816109f3565b92915050565b6000602082840312156105d857600080fd5b60006105e684828501610572565b91505092915050565b60006020828403121561060157600080fd5b600061060f84828501610587565b91505092915050565b6000806000806080858703121561062e57600080fd5b600061063c8782880161059c565b945050602061064d8782880161059c565b935050604061065e878288016105b1565b925050606061066f878288016105b1565b91505092959194509250565b61068481610930565b82525050565b610693816108cd565b82525050565b6106a281610942565b82525050565b6106b181610966565b82525050565b6106c0816108f9565b82525050565b60006106d360108361087d565b91507f5465737443757276652f524556455254000000000000000000000000000000006000830152602082019050919050565b61070f81610926565b82525050565b600060608201905061072a600083018661067b565b610737602083018561067b565b6107446040830184610706565b949350505050565b6000604082019050610761600083018561067b565b61076e6020830184610706565b9392505050565b600060208201905061078a600083018461068a565b92915050565b60006020820190506107a56000830184610699565b92915050565b60006020820190506107c060008301846106a8565b92915050565b60006020820190506107db60008301846106b7565b92915050565b600060208201905081810360008301526107fa816106c6565b9050919050565b60006020820190506108166000830184610706565b92915050565b600060c0820190506108316000830189610706565b61083e602083018861068a565b61084b60408301876106b7565b61085860608301866106b7565b6108656080830185610706565b61087260a0830184610706565b979650505050505050565b600082825260208201905092915050565b6000808585111561089e57600080fd5b838611156108ab57600080fd5b6001850283019150848603905094509492505050565b60008115159050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600081600f0b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600061093b8261098a565b9050919050565b600061094d82610954565b9050919050565b600061095f82610906565b9050919050565b600061097182610978565b9050919050565b600061098382610906565b9050919050565b60006109958261099c565b9050919050565b60006109a782610906565b9050919050565b6109b7816108c1565b81146109c257600080fd5b50565b6109ce816108cd565b81146109d957600080fd5b50565b6109e5816108f9565b81146109f057600080fd5b50565b6109fc81610926565b8114610a0757600080fd5b5056fea2646970667358221220fcd2f935bc24f3e6ee7a67abd4e6c1f2a7e9f9e11179ea24a4b1fa586200561b64736f6c634300060c0033";

type TestCurveConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestCurveConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestCurve__factory extends ContractFactory {
  constructor(...args: TestCurveConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    sellToken_: string,
    buyToken_: string,
    buyAmount_: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<TestCurve> {
    return super.deploy(
      sellToken_,
      buyToken_,
      buyAmount_,
      overrides || {}
    ) as Promise<TestCurve>;
  }
  override getDeployTransaction(
    sellToken_: string,
    buyToken_: string,
    buyAmount_: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      sellToken_,
      buyToken_,
      buyAmount_,
      overrides || {}
    );
  }
  override attach(address: string): TestCurve {
    return super.attach(address) as TestCurve;
  }
  override connect(signer: Signer): TestCurve__factory {
    return super.connect(signer) as TestCurve__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestCurveInterface {
    return new utils.Interface(_abi) as TestCurveInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestCurve {
    return new Contract(address, _abi, signerOrProvider) as TestCurve;
  }
}
