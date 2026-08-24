---
title: "Loan Basics"
---

## Loan Properties

* Principal (in WETH or USDC)
* Gross APR (Annual percentage rate)
* Due date (timestamp to repay loan plus accrued interest to avoid defaulting)
* Origination fee (optional)
* Collateral (supported ERC-721 NFTs)

:::note
**Interest only accrues while the loan is outstanding meaning a borrower always has the option to repay early to save on interest cost.**
:::

Origination fee can only be included upon loan origination or renegotiations. Origination fee is not supported for full or partial refinancing. Origination fee amount is deducted from the principal.

Gondi loans have a lock-up period of 5% of their max duration during which they cannot be refinanced upon origination.

### Loan Example

![Gondi Loan without refinancing](../../../../assets/content/gondi-v1-and-v2/gondi-v2/loan-basics/image-1.png)
_Gondi Loan without refinancing_

**How it works:**

1. Borrower lists its NFT (ERC-721). Items can receive offers without being listed, but listing signals that the borrower is actively seeking a loan.
2. Lenders make offers against the listed collateral.
3. The borrower accepts an offer which transfers the principal from the lender and sends the collateral into Gondi's escrow contract.
4. The loan is repaid in full including accrued interests and the NFT is retrieved to the borrower.
5. In case the loan is not repaid before maturity, the lender can claim the escrowed NFT and transfer it to its wallet.
