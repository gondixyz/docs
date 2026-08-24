---
title: "Sell & Repay"
---

Sell & Repay lets borrowers sell escrowed NFTs directly through GONDI. Sale proceeds automatically repay the outstanding loan, with any surplus transferred to the borrower's wallet.

## Selling Methods

### Fixed-Price Listing

Set a price and list your escrowed NFT for sale. When a buyer purchases at your listed price, the loan is repaid and you receive the difference.

* **Public listing** - Visible to all buyers
* **Private listing** - Restricted to a specific wallet address
* **Off- Market listings -** Set a private asking price for an escrowed NFT. 

### Accepting Bids

Buyers can place bids on any escrowed NFT. As the borrower, you can accept any bid that covers your outstanding debt (principal + accrued interest).

* No minimum bid floor requirement
* You can receive and compare multiple bids before accepting

***

## Cross Currency Bid Acceptance

With the Cross Currency Purchase Bundler, you can accept bids denominated in a different currency than your loan. If your NFT is escrowed under an ETH loan and you receive a USDC bid, you can accept it — the contract automatically swaps the proceeds to your loan currency, repays the loan, and sends you the remainder.

### How It Works

1. Your escrowed NFT receives a bid in a different currency than your loan
2. You accept the bid
3. The contract sells the NFT and receives the bid currency
4. The proceeds are swapped to your loan currency via Uniswap
5. Your loan is repaid from the swapped proceeds
6. Any surplus is sent to your wallet

### Example: ETH Loan, USDC Bid

You have a 5 WETH loan against your NFT. A buyer places a bid worth 15,000 USDC:

1. You accept the USDC bid
2. The contract receives 15,000 USDC from the buyer
3. It swaps enough USDC to cover your 5 WETH loan repayment (plus accrued interest)
4. The loan is repaid in WETH to the lender
5. Remaining USDC is sent to your wallet

> Slippage protection is built in — the contract validates the swap against a price oracle to ensure fair conversion rates.

### Without a Loan

Cross currency bid acceptance also works for NFTs not currently in a Gondi loan. You can accept a bid in any supported currency, and the contract handles the conversion for you.

***

## Requirements

* Listing price must cover the outstanding principal plus interest accrued through the listing expiration date
* Listing expiration must be set before the loan due date
* Only fixed pricing is available — auctions are not supported
* One active listing type per NFT at a time (either public or private, not both)
* Off-Market listings used with Sell & Repay must satisfy the same required as other S\&R listings.

***

## Settlement

When a sale completes:

1. Buyer pays the purchase price
2. Outstanding loan (principal + accrued interest) is repaid to the lender
3. Protocol fee is deducted (see [Protocol Fees](/gondi-v3/protocol-fees))
4. Remaining surplus is sent to the borrower

### Example

Your outstanding debt is 2.1 WETH (2 WETH principal + 0.1 WETH accrued interest). You list the NFT for 3 WETH:

* Buyer pays: 3 WETH
* Loan repayment: 2.1 WETH
* S\&R fee (2%): 0.06 WETH
* You receive: 0.84 WETH

***

## Key Details

* Interest continues accruing during the listing period
* Listings can be cancelled anytime before the sale completes
* Vault NFTs are sold as complete units
* CryptoPunks must be wrapped to list on GONDI
