---
title: "Purchase Bundler"
description: "Buy an NFT with a loan in one transaction. Supported currencies, marketplaces and collateral."
---

Buy an NFT with a GONDI loan and pay the rest yourself. The purchase and loan happen in one transaction; wallet approvals may come first.

## How It Works

1. Choose an eligible listing and funded loan offer on the same chain.
2. Review terms, approve tokens and pay the balance plus fees.
3. Repay in the loan currency to recover the NFT, or use [Sell & Repay](/gondi-v3/sell-and-repay/).

**Upfront cost = listing price − loan principal + origination fee + purchase fees.** Gas is additional.

## Example

10 ETH listing, 7 WETH loan, 0.20 WETH origination fee:

* Net loan: **6.80 WETH**.
* You pay: **3.20 ETH equivalent + fees and gas** (ETH/WETH is 1:1).
* At 15% APR for 90 days: approximately **0.26 WETH interest**, **7.26 WETH repayment**.

## Supported Currencies

For NFTs **not already used as loan collateral**:

* **Ethereum:** ETH or WETH prices use WETH loans; USDC prices use USDC loans.
* **HyperEVM:** HYPE prices use WHYPE loans.
* **Robinhood Chain:** ETH prices use WETH loans.

WETH and WHYPE are the wrapped versions of ETH and HYPE used for loans.

On Ethereum, **WETH-priced purchases with a loan are available only through featured listings on the homepage**. For **USDC-priced purchases**, use the NFT or collection page; homepage featured listings do not support USDC loans.

## Cross Currency & USDC Purchase Bundler

You cannot choose a different loan currency—for example, a USDC loan for an ETH-priced NFT. Selling an NFT to repay a loan is covered in [Sell & Repay](/gondi-v3/sell-and-repay/#cross-currency-bid-acceptance).

## Buying an NFT Already in a Loan

Your purchase repays the seller's loan. The NFT then secures your new loan until you repay it.

Available on Ethereum. NFT and collection pages support eligible V3.1/V3.2 loans; check the purchase quote for available currencies.

## Supported Marketplaces

* **GONDI / OpenSea:** public and private listings.
* **CryptoPunks:** public Punks Marketplace listings. Private listings require wrapping and relisting on GONDI.
* **Tokenworks:** NFT Strategy marketplace.

## Requirements

* Sufficient funds and approvals for the upfront cost and gas.
* An NFT supported for loans; ERC-1155s require a [vault](/gondi-v3/vaults-and-stash/).
* Transfers permitted by the collection; see [ERC-721C](/gondi-v3/erc-721c-whitelisting/).

## Fees

Check the total [fees](/gondi-v3/protocol-fees/) shown before confirming your purchase.
