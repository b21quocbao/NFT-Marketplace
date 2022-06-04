import web3 from "web3";
import { useState } from "react";
import BidNftForm from "../../components/nfts/BidNftForm";

const { fromWei } = web3.utils;

function BidNft({ route }) {
  const nft = route.params.nft;
  const bidNftHandler = async() => {};
  const [loading, setLoading] = useState(false);

  return (
    <BidNftForm
      minPrice={fromWei(nft.startingPrice)}
      onBidNft={bidNftHandler}
      loading={loading}
    />
  );
}

export default BidNft;
