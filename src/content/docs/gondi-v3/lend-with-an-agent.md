---
title: "Lend with an Agent"
description: "How scripts and AI agents with their own wallet lend on GONDI: sign in to the API, approve the loan contract, sign loan offers and read yield data."
---

Lending on GONDI does not need a browser. A script or an AI agent that controls its own wallet can make loan offers and earn interest exactly like a lender in the GONDI app: it signs offers with its key, and borrowers take them against their NFTs.

:::caution
The agent signs with a wallet that holds real funds. Keep its private key out of prompts and logs, and only approve the contracts listed under [Protocol Contracts](/gondi-v3/protocol-contracts/).
:::

## How Lending Works

1. **Sign in to the API**: the wallet signs a [Sign-In with Ethereum](https://eips.ethereum.org/EIPS/eip-4361) message (`generateSignInNonce`, then `signInWithEthereum`). This is a signature, not a transaction, so it costs no gas. The API returns a session token that goes in the `Authorization: Bearer <token>` header of every call that prepares, saves or hides an offer.
2. **Approve the loan contract**: one onchain transaction lets the Multi Source Loan contract spend the principal currency (an ERC-20 such as WETH or USDC). The funds stay in the lender's wallet.
3. **Sign the offer**: the API fills in the offer from your terms — principal, APR, duration, expiration, origination fee and, for collection offers, capacity (`generateCollectionOfferToBeSigned`; single-NFT and trait offers have matching mutations). The wallet then signs it as [EIP-712](https://eips.ethereum.org/EIPS/eip-712) typed data for the Multi Source Loan contract. No gas.
4. **Submit the offer**: the signed offer is saved through the API (`saveSignedCollectionOffer` for a collection offer) and appears in the GONDI app next to every other offer.

Offers stay offchain until a borrower accepts one. Only then does the Multi Source Loan contract check the signature and pull the principal from the lender's wallet, so the wallet must still hold the funds and the approval at that moment.

To withdraw an offer, either hide it through the API (no gas, but the signed offer stays valid onchain until it expires) or cancel it onchain with a transaction. See [Loan Offers](/gondi-v3/loan-offers/) for how offers, capacity and Senior Tolerance work.

### Offer Rules

* **Duration**: in seconds, as a whole number of days — either a multiple of 30 days, or one of the short terms the API accepts: 3, 5, 7, 10, 15, 20 or 45 days. Any other value fails with `INVALID_OFFER_DURATION_ERROR`.
* **Amounts**: in the currency's smallest unit (WETH and WHYPE have 18 decimals, USDC and USDG have 6). APRs are in basis points: `1000` is 10%.
* **Active offers**: a lender can keep at most 2 active offers for the same collection (or NFT), contract, duration and currency.

## Chains and Currencies

| Chain | Chain ID | Principal currencies |
| --- | --- | --- |
| Ethereum | `1` | WETH `0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2`, USDC `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48` |
| HyperEVM | `999` | WHYPE `0x5555555555555555555555555555555555555555`, USDC `0xb88339CB7199b77E23DB6E890353E22632Ba630f` |
| Robinhood Chain | `4663` | WETH `0x0Bd7D308f8E1639FAb988df18A8011f41EAcAD73`, USDG `0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168` |

The Multi Source Loan address to approve on each chain is listed under [Protocol Contracts](/gondi-v3/protocol-contracts/).

## Reading Yield Data

Lending data is public. The GraphQL API at `https://api.gondi.xyz/graphql` answers reads without an API key or sign-in, and introspection is enabled, so any GraphQL client can explore the full schema.

```bash
curl -s https://api.gondi.xyz/graphql \
  -H 'content-type: application/json' \
  -d '{"query":"{ getLendingMarketPulse { asOf periods { period medianEaprBps } } }"}'
```

Fields ending in `Bps` are basis points (`2500` is 25%). The `Usd` amounts of `getLendingMarketPulse` are in micro-USD (divide by 1,000,000), while `getTopLenders` returns plain USD.

**Market pulse** — outstanding principal, interest paid to lenders in the last 30 days, and the effective APR of new loans over rolling 24-hour, 7-day and 30-day windows:

```graphql
query MarketPulse {
  getLendingMarketPulse {
    asOf
    outstandingPrincipalUsd
    paidInterest30dUsd
    periods {
      period
      originatedCount
      medianEaprBps
      eaprP25Bps
      eaprP75Bps
    }
  }
}
```

**Top lenders** — the lenders with the best net effective APR over the last 90 days (`metric` can also be `EARNINGS`, `OUTSTANDING_PRINCIPAL` or `LOWEST_DEFAULT_RATE`):

```graphql
query TopLenders {
  getTopLenders(metric: NET_EAPR, period: LAST_90_DAYS, first: 5) {
    asOf
    rows {
      rank
      walletAddress
      netEaprBps
      outstandingUsd
      defaultRateBps
    }
  }
}
```

**Active offers on a collection** — the competing collection offers on Pudgy Penguins, best APR first:

```graphql
query CollectionOffers {
  listOffers(
    slugs: ["pudgypenguins"]
    statuses: [ACTIVE]
    onlyCollectionOffers: true
    sortBy: [{ field: APR_BPS, order: DESC }]
    first: 5
  ) {
    totalCount
    edges {
      node {
        aprBps
        principalAmount
        duration
        expirationTime
        contractAddress
        currency {
          symbol
          decimals
        }
      }
    }
  }
}
```

## Using the SDK

The [`gondi`](https://www.npmjs.com/package/gondi) npm package is a TypeScript SDK that runs the whole flow above with a private key: it signs in on the first API call and reuses the session, prepares and signs offers, and picks the contracts for the wallet's chain. Its full reference is at [gondixyz.github.io/gondi-js](https://gondixyz.github.io/gondi-js/).

```bash
npm install gondi viem
```

```ts
import { Gondi, OfferStatus } from 'gondi';
import { createWalletClient, http, parseEther } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mainnet } from 'viem/chains';

const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
const SECONDS_PER_DAY = 86_400n;

const wallet = createWalletClient({
  account: privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`),
  transport: http(process.env.RPC_URL),
  chain: mainnet,
});
const gondi = new Gondi({ wallet });

// 1. Let the loan contract pull the principal when a borrower takes the offer (onchain, once).
const principalAmount = parseEther('1');
if (!(await gondi.isApprovedToken({ tokenAddress: WETH, amount: principalAmount }))) {
  const approval = await gondi.approveToken({ tokenAddress: WETH }); // Unlimited unless you pass `amount`.
  await approval.waitTxInBlock();
}

// 2. Find the collection to lend against.
const collectionId = await gondi.collectionId({ slug: 'pudgypenguins' });

// 3. Sign and publish a collection offer.
const offer = await gondi.makeCollectionOffer({
  collectionId,
  principalAddress: WETH,
  principalAmount,
  capacity: principalAmount, // Total lent across every loan taken from this offer.
  fee: 0n, // Origination fee, in principal units.
  aprBps: 1_000n, // 10% APR.
  duration: 30n * SECONDS_PER_DAY,
  expirationTime: BigInt(Math.floor(Date.now() / 1_000)) + SECONDS_PER_DAY, // Valid for one day.
  maxSeniorRepayment: 0n, // 0n: the offer only funds a loan's first (senior) tranche.
});

// 4. List your active offers.
const { offers } = await gondi.offers({
  filterBy: { lenders: [wallet.account.address], status: [OfferStatus.Active] },
});

// 5. Withdraw the offer: hide it from the API (no gas), or cancel it onchain.
await gondi.hideOffer({ id: offer.offerId, contractAddress: offer.contractAddress });
const cancellation = await gondi.cancelOffer({
  id: offer.offerId,
  contractAddress: offer.contractAddress,
});
await cancellation.waitTxInBlock();
```

The same client also makes single-NFT offers (`makeSingleNftOffer`) and trait offers (`makeTraitOffer`).

## Risks and Fees

* **NFT collateral**: if the borrower does not repay by the due date, the lender does not get the principal back. On a single-lender loan the lender claims the NFT, which may be worth less than what was lent. A loan split across several tranches first gives its largest lender a buyout window, then goes to auction, and the lenders share the proceeds, senior tranches first. See [Liquidations, Buyouts & Auctions](/gondi-v3/liquidations-buyouts-and-auctions/).
* **Interest**: interest only accrues while the loan is active. Borrowers can repay early, and other lenders can [refinance](/gondi-v3/refinancing/) the loan with better terms (unless it was funded by a Private Offer), which pays the current lender back its principal plus the interest accrued so far.
* **Fees**: the protocol takes 15% of the interest the lender earns and of any origination fee, and 20% of the interest on loans funded by a Private Offer. See [Protocol Fees](/gondi-v3/protocol-fees/).
* **Smart contracts**: audit reports for every version are under [Security & Audits](/gondi-v3/security-and-audits/).

:::note
An MCP server that lets AI agents use GONDI directly is on the way. This page will link it once it is live.
:::
