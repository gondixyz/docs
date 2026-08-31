---
title: "Loan Offers"
---

GONDI is a peer-to-peer lending marketplace for NFTs. Lenders compete to offer the best loan terms, and borrowers pick the deals they want.

## How It Works

### Making Loan Offers (Lenders)

Create loan offers by setting:

* **Principal**: Amount you'll lend (WETH or USDC)
* **APR**: Interest rate you want
* **Duration**: How long borrowers have to repay
* **Origination Fee**: Optional upfront fee

You can make offers on specific NFTs or entire collections.

### Getting Loans (Borrowers)

1. See all available loan options on your NFT (including automatically combined offers)
2. Pick the option with the best terms
3. Get funds instantly (minus any origination fees)
4. Repay by the due date to get your NFT back

### Automatic Offer Combinations

GONDI automatically combines compatible offers to create better loan options with lower cost or higher principal amounts.

## Loan Mechanics

### Offer Requirements

Every offer needs:

* **Maximum Principal**: How much you'll lend
* **APR**: Your interest rate
* **Due Date**: Repayment deadline
* **Senior Tolerance**: Controls offer combinations (explained in Advanced Concepts)
* **Expiration Date**: When your offer expires

Optional:

* **Origination Fee**: Deducted from loan amount upfront
* **Capacity**: For collections, your total lending budget

### Offer Options

Two optional switches change who can interact with an offer. Both are set when the offer is created and cannot be changed afterwards.

**Reserved Offer**: the offer names a single borrower and is visible only to them. Nobody else can take it.

**Private Offer**: loans funded by the offer cannot be refinanced. No other lender can refinance the loan, renegotiate it, or add a tranche to it — the lender who funds it stays the only lender until the loan is repaid.

* The borrower keeps every option on their side: they can repay at any time, or refinance out by accepting a new offer. In that case the new principal is paid to the borrower, who repays the private lender.
* A Private Offer funds the whole loan on its own: it cannot be combined with other offers, so the loan is always single-tranche and Senior Tolerance does not apply.
* Default handling is unchanged. If the loan defaults, the usual claim, buyout and auction rules apply.
* Offers made by GONDI Pools cannot be private.

Offers carrying either option are flagged with an icon in the offer list.

### Loan Tranches (When Offers Combine)

**Senior Tranche**: Lower risk position in combined loans **Junior Tranche**: Higher risk position in combined loans

*Note: Repayment priority only applies during liquidation - see liquidation details for more information.*

### Collection Offers & Capacity

**Collection Offers**: Apply to any NFT in a collection (like all CryptoPunks)

**Capacity**: Your total budget across all loans

* You offer max 5 WETH per loan with 50 WETH capacity
* This supports 10 full loans **or** 20 half-loans OR any combination

### Competitive Improvements

* **APR**: New offers must be 1% better than existing ones
* **Principal**: Must meet collection-specific minimums (see appendix)
* **Identical Offers**: Processed first-come-first-served

### Offer Management

* **Active**: Live and visible
* **Hidden**: Live but not shown in app (still works onchain)
* **Cancelled**: Cannot be accepted
* **Expired**: Automatically becomes invalid

## Advanced Concepts

### Understanding Senior Tolerance (ST)

Senior Tolerance determines the maximum amount that can be senior to your offer when offers get combined:

* **ST = 0**: Your offer can only be the safest (senior) position
* **Higher ST**: You accept that other safer debt (principal + interest) can be repaid before you

ST is calculated based on the principal plus accrued interest of senior tranches at loan origination.

**How Offer Combinations Work**: When an offer has Senior Tolerance > 0, it can be combined with other offers. GONDI creates combined loan options that borrowers see as single choices with better overall terms.

### Effective APR (eAPR)

**Effective APR (eAPR)**: The true cost of your loan including origination fees, calculated on an annual basis assuming repayment at maturity.

GONDI uses eAPR to determine the best loan combinations and present the most cost-effective options to borrowers.

## Examples

### Single Offer Loan

**Available**: 10 WETH at 18% APR for 6 months **Borrower wants**: 7 WETH **Result**: 7 WETH loan at 18% APR, 3 WETH remains available

### Combined Offers Loan

**Available Individual Offers**:

* Offer A: 5 WETH at 20% APR, ST = 10 WETH
* Offer B: 8 WETH at 25% APR, ST = 0 WETH

**GONDI Creates Combined Option**: 10 WETH loan option

* Senior tranche: 5 WETH from Offer B at 25%
* Junior tranche: 5 WETH from Offer A at 20%
* Why combinable: Offer A's ST accommodates Offer B's debt (5 WETH principal + interest < 10 WETH limit)
* Borrower sees this as one loan option with a better eAPR than taking 10 WETH at 25%

### Collection Offer

**Offer**: 15 WETH max per CryptoPunk, 150 WETH capacity, 22% APR **Usage**: Can support 10 full loans, or mix of partial loans totaling 150 WETH
