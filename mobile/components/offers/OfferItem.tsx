import Web3 from "web3";

const { fromWei } = Web3.utils;

function OfferItem(props: any) {
  return (
    <>
      <p>{`Bidder: ${props.offer.maker}`}</p>
      <p>{`Amount: ${fromWei(props.offer.erc20TokenAmount)}`}</p>
    </>
  );
}

export default OfferItem;
