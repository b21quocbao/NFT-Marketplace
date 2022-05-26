/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  AuthorizableV06,
  AuthorizableV06Interface,
} from "../../../../../contracts-utils/contracts/src/v06/AuthorizableV06";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "AuthorizedAddressAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "AuthorizedAddressRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "addAuthorizedAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "authorities",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "authorized",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAuthorizedAddresses",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "removeAuthorizedAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "removeAuthorizedAddressAtIndex",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610ef2806100606000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80639ad267441161005b5780639ad26744146101a1578063b9181611146101ef578063d39de6e914610249578063f2fde38b146102a857610088565b806342f1181e1461008d578063494503d4146100d157806370712939146101295780638da5cb5b1461016d575b600080fd5b6100cf600480360360208110156100a357600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506102ec565b005b6100fd600480360360208110156100e757600080fd5b8101908080359060200190929190505050610300565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61016b6004803603602081101561013f57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061033c565b005b610175610442565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101ed600480360360408110156101b757600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610466565b005b6102316004803603602081101561020557600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061047c565b60405180821515815260200191505060405180910390f35b61025161049c565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b83811015610294578082015181840152602081019050610279565b505050509050019250505060405180910390f35b6102ea600480360360208110156102be57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061052a565b005b6102f461061a565b6102fd816106a2565b50565b6002818154811061030d57fe5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61034461061a565b600160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166103a7576103a66103a182610863565b6108f8565b5b60005b60028054905081101561043e578173ffffffffffffffffffffffffffffffffffffffff16600282815481106103db57fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156104315761042c8282610900565b61043e565b80806001019150506103aa565b5050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61046e61061a565b6104788282610900565b5050565b60016020528060005260406000206000915054906101000a900460ff1681565b6060600280548060200260200160405190810160405280929190818152602001828054801561052057602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190600101908083116104d6575b5050505050905090565b61053261061a565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561057c57610577610572610bbd565b6108f8565b610617565b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35b50565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146106a05761069f61069a3360008054906101000a900473ffffffffffffffffffffffffffffffffffffffff16610bfa565b6108f8565b5b565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156106e8576106e76106e2610cae565b6108f8565b5b600160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161561074c5761074b61074682610ceb565b6108f8565b5b60018060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506002819080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f3147867c59d17e8fa9d522465651d44aae0a9e38f902f3475b97e58072f0ed4c60405160405180910390a350565b606063eb5108a260e01b82604051602401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050509050919050565b805160208201fd5b600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166109635761096261095d83610863565b6108f8565b5b60028054905081106109875761098661098182600280549050610d80565b6108f8565b5b8173ffffffffffffffffffffffffffffffffffffffff16600282815481106109ab57fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610a3b57610a3a610a3560028381548110610a0457fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1684610e08565b6108f8565b5b600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81549060ff0219169055600260016002805490500381548110610a9f57fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1660028281548110610ad757fe5b9060005260206000200160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506002805480610b2a57fe5b6001900381819060005260206000200160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905590553373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f1f32c1b084e2de0713b8fb16bd46bb9df710a3dbeae2f3ca93af46e016dcc6b060405160405180910390a35050565b60606040518060400160405280600481526020017fe69edc3e00000000000000000000000000000000000000000000000000000000815250905090565b6060631de45ad160e01b8383604051602401808373ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff16815260200192505050604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050905092915050565b60606040518060400160405280600481526020017f57654fe400000000000000000000000000000000000000000000000000000000815250905090565b606063de16f1a060e01b82604051602401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050509050919050565b606063e9f8377160e01b83836040516024018083815260200182815260200192505050604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050905092915050565b606063140a84db60e01b8383604051602401808373ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff16815260200192505050604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505090509291505056fea26469706673582212205d5f687193e4d815c0841547e27d6f727d4892c7e14b0a5f22f9ab6d87ce524764736f6c634300060c0033";

type AuthorizableV06ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AuthorizableV06ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class AuthorizableV06__factory extends ContractFactory {
  constructor(...args: AuthorizableV06ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<AuthorizableV06> {
    return super.deploy(overrides || {}) as Promise<AuthorizableV06>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): AuthorizableV06 {
    return super.attach(address) as AuthorizableV06;
  }
  override connect(signer: Signer): AuthorizableV06__factory {
    return super.connect(signer) as AuthorizableV06__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AuthorizableV06Interface {
    return new utils.Interface(_abi) as AuthorizableV06Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AuthorizableV06 {
    return new Contract(address, _abi, signerOrProvider) as AuthorizableV06;
  }
}