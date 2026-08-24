---
title: "Loan Basics w/pools"
draft: true
---

## Loan Properties

* Principal Amount (in WETH or USDC)
* Gross APR (annual percentage rate)
* Due date (timestamp to repay loan plus accrued interest to avoid default)
* Origination fee (optional)
* Collateral (supported ERC-721 NFTs)

:::note
**Pro Rata Interest**

Interest only accrues while the loan is outstanding meaning a borrower always has the option to repay early to save on interest cost.
:::

### Loan Example

![Gondi Loan without refinancing](../../../assets/content/content-with-pools/loan-basics-w-pools/image-1.png)
_Gondi Loan without refinancing_

#### How it works

1. Borrower lists NFT (ERC-721) to view outstanding offers or receive specific item offers for specific items.
2. Pool and individual lenders create offers against the listed collateral with different terms and seniority.
3. Borrower selects the loan amount and duration. GONDI dApp programmatically selects the lowest interest rate + origination fee offer or combination of offers from pools and peers to originate loan. Collateral is sent to the GONDI's escrow contract.
4. Loans must be repaid in full including accrued interest to retrieved collateral. No installments or partial payments are supported.
5. If borrower fails to repay before maturity, the loan defaults. If there's only one lender, they can claim the escrowed collateral. If loan has multiple tranches, there is an optional buyout period for largest lender, followed by an auction to liquidate collateral. More details on Defaults & Auctions.

The origination fee can only be included at origination or renegotiations. The origination fee is not supported for refinancing. The origination fee amount is deducted from the principal amount.

GONDI loans cannot be refinanced for the initial 5% and the last 10% of the loan's duration. Every time a loan is refinanced or renegotiated, the 5% initial lock up is activated.

## Repayments

Loans can be repaid anytime before the due date. Interest accrues on a pro-rata basis, meaning it only accrues based on the net outstanding time, with no early repayment penalties.

:::note
**No Partial Principal Repayment**

Repayments must be done in full (principal and accrued interest) before the due date.
:::
