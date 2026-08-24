---
title: "Liquidations, Buyouts & Auctions w/pools"
draft: true
---

## Single Tranche (Lender) Loan Defaults

In the event of a default on a loan with a single tranche (and lender), the lender can claim the collateral through the GONDI dApp, thereby becoming the new owner of the collateral (one or multiple NFTs).

## Multiple-Tranche Loan Defaults

Defaulted loans with two or more tranches undergo a two-step process:

1. Largest Lien Buyout
2. Auction

### Largest Lien Buyout

GONDI allows the lender with the largest principal amount (regardless of seniority) to buy out the other tranches if such lender desires to keep the collateral.

A buyout is only offered to the single largest lender. If two lenders have the same amount lent, then the most senior (non-pool) tranche gets the right for buyout. Pools do not actively participate in buyouts. 

If a loan has two tranches, one for the pool and one for an individual user, the individual lender will have the right to buy out the pool in full before the auction starts.

The right to buyout occurs in the 48 hours after the loan defaults. To exercise the buyout right, the lender must pay all other tranches the full principal and accrued interest.

### Liquidation Auction

The liquidation auction is a 72-hour English auction in which anybody can bid, with each bid required to be 5.00% higher than the previous one. If a new bid is placed with less than 10 minutes remaining, the auction is extended by 10 minutes. The highest bidder wins the collateral at the end of the auction.

After every higher bid, the auction contract takes possession of the capital from the highest bidder and keeps it until the auction ends or the highest bidder is outbid by somebody else. GONDI programatically allocates 1% of auction proceeds to the wallets that initiate the auction and settle the auction. Auctions can only be initiated after the largest lien buyout period has expired.

Senior tranche(s) have priority over more junior tranches. Distributions follow a waterfall from most senior first to most junior last. Distributions first go to the senior tranche to cover the principal and accrued interest before repaying the principal of the next tranche in seniority.

**Distribution of auction proceeds**

* Proceeds < Principal + All Accrued and Pending Interest -> Most senior tranches first, including principal, interest accrued, and pending interest.
* Proceeds ≥  Principal + Interest cost + All Pending interest -> Each lender gets the amount owed, including pending interest. The remainder is distributed pro-rata based on principal + interest cost.
