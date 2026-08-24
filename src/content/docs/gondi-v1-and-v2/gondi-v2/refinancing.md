---
title: "Refinancing"
---

Lenders may also extend a loan's due date as long as the APR lowered as well. Refinancing do not allow shortening a loan's due date under any circumstance.

Increasing a loan's principal is also possible if APR is lowered such that the daily interest paid by a borrower exhibits a net reduction. For refinancings which result in a larger principal, the net increase is transferred to the borrower's wallet.

:::note
**All loan refinancing require an APR decrease.**
:::

The minimum required improvement for principal amount is 5%. However, to extend a loan's due date, the minimum improvement needed is 10% of the remaining loan duration, rounded up to the nearest whole day.

## Refinancing Lock-ups

In loan refinancing, a new lender transfers both the loan's principal amount and the interest accrued until a specific point from the original lender. This process can be repeated multiple times, with each new lender taking responsibility for the interest accumulated since the loan's inception.

Every time a loan is refinanced, a lock up period begins during which the loan may not be refinanced to guarantee a minimum duration for the lender. The lock up period is equivalent to 5% of the remaining time before due date.

## Refinancing Example

Alice's loan offer is accepted by Bob (borrower) with the following terms on April 1st:

* Principal: 10.00 WETH
* APR: 20%
* Due date: April 30th (30 days duration)

On April 10th, Charly refinances the loan by lowering its APR.

* Principal: 10 WETH
* APR ~~20%~~ 14%
* Due date: April 30th (20 days duration)

Charly must transfer the principal and Alice's accrued interest in order to refinance. Alice accrued 0.0548 WETH over 10 days. No action is required by Bob as loan terms are better for the borrower.

On April 20th, Bob decides to repay the loan. Bob's loan accrued at 20% APR for 10 days and at 14% for another 10 days. Bob owes 10 WETH for the principal and 0.0931 WETH  in interest (0.0548 + 0.0383 for each 10 day period )

### Repayment distribution

* Bob paid 0.0931 WETH in interest
* Charly earned 0.0383 WETH in interest (10 days at 14% APR)
* Alice earned 0.0548 WETH in interest (10 days at 20% APR)

Note: all calculations are rounded to 3 decimal places in the above example.
