---
title: "ERC-1155 Trading"
description: "Buy, list and bid on individual ERC-1155 units on GONDI, with settlement mechanics and collateral requirements."
---

GONDI supports direct purchases, listings and item-specific buy offers for ERC-1155 tokens in supported collections. You do not need to place the token in a vault to trade it this way.

## Units and Ownership

An ERC-1155 token ID can have multiple units held by different wallets. A listing or item-specific bid targets the collection contract and token ID; each supported order transfers **one unit**. A holder can sell a unit they own and also buy another unit of the same token ID.

Multi-unit listings are not supported by this flow. Collection-wide and trait buy offers, and bulk offers across an artist's works, remain ERC-721 features.

## Selling and Buying

* **List a unit:** set the price, payment currency and expiration. Approve the NFT collection for the marketplace operator when required, then sign the listing off-chain.
* **Buy a listed unit:** execute the listing to transfer one unit from its seller to your wallet and settle payment atomically through Seaport.
* **Make an item-specific buy offer:** sign a bid for one unit of a particular token ID. A holder with an available unit can accept it; a bid does not reserve a particular holder's unit.
* **Accept a buy offer:** approve the NFT transfer when required, then execute the bid to exchange one unit for the offered payment.

Settlement requires the seller to hold the unit and the buyer to have sufficient funds and approvals. Applicable marketplace fees and royalties are included in the transaction; see [Protocol Fees](/gondi-v3/protocol-fees/).

## Borrowing Against ERC-1155s

Direct ERC-1155 trading does not make the token eligible for a direct loan. To borrow against supported ERC-1155 assets, place them in a [GONDI vault](/gondi-v3/vaults-and-stash/). The vault's ERC-721 NFT becomes the collateral.

Find supported collections and their contract addresses in the [collection directory](/gondi-v3/whitelisted-collections/). Collection availability does not guarantee an active listing or loan offer.
