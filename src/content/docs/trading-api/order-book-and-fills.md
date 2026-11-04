---
title: "Order Book & Fills"
description: "Read bids and listings from the GONDI API, and build the transaction that accepts a bid."
---

## Reading Orders

`listOrdersV2` is the order book: bids and listings on GONDI, plus the OpenSea and CryptoPunks orders GONDI aggregates. Every argument is optional and they combine.

| Argument | |
| --- | --- |
| `side` | `BID` or `ASK` |
| `statuses` | `Active`, `Executed`, `Cancelled`, `Expired`, `Inactive`, `Outperformed` |
| `maker`, `excludeMaker` | Wallets that placed the order |
| `taker`, `excludeTaker` | Wallet the order is restricted to |
| `idsInt64` | Specific orders |
| `nfts` | `[{ nftId, collectionId }]` |
| `collectionIds`, `traitIds` | Orders on these collections or traits |
| `orderTypes` | `SINGLE_NFT`, `COLLECTION`, `TRAIT`, `MULTIPLE_TRAIT`, `SET_BID` |
| `matchMode` | `ALL` (default) or `ANY`. With `side: BID` and `collectionIds` or `traitIds`, `ANY` returns every kind of bid that can fill there: single-NFT, collection and trait bids together. |
| `marketplaces` | `NATIVE` for GONDI's own orders, `OPEN_SEA`, `CRYPTOPUNKS`, … |
| `currencyAddresses` | |
| `stealth`, `walletAddresses` | Your own [stealth bids](/trading-api/stealth-bids/#reading-your-own-stealth-bids) |
| `terms` | `{ netAmount: { min, max }, minFloorRatio }` |
| `sortBy` | `[{ field, order }]`, `field` one of `PRICE`, `NET_AMOUNT`, `CREATED_DATE`, `EXPIRATION`, `FEE`, … |
| `first`, `after` | Pagination |

```graphql
query CollectionBids {
  listOrdersV2(
    side: BID
    collectionIds: [2173]
    marketplaces: [NATIVE]
    statuses: [Active]
    first: 20
  ) {
    edges {
      node {
        __typename
        id
        price
        netAmount
        fees
        currencyAddress
        maker
        maxExecutions
        executions
        expiration
        cancelsOffChain
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
```

`__typename` tells the kind: `SingleNFTOrder`, `CollectionOrder`, `TraitOrder`, `MultipleTraitOrder` or `SetBidOrder` (and `StealthMaskedOrder` for a [stealth bid](/trading-api/stealth-bids/#the-masked-order) you can fill). `evmOrder(integerStrings: true)` returns the underlying Seaport order.

## Accepting a Bid

`getOrderSaleCalldata(orderIdInt64, nftId, taker)` returns the calldata that sells an NFT into a bid, built for the signed-in wallet (or `taker`). `nftId` is the NFT you sell, required for collection, trait and set bids. Send the calldata to the order's `marketPlaceAddress`. For a signed-zone bid it carries GONDI's fill signature for that wallet, valid for a few minutes, so send it right away.

Before accepting, the seller approves the NFT contract (`setApprovalForAll`) for Seaport, `0x0000000000000068F116a894984e2DB1123eB395`. Collections that enforce creator royalties through an ERC-721C transfer validator block Seaport as an operator; for those, approve the OpenSea conduit `0x1E0049783F008A0085193E00003D00cd54003c71` instead, which the calldata routes through.
