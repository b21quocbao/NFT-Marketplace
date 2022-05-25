/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  IERC20Bridge,
  IERC20BridgeInterface,
} from "../../../../../contracts/src/vendor/v3/IERC20Bridge";
import type { Provider } from "@ethersproject/providers";
import { Contract, Signer, utils } from "ethers";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "inputToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "outputToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "inputTokenAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "outputTokenAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "ERC20BridgeTransfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "bridgeData",
        type: "bytes",
      },
    ],
    name: "bridgeTransferFrom",
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

export class IERC20Bridge__factory {
  static readonly abi = _abi;
  static createInterface(): IERC20BridgeInterface {
    return new utils.Interface(_abi) as IERC20BridgeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IERC20Bridge {
    return new Contract(address, _abi, signerOrProvider) as IERC20Bridge;
  }
}
