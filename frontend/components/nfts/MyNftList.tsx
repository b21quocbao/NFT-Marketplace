import MyNftItem from "./MyNftItem";

function MyNftList(props: any) {
  return (
    <ul>
      {props.nfts.map((nft: any) => (
        <MyNftItem
          key={nft.id}
          id={nft.id}
          imageUrl={nft.imageUrl}
          name={nft.name}
          address={nft.address}
          endAuctionTime={nft.endAuctionTime}
          status={nft.status}
          chain={nft.chain}
          signedOrder={nft.signedOrder}
        />
      ))}
    </ul>
  );
}

export default MyNftList;