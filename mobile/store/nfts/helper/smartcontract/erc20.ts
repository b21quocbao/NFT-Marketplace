import { BigNumber } from "@ethersproject/bignumber";
import { zeroContractAddresses } from "../../../../contracts/zeroExContracts";

export const MAX_APPROVAL = BigNumber.from(2).pow(118);
const ETH_ADDRESS_AS_ERC20 = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

export async function getSymbol(contract: any) {
  return contract.methods.symbol().call();
}

export async function loadApprovalStatus(
  connector: any,
  contract: any,
  user: any,
  asset: any
) {
  if (asset.tokenAddress.toLowerCase() === ETH_ADDRESS_AS_ERC20) {
    return {
      contractApproved: true,
    };
  }
  const erc20AllowanceBigNumber: BigNumber = BigNumber.from(await contract.methods.allowance(
    user.address,
    zeroContractAddresses[connector.chainId]
  ).call());
  console.log(erc20AllowanceBigNumber, 'Line #26 erc20.ts');
  
  const MAX_APPROVAL_WITH_BUFFER = BigNumber.from(MAX_APPROVAL.toString()).sub(
    "100000000000000000"
  );
  const approvedForMax = erc20AllowanceBigNumber.gte(MAX_APPROVAL_WITH_BUFFER);

  return {
    contractApproved: approvedForMax,
  };
}

export async function approveTokenOrNftByAsset(
  connector: any,
  contract: any,
  user: any
) {
  const encodeAbi = await contract.methods
    .approve(zeroContractAddresses[connector.chainId], MAX_APPROVAL.toString())
    .encodeABI();

  return connector.sendTransaction({
    from: user.address,
    to: contract.options.address,
    data: encodeAbi,
  });
}

