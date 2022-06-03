import { Button } from "@rneui/base";
import { useState } from "react";
import { useSelector } from "react-redux";
import web3 from "web3";

const { fromWei } = web3.utils;

function OfferItem(props: any) {
  const { user } = useSelector((state: any) => state.AuthReducer);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <p>{`Bidder: ${props.offer.maker}`}</p>
      <p>{`Amount: ${fromWei(props.offer.erc20TokenAmount)}`}</p>
      {user &&
        props.makerUserId == user.id &&
        props.highestBid &&
        new Date(props.endAuctionTime).getTime() < Date.now() && (
          <Button title="Confirm this offer" loading={loading} />
        )}
      <hr />
    </>
  );
}

export default OfferItem;
