---
title: "Parameters for Offers"
description: "Learn how GONDI Pools calculate how much principal they offer."
draft: true
---

GONDI Pools calculate the loan principal amount by taking the smaller of two values: a percentage of the current floor price or a percentage of the historical trailing floor price of the collection. The specific percentage depends on the loan duration. This approach ensures prudent offers even with rapid increases in floor prices.

## APR Parameters

* **PremiumRate(U)** = minAprPremium + utilizationFactor \* U
* **minAprPremium** = 0.03
* **utilizationFactor** = 0.1
* **Utilization:** 0 <= U <= 1

## Pool Collections

### CryptoPunks

(Wrapped Cryptopunks & 721 Cryptopunks Wrapper)

#### WETH Parameters

| Loan Offer Duration | Current Floor | Historical Floor |
| --- | --- | --- |
| 30 days | 40% | 65% |
| 60 days | 37% | 65% |
| 90 days | 33% | 65% |
| 180 days | 25% | 50% |

#### USDC Parameters

| Loan Duration | Current Floor | Historical Floor |
| --- | --- | --- |
| 30 days | 38% | 65% |
| 60 days | 35% | 65% |
| 90 days | 25% | 65% |
| 180 days | 22% | 50% |

### Chromie Squiggles

#### WETH Parameters

| Loan Offer Duration | Current Floor | Historical Floor |
| --- | --- | --- |
| 30 days | 27% | 60% |
| 60 days | 23% | 60% |
| 90 days | 17% | 60% |
| 180 days | 15% | 50% |

#### USDC Parameters

| Loan Duration | Current Floor | Historical Floor |
| --- | --- | --- |
| 30 days | 27% | 60% |
| 60 days | 23% | 60% |
| 90 days | 17% | 60% |
| 180 days | 15% | 50% |

### Fidenzas

#### WETH Parameters

| Loan Offer Duration | Current Floor | Historical Floor |
| --- | --- | --- |
| 30 days | 27% | 60% |
| 60 days | 23% | 65% |
| 90 days | 17% | 65% |
| 180 days | 15% | 50% |

#### USDC Parameters

| Loan Duration | Current Floor | Historical Floor |
| --- | --- | --- |
| 30 days | 27% | 60% |
| 60 days | 23% | 60% |
| 90 days | 17% | 60% |
| 180 days | 15% | 50% |

### Autoglyphs

#### WETH Parameters

| Loan Offer Duration | Current Floor | Historical Floor |
| --- | --- | --- |
| 30 days | 27% | 60% |
| 60 days | 23% | 60% |
| 90 days | 17% | 60% |
| 180 days | 15% | 50% |

#### USDC Parameters

| Loan Duration | Current Floor | Historical Floor |
| --- | --- | --- |
| 30 days | 27% | 60% |
| 60 days | 23% | 60% |
| 90 days | 17% | 60% |
| 180 days | 15% | 50% |

### Pudgy Penguins

#### WETH Parameters

| Loan Offer Duration | Current Floor | Historical Floor |
| --- | --- | --- |
| 30 days | 35% | 60% |
| 60 days | 30% | 60% |
| 90 days | 25% | 60% |
| 180 days | - | - |

#### USDC Parameters

| Loan Duration | Current Floor | Historical Floor |
| --- | --- | --- |
| 30 days | 35% | 60% |
| 60 days | 30% | 60% |
| 90 days | 25% | 60% |
| 180 days | - | - |

### Ringers

#### WETH Parameters

| Loan Offer Duration | Current Floor | Historical Floor |
| --- | --- | --- |
| 30 days | 27% | 60% |
| 60 days | 23% | 60% |
| 90 days | 17% | 60% |
| 180 days | 15% | 50% |

#### USDC Parameters

| Loan Duration | Current Floor | Historical Floor |
| --- | --- | --- |
| 30 days | 27% | 60% |
| 60 days | 23% | 60% |
| 90 days | 17% | 60% |
| 180 days | 15% | 50% |

### Gazers

#### WETH Parameters

| Loan Offer Duration | Current Floor | Historical Floor |
| --- | --- | --- |
| 30 days | 27% | 60% |
| 60 days | 23% | 60% |
| 90 days | 17% | 60% |
| 180 days | 15% | 50% |

#### USDC Parameters

| Loan Duration | Current Floor | Historical Floor |
| --- | --- | --- |
| 30 days | 27% | 60% |
| 60 days | 23% | 60% |
| 90 days | 17% | 60% |
| 180 days | 15% | 50% |

### Winds of Yawanawa

#### WETH Parameters

| Loan Offer Duration | Current Floor | Historical Floor |
| --- | --- | --- |
| 30 days | 27% | 60% |
| 60 days | - | - |
| 90 days | - | - |
| 180 days | - | - |

#### USDC Parameters

| Loan Duration | Current Floor | Historical Floor |
| --- | --- | --- |
| 30 days | 27% | 60% |
| 60 days | - | - |
| 90 days | - | - |
| 180 days | - | - |

### Grifters

#### WETH Parameters

| Loan Offer Duration | Current Floor | Historical Floor |
| --- | --- | --- |
| 30 days | 27% | 60% |
| 60 days | 23% | 60% |
| 90 days | 17% | 60% |
| 180 days | - | - |

#### USDC Parameters

| Loan Duration | Current Floor | Historical Floor |
| --- | --- | --- |
| 30 days | 27% | 60% |
| 60 days | 23% | 60% |
| 90 days | 17% | 60% |
| 180 days | - | - |

### Milady

#### WETH Parameters

| Loan Offer Duration | Current Floor | Historical Floor |
| --- | --- | --- |
| 30 days | 27% | 60% |
| 60 days | 23% | 60% |
| 90 days | 17% | 60% |
| 180 days | - | - |

#### USDC Parameters

| Loan Duration | Current Floor | Historical Floor |
| --- | --- | --- |
| 30 days | 27% | 60% |
| 60 days | 23% | 60% |
| 90 days | 17% | 60% |
| 180 days | - | - |

### Bored Ape Yat Club

#### WETH Parameters

| Loan Offer Duration | Current Floor | Historical Floor |
| --- | --- | --- |
| 30 days | 27% | 60% |
| 60 days | 23% | 60% |
| 90 days | 17% | 60% |
| 180 days | 15% | 50% |

#### USDC Parameters

| Loan Duration | Current Floor | Historical Floor |
| --- | --- | --- |
| 30 days | 27% | 60% |
| 60 days | 23% | 60% |
| 90 days | 17% | 60% |
| 180 days | 15% | 50% |

### Azuki

#### WETH Parameters

| Loan Offer Duration | Current Floor | Historical Floor |
| --- | --- | --- |
| 30 days | - | - |
| 60 days | - | - |
| 90 days | - | - |
| 180 days | - | - |

#### USDC Parameters

| Loan Duration | Current Floor | Historical Floor |
| --- | --- | --- |
| 30 days | - | - |
| 60 days | - | - |
| 90 days | - | - |
| 180 days | - | - |

**Last updated:** July 10, 2024
