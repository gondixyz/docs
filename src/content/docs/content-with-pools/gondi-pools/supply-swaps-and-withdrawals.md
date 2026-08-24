---
title: "Supply, Swaps, & Withdrawals"
draft: true
---

### Supply into Pools

GONDI Pools originate loans using deposited WETH and USDC. GONDI Pool LPs receive pool shares by providing liquidity in either pool. 

The market price of each Pool share is given by the sum of liquid assets (either in the denominated asset or the base rate asset), the outstanding principal of loans, and the accrued interest up until that point in time. This estimate assumes all outstanding loans will be repaid (no defaults).  

The market price of gETH and gUSDC are independent as each is based on the loans originated in each pool.

## Swap

LPs may choose to enter Gondi pools by swapping WETH for GONDI Pool tokens on Curve: 

gETH/WETH Pool: \[curve link]

gUSDC/USDC Pool: \[curve link]

Swapping is an alternative way to enter and exit positions across GONDI pools.

## Withdrawals

Withdrawals from a GONDI pool happen periodically with Withdrawal Queues. The frequency of Withdrawal Queues depend on the maximum duration of the loans originated from said pool. 

In the case of gETH and gUSDC, Withdrawal Queues happen every 120 days. LPs can request withdrawals based on their share balance at any point in time. When making a withdrawal request, the LP will receive a *GONDI Claim* NFT representing the future payments of the requested amount to be withdrawn. 

When a Withdrawal Queue becomes activated, the pool transfers the pro-rata amount of available assets. As all outstanding loans up until that point in time are repaid in the future, the pro-rata amount of proceeds from those loans becomes available to be claimed by those in the Withdrawal Queue.

LPs will  be able to see the schedule of future payments of the corresponding loans. Note that loans may get refinanced or repaid early shortening the wait time.  

GONDI Claim NFTs can be traded on the secondary market or even used to take a loan against itself on GONDI as it represents an onchain contract of future payments.
