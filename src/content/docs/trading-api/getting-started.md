---
title: "Getting Started"
description: "Trade NFTs on GONDI from a script: the GraphQL endpoint, signing in, finding collection, NFT and trait ids, amounts and the currency approval bids need."
---

GONDI's trading API lets a script or a trading desk bid on NFTs the way the GONDI app does: place single-NFT, collection, trait and set bids, place them as stealth bids, cancel them (without gas, for most bids), read the order book and accept bids on NFTs you hold.

It is the same GraphQL API the app uses. Reads are public; anything that creates, cancels or accepts an order needs a signed-in wallet.

There are no API keys: a wallet signature is the only credential, as described under [Signing In](#signing-in).

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
2. The wallet signs a [Sign-In with Ethereum](https://eips.ethereum.org/EIPS/eip-4361) message carrying that nonce, as a plain `personal_sign` message. This is a signature, not a transaction, so it costs no gas.
3. `signInWithEthereum(siweInput: { message, signature })` returns a session token.
4. Send it as `Authorization: Bearer <token>` on every call that publishes, cancels or accepts an order.

The API checks the message strictly and rejects it unless:

* the domain is `gondi.xyz` and the URI is `https://api.gondi.xyz/graphql`;
* the statement is exactly `Sign in with Ethereum to the app.`;
* the chain id is `1` (Ethereum);
* the address is checksummed ([EIP-55](https://eips.ethereum.org/EIPS/eip-55));
* `Issued At` is within 5 minutes of the API's clock.

The message to sign, line by line:

```text
gondi.xyz wants you to sign in with your Ethereum account:
0xYourChecksummedWalletAddress

Sign in with Ethereum to the app.

URI: https://api.gondi.xyz/graphql
Version: 1
Chain ID: 1
Nonce: <nonce from generateSignInNonce>
Issued At: 2026-11-04T17:00:00.000Z
```

The SDK builds and signs this message on its first authenticated call and reuses the session.

Trading calls are refused from geoblocked regions, and while GONDI pauses trading.

## Finding Collections, NFTs and Traits

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

## Amounts and Times

* **Amounts** are `BigInt` strings in the currency's smallest unit: WETH has 18 decimals, USDC 6.
* **`startTime` and `expirationTime`** are Unix timestamps in seconds.

## Currency Approval

A bid is a signed [Seaport](https://github.com/ProjectOpenSea/seaport) order: the currency stays in the bidder's wallet until a seller fills the bid, and Seaport pulls it then. Before bidding, approve the bid currency (WETH or USDC on Ethereum) once for the Seaport 1.6 contract, `0x0000000000000068F116a894984e2DB1123eB395`.

The wallet must still hold the funds and the approval when a seller fills the bid, or the fill fails.

With the [`gondi` SDK](https://www.npmjs.com/package/gondi), create a client from a [viem](https://viem.sh) wallet client and send the approval once. `approveToken` approves an unlimited amount unless you pass `amount`.

```ts
const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';

const gondi = new Gondi({ wallet: createWalletClient(...) });

const approval = await gondi.approveToken({
  tokenAddress: WETH,
  to: '0x0000000000000068F116a894984e2DB1123eB395', // Seaport 1.6
});
await approval.waitTxInBlock();
```

The other pages reuse this `gondi` client and `WETH` constant in their SDK examples.

:::caution
The wallet signs orders that move real funds. Keep its private key out of logs and prompts, and only approve the contracts listed here and under [Protocol Contracts](/gondi-v3/protocol-contracts/).
:::
