/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  TestUniswapV2Pool,
  TestUniswapV2PoolInterface,
} from "../../../../../contracts/test/integration/TestUniswapV2Pool.sol/TestUniswapV2Pool";
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
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0In",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1In",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0Out",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1Out",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "Swap",
    type: "event",
  },
  {
    inputs: [],
    name: "getReserves",
    outputs: [
      {
        internalType: "uint112",
        name: "",
        type: "uint112",
      },
      {
        internalType: "uint112",
        name: "",
        type: "uint112",
      },
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint112",
        name: "reserve0_",
        type: "uint112",
      },
      {
        internalType: "uint112",
        name: "reserve1_",
        type: "uint112",
      },
      {
        internalType: "uint32",
        name: "blockTimestampLast_",
        type: "uint32",
      },
    ],
    name: "setReserves",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount0Out",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount1Out",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "swap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "token0",
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
    inputs: [],
    name: "token1",
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
];

const _bytecode =
  "0x60c060405234801561001057600080fd5b50610019610116565b3373ffffffffffffffffffffffffffffffffffffffff16637ba6f2316040518163ffffffff1660e01b8152600401604080518083038186803b15801561005e57600080fd5b505afa158015610072573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061009691906101bd565b9050806000015181602001518073ffffffffffffffffffffffffffffffffffffffff1660a09073ffffffffffffffffffffffffffffffffffffffff1660601b8152508173ffffffffffffffffffffffffffffffffffffffff1660809073ffffffffffffffffffffffffffffffffffffffff1660601b81525050505061026e565b6040518060400160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff1681525090565b60008151905061016b81610257565b92915050565b60006040828403121561018357600080fd5b61018d60406101e6565b9050600061019d8482850161015c565b60008301525060206101b18482850161015c565b60208301525092915050565b6000604082840312156101cf57600080fd5b60006101dd84828501610171565b91505092915050565b6000604051905081810181811067ffffffffffffffff8211171561020957600080fd5b8060405250919050565b600061021e82610237565b9050919050565b600061023082610213565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b61026081610225565b811461026b57600080fd5b50565b60805160601c60a05160601c61074a6102a0600039806101b3528061037852508060fb52806102c5525061074a6000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c8063022c0d9f1461005c5780630902f1ac146100785780630dfe16811461009857806318243296146100b6578063d21220a7146100d2575b600080fd5b610076600480360381019061007191906104c5565b6100f0565b005b610080610267565b60405161008f939291906105d4565b60405180910390f35b6100a06102c3565b6040516100ad91906105b9565b60405180910390f35b6100d060048036038101906100cb9190610476565b6102e7565b005b6100da610376565b6040516100e791906105b9565b60405180910390f35b60008511156101a8577f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663a9059cbb84876040518363ffffffff1660e01b8152600401610154929190610590565b602060405180830381600087803b15801561016e57600080fd5b505af1158015610182573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101a6919061044d565b505b6000841115610260577f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663a9059cbb84866040518363ffffffff1660e01b815260040161020c929190610590565b602060405180830381600087803b15801561022657600080fd5b505af115801561023a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061025e919061044d565b505b5050505050565b60008060008060009054906101000a90046dffffffffffffffffffffffffffff166000600e9054906101000a90046dffffffffffffffffffffffffffff166000601c9054906101000a900463ffffffff16925092509250909192565b7f000000000000000000000000000000000000000000000000000000000000000081565b826000806101000a8154816dffffffffffffffffffffffffffff02191690836dffffffffffffffffffffffffffff160217905550816000600e6101000a8154816dffffffffffffffffffffffffffff02191690836dffffffffffffffffffffffffffff160217905550806000601c6101000a81548163ffffffff021916908363ffffffff160217905550505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b6000813590506103a9816106a1565b92915050565b6000815190506103be816106b8565b92915050565b60008083601f8401126103d657600080fd5b8235905067ffffffffffffffff8111156103ef57600080fd5b60208301915083600182028301111561040757600080fd5b9250929050565b60008135905061041d816106cf565b92915050565b600081359050610432816106e6565b92915050565b600081359050610447816106fd565b92915050565b60006020828403121561045f57600080fd5b600061046d848285016103af565b91505092915050565b60008060006060848603121561048b57600080fd5b60006104998682870161040e565b93505060206104aa8682870161040e565b92505060406104bb86828701610438565b9150509250925092565b6000806000806000608086880312156104dd57600080fd5b60006104eb88828901610423565b95505060206104fc88828901610423565b945050604061050d8882890161039a565b935050606086013567ffffffffffffffff81111561052a57600080fd5b610536888289016103c4565b92509250509295509295909350565b61054e8161060b565b82525050565b61055d8161067d565b82525050565b61056c81610629565b82525050565b61057b81610663565b82525050565b61058a8161066d565b82525050565b60006040820190506105a56000830185610545565b6105b26020830184610572565b9392505050565b60006020820190506105ce6000830184610554565b92915050565b60006060820190506105e96000830186610563565b6105f66020830185610563565b6106036040830184610581565b949350505050565b600061061682610643565b9050919050565b60008115159050919050565b60006dffffffffffffffffffffffffffff82169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600063ffffffff82169050919050565b60006106888261068f565b9050919050565b600061069a82610643565b9050919050565b6106aa8161060b565b81146106b557600080fd5b50565b6106c18161061d565b81146106cc57600080fd5b50565b6106d881610629565b81146106e357600080fd5b50565b6106ef81610663565b81146106fa57600080fd5b50565b6107068161066d565b811461071157600080fd5b5056fea26469706673582212203854a303972ae03b27b18f9a0e433e013cfc94ed80fb6dab3ef99fc262508e0864736f6c634300060c0033";

type TestUniswapV2PoolConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestUniswapV2PoolConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestUniswapV2Pool__factory extends ContractFactory {
  constructor(...args: TestUniswapV2PoolConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TestUniswapV2Pool> {
    return super.deploy(overrides || {}) as Promise<TestUniswapV2Pool>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): TestUniswapV2Pool {
    return super.attach(address) as TestUniswapV2Pool;
  }
  override connect(signer: Signer): TestUniswapV2Pool__factory {
    return super.connect(signer) as TestUniswapV2Pool__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestUniswapV2PoolInterface {
    return new utils.Interface(_abi) as TestUniswapV2PoolInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestUniswapV2Pool {
    return new Contract(address, _abi, signerOrProvider) as TestUniswapV2Pool;
  }
}
