import { Button, Card, Image } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { CHAIN_DATA } from "../../constants/chain";
import { endSale } from "../../helpers/solana/endSale";
import { getAuctionView } from "../../helpers/solana/getAuctionView";
import { crawlItemData } from "../../helpers/solana/getMetadata";
import { getOrderData } from "../../helpers/solana/getOrderData";
import useConnectionInfo from "../../hooks/connectionInfo";
import { TokenAccount } from "../../solana-helper";
const { Meta } = Card;

function MyNftItem(props: any) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, library, chainId, connection, wallet } = useConnectionInfo();

  return (
    <>
      <Card
        hoverable
        style={{
          width: 240,
        }}
        cover={<Image alt="example" src={props.imageUrl} />}
      >
        <Meta title={props.name} description={props.status} />
        <br />
        <b>Chain: </b>
        <p>{CHAIN_DATA[props.chainId]?.name}</p>
        <br />
        {props.status == "AVAILABLE" && (
          <>
            <Button
              type="primary"
              style={{ margin: "auto" }}
              onClick={() => router.push(`/nfts/sale/${props.id}`)}
            >
              Sale
            </Button>
            <br />
            <br />
            <Button
              type="primary"
              style={{ margin: "auto" }}
              onClick={() => router.push(`/nfts/auction/${props.id}`)}
            >
              Auction
            </Button>
            <br />
            <br />
          </>
        )}
        {props.status == "AUCTION" && (
          <>
            <Button
              type="primary"
              style={{ margin: "auto" }}
              onClick={() => router.push(`/nfts/offers/${props.id}`)}
            >
              View Offers
            </Button>
            <br />
            <br />
          </>
        )}
        {(props.status == "LIST" ||
          (props.status == "AUCTION" && !props.solana)) && (
          <>
            <Button
              type="primary"
              style={{ margin: "auto" }}
              loading={loading}
              onClick={async () => {
                console.log(props, "propsss");

                setLoading(true);
                if (props.solana) {
                  const saleOrderData = await getOrderData(props.saleData);
                  const itemData = await crawlItemData(
                    props.metadata,
                    props.user.address
                  );
                  const { auctionView, bidRedemptions } = await getAuctionView(
                    saleOrderData,
                    itemData
                  );
                  await endSale({
                    auctionView,
                    connection,
                    accountByMint: new Map<string, TokenAccount>(),
                    bids: [],
                    bidRedemptions,
                    prizeTrackingTickets: {},
                    wallet,
                  });
                }

                await fetch("/api/update-nft", {
                  method: "PUT",
                  body: JSON.stringify({
                    id: props.id,
                    status: "AVAILABLE",
                    signedOrder: null,
                    saleData: null,
                    auctionData: null,
                    saleOrderData: null,
                    auctionOrderData: null,
                    startingPrice: null,
                    startAuctionTime: null,
                    endAuctionTime: null,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
                router.reload();
              }}
            >
              Cancel
            </Button>
            <br />
            <br />
          </>
        )}
        <Button
          type="primary"
          style={{ margin: "auto" }}
          onClick={() => {
            window.open(
              props.solana
                ? `https://explorer.solana.com/address/${props.metadata.mint}?cluster=devnet`
                : `${CHAIN_DATA[props.chainId]?.blockExplorerUrl}/token/${
                    CHAIN_DATA[props.chainId]?.erc721
                  }?a=${props.tokenId}`,
              "_blank"
            );
          }}
        >
          View NFT
        </Button>
      </Card>
      <br />
    </>
  );
}

export default MyNftItem;
