/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  PancakeSwapFeature,
  PancakeSwapFeatureInterface,
} from "../../../../contracts/src/features/PancakeSwapFeature";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IEtherTokenV06",
        name: "wbnb",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "FEATURE_NAME",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "FEATURE_VERSION",
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
    name: "migrate",
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
  {
    inputs: [
      {
        internalType: "contract IERC20TokenV06[]",
        name: "tokens",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "sellAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minBuyAmount",
        type: "uint256",
      },
      {
        internalType: "enum IPancakeSwapFeature.ProtocolFork",
        name: "fork",
        type: "uint8",
      },
    ],
    name: "sellToPancakeSwap",
    outputs: [
      {
        internalType: "uint256",
        name: "buyAmount",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
];

const _bytecode =
  "0x60e06040526200001a600160006002620000c860201b60201c565b60a0908152503480156200002d57600080fd5b506040516200101738038062001017833981810160405281019062000053919062000109565b3073ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1660601b815250508073ffffffffffffffffffffffffffffffffffffffff1660c08173ffffffffffffffffffffffffffffffffffffffff1660601b815250505062000197565b60008163ffffffff1660208463ffffffff16901b60408663ffffffff16901b171790509392505050565b60008151905062000103816200017d565b92915050565b6000602082840312156200011c57600080fd5b60006200012c84828501620000f2565b91505092915050565b600062000142826200015d565b9050919050565b6000620001568262000135565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b620001888162000149565b81146200019457600080fd5b50565b60805160601c60a05160c05160601c610e4e620001c9600039806101bd52508060f75250806109f75250610e4e6000f3fe60806040526004361061003f5760003560e01c8063031b905c146100445780636ae4b4f71461006f5780638fd3ab801461009a578063c43c9ef6146100c5575b600080fd5b34801561005057600080fd5b506100596100f5565b6040516100669190610d0e565b60405180910390f35b34801561007b57600080fd5b50610084610119565b6040516100919190610cac565b60405180910390f35b3480156100a657600080fd5b506100af610152565b6040516100bc9190610c68565b60405180910390f35b6100df60048036038101906100da9190610adc565b610171565b6040516100ec9190610d0e565b60405180910390f35b7f000000000000000000000000000000000000000000000000000000000000000081565b6040518060400160405280601281526020017f50616e63616b655377617046656174757265000000000000000000000000000081525081565b600061016463c43c9ef660e01b6109d8565b632c64c5ef60e01b905090565b6000600186869050116101b9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101b090610cce565b60405180910390fd5b60007f00000000000000000000000000000000000000000000000000000000000000009050602460043501610a005282610a205280610a40525060016004803501350384915060008060005b838110156104f7576102168161057a565b6102226001830161057a565b935061022d846105a3565b610236826105a3565b10838061024e5761024786846105d0565b9050600094505b8361032c5773eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee831460008114610310578b341461027e57600080fd5b610a405193507fd0e30db000000000000000000000000000000000000000000000000000000000610b00526000806004610b008f885af16102c2576102c1610911565b5b7fa9059cbb00000000000000000000000000000000000000000000000000000000610b005281610b04528b610b24526000806044610b006000885af161030b5761030a610911565b5b61032a565b600034111561031e57600080fd5b6103298c838661091b565b5b505b7f0902f1ac00000000000000000000000000000000000000000000000000000000610b00526040610c006004610b00845afa61036b5761036a610911565b5b60403d101561037e578060005260206000fd5b8760008084156000811461039d57610c20519250610c005191506103aa565b610c00519250610c205191505b506e0100000000000000000000000000008311156103c757600080fd5b6103e583026103e883028101828202049b5050505060008860018701146000811461041d5773eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee89146000811461041357309250610417565b3392505b50610438565b61043261042c6002890161057a565b8a6105d0565b97508791505b50610a20516002811461046f577f022c0d9f00000000000000000000000000000000000000000000000000000000610b0052610495565b7f6d9a640a00000000000000000000000000000000000000000000000000000000610b00525b5083600081146104af576000610b04528a610b24526104bb565b8a610b04526000610b24525b5080610b44526080610b64526000610b845260008060a4610b006000875af16104e7576104e6610911565b5b5050505050600181019050610205565b5073eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee821415610575577f2e1a7d4d00000000000000000000000000000000000000000000000000000000610b005283610b04526000806024610b006000610a40515af161055b5761055a610911565b5b6000806000610b0087335af161057457610573610911565b5b5b610989565b600060208202610a0051013573ffffffffffffffffffffffffffffffffffffffff169050919050565b600081905073eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee8214156105cb57610a405190505b919050565b60006105db826105a3565b91506105e6836105a3565b9250828210600081146106025783610b145282610b005261060d565b82610b145283610b00525b506028610b0c20610a2051600081146106a457600181146106f8576002811461074b576003811461079f57600481146107f35760058114610847576006811461089b577fff553990f2cba90272390f62c5bdb1681ffc8996750000000000000000000000610b005281610b15527fb1e98e21a5335633815a8cfb3b580071c2e4561c50afd57a8746def9ed890b18610b35526108eb565b7fffbcfccbde45ce874adcb698cc183debcf179528120000000000000000000000610b005281610b15527fd0d4c4cd0848c93cb4fd1f498d7013ee6bfb25783ea21593d5834f5d250ece66610b35526108eb565b7fffca143ce32fe78f1f7019d7d551a6402fc5350c730000000000000000000000610b005281610b15527efb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5610b35526108eb565b7fff01bf7c66c6bd861915cdaae475042d3c4bae16a70000000000000000000000610b005281610b15527fe2e87433120e32c4738a7d8f3271f3d872cbe16241d67537139158d90bac61d3610b35526108eb565b7fffc35dadb65012ec5796536bd9864ed8773abc74c40000000000000000000000610b005281610b15527fe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303610b35526108eb565b7fff0841bd0b734e4f5853f0dd8d7ea041c241fb0da60000000000000000000000610b005281610b15527ff4ccce374816856d11f00e4069e7cada164065686fbef53c6167a63ec2fd8c5b610b35526108eb565b7fff3e708fdbe3ada63fc94f8f61811196f1302137ad0000000000000000000000610b005281610b15527f90bcdb5d0bf0e8db3852b0b7d7e05cc8f7c6eb6d511213c5ba02d1d1dbeda8d3610b35526108eb565b7fffdd538e4fd1b69b7863e1f741213276a6cf1efb3b0000000000000000000000610b005281610b15527ff52c5189a89e7ca2ef4f19f2798e3900fba7a316de7cef6c5a9446621ba86286610b35525b506055610b002073ffffffffffffffffffffffffffffffffffffffff1691505092915050565b3d6000803e3d6000fd5b7f23b872dd00000000000000000000000000000000000000000000000000000000610b005233610b045281610b245282610b44526020610c006064610b006000855af13d6001610c005114602082101516811517821691508161098257806000803e806000fd5b5050505050565b505050828110156109cf576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109c690610cee565b60405180910390fd5b95945050505050565b3073ffffffffffffffffffffffffffffffffffffffff16636eb224cb827f00000000000000000000000000000000000000000000000000000000000000006040518363ffffffff1660e01b8152600401610a33929190610c83565b600060405180830381600087803b158015610a4d57600080fd5b505af1158015610a61573d6000803e3d6000fd5b5050505050565b60008083601f840112610a7a57600080fd5b8235905067ffffffffffffffff811115610a9357600080fd5b602083019150836020820283011115610aab57600080fd5b9250929050565b600081359050610ac181610df1565b92915050565b600081359050610ad681610e01565b92915050565b600080600080600060808688031215610af457600080fd5b600086013567ffffffffffffffff811115610b0e57600080fd5b610b1a88828901610a68565b95509550506020610b2d88828901610ac7565b9350506040610b3e88828901610ac7565b9250506060610b4f88828901610ab2565b9150509295509295909350565b610b6581610d45565b82525050565b610b7481610d57565b82525050565b6000610b8582610d29565b610b8f8185610d34565b9350610b9f818560208601610dad565b610ba881610de0565b840191505092915050565b6000610bc0602683610d34565b91507f50616e63616b6553776170466561747572652f496e76616c6964546f6b656e7360008301527f4c656e67746800000000000000000000000000000000000000000000000000006020830152604082019050919050565b6000610c26601e83610d34565b91507f50616e63616b6553776170466561747572652f556e646572426f7567687400006000830152602082019050919050565b610c6281610da3565b82525050565b6000602082019050610c7d6000830184610b6b565b92915050565b6000604082019050610c986000830185610b6b565b610ca56020830184610b5c565b9392505050565b60006020820190508181036000830152610cc68184610b7a565b905092915050565b60006020820190508181036000830152610ce781610bb3565b9050919050565b60006020820190508181036000830152610d0781610c19565b9050919050565b6000602082019050610d236000830184610c59565b92915050565b600081519050919050565b600082825260208201905092915050565b6000610d5082610d83565b9050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60005b83811015610dcb578082015181840152602081019050610db0565b83811115610dda576000848401525b50505050565b6000601f19601f8301169050919050565b60088110610dfe57600080fd5b50565b610e0a81610da3565b8114610e1557600080fd5b5056fea2646970667358221220f5bbbfd76385b01d1967a772ddf88f37d90aee2ae1ae1bf340b099609186fb4564736f6c634300060c0033";

type PancakeSwapFeatureConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PancakeSwapFeatureConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PancakeSwapFeature__factory extends ContractFactory {
  constructor(...args: PancakeSwapFeatureConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    wbnb: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<PancakeSwapFeature> {
    return super.deploy(wbnb, overrides || {}) as Promise<PancakeSwapFeature>;
  }
  override getDeployTransaction(
    wbnb: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(wbnb, overrides || {});
  }
  override attach(address: string): PancakeSwapFeature {
    return super.attach(address) as PancakeSwapFeature;
  }
  override connect(signer: Signer): PancakeSwapFeature__factory {
    return super.connect(signer) as PancakeSwapFeature__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PancakeSwapFeatureInterface {
    return new utils.Interface(_abi) as PancakeSwapFeatureInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PancakeSwapFeature {
    return new Contract(address, _abi, signerOrProvider) as PancakeSwapFeature;
  }
}