/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  IMetaTransactionsFeature,
  IMetaTransactionsFeatureInterface,
} from "../../../../../contracts/src/features/interfaces/IMetaTransactionsFeature";
import type { Provider } from "@ethersproject/providers";
import { Contract, Signer, utils } from "ethers";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "hash",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes4",
        name: "selector",
        type: "bytes4",
      },
      {
        indexed: false,
        internalType: "address",
        name: "signer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "MetaTransactionExecuted",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address payable",
            name: "signer",
            type: "address",
          },
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "minGasPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxGasPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "expirationTimeSeconds",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "salt",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "contract IERC20TokenV06",
            name: "feeToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "feeAmount",
            type: "uint256",
          },
        ],
        internalType: "struct IMetaTransactionsFeature.MetaTransactionData[]",
        name: "mtxs",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "enum LibSignature.SignatureType",
            name: "signatureType",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "v",
            type: "uint8",
          },
          {
            internalType: "bytes32",
            name: "r",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "s",
            type: "bytes32",
          },
        ],
        internalType: "struct LibSignature.Signature[]",
        name: "signatures",
        type: "tuple[]",
      },
    ],
    name: "batchExecuteMetaTransactions",
    outputs: [
      {
        internalType: "bytes[]",
        name: "returnResults",
        type: "bytes[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address payable",
            name: "signer",
            type: "address",
          },
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "minGasPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxGasPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "expirationTimeSeconds",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "salt",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "contract IERC20TokenV06",
            name: "feeToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "feeAmount",
            type: "uint256",
          },
        ],
        internalType: "struct IMetaTransactionsFeature.MetaTransactionData",
        name: "mtx",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "enum LibSignature.SignatureType",
            name: "signatureType",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "v",
            type: "uint8",
          },
          {
            internalType: "bytes32",
            name: "r",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "s",
            type: "bytes32",
          },
        ],
        internalType: "struct LibSignature.Signature",
        name: "signature",
        type: "tuple",
      },
    ],
    name: "executeMetaTransaction",
    outputs: [
      {
        internalType: "bytes",
        name: "returnResult",
        type: "bytes",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address payable",
            name: "signer",
            type: "address",
          },
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "minGasPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxGasPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "expirationTimeSeconds",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "salt",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "contract IERC20TokenV06",
            name: "feeToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "feeAmount",
            type: "uint256",
          },
        ],
        internalType: "struct IMetaTransactionsFeature.MetaTransactionData",
        name: "mtx",
        type: "tuple",
      },
    ],
    name: "getMetaTransactionExecutedBlock",
    outputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address payable",
            name: "signer",
            type: "address",
          },
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "minGasPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxGasPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "expirationTimeSeconds",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "salt",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "contract IERC20TokenV06",
            name: "feeToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "feeAmount",
            type: "uint256",
          },
        ],
        internalType: "struct IMetaTransactionsFeature.MetaTransactionData",
        name: "mtx",
        type: "tuple",
      },
    ],
    name: "getMetaTransactionHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "mtxHash",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "mtxHash",
        type: "bytes32",
      },
    ],
    name: "getMetaTransactionHashExecutedBlock",
    outputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IMetaTransactionsFeature__factory {
  static readonly abi = _abi;
  static createInterface(): IMetaTransactionsFeatureInterface {
    return new utils.Interface(_abi) as IMetaTransactionsFeatureInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IMetaTransactionsFeature {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IMetaTransactionsFeature;
  }
}
