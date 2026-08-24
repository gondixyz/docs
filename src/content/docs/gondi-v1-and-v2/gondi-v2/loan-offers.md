---
title: "Loan Offers"
---

## Loan Offers

Loan offers can be created on Gondi's dApp or through its API.

Loan offers must include:

* Maximum Principal amount (in WETH or USDC)
* APR expressed as a percentage
* Due date for repayment
* Origination Fee (optional)
* Expiration date

Loan offers can be created for specific items or collection-wide (including for ArtBlocks collections). Lenders are allowed to make multiple offers to the same NFT.

:::note
**An offer's principal is the maximum amount allowed to be borrowed from that offer. A borrower might choose to accept and offer but take only a portion of the principal at the same APR.**
:::

Lenders can manage their exposure in collection offers by setting a capacity number of loans that can be originated from it. Similar to item offers, lenders can create multiple offers for the same collection.

Loan offers can be cancelled on-chain before expiration by the lender or alternatively, hidden from  Gondi's dApp although they would still be active on-chain until expiration.

## Buy Offers

Buy offers can be created for items in outstanding loans which allow lenders to sell & repay their loan with one transaction in case they don't have enough liquidity to repay before due date.

Buy offers are created on Gondi's dApp. There's no fee associated with selling and repaying loan.
