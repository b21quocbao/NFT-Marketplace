import NftItem from "./NftItem";

function NftList(props: any) {
  return (
    <ul>
      {props.nfts.map((nft: any) => (
        <NftItem
          key={nft.id}
          id={nft.id}
          imageUrl={nft.imageUrl}
          name={nft.name}
          address={nft.address}
          status={nft.status}
          chain={nft.chain}
          signedOrder={nft.signedOrder}
        />
      ))}
    </ul>
  );
}

export default NftList;