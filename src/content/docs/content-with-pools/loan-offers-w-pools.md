---
title: "Loan Offers w/pools"
draft: true
---

Loan offers can be submitted by GONDI pools and individual market participants. Offers compete against one another regardless of whether they are from GONDI pools or individuals and may even be combined.

### Loan offers must include

* Maximum Principal amount (in WETH or USDC)
* APR expressed as a percentage
* Due Date for repayment
* Origination Fee (optional)
* Max Senior Repayment
* Expiration Date

Loan offers can be set for specific items or entire collections (including for ArtBlocks collections). Multiple offers may be submitted for the same item or collection from the same wallet.

:::note
**Maximum Principal**

An offer's principal is the maximum amount allowed to be borrowed from that offer. A borrower may choose to borrow only a portion of the available principal. For example, a borrower might have up to 10 WETH available to borrow from one or multiple offers and decide only to borrow 7 WETH.
:::

GONDI loans may consist of more than one offer with different seniorities. Depending on the borrower's best combination of offers, a loan can be originated with a single tranche or multiple tranches.

Lenders specify the maximum repayment amount they are willing to accept before their tranche. If the Max Senior Repayment is set to 0 WETH, the offer can only originate as the most senior (lowest risk) tranche of the loan.

## An example

### Offer A

* **Principal:** 5.00 WETH
* **APR:** 20.00%
* **Duration:** 1 year
* **Origination Fee:** 0.00 WETH
* **Max Senior Repayment:** 10.00 WETH

### Offer B

* **Principal:** 8.00 WETH
* **APR:** 25.00%
* **Duration:** 1 year
* **Origination Fee:** 0.00 WETH
* **Max Senior Repayment:** 0.00 WETH

Max Senior Repayment sets the maximum amount of debt (principal + interest - origination fee) that can be senior to such offer.

Based on offer examples A and B, a borrower can get up to 13.00 WETH for one year. Different combinations of A and B can be originated depending on the amount to be borrowed.

**Scenario 1**

* **Principal borrowed:** 5.00 WETH
* Loan gets filled 100% by offer A as it has a lower APR (20% vs 25%) than offer B

**Scenario 2:**

* **Principal borrowed:** 8.00 WETH
* The loan gets filled with 4.00 WETH from offer B as the senior tranche and 5.00 WETH from offer A as the junior tranche. Offer A accepts up to 10.00 WETH of max senior repayment, which is more than 4.00 WETH + 1.00 WETH of interest in 1 year

**Scenario 3:**

* **Principal borrowed:** 13 WETH
* The loan gets filled with 8.00 WETH from offer B as the senior tranche and 5 WETH from offer A as the junior tranche. Offer B is the maximum senior repayment that offer A accepts as it comprises 8.00 WETH + 2.00 WETH of potential interest, reaching the limit of Max Senior Repayment ( 10.00 WETH)

GONDI takes into account both the APR and origination fee to programatically select the cheapest combination of offers given the borrower's desired principal amount and loan duration.

Individual lenders can also create collection-level offers and manage their exposure by setting an offer capacity for those terms.

Loan offers can be cancelled on-chain before expiration by the lender or alternatively, hidden from the GONDI dApp although they would still be active on-chain until expiration.
