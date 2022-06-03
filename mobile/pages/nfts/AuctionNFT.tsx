import { useState } from "react";
import AuctionNftForm from "../../components/nfts/AuctionNftForm";

function AuctionNft({ route }) {
  const auctionNftHandler = () => {};
  const [loading, setLoading] = useState(false);

  return <AuctionNftForm onAuctionNft={auctionNftHandler} loading={loading} />;
}

export default AuctionNft;
