---
title: "Order Book & Fills"
description: "Read bids, listings and sales from the GONDI API, and build the transactions that accept a bid or buy a listing."
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

Other reads:

* `getCollectionHighestBidMatchingTraits(collectionId, traitIds)`: the best collection, trait or multi-trait bid an NFT with those traits can fill.
* `collectionMarketDepth(collectionIds)`: bid and listing depth per collection.
* `listSales(collections, nfts, traits, users, fromTimestamp, toTimestamp, …)`: executed sales.
* `saleListingUpdates(collections, nftIds, marketplaces)`: a subscription that streams listing and sale changes over WebSocket.

## Filling Orders

The API returns ready-to-send calldata, built for the signed-in wallet (or `taker`); the wallet sends it to the order's `marketPlaceAddress`.

| Query | Use |
| --- | --- |
| `getOrderSaleCalldata(orderIdInt64, nftId, taker)` | Accept one bid. `nftId` is the NFT you sell into it, required for collection, trait and set bids. For a signed-zone bid the calldata carries GONDI's fill signature for that wallet, valid for a few minutes: send it right away. |
| `getSaleManyOrdersCalldata(sales: [{ orderId, nftId }])` | Accept several bids, one transaction per marketplace |
| `getFulfillManyOrdersCalldata(orderIds)` | Buy several listings |

To accept a bid, the seller approves the NFT contract (`setApprovalForAll`) for Seaport, `0x0000000000000068F116a894984e2DB1123eB395`. Collections that enforce creator royalties through an ERC-721C transfer validator block Seaport as an operator; for those, approve the OpenSea conduit `0x1E0049783F008A0085193E00003D00cd54003c71` instead, which the calldata routes through. Buying a listing needs the currency.
