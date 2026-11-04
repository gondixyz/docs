---
title: "Cancelling Orders"
description: "Cancel GONDI bids without gas through the API, or onchain through Seaport, and when each cancel takes effect."
---

Most GONDI bids cancel without a transaction. The rest, and every listing, cancel onchain through Seaport.

## Gasless Cancels

New GONDI bids on Ethereum are restricted to GONDI's signed zone: Seaport only fills them with a short-lived fill signature that GONDI issues to the seller at fill time. To cancel such a bid, GONDI stops issuing signatures for it, so no transaction is needed.

Each order's `cancelsOffChain` field says whether it cancels this way.

```graphql
mutation Cancel($orderIds: [Int64!]!) {
  cancelTradeOrders(orderIds: $orderIds) {
    cancelledOrders {
      id
      status
    }
    onChainOrderIds
    cancelOrdersCalldata {
      marketPlaceAddress
      calldata
    }
  }
}
```

* **`cancelledOrders`**: the orders cancelled without a transaction.
* **`onChainOrderIds`**: the ids that cannot cancel offchain, such as listings and bids placed before the signed zone.
* **`cancelOrdersCalldata`**: the Seaport cancel for those ids, one transaction per marketplace. Send `calldata` to `marketPlaceAddress` from the maker's wallet.

Only the signed-in wallet's own orders can be cancelled. The SDK accepts at most 50 ids per call.

:::note[When a gasless cancel is final]
A fill signature GONDI issued just before the cancel stays valid until it expires, a few minutes at most. A seller who already held one could still fill the bid in that window; after it, the bid cannot fill. When a cancel must be final immediately, cancel onchain instead.
:::

## Onchain Cancels

`getCancelOrdersCalldata(maker, orderIds)` returns the Seaport cancel calldata for any of the maker's orders, whether or not they could cancel offchain. The cancel is final as soon as the transaction is mined.

`getCancelAllNftOrdersCalldata(walletAddress, nftId, kind, isAsk, statuses)` builds the cancel of every order a wallet has on one NFT.

## With the SDK

```ts
// Gasless where possible; transactions for the rest.
const { offChainOrderIds, transactions } = await gondi.cancelOrders({
  orderIds: [Number(bid.id)],
});
for (const transaction of transactions) await transaction.waitTxInBlock();

// Every order onchain, final once mined.
await gondi.cancelOrders({ orderIds: [Number(bid.id)], onChain: true });
```

## Hiding Is Not Cancelling

`hideOrder(orderIdInt64)` removes a bid from GONDI's order book, and `showOrder` brings it back, but the signed order stays valid. Use it to pause a bid, not to withdraw it. Listings cannot be hidden.
