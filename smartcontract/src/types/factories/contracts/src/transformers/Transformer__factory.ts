/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  Transformer,
  TransformerInterface,
} from "../../../../contracts/src/transformers/Transformer";
import type { Provider } from "@ethersproject/providers";
import { Contract, Signer, utils } from "ethers";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
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

export class Transformer__factory {
  static readonly abi = _abi;
  static createInterface(): TransformerInterface {
    return new utils.Interface(_abi) as TransformerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Transformer {
    return new Contract(address, _abi, signerOrProvider) as Transformer;
  }
}
