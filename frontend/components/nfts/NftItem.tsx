import { Button, Card, Image } from "antd";
import { useEffect, useState } from "react";
import { NftSwapV4 as NftSwap } from "@traderxyz/nft-swap-sdk";
const { Meta } = Card;
import web3 from "web3";
import { useRouter } from "next/router";
import { CHAIN_DATA } from "../../constants/chain";
import { zeroContractAddresses } from "../../contracts/zeroExContracts";
import useConnectionInfo from "../../hooks/connectionInfo";
import { sendPlaceBid } from "../../solana-helper/actions/sendPlaceBid";
import { getProgramAccounts } from "../../solana-helper/common/contexts/meta/web3";
import {
  AuctionData,
  AuctionManager,
  SafetyDepositConfig,
  AuctionDataExtended,
  AuctionManagerV2,
  AuctionView,
  AuctionViewState,
  AUCTION_ID,
  AUCTION_SCHEMA,
  MasterEditionV2,
  METADATA_SCHEMA,
  SafetyDepositBox,
  SCHEMA,
  TokenAccount,
  Vault,
  VAULT_SCHEMA,
  ProcessAccountsFunc,
  AccountAndPubkey,
  MetaState,
  UpdateStateValueFunc,
  processAuctions,
} from "../../solana-helper";
import BN from "bn.js";
import { deserializeUnchecked } from "borsh";
import { MetadataData } from "@metaplex-foundation/mpl-token-metadata";
import { sendRedeemBid } from "../../solana-helper/actions/sendRedeemBid";
import { AccountInfo } from "@solana/web3.js";
import axios from "axios";
import {
  BidRedemptionTicket,
  decodeBidRedemptionTicket,
  ParsedAccount,
} from "../../solana-helper";
const forEach =
  (fn: ProcessAccountsFunc, updateTemp: any) =>
  async (accounts: AccountAndPubkey[]) => {
    for (const account of accounts) {
      await fn(account, updateTemp);
    }
  };

enum MetaplexKey {
  Uninitialized = 0,
  OriginalAuthorityLookupV1 = 1,
  BidRedemptionTicketV1 = 2,
  StoreV1 = 3,
  WhitelistedCreatorV1 = 4,
  PayoutTicketV1 = 5,
  SafetyDepositValidationTicketV1 = 6,
  AuctionManagerV1 = 7,
  PrizeTrackingTicketV1 = 8,
  SafetyDepositConfigV1 = 9,
  AuctionManagerV2 = 10,
  BidRedemptionTicketV2 = 11,
  AuctionWinnerTokenTypeTrackerV1 = 12,
  StoreIndexerV1 = 13,
  AuctionCacheV1 = 14,
  PackSet = 15,
}
const isBidRedemptionTicketV1Account = (account: AccountInfo<Buffer>) =>
  account.data[0] === MetaplexKey.BidRedemptionTicketV1;

const isBidRedemptionTicketV2Account = (account: AccountInfo<Buffer>) =>
  account.data[0] === MetaplexKey.BidRedemptionTicketV2;

async function processData(
  pubkey: string,
  account: AccountInfo<Buffer>,
  bidRedemptions: any
) {
  if (
    isBidRedemptionTicketV1Account(account) ||
    isBidRedemptionTicketV2Account(account)
  ) {
    const ticket = decodeBidRedemptionTicket(account.data);
    const parsedAccount: ParsedAccount<BidRedemptionTicket> = {
      pubkey,
      account,
      info: ticket,
    };
    bidRedemptions[pubkey] = parsedAccount;
  }
}

async function getProgramAccount() {
  const bidRedemptions = {} as any;
  const masterReq = {
    jsonrpc: "2.0",
    id: 1,
    method: "getProgramAccounts",
    params: [
      "p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98",
      {
        encoding: "jsonParsed",
        filters: [
          {
            dataSize: 44,
          },
        ],
      },
    ],
  };
  const { data: masterRes } = await axios.post(
    "https://api.devnet.solana.com",
    masterReq
  );

  for (const res of masterRes.result) {
    res.account.data = Buffer.from(res.account.data[0], "base64");
    await processData(res.pubkey, res.account, bidRedemptions);
  }

  return bidRedemptions;
}

async function getAuction(address: string) {
  const masterReq = {
    jsonrpc: "2.0",
    id: 1,
    method: "getMultipleAccounts",
    params: [
      [address],
      {
        commitment: "recent",
        encoding: "base64",
      },
    ],
  };
  const { data: masterRes } = await axios.post(
    "https://api.devnet.solana.com",
    masterReq
  );
  masterRes.result.value[0].data = masterRes.result.value[0].data[0];
  const accountData = masterRes.result.value[0].data;
  let info;

  info = deserializeUnchecked(
    AUCTION_SCHEMA,
    AuctionData,
    Buffer.from(accountData, "base64")
  );

  return {
    pubkey: address,
    account: masterRes.result.value[0],
    info: info,
  };
}

const { fromWei } = web3.utils;

const timeString = (time: number) => {
  const day = Math.trunc(time / 86400000);
  time -= day * 86400000;
  const hour = Math.trunc(time / 3600000);
  time -= hour * 3600000;
  const min = Math.trunc(time / 60000);
  time -= min * 60000;
  const sec = Math.trunc(time / 1000);
  time -= sec * 1000;

  return `${day}:${hour < 10 ? "0" : ""}${hour}:${min < 10 ? "0" : ""}${min}:${
    sec < 10 ? "0" : ""
  }${sec}`;
};

function NftItem(props: any) {
  const router = useRouter();
  const { user, library, chainId, connection, wallet } = useConnectionInfo();
  const [status, setStatus] = useState(props.status);
  const [loading, setLoading] = useState(false);
  const [endAuctionTime, setEndAuctionTime] = useState(undefined as any);

  useEffect(() => {
    let { status } = props;

    const checkStatus = () => {
      if (
        status === "AUCTION" &&
        new Date(props.endAuctionTime).getTime() < Date.now()
      ) {
        setStatus("END AUCTION");
      }
    };
    checkStatus();
    const interval = setInterval(checkStatus, 1000);
    return () => clearInterval(interval);
  }, [props]);

  useEffect(() => {
    if (props.endAuctionTime) {
      setEndAuctionTime(new Date(props.endAuctionTime).getTime() - Date.now());

      const minusAuctionTime = () => {
        setEndAuctionTime((value: number) => value - 1000);
      };
      const interval = setInterval(minusAuctionTime, 1000);
      return () => clearInterval(interval);
    }
  }, [props]);

  return (
    <>
      <Card
        hoverable
        style={{
          width: 240,
        }}
        cover={<Image alt="example" src={props.imageUrl} />}
      >
        <Meta title={props.name} description={status} />
        <br />
        <b>Chain: </b>
        <p>{CHAIN_DATA[props.chainId]?.name}</p>
        <br />

        {status === "LIST" && (
          <>
            {props.signedOrder && (
              <>
                <b>Price</b>
                <p>
                  {(props.price
                    ? props.price
                    : fromWei(props.signedOrder.erc20TokenAmount)) +
                    ` ${props.symbol}`}
                </p>
              </>
            )}
            {user && user.id !== props?.userId && (
              <Button
                type="primary"
                style={{ margin: "auto" }}
                onClick={async (e) => {
                  e.preventDefault();
                  setLoading(true);

                  if (user.solana && wallet) {
                    const obj = {} as any;
                    const {
                      auction,
                      auctionManager: auctionManagerInstance,
                      vault,
                      auctionDataExtended,
                      safetyDeposit,
                      safetyDepositConfig,
                    } = props.orderData;
                    const bidRedemptions = await getProgramAccount();

                    auction.info = deserializeUnchecked(
                      AUCTION_SCHEMA,
                      AuctionData,
                      Buffer.from(auction.account.data, "base64")
                    );
                    auctionManagerInstance.info = deserializeUnchecked(
                      SCHEMA,
                      AuctionManagerV2,
                      Buffer.from(auctionManagerInstance.account.data, "base64")
                    );
                    vault.info = deserializeUnchecked(
                      VAULT_SCHEMA,
                      Vault,
                      Buffer.from(vault.account.data, "base64")
                    );
                    auctionDataExtended.info = deserializeUnchecked(
                      AUCTION_SCHEMA,
                      AuctionDataExtended,
                      Buffer.from(auctionDataExtended.account.data, "base64")
                    );
                    safetyDeposit.info = deserializeUnchecked(
                      VAULT_SCHEMA,
                      SafetyDepositBox,
                      Buffer.from(safetyDeposit.account.data, "base64")
                    ) as SafetyDepositBox;
                    safetyDepositConfig.info = new SafetyDepositConfig({
                      data: Buffer.from(
                        safetyDepositConfig.account.data,
                        "base64"
                      ),
                    });

                    const { metadata, masterEdition } = props.itemData;

                    metadata.info = MetadataData.deserialize(
                      Buffer.from(metadata.account.data, "base64")
                    );

                    masterEdition.info = deserializeUnchecked(
                      METADATA_SCHEMA,
                      MasterEditionV2,
                      Buffer.from(masterEdition.account.data, "base64")
                    );

                    const items = [
                      [
                        {
                          metadata,
                          winningConfigType: 0,
                          safetyDeposit,
                          amount: new BN(1),
                          masterEdition,
                        },
                      ],
                    ];

                    const auctionView = {
                      auction,
                      auctionManager: new AuctionManager({
                        instance: auctionManagerInstance,
                        auction,
                        vault,
                        safetyDepositConfigs: [safetyDepositConfig],
                        bidRedemptions: [],
                      }),
                      state: AuctionViewState.Live,
                      vault,
                      auctionDataExtended,
                      safetyDepositBoxes: [safetyDeposit],
                      items: items,
                      thumbnail: items[0][0],
                      isInstantSale: true,
                      totallyComplete: true,
                      myBidderPot: undefined,
                      myBidderMetadata: undefined,
                    };

                    await sendPlaceBid(
                      connection,
                      wallet,
                      user.address,
                      auctionView as AuctionView,
                      new Map<string, TokenAccount>(),
                      auctionView.auctionDataExtended?.info.instantSalePrice,
                      "finalized"
                    );

                    await getProgramAccounts(
                      connection,
                      AUCTION_ID,
                      {
                        filters: [
                          {
                            memcmp: {
                              offset: 32,
                              bytes: auction.pubkey,
                            },
                          },
                        ],
                      }
                    ).then(
                      forEach(
                        processAuctions,
                        (s: any, pubkey: any, parsedAccount: any) => {
                          obj[s] = parsedAccount;
                        }
                      )
                    );

                    // bidder pot pull
                    await getProgramAccounts(
                      connection,
                      AUCTION_ID,
                      {
                        filters: [
                          {
                            memcmp: {
                              offset: 64,
                              bytes: auction.pubkey,
                            },
                          },
                        ],
                      }
                    ).then(
                      forEach(processAuctions, (s: any, pubkey: any, parsedAccount: any) => {
                        obj[s] = parsedAccount;
                      })
                    );

                    auctionView.auction = await getAuction(auction.pubkey);
                    auctionView.myBidderPot = obj.bidderPotsByAuctionAndBidder;
                    auctionView.myBidderMetadata = obj.bidderMetadataByAuctionAndBidder;

                    console.log(auctionView, "auctionView");
                    console.log(wallet, "wallet");
                    
                    

                    await sendRedeemBid(
                      connection,
                      wallet,
                      user.address,
                      auctionView,
                      new Map<string, TokenAccount>(),
                      {},
                      bidRedemptions,
                      []
                    );

                    await fetch("/api/update-nft", {
                      method: "PUT",
                      body: JSON.stringify({
                        id: props.id,
                        status: "AVAILABLE",
                        userId: user.id,
                        auctionData: null,
                        orderData: null,
                      }),
                      headers: {
                        "Content-Type": "application/json",
                      },
                    });
                    router.push(`/nfts/${user.id}`);

                    return;
                  }

                  const { ethereum } = window;

                  if (user.id && !user.solana && props.chainId != chainId) {
                    try {
                      await ethereum.request({
                        method: "wallet_switchEthereumChain",
                        params: [
                          {
                            chainId: `0x${Number(props.chainId).toString(16)}`,
                          },
                        ], // chainId must be in hexadecimal numbers
                      });
                      router.reload();
                      await new Promise((resolve) => setTimeout(resolve, 5000));
                    } catch (e: any) {
                      if (e.code === 4902) {
                        window.alert(
                          `Please add chain with id ${props.nft.chainId} to your wallet then try again`
                        );
                      }
                    }
                  }

                  const signer = library.getSigner();

                  const nftSwapSdk = new NftSwap(
                    library,
                    signer,
                    props.chainId,
                    {
                      zeroExExchangeProxyContractAddress: zeroContractAddresses[
                        Number(chainId)
                      ]
                        ? zeroContractAddresses[Number(chainId)]
                        : undefined,
                    }
                  );

                  const takerAsset: any = {
                    tokenAddress: props.signedOrder.erc20Token,
                    amount: props.signedOrder.erc20TokenAmount,
                    type: "ERC20",
                  };

                  // Check if we need to approve the NFT for swapping
                  const approvalStatusForUserB =
                    await nftSwapSdk.loadApprovalStatus(
                      takerAsset,
                      user.address
                    );
                  // If we do need to approve NFT for swapping, let's do that now
                  if (!approvalStatusForUserB.contractApproved) {
                    const approvalTx =
                      await nftSwapSdk.approveTokenOrNftByAsset(
                        takerAsset,
                        user.address
                      );
                    const approvalTxReceipt = await approvalTx.wait();
                    console.log(
                      `Approved ${takerAsset.tokenAddress} contract to swap with 0x. TxHash: ${approvalTxReceipt.transactionHash})`
                    );
                  }

                  const fillTx = await nftSwapSdk.fillSignedOrder(
                    props.signedOrder
                  );
                  const fillTxReceipt = await nftSwapSdk.awaitTransactionHash(
                    fillTx.hash
                  );

                  await fetch("/api/update-nft", {
                    method: "PUT",
                    body: JSON.stringify({
                      id: props.id,
                      status: "AVAILABLE",
                      fillTxReceipt,
                      userId: user.id,
                    }),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });

                  await fetch("/api/new-action", {
                    method: "POST",
                    body: JSON.stringify({
                      userId: user.id,
                      nftId: props.id,
                      name: "Buy",
                    }),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });

                  router.push(`/nfts/${user.id}`);
                }}
                loading={loading}
              >
                Buy
              </Button>
            )}
          </>
        )}
        {status === "AUCTION" && (
          <>
            {props.bidOrders && props.bidOrders.length && (
              <>
                <b>Highest Offer</b>
                <p>
                  {fromWei(props.bidOrders[0].signedOrder.erc20TokenAmount) +
                    ` ${props.symbol}`}
                </p>
              </>
            )}
            {!(props.bidOrders && props.bidOrders.length) && (
              <>
                <b>Starting Price</b>
                <p>{fromWei(props.startingPrice) + ` ${props.symbol}`}</p>
              </>
            )}
            <b>Expiry Time: </b>
            <p>{timeString(endAuctionTime)}</p>
            {user && user.id !== props.userId && (
              <>
                <br />
                <br />
                <Button
                  type="primary"
                  style={{ margin: "auto" }}
                  href={`/nfts/bid/${props.id}`}
                >
                  Bid
                </Button>
              </>
            )}
            <br />
            <br />
            <Button
              type="primary"
              style={{ margin: "auto" }}
              href={`/nfts/offers/${props.id}`}
            >
              View Offers
            </Button>
          </>
        )}
      </Card>
      <br />
    </>
  );
}

export default NftItem;
