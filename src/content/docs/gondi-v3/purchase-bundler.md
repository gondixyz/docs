---
title: "Purchase Bundler"
---

Purchase Bundler lets you buy an NFT by combining your own funds with an existing Gondi loan offer — all in a single transaction. The NFT goes into escrow, and you immediately become the borrower.

***

### How It Works

1. **Find an NFT** with an available Gondi loan offer
2. **Choose a loan offer** that suits your terms (principal, APR, duration)
3. **Execute the purchase** — the seller receives full payment, the NFT moves to escrow, and you become the borrower in one atomic transaction

Your upfront payment covers the difference between the NFT price and the loan principal, plus any origination fee.

***

### Example

A 10 ETH NFT has a 7 WETH loan offer with 0.20 WETH origination fee, 15% APR, and 90-day duration:

* **Upfront payment**: 3.20 WETH (10 - 7 + 0.20 origination)
* **Interest accrual**: \~0.26 WETH at loan term
* **Repayment at maturity**: 7.26 WETH (principal + interest)

You can exit your position anytime by repaying the loan or by selling the NFT through Sell & Repay — sale proceeds repay the loan, and any surplus goes to you.

***

### Requirements

* **ETH or WETH** listings support only.  USDC listings do not support Purchase Bundler.
* A valid loan offer must exist for the NFT.
* You must have enough funds to cover the upfront payment.

***

## Cross Currency & USDC Purchase Bundler

The Cross Currency Purchase Bundler extends the standard Purchase Bundler to support multi-currency transactions. You can purchase an ETH-listed NFT using a USDC loan, or vice versa — the contract handles the currency conversion automatically in a single atomic transaction.

### How Cross Currency Works

1. **Find an NFT listing** in any supported currency (ETH, WETH, USDC, or others)
2. **Select a loan offer** — the loan can be denominated in a different currency than the listing
3. **Execute the purchase** — the contract swaps currencies via Uniswap, buys the NFT, and places it in escrow
4. **Repay in the loan currency** — your repayment obligation is in the currency of the loan, not the listing

### Example: Buying an ETH Listing with a USDC Loan

An NFT is listed for 10 ETH on OpenSea. A lender has a 25,000 USDC loan offer available:

1. You initiate the purchase through the Cross Currency Purchase Bundler
2. The contract takes the 25,000 USDC loan principal and swaps it to ETH via Uniswap
3. The resulting ETH is used to purchase the NFT from the marketplace
4. The NFT moves to escrow, and you become the borrower
5. You repay the loan in USDC at maturity

### Key Benefits

* **Currency flexibility** — Buy NFTs listed in any currency using loan offers in any other supported currency
* **Atomic execution** — Currency swap, NFT purchase, and loan creation happen in one transaction
* **Slippage protection** — Built-in price oracle validation ensures fair conversion rates
* **Standard fees** — No additional fees for cross-currency conversion; standard Purchase Bundler fees apply

***

## Supported Marketplaces

Purchase Bundler transactions are supported across the following platforms:

* **GONDI** — Public and private listings
* **OpenSea** — Public and private listings
* **CryptoPunks** — Punks Marketplace
* **Tokenworks** — NFT Strategy marketplace

***

## Requirements

* A valid Gondi loan offer must exist for the NFT's collection
* You must have sufficient funds for the upfront payment (listing price minus loan principal, plus origination fee)
* Supported currencies: ETH, WETH, USDC (and other whitelisted ERC-20 tokens via Cross Currency)
* Compatible with Gondi V3.1 escrow systems

***

## Fees

The buyer pays a 2% Purchase Bundler fee on most transactions. See [Protocol Fees](http://localhost:8080/gondi-v3/protocol-fees) for the complete fee schedule by marketplace and listing type.
