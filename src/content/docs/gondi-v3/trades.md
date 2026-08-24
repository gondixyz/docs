---
title: "Trades"
---

GONDI Trades enable peer-to-peer atomic swaps of NFTs and ERC-20 tokens between two wallets. Trades are exclusive to GONDI and settle through Seaport.

## Mechanics

A trade is a bilateral exchange between two counterparties. Each side can include any combination of:

* One or more NFTs (ERC-721 or ERC-1155\[required to be vaulted in Gondi vaults])
* WETH
* USDC

Both sides of the trade are signed off-chain and settled atomically on-chain.

## Use Cases

* **NFT-for-NFT swaps.** Direct exchange of one or more NFTs without converting to a base currency.
* **Asymmetric swaps.** NFTs plus a cash component on one or both sides to balance value differences.
* **Bundled liquidations or acquisitions.** Move multiple NFTs between wallets in a single transaction.
* **OTC settlement.** Privately negotiated deals executed without listing on a public marketplace.

## Fees

Trades are subject to a **0% protocol fee**. Creator royalties, if applicable, are configurable per trade.

Standard Ethereum gas costs apply.

## Settlement

Trades are executed via Seaport, the order settlement protocol developed by OpenSea and used across the NFT ecosystem. Each trade order is signed by both counterparties and submitted on-chain for atomic execution.

## Availability

Trades are available on Ethereum mainnet.
