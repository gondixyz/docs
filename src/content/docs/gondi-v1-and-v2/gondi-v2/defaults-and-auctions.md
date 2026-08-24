---
title: "Defaults & Auctions"
---

## Defaults for single lender Loan

Loans that have a one lender and fail to repay the principal plus accrued interest before due date are considered defaulted loans. In these cases, the lender take possession of the collateral by claiming it.

## Defaults for multi tranche Loan (Auction)

Defaulted loans with two or more tranches undergo an auction process on Gondi's dapp.

The auction is a 72-hour English auction where participants openly bid against one another, with each bid required to be 5% higher than the previous one. If a new bid is placed when there are less than 10 minutes remaining, the auction is extended by 10 minutes. The highest bidder wins the collateral at the end of the auction. After every highest bid, the auction contract takes possession of the capital from the highest bidder, and keeps it until auction ends or the highest bidder is outbid by somebody else.

Gondi allocates 1% of auction proceeds to the wallets that initiate auction and settle auction.

Each loan tranche has three important variables to consider for auction distributions:

* Principal lent -> Net amount lent to borrower.
* Interest cost -> Amount paid by lender for previous accrued interest.
* Pending interest -> Amount of accrued interest that were owed and unpaid by due date.

**Distribution of auction proceeds:**

* Proceeds < Principal + Interest cost + All Pending interest -> Pro-rata to lenders based on principal + interest cost.
* Proceeds ≥  Principal + Interest cost + All Pending interest -> Each lender gets the amount owed including pending interest. The remainder is distributed pro-rata based on principal + interest cost.
