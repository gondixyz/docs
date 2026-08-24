---
title: "Introducing GONDI"
---

## What is GONDI?

GONDI is a decentralized, non-custodial, peer-to-peer protocol for trading and financing NFTs. Users can buy, sell, bid, and borrow against ERC-721 and ERC-1155 collateral.

GONDI is deployed on Ethereum mainnet and HypeEVM.

## Trading

GONDI aggregates listings from native GONDI, OpenSea, and the CryptoPunks marketplace. Standard listings are subject to a 0.5% protocol fee. Private listings, public listings, and Sell & Repay (sale of escrowed collateral with automatic loan repayment) are supported.

The protocol supports standard bids, multi-item bids, trait and multi-trait bids, and stealth bids (visible only to the NFT owner; bidder wallet and balance are not disclosed).

## Lending

GONDI is a peer-to-peer NFT lending protocol with pro-rata interest, instant refinancing, and partial (tranche) refinancing. V3.1 introduces Tranche Seniority for risk segmentation across loan tranches.

## V3.1 Features

* **Cross Currency Support.** NFTs listed in one currency can be purchased or bid on in another supported currency. Conversion is handled by the Purchase Bundler. Available on Ethereum mainnet only.
* **Tranche Seniority.** Lenders can refinance a portion of an outstanding loan with defined seniority, enabling more granular risk pricing.
* **Stealth Bidding.** Bids are visible only to the owner of the targeted NFT. Bidder identity and balance are not exposed on-chain or in the UI.
* **Sell & Repay.** Borrowers can sell escrowed collateral in a single transaction. Outstanding loan principal and accrued interest are repaid; any surplus is transferred to the borrower.

:::note
**GONDI V1 & GONDI V2 Outstanding Loans: No action needed.** 
Loans originated on GONDI V1 & GONDI V2 are not impacted by GONDI V3 and mechanics will remain the same.
:::

:::note
The contents of GONDI docs are a collection of the latest development updates and are never considered final.
:::
