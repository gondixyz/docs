---
title: "Refinancing"
---

## What is Refinancing? Refinancing = Automatic Better Deal

Refinancing lets any lender take over your existing loan by offering significantly better terms. **You don't need to do anything** - if someone offers better terms that meet the requirements, your loan automatically improves.

**Key Point**: Unlike renegotiation (which requires your approval), refinancing happens automatically because it only allows strictly better terms for you.

## How Refinancing Works

1. **Any lender** can refinance your active loan (during allowed periods)
2. **New lender** must offer at least 10% better APR (20% → 18% or better)
3. **New lender fronts payment** - pays original lender full principal + all accrued interest to date
4. **Automatic switch** - your loan terms improve instantly, no action needed
5. **You repay everything** - when you repay, the new lender gets back what they fronted plus their own accrued interest

**Important**: The new lender doesn't lose the interest they pay to the original lender - you'll repay them that amount plus their own interest when the loan matures.

## Refinancing Requirements

**APR Improvement**: Must be at least 10% better than current rate

* Example: 20% APR → must improve to 18% APR or lower

**Principal**: Can be increased (you get the extra amount) but cannot be decreased

**Due Date**: Can be extended but cannot be shortened

**Tranches**: In GONDI V3, individual tranches can be refinanced separately

## Refinancing Lock-ups

**When you CAN'T refinance**:

* First 15% of remaining loan duration
* Last 15% of remaining loan duration

**Lock-up resets**: Each time your loan gets refinanced, the 15% lock-up periods restart based on the remaining duration.

**Example**:

* Original loan: 30 days
* Lock-up periods: First 4.5 days and last 4.5 days
* If refinanced on day 10: New lock-up for 15% of remaining 20 days = 3 days

## Refinancing Example

**Original Loan (April 1st)**:

* Principal: 10 WETH
* APR: 20%
* Due: April 30th (30 days)

**Refinanced (April 10th)**:

* Principal: 10 WETH (same)
* APR: 20% → 14% (30% improvement ✓)
* Due: April 30th (same)

**What happens**:

* New lender fronts payment to original lender: 10 WETH + 0.0548 WETH interest (10 days at 20%)
* Your loan now accrues at 14% instead of 20%
* You save money automatically

**Final repayment (April 20th)**:

* You pay total: 10 WETH principal + 0.0931 WETH interest
* **Interest breakdown**:
  * 0.0548 WETH: Repays what new lender fronted to original lender
  * 0.0383 WETH: New interest owed to new lender (10 days at 14%)
* **Result**: Original lender gets 0.0548 WETH, new lender gets 0.0383 WETH + gets back their 0.0548 WETH advance
