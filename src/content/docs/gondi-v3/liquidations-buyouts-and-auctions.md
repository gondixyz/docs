---
title: "Liquidations, Buyouts & Auctions"
---

When a loan defaults (passes due date without repayment), the liquidation process depends on the number of tranches.

## Single Tranche Defaults

**Simple Process**: The lender can claim the collateral directly through the GONDI dApp.

* Requires a transaction to claim (not automatic)
* Lender becomes the new owner of the NFT(s)
* No additional steps or waiting periods

## Multi-Tranche Defaults

Loans with multiple tranches follow a two-step liquidation process:

**Step 1: Largest Lien Buyout (48 Hours)**

**Who gets buyout rights**: The lender with the largest principal amount

* If principal amounts are tied, the most senior tranche (ST = 0) gets priority
* Only one lender gets buyout rights

**Buyout process**:

* 48-hour window starting immediately after default
* Buyout lender must pay all other tranches their full outstanding debt (principal + accrued interest up to default date)
* If exercised, buyout lender can claim the collateral immediately
* If not exercised, proceeds to auction

**Step 2: Liquidation Auction (72 Hours)**

**When it starts**: Automatically after the 48-hour buyout period expires (if no buyout occurred)

**Auction mechanics**:

* 72-hour English auction
* No starting bid minimum
* Each bid must be 5% higher than the previous bid
* Anyone can participate (including original lenders)
* Bids placed with <10 minutes remaining extend auction by 10 minutes
* Auction contract holds each bidder's funds until outbid or auction ends

## Distribution of Auction Proceeds

**Waterfall Priority**: Senior tranches paid first, then junior tranches

**Scenario 1 - Insufficient Proceeds**: If proceeds < total outstanding debt:

* Senior tranches receive priority for principal + accrued interest
* Junior tranches receive remaining funds (may be zero)

**Scenario 2 - Sufficient Proceeds**: If proceeds ≥ total outstanding debt:

* Each lender receives full amount owed (principal + accrued interest)
* Any surplus distributed pro-rata based on outstanding debt amounts

## Important Notes

* **No borrower action required**: Liquidation process is automatic after default
* **No grace period**: Liquidation begins immediately when loan passes due date
* **Lender participation**: All lenders can bid in auctions regardless of tranche position
* **Interest calculations**: All accrued interest calculated up to default date, not liquidation completion
