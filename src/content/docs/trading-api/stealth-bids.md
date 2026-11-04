---
title: "Stealth Bids"
description: "Stealth bids through the GONDI API: who sees them, what is masked, what they cost and how to read your own."
---

A stealth bid is a bid that only the people who can fill it see. Other bidders never see it in the order book, and the holders who do see it never learn who placed it.

Any bid can be a stealth bid: single-NFT, collection, trait, multi-trait and set bids all take `stealth: true` on their publish mutation. Nothing else changes — the same inputs, the same [signing flow](/trading-api/placing-bids/#the-signing-flow), the same `maxExecutions` and [cancels](/trading-api/cancelling-orders/).

```graphql
mutation StealthTraitBid($signature: Signature) {
  publishOrderForTrait(
    orderInput: {
      traitIds: [12276798]
      currencyAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
      price: "2000000000000000000"
      startTime: "1767225600"
      expirationTime: "1767312000"
      isAsk: false
      stealth: true
      signature: $signature
    }
  ) {
    __typename
    ... on SignatureRequest {
      key
      typedData
    }
    ... on TraitOrder {
      id
      price
      netAmount
      stealth
      feeMetadata {
        publicationFee
        executionFee
      }
    }
  }
}
```

With the SDK, add `stealth: true` to the `gondi.makeOrder` input.

## Who Sees a Stealth Bid

| Viewer | Sees the bid | As |
| --- | --- | --- |
| The bidder, signed in with the wallet that placed it (or a wallet linked to it) | Yes | The full order |
| A holder who can fill it | Yes | A masked order |
| Anyone else, signed in or not | No | — |

A holder can fill the bid when they own, or have an active GONDI loan against, an NFT that matches it: the NFT itself for a single-NFT bid, any NFT of the collection for a collection bid, an NFT with the trait (or with all the traits) for a trait bid.

### The Masked Order

A holder receives the bid as a `StealthMaskedOrder` whose `orderType` is `stealth_order`:

* **Hidden**: `maker` is the zero address, there is no maker name or picture, `evmOrder.offerer` is zeroed and `signature` is `0x`. The holder also does not learn whether it is a collection, trait or single-NFT bid.
* **Shown**: `price`, `netAmount`, `fees`, the currency, `expiration`, `maxExecutions` and `executions`, and `status`.

Because the signature is withheld, a stealth bid can only be filled through GONDI, never by submitting the order to Seaport directly.

Stealth bids are also left out of public market data: collection and NFT top-bid figures, price statistics and valuations only count them in the bidder's own view.

## What a Stealth Bid Costs

A stealth bid carries two fees, both paid only when it fills (they are part of the signed order):

* **Publication fee**, paid by the bidder on top of the bid.
* **Execution fee**, taken out of the bid before the seller is paid, in place of the regular sale fee.

Both are currently 0.5% of the bid; [Protocol Fees](/gondi-v3/protocol-fees/) has the current schedule, and `listPlatformFees` returns the rates for a collection (operations `STEALTH_BID_PUBLICATION` and `STEALTH_BID_EXECUTION`).

On the published order, for a bid of `price` P:

| Field | Value |
| --- | --- |
| `price` | P + publication fee: what one fill costs the bidder |
| `netAmount` | P − execution fee (and any royalties): what the seller receives |
| `feeMetadata` | `publicationFee`, `executionFee` and the operation each one comes from |

Size the wallet's balance and approval on the published `price`, not on P.

## Reading Your Own Stealth Bids

The bidder sees their stealth bids only while signed in as the wallet that placed them. Ask for them with `stealth: true`, which requires `walletAddresses`:

```graphql
query MyStealthBids($wallet: Address!) {
  listOrdersV2(
    side: BID
    maker: [$wallet]
    stealth: true
    walletAddresses: [$wallet]
    statuses: [Active]
    first: 50
  ) {
    edges {
      node {
        __typename
        id
        price
        netAmount
        maxExecutions
        executions
        expiration
        cancelsOffChain
      }
    }
  }
}
```

## Stealth Listings

Sellers have a counterpart, the [Off-Market listing](/gondi-v3/off-market-listings/): a private asking price that executes when a matching bid meets it. It is published with `stealth: true` and `isAsk: true` on `publishOrderForNft`, only in ERC-20 currencies and above a minimum price, and carries its own fee.
