---
title: "Placing Bids"
description: "Place single-NFT, collection, trait and set bids through the GONDI API: the publish mutations, their inputs and the sign-and-resubmit flow."
---

GONDI has four kinds of bid. Each has its own mutation, and all of them take the same terms and follow the same signing flow.

| Bid | Mutation | Fills with |
| --- | --- | --- |
| Single NFT | `publishOrderForNft` | One NFT, named by `contractAddress` and `tokenId` |
| Collection | `publishOrderForCollection` | Any NFT of `collectionId` (ERC-721 collections only) |
| Trait | `publishOrderForTrait` | Any NFT carrying the trait in `traitIds`. With several ids it is a multi-trait bid: the NFT must carry all of them. |
| Set | `publishOrderForNftSet` | Any NFT in `nftIds`, a handpicked set of 2 to 1,000 NFTs of `collectionId` |

Collection, trait and set bids fill up to `maxExecutions` times (default 1), one NFT per fill.

## The Signing Flow

The API builds the order; the wallet signs it.

1. Call the mutation with your terms and no `signature`. It returns a `SignatureRequest`: `typedData` is the [EIP-712](https://eips.ethereum.org/EIPS/eip-712) order to sign, and `key` names the input field the signature goes in (`signature`).
2. Sign `typedData` with the wallet. No gas.
3. Call the mutation again with the same input plus the signature. It returns the published order.

Change nothing but the signature between the two calls: the API rebuilds the order from the input and rejects a signature that does not match it.

## Inputs

Every publish mutation takes these fields, plus the ones of its kind in the table above:

| Field | Type | |
| --- | --- | --- |
| `currencyAddress` | `Address!` | The bid currency, such as WETH |
| `price` | `BigInt` | What one fill costs the bidder, fees included. Platform fees and royalties come out of it; the seller receives the rest. |
| `amount` | `BigInt` | Alternative to `price`: the price is `amount` plus the `fees` you pass. Send one of the two. |
| `fees` | `[OrderFee!]` | Extra fee recipients, `{ amount, taker }`. GONDI's platform fees are added when missing. |
| `startTime` | `BigInt!` | Unix seconds |
| `expirationTime` | `BigInt!` | Unix seconds |
| `isAsk` | `Boolean` | `false` for a bid. Required by `publishOrderForNft`, which also publishes listings. |
| `stealth` | `Boolean` | Publish as a [stealth bid](/trading-api/stealth-bids/) |
| `taker` | `Address` | Only this wallet can fill the bid |
| `maxExecutions` | `BigInt` | Collection, trait and set bids: how many NFTs the bid buys |
| `signature` | `Signature` | Empty on the first call |

The order the bidder signs offers `price × maxExecutions`, so the wallet's balance and approval must cover the whole amount for every fill to succeed.

### Required Royalties

Some collections enforce creator royalties. Their bids must carry each enforced royalty in `fees`, or the API rejects them. `Collection.royalties` lists them: for every entry with `required: true`, add `{ taker: beneficiary, amount: price × round(percentage × 100) / 10000 }`, in integer math on the per-fill price. Royalties that are not required are optional.

The published order reports `price` (what the bidder pays per fill), `netAmount` (what the seller receives) and `fees` (the difference). Current fee rates are under [Protocol Fees](/gondi-v3/protocol-fees/), and `listPlatformFees(blockchain, collectionId, operation)` returns them for a collection.

## Example

A collection bid of 2 WETH per NFT for up to three Pudgy Penguins, valid for a day:

```graphql
mutation CollectionBid($signature: Signature) {
  publishOrderForCollection(
    orderInput: {
      collectionId: 2173
      currencyAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
      price: "2000000000000000000"
      maxExecutions: "3"
      startTime: "1767225600"
      expirationTime: "1767312000"
      isAsk: false
      signature: $signature
    }
  ) {
    __typename
    ... on SignatureRequest {
      key
      typedData
    }
    ... on CollectionOrder {
      id
      price
      netAmount
      fees
      maxExecutions
      expiration
    }
  }
}
```

The SDK runs both calls in one: `gondi.makeOrder` picks the mutation from the fields you pass (`tokenId`, `traitIds`, `nftIds`, or `collectionId` alone), signs the request and returns the order.

```ts
const now = BigInt(Math.floor(Date.now() / 1_000));

const bid = await gondi.makeOrder({
  collectionId: await gondi.collectionId({ slug: 'pudgypenguins' }),
  currencyAddress: WETH,
  price: parseEther('2'),
  maxExecutions: 3n,
  startTime: now,
  expirationTime: now + 86_400n,
  isAsk: false,
});

// A trait bid: any Pudgy Penguin with a blue background.
const traitBid = await gondi.makeOrder({
  traitIds: [12276798],
  currencyAddress: WETH,
  price: parseEther('2.1'),
  startTime: now,
  expirationTime: now + 86_400n,
  isAsk: false,
});
```
