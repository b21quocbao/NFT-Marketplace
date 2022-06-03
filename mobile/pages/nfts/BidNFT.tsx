import web3 from "web3";
import { useState } from "react";
import { useSelector } from "react-redux";
import BidNftForm from "../../components/nfts/BidNftForm";

const { fromWei } = web3.utils;

function BidNft({ route }) {
  const { nfts } = useSelector(
    (state: any) => state.NftReducer
  );
  const nft = nfts.filter((nft: any) => nft.id == route.params.nftId)[0];
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
