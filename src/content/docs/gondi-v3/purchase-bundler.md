---
title: "Purchase Bundler"
description: "Buy an NFT with a GONDI loan in one transaction, including supported listing currencies, collateral requirements and settlement limits."
---

Purchase Bundler lets you buy an NFT by combining your own funds with an existing GONDI loan offer. In one atomic transaction, the seller is paid, the NFT enters loan escrow, and you become the borrower. Required token approvals may need separate transactions first.

## How It Works

1. Find an eligible NFT listing with an executable GONDI loan offer.
2. Review the loan principal, currency, APR, duration and origination fee, together with the upfront payment and purchase fees.
3. Approve the required tokens, then execute the purchase. If any part of settlement fails, the purchase and loan creation revert together.
4. Repay the loan in its loan currency to retrieve the NFT, or use [Sell & Repay](/gondi-v3/sell-and-repay/) where supported.

The loan's net proceeds are its principal minus the origination fee. Your funds cover the remaining purchase cost and applicable transaction fees.

## Example

An NFT listed for 10 ETH has a 7 WETH loan offer with a 0.20 WETH origination fee, 15% APR and a 90-day term:

* **Net loan proceeds:** 6.80 WETH (7 minus 0.20).
* **Your contribution before purchase fees and gas:** 3.20 WETH equivalent (10 minus 6.80).
* **Interest over the full term:** approximately 0.26 WETH.
* **Repayment at maturity:** approximately 7.26 WETH.

Applicable marketplace and Purchase Bundler fees increase the upfront cost. Review the transaction quote for the total; the 3.20 figure is not an all-in purchase quote.

## Supported Currencies

A listing's payment currency, the loan currency and any conversion of your upfront payment are separate parts of a transaction. An ETH listing financed by a WETH loan is not the same as a listing priced in WETH.

For an NFT **not already in a loan**, the current app supports these currency combinations, subject to an eligible listing and executable loan offer:

| Chain | Listing currency | Loan currency | Buy with Loan |
| --- | --- | --- | --- |
| Ethereum | ETH | WETH | Supported |
| Ethereum | USDC | USDC | Supported |
| Ethereum | WETH | — | Not currently enabled for this flow |
| HyperEVM | HYPE | WHYPE | Supported |
| Robinhood Chain | ETH | WETH | Supported |

Other listing currencies are not enabled for this flow. The presence of a listing or a supported token in the Currency Manager does not guarantee that it can be purchased with a loan.

## Cross Currency & USDC Purchase Bundler

The deployed Purchase Bundler contracts can execute supported currency conversions as part of settlement. Contract support is broader than the combinations currently offered by the app.

A USDC listing can use a USDC loan in the app; it does not require an ETH-to-USDC loan conversion. The app currently selects the loan currency from the listing, using the wrapped token for a native-currency listing. Choosing a different buyer-loan currency, such as a USDC loan for an ETH listing, is not currently enabled. A conversion offered for your upfront payment does not change the currency you owe on the loan.

Cross-currency bid acceptance when selling collateral is a separate transaction described under [Sell & Repay](/gondi-v3/sell-and-repay/#cross-currency-bid-acceptance).

## Buying an NFT Already in a Loan

Buying collateral with a new loan also needs to repay the seller's existing loan and release the NFT into the buyer's loan escrow. The app supports this flow on Ethereum for eligible V3.1 and V3.2 seller loans. The quoted route must support the listing, seller loan and new buyer loan together.

This flow is not available on HyperEVM or Robinhood Chain. The ordinary-listing currency table above does not establish eligibility for a collateralized listing.

## Supported Marketplaces

Eligible listings can come from:

* **GONDI** — Public and private listings.
* **OpenSea** — Public and private listings.
* **CryptoPunks** — Public Punks Marketplace listings. Private Punks Marketplace listings cannot use Buy with Loan directly; the seller must wrap the Punk and list it on GONDI for this flow.
* **Tokenworks** — NFT Strategy marketplace.

Marketplace support still depends on the listing currency, chain, loan and transfer requirements.

## Requirements

* An eligible collateral NFT and a valid, funded GONDI loan offer must be available.
* You must have sufficient funds and approvals for the upfront payment, fees and gas.
* Listing, loan and Purchase Bundler contracts must support the route on the same chain.
* ERC-1155 tokens cannot become direct loan collateral; a supported [vault](/gondi-v3/vaults-and-stash/) is required for borrowing against them.
* Collections with transfer restrictions must permit the contracts involved; see [ERC-721C Whitelisting](/gondi-v3/erc-721c-whitelisting/).

## Fees

Fees depend on the marketplace, chain and whether the NFT is already in a loan. See [Protocol Fees](/gondi-v3/protocol-fees/) for the fee schedule and review the transaction quote before signing.
