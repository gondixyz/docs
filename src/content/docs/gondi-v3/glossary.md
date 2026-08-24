---
title: "Glossary"
description: "This glossary defines key terms used in GONDI's dApp."
---

**Accrued Interest** The loan interest amount accumulated over time but not yet paid.

**Accrued Interest Profit** The interest amount accrued by the lender currently holding the loan.

**APR (Annual Percentage Rate)** The annualized cost of borrowing, expressed as a percentage.

**Buyout Period** 48-hour window after loan default during which the lender with the largest principal can purchase other tranches in a multi-tranche loan.

**Collection Offer** A loan offer applicable to any NFT within a specified collection.

**Due Date (Maturity Date)** The date by which the borrower must repay the loan's principal and accrued interest to avoid default.

**Effective APR (eAPR)** The true loan cost including origination fees, calculated annually:

* **Borrower eAPR:** \[Accrued Interest + Origination Fee / Principal] × \[365/Duration]
* **Lender eAPR:** \[Accrued Interest Profit + Origination Fee / Principal + Previous Interest] × \[365/Duration]

**Gross APR** \[Sum of 1 Year Accrued Interest] / \[Principal Amount]

**Interest** The cost that accrues over time for borrowing, calculated based on APR, principal, and loan outstanding time.

**Interest Cost** The sum of outstanding interest and accrued interest from previous refinancings that new lenders must pay.

**Junior Tranche** Higher risk position in multi-tranche loans, repaid after senior tranches during liquidation.

**Liquidation** Process of selling defaulted loan collateral through buyout period or auction, with proceeds distributed by seniority.

**Loan Default** When a borrower fails to repay the loan plus accrued interest by the due date.

**Loan Duration** The period during which the borrower must repay the loan in full, including accrued interest—usually expressed in days.

**Loan Offer** A proposal extended by a lender outlining loan terms, including principal, APR, due date, Senior Tolerance, and optional origination fee.

**Offer Capacity** The total amount a lender is willing to allocate across all loans for a collection offer.

**Origination Fee** An optional one-time fee (WETH or USDC) paid by the borrower to the lender at loan origination or renegotiation. Deducted from the principal amount.

**Previous Interest** The interest amount accrued by previous lenders that new lenders must transfer during refinancing.

**Principal** The amount of WETH or USDC borrowed/lent.

**Refinancing** Transaction where a new lender provides better terms (minimum 10% APR improvement) to take over an existing loan. No borrower approval required.

**Renegotiation** Transaction where a lender proposes different loan terms that may not be strictly better. Requires borrower acceptance.

**Repayment Amount** The total amount to be repaid by the borrower, including principal and accrued interest.

**Sell & Repay** Feature allowing borrowers to list escrowed NFTs for sale with automatic loan repayment from proceeds.

**Senior Tolerance (ST)** The maximum debt amount (principal + interest) that can be senior to an offer when loans are combined.

**Senior Tranche** Lower risk position in multi-tranche loans, has repayment priority during liquidation.

**Tranche** Individual portion of a multi-lender loan with specific terms and seniority level.

**Vault** NFT that bundles multiple assets (ERC-721, ERC-1155, ERC-20) for use as collateral in a single loan.
