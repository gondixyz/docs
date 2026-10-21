---
title: "Introducing GONDI"
---

## What is GONDI?

GONDI is a decentralized, non-custodial protocol for NFT trading and lending. Trade ERC-721s and ERC-1155 units. Borrow against eligible ERC-721s or CryptoPunks; ERC-1155 collateral requires a vault.

Availability varies by chain and contract:

| Network | Chain ID | Protocol contracts | Collections |
| --- | --- | --- | --- |
| Ethereum | `1` | [Contracts](/gondi-v3/protocol-contracts/#ethereum) | [Collections](/gondi-v3/whitelisted-collections/#ethereum) |
| HyperEVM | `999` | [Contracts](/gondi-v3/protocol-contracts/#hyperevm) | [Collections](/gondi-v3/whitelisted-collections/#hyperevm) |
| Robinhood Chain | `4663` | [Contracts](/gondi-v3/protocol-contracts/#robinhood-chain) | [Collections](/gondi-v3/whitelisted-collections/#robinhood-chain) |

## Trading

GONDI aggregates listings from native GONDI, OpenSea, and the CryptoPunks marketplace. Standard listings are subject to a 0.5% protocol fee. Private listings, public listings, and Sell & Repay (sale of escrowed collateral with automatic loan repayment) are supported.

The protocol supports standard bids, multi-item bids, trait and multi-trait bids, and stealth bids (visible only to the NFT owner; bidder wallet and balance are not disclosed).

Trade [ERC-1155 units](/gondi-v3/erc-1155-trading/), bid on editions or [selected artist works](/gondi-v3/buy-and-sell-on-gondi/#offers-across-an-artists-works).

## Lending

GONDI is a peer-to-peer NFT lending protocol with pro-rata interest, instant refinancing, and partial (tranche) refinancing. V3.1 introduces Tranche Seniority for risk segmentation across loan tranches, and V3.2 adds Private Offers for lenders who want to keep a loan to themselves.

Lend against an NFT, a collection or [selected traits](/gondi-v3/loan-offers/#trait-loan-offers).

## V3.1 Features

* **Currencies.** Supported combinations depend on the transaction. See [buying with a loan](/gondi-v3/purchase-bundler/#supported-currencies) and [Sell & Repay](/gondi-v3/sell-and-repay/#cross-currency-bid-acceptance).
* **Tranche Seniority.** Lenders can refinance a portion of an outstanding loan with defined seniority, enabling more granular risk pricing.
* **Stealth Bidding.** Bids are visible only to the owner of the targeted NFT. Bidder identity and balance are not exposed on-chain or in the UI.
* **Sell & Repay.** Borrowers can sell escrowed collateral in a single transaction. Outstanding loan principal and accrued interest are repaid; any surplus is transferred to the borrower.

## V3.2 Features

* **Private Offers.** Lenders can disable refinancing when creating an offer. Loans funded by a Private Offer can never be refinanced or topped up by another lender; the borrower can still repay or renegotiate out by accepting a new offer. See [Offer Options](/gondi-v3/loan-offers/#offer-options) and [Refinancing](/gondi-v3/refinancing/#private-offers-gondi-v32).
* **Single-tranche private loans.** A Private Offer funds the whole loan on its own, so Senior Tolerance does not apply.
* **Private loan fee.** The protocol fee on the lender's realized interest is 20% for private loans, instead of the standard 15%. See [Protocol Fees](/gondi-v3/protocol-fees/).
* **Availability.** GONDI V3.2 is deployed on Ethereum mainnet only, alongside V3.1 — see [Protocol Contracts](/gondi-v3/protocol-contracts/#ethereum). Offers without the Private Offer option keep working as before.

:::note
**GONDI V1 & GONDI V2 Outstanding Loans: No action needed.** 
Loans originated on GONDI V1 & GONDI V2 are not impacted by GONDI V3 and mechanics will remain the same.
:::

:::note
The contents of GONDI docs are a collection of the latest development updates and are never considered final.
:::
