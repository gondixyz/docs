---
title: "Gondi V1 Loans"
---

## Loan Properties

* Principal (in WETH or USDC)
* Gross APR (Annual percentage rate)
* Due date (timestamp to repay loan plus accrued interest to avoid defaulting)
* Origination fee (optional for new loans and renegotiations. Fee deducted on origination from Principal)
* Collateral (supported ERC-721 NFTs)

**Interest only accrues while loan is outstanding.**

### Offers

Lenders on Gondi create individual offers to listed items looking for loans. Offers have the same properties as a loan, with the addition of an expiration date.

Lenders can make multiple offers to the same NFT.

Lenders can also create Collection offers, where any NFT from a collection can accept the loan terms. Lenders can set budgets for collection offers to manager their exposure. Similar to item offers, lenders can create more than one multiple collection for the same collection.

All offers can be cancelled on-chain before expiration by the lender.
