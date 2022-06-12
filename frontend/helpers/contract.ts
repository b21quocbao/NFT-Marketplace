export function ensureIpfsUriPrefix(cidOrURI: any) {
  let uri = cidOrURI.toString();
  if (!uri.startsWith("ipfs://")) {
    uri = "ipfs://" + cidOrURI;
  }
  // Avoid the Nyan Cat bug (https://github.com/ipfs/go-ipfs/pull/7930)
  if (uri.startsWith("ipfs://ipfs/")) {
    uri = uri.replace("ipfs://ipfs/", "ipfs://");
  }
  return uri;
}

export function stripIpfsUriPrefix(cidOrURI: string) {
  if (cidOrURI.startsWith("ipfs://")) {
    return cidOrURI.slice("ipfs://".length);
  }
  return cidOrURI;
}

export async function makeNFTMetadata(
  assetURI: string,
  address: string,
  options: any
) {
  const { name, description } = options;
  assetURI = ensureIpfsUriPrefix(assetURI);
  return {
    name,
    symbol: "NFT",
    properties: {
      category: "image",
      maxSupply: 0,
      creators: [
        {
          address,
          share: 100,
        },
      ],
    },
    description,
    image: assetURI,
  };
}
