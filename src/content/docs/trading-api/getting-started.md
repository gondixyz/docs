---
title: "Getting Started"
description: "Trade NFTs on GONDI from a script: the GraphQL endpoint, signing in, finding collection, NFT and trait ids, amounts and the currency approval bids need."
---

GONDI's trading API lets a script or a trading desk do everything the GONDI app does with bids: place single-NFT, collection, trait and set bids, place them as stealth bids, cancel them (without gas, for most bids), read the order book and fill orders.

It is the same GraphQL API the app uses. Reads are public; anything that creates or cancels an order needs a signed-in wallet.

| | |
| --- | --- |
| Endpoint | `https://api.gondi.xyz/graphql` |
| Schema | Introspection is enabled: any GraphQL client can load the full schema from the endpoint. |
| SDK | [`gondi`](https://www.npmjs.com/package/gondi) on npm, with its reference at [gondixyz.github.io/gondi-js](https://gondixyz.github.io/gondi-js/) |

The pages in this section:

* [Placing Bids](/trading-api/placing-bids/): the four kinds of bid and how to sign one.
* [Stealth Bids](/trading-api/stealth-bids/): bids only the holders who can fill them see.
* [Cancelling Orders](/trading-api/cancelling-orders/): gasless and onchain cancels.
* [Order Book & Fills](/trading-api/order-book-and-fills/): reading bids and listings, and accepting a bid.

## Signing In

Mutations that create or cancel orders act for the signed-in wallet: the order's maker is always that wallet.

1. `generateSignInNonce(nonceInput: { walletAddress })` returns a nonce.
2. The wallet signs a [Sign-In with Ethereum](https://eips.ethereum.org/EIPS/eip-4361) message carrying that nonce. This is a signature, not a transaction, so it costs no gas.
3. `signInWithEthereum(siweInput: { message, signature })` returns a session token.
4. Send it as `Authorization: Bearer <token>` on every call that publishes, cancels or fills an order.

The SDK signs in on its first authenticated call and reuses the session.

Trading calls are refused from geoblocked regions, and while GONDI pauses trading.

## Ids

Orders name collections, NFTs and traits by GONDI ids, not by contract address. Look them up once and keep them:

| You have | Query | Returns |
| --- | --- | --- |
| A collection slug | `getCollectionBySlug(slug)` | `Collection.id` |
| A collection slug and token id | `getNftBySlugAndTokenId(slug, tokenId)` | `NFT.id` |
| A trait name and value | `listCollectionTraitValues(collectionIds, key, searchTerm)` | `TraitValue.id`, with its `key` and `value` |

```graphql
query Ids {
  getCollectionBySlug(slug: "pudgypenguins") {
    id
  }
  getNftBySlugAndTokenId(slug: "pudgypenguins", tokenId: "1") {
    id
  }
  listCollectionTraitValues(collectionIds: [2173], key: ["Background"], first: 20) {
    edges {
      node {
        id
        key
        value
      }
    }
  }
}
```

The SDK wraps the first two as `gondi.collectionId({ slug })` and `gondi.nftId({ slug, tokenId })`.

## Amounts, Times and Ids in the Schema

* **Amounts** are `BigInt` strings in the currency's smallest unit: WETH has 18 decimals, USDC 6.
* **`startTime` and `expirationTime`** are Unix timestamps in seconds.
* **Order ids** are `Int64`. Collection, NFT and trait ids are `Int`.
* **Lists** are Relay connections: pass `first` and the previous page's `pageInfo.endCursor` as `after`.

## Currency Approval

A bid is a signed [Seaport](https://github.com/ProjectOpenSea/seaport) order: the currency stays in the bidder's wallet until a seller fills the bid, and Seaport pulls it then. Before bidding, approve the bid currency (WETH or USDC on Ethereum) once for the Seaport 1.6 contract, `0x0000000000000068F116a894984e2DB1123eB395`.

The wallet must still hold the funds and the approval when a seller fills the bid, or the fill fails.

```ts
import { Gondi } from 'gondi';
import { createWalletClient, http, maxUint256 } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mainnet } from 'viem/chains';

const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
const SEAPORT = '0x0000000000000068F116a894984e2DB1123eB395';

const wallet = createWalletClient({
  account: privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`),
  transport: http(process.env.RPC_URL),
  chain: mainnet,
});
const gondi = new Gondi({ wallet });

if (!(await gondi.isApprovedToken({ tokenAddress: WETH, to: SEAPORT, amount: maxUint256 }))) {
  const approval = await gondi.approveToken({ tokenAddress: WETH, to: SEAPORT });
  await approval.waitTxInBlock();
}
```

:::caution
The wallet signs orders that move real funds. Keep its private key out of logs and prompts, and only approve the contracts listed here and under [Protocol Contracts](/gondi-v3/protocol-contracts/).
:::
