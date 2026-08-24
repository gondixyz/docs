---
title: "Offer Handler"
description: "The Parameter Setter contract for each GONDI Pool sets the parameters for valid loan offers and makes the offers."
draft: true
---

## Pool Collections vs Whitelisted Collections

GONDI Pools provide liquidity to a limited number of NFT collections, namely[ Pool Collections](/content-with-pools/gondi-pools/parameters-for-offers/#pool-collections-and-parameters). Pool collections are not the same as Whitelisted collections. [Whitelisted Collections](/gondi-v3/whitelisted-collections/) support P2P loans, while Pool Collections get offers from GONDI pools. All Pool Collections also support P2P offers.

All offers from both GONDI Pools have Max Senior Repayment set to 0, having repayment priority in case of default. GONDI Pools offers compete against other loan offers set by individuals with no priority.  Pool offers do not include an origination fee either.

### Security

The Parameter Setter contract has a cooldown period every time any parameters change, requiring a second confirmation 72 hours later.  Parameters can be changed as often as the cooldown period allows.

## GONDI Pool Offers

Each offer from the GONDI Pools consists of two fixed parameters and two variable parameters: 

**Fixed Parameters:**

* **NFT Collection contract**
* **Loan Duration:** Currently offering 30 days, 60 days, 90 days, and 180 days

**Variable Parameters:**

* **APR:** Defined by the Interest Rate Model
* **Principal:** defined by the MIN(X Floor, Y Historical Floor )

### Interest Rate Model

Loan APRs are defined as Base Rate + Premium Rate, where the Base Rate is considered to be something close to a standard staking yield rate (eg: staking for ETH). The Premium Rate depends on utilization and is defined as \`PremiumRate(U) = minAprPremium + utilizationFactor \* U\`, where U is the fraction of the pool in outstanding loans.

### Determining a Loan Principal Amount

GONDI Pools calculate the loan principal by taking the lesser of two values: a percentage of the current floor prices or a percentage of the historical trailing floor prices of the collection. The specific percentage depends on the loan duration. Visit [Parameters for Offers](/content-with-pools/gondi-pools/parameters-for-offers/) for collection-specific parameters.

### Trailing Historical Floor for Each Offer Duration

| Offer Duration | Historical Trailing Floor |
| -------------- | ------------------------- |
| 30 days        | 180 days                  |
| 60 days        | 365 days                  |
| 90 days        | 540 days                  |
| 180 days       | 720 days                  |

If data for a given value were to be stale, offers requiring that value will be invalidated. The tolerance delay for floor price data is defined as the minimum between 1.5% of the outstanding duration of the loan and 3 days, and as the minimum between 3% and 3 days for trailing values.
