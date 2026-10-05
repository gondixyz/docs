---
title: "What's New in GONDI V3.2"
description: "GONDI V3.2 adds Private Offers: loans that no other lender can refinance."
---

GONDI V3.2 adds **Private Offers** to lending. It is deployed on Ethereum mainnet only, alongside GONDI V3.1. Everything else in these docs applies to both versions.

## Private Offers

A lender can mark a loan offer as private when creating it. Loans funded by a Private Offer can never be refinanced or topped up by another lender, at any point in the loan. The lender who funds the loan stays its only lender until it is repaid or renegotiated.

* The borrower keeps every option on their side: they can repay at any time, or renegotiate out by accepting a new offer.
* A Private Offer funds the whole loan on its own, so the loan is always single-tranche and Senior Tolerance does not apply.
* Default handling is unchanged: the usual claim, buyout and auction rules apply.

See [Offer Options](/gondi-v3/loan-offers/#offer-options) and [Refinancing](/gondi-v3/refinancing/#private-offers-gondi-v32).

## Fees

The protocol fee on the lender's realized interest is **20%** for private loans, instead of the standard 15%. See [Protocol Fees](/gondi-v3/protocol-fees/).

## Which Version Your Loan Uses

Offers without the Private Offer option keep working exactly as before on GONDI V3.1. Only loans funded by a Private Offer live on the V3.2 contracts.

## Contracts & Audit

* The V3.2 Multi Source Loan, Purchase Bundler, Auction Loan Liquidator and Liquidation Distributor are listed under [Protocol Contracts](/gondi-v3/protocol-contracts/#ethereum).
* The V3.2 audit report is under [Security & Audits](/gondi-v3/security-and-audits/#gondi-v32).
