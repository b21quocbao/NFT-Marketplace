import { zeroContractAddresses } from "../../../../contracts/zeroExContracts";

export async function getTotalSupply(contract: any) {
  const totalSupply = await contract.methods.totalSupply().call();

  return Number(totalSupply) + 1;
}

export async function mint(
  connector: any,
  contract: any,
  walletAddress: string,
  numNft: number,
  metadataUris: string[]
) {
  const encodeAbi = await contract.methods
    .mint(walletAddress, numNft, metadataUris)
    .encodeABI();

  await connector.sendTransaction({
    from: walletAddress,
    to: contract.options.address,
    data: encodeAbi,
  });
}

export async function loadApprovalStatus(
  connector: any,
  contract: any,
  user: any,
  nft: any
) {
  const approvalForAll = await contract.methods
    .isApprovedForAll(user.address, zeroContractAddresses[connector.chainId])
    .call();
  const approvedAddressForId = await contract.methods
    .getApproved(nft.tokenId)
    .call();
  const tokenIdApproved =
    approvedAddressForId.toLowerCase() ===
    zeroContractAddresses[connector.chainId].toLowerCase();

  return {
    contractApproved: approvalForAll ?? false,
    tokenIdApproved: tokenIdApproved,
  };
}

export async function approveTokenOrNftByAsset(
  connector: any,
  contract: any,
  user: any
) {
  const encodeAbi = await contract.methods
    .setApprovalForAll(zeroContractAddresses[connector.chainId], true)
    .encodeABI();

  return connector.sendTransaction({
    from: user.address,
    to: contract.options.address,
    data: encodeAbi,
  });
}
