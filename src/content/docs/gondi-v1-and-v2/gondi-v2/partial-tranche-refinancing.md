---
title: "Partial (Tranche) Refinancing"
---

## Partial Refinancing

A loan can be partially refinanced such that it can consist of up to 10 different tranches, where each tranche must be at least 5% of the overall principal amount of the loan. Similarly to full refinancing, partial refinancings must experience an APR reduction of at least 5% for the selected principal amount. 

Partial refinancing only allows to lower APR. Changing due date or principal is not possible.

If a loan already has at least 2 tranches, subsequent refinancing events will refinance higher APR tranches first. In case the selected principal amount encompasses multiple tranches, then the 5% minimum APR improvement must be in respect to the tranche with lowest APR of the selected. 

Lock-ups are applied on a tranche basis after a refinancing. Lock-ups for tranches are also 5% of remaining duration.

## Partial Refinancing Example

Alice's loan offer is accepted by Bob (borrower) with the following terms on April 1st:

* Principal: 10.00 WETH
* APR: 20%
* Due date: April 30th (30 days duration)

Charly is a new lender that partially refinances 5 WETH to 12% APR. Alice continues to accrue 5 WETH at 20%.

## From Tranches to Single-Lender

Lenders may refinance all outstanding tranches of a given loan into one. To initiate this process, the prospective lender would still need need to set an APR at least 5% lower than the tranche with the lowest APR. Additionally, this transaction also allows the lender to extend the duration of the loan. The protocol also allows for an increase in the principal amount, provided that the daily interest of the new combined loan remains lower than the combined daily interest of all tranches.

The protocol then merges all tranches into a single tranche with the improved terms set by the new lender. The new lender must transfer the outstanding principal and accrued interest for every tranche in order to refinance the loan.
