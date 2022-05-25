/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  PositiveSlippageFeeTransformer,
  PositiveSlippageFeeTransformerInterface,
} from "../../../../contracts/src/transformers/PositiveSlippageFeeTransformer";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

const _abi = [
  {
    inputs: [],
    name: "deployer",
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
        internalType: "address payable",
        name: "ethRecipient",
        type: "address",
      },
    ],
    name: "die",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
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
  "0x60c060405234801561001057600080fd5b503373ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1660601b815250503073ffffffffffffffffffffffffffffffffffffffff1660a08173ffffffffffffffffffffffffffffffffffffffff1660601b8152505060805160601c60a05160601c610d9e6100b7600039806101d0528061022a52508061014a52806101a4528061026f5250610d9e6000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063832b24bb14610046578063c9353cb514610076578063d5f3948814610092575b600080fd5b610060600480360381019061005b9190610954565b6100b0565b60405161006d9190610b15565b60405180910390f35b610090600480360381019061008b9190610902565b610148565b005b61009a61026d565b6040516100a79190610aa8565b60405180910390f35b60006100ba6107e6565b8280604001906100ca9190610b87565b8101906100d7919061092b565b905060006100e9826000015130610291565b90508160200151811115610137576000826020015182039050610135836040015182856000015173ffffffffffffffffffffffffffffffffffffffff166103529092919063ffffffff16565b505b6313c9929e60e01b92505050919050565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146101ce576101cd6101c8337f00000000000000000000000000000000000000000000000000000000000000006103dd565b610478565b5b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff16146102545761025361024e307f0000000000000000000000000000000000000000000000000000000000000000610480565b610478565b5b8073ffffffffffffffffffffffffffffffffffffffff16ff5b7f000000000000000000000000000000000000000000000000000000000000000081565b600061029c8361051b565b156102c0578173ffffffffffffffffffffffffffffffffffffffff1631905061034c565b8273ffffffffffffffffffffffffffffffffffffffff166370a08231836040518263ffffffff1660e01b81526004016102f99190610aa8565b60206040518083038186803b15801561031157600080fd5b505afa158015610325573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103499190610995565b90505b92915050565b61035b8361051b565b156103ac578173ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501580156103a6573d6000803e3d6000fd5b506103d8565b6103d782828573ffffffffffffffffffffffffffffffffffffffff166105679092919063ffffffff16565b5b505050565b60607f5cec653b364cca3880afa73ceff506d0651d11d26abbbe4a56460aa933b21b088383604051602401610413929190610ac3565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050905092915050565b805160208201fd5b60607fb5cf2cd09307d6c717473134badbb9761c2c97d7565566c2a71eba6cd6fc514d83836040516024016104b6929190610ac3565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050905092915050565b600073eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16149050919050565b606063a9059cbb60e01b8383604051602401610584929190610aec565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505090506105ed84826105f3565b50505050565b600060608373ffffffffffffffffffffffffffffffffffffffff168360405161061c9190610a91565b6000604051808303816000865af19150503d8060008114610659576040519150601f19603f3d011682016040523d82523d6000602084013e61065e565b606091505b5091509150816106725761067181610478565b5b6000815114156106cd576000843b9050600081116106c5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106bc90610b67565b60405180910390fd5b50505061070d565b60208151106107015760006106e3826000610711565b905060018114156106f65750505061070d565b6106ff82610478565b505b61070a81610478565b50505b5050565b600061071d8383610728565b60001c905092915050565b6000602082018351101561074f5761074e6107496005855160208601610761565b610478565b5b60208201915081830151905092915050565b6060632800659560e01b84848460405160240161078093929190610b30565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505090509392505050565b6040518060600160405280600073ffffffffffffffffffffffffffffffffffffffff16815260200160008152602001600073ffffffffffffffffffffffffffffffffffffffff1681525090565b60008135905061084281610d23565b92915050565b60008135905061085781610d3a565b92915050565b60006060828403121561086f57600080fd5b6108796060610bde565b9050600061088984828501610848565b600083015250602061089d848285016108d8565b60208301525060406108b184828501610833565b60408301525092915050565b6000606082840312156108cf57600080fd5b81905092915050565b6000813590506108e781610d51565b92915050565b6000815190506108fc81610d51565b92915050565b60006020828403121561091457600080fd5b600061092284828501610833565b91505092915050565b60006060828403121561093d57600080fd5b600061094b8482850161085d565b91505092915050565b60006020828403121561096657600080fd5b600082013567ffffffffffffffff81111561098057600080fd5b61098c848285016108bd565b91505092915050565b6000602082840312156109a757600080fd5b60006109b5848285016108ed565b91505092915050565b6109c781610c32565b82525050565b6109d681610c56565b82525050565b60006109e782610c0b565b6109f18185610c16565b9350610a01818560208601610ce3565b80840191505092915050565b610a1681610cd1565b82525050565b6000610a29602783610c21565b91507f696e76616c696420746f6b656e20616464726573732c20636f6e7461696e732060008301527f6e6f20636f6465000000000000000000000000000000000000000000000000006020830152604082019050919050565b610a8b81610cc7565b82525050565b6000610a9d82846109dc565b915081905092915050565b6000602082019050610abd60008301846109be565b92915050565b6000604082019050610ad860008301856109be565b610ae560208301846109be565b9392505050565b6000604082019050610b0160008301856109be565b610b0e6020830184610a82565b9392505050565b6000602082019050610b2a60008301846109cd565b92915050565b6000606082019050610b456000830186610a0d565b610b526020830185610a82565b610b5f6040830184610a82565b949350505050565b60006020820190508181036000830152610b8081610a1c565b9050919050565b60008083356001602003843603038112610ba057600080fd5b80840192508235915067ffffffffffffffff821115610bbe57600080fd5b602083019250600182023603831315610bd657600080fd5b509250929050565b6000604051905081810181811067ffffffffffffffff82111715610c0157600080fd5b8060405250919050565b600081519050919050565b600081905092915050565b600082825260208201905092915050565b6000610c3d82610ca7565b9050919050565b6000610c4f82610ca7565b9050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b6000610c8d82610c32565b9050919050565b6000819050610ca282610d16565b919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6000610cdc82610c94565b9050919050565b60005b83811015610d01578082015181840152602081019050610ce6565b83811115610d10576000848401525b50505050565b60088110610d2057fe5b50565b610d2c81610c44565b8114610d3757600080fd5b50565b610d4381610c82565b8114610d4e57600080fd5b50565b610d5a81610cc7565b8114610d6557600080fd5b5056fea264697066735822122076f62b0e484c33ab33cbdf7daebbc7e66cc7b7103c9d728661e390ef1bc742d164736f6c634300060c0033";

type PositiveSlippageFeeTransformerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PositiveSlippageFeeTransformerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PositiveSlippageFeeTransformer__factory extends ContractFactory {
  constructor(...args: PositiveSlippageFeeTransformerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<PositiveSlippageFeeTransformer> {
    return super.deploy(
      overrides || {}
    ) as Promise<PositiveSlippageFeeTransformer>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): PositiveSlippageFeeTransformer {
    return super.attach(address) as PositiveSlippageFeeTransformer;
  }
  override connect(signer: Signer): PositiveSlippageFeeTransformer__factory {
    return super.connect(signer) as PositiveSlippageFeeTransformer__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PositiveSlippageFeeTransformerInterface {
    return new utils.Interface(_abi) as PositiveSlippageFeeTransformerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PositiveSlippageFeeTransformer {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as PositiveSlippageFeeTransformer;
  }
}
