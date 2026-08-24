---
title: "GONDI Pools"
draft: true
---

## What Are GONDI Pools?

GONDI Pools offer borrowers instant access to liquidity and provide lenders with a straightforward mechanism to acess yields from USDC or WETH loans. By supplying liquidity to either the WETH Pool and/or USDC Pool, lenders can access passive, real yields without the need to manage individual loans. GONDI Pools lend to selected NFT collections and only target the safest portions of loans with repayment priority in case of defaults​​​​.

## WETH and USDC Pools

GONDI V3 has two pools: a **WETH Pool** and a **USDC Pool**—each can make offers to multiple NFT collections simultaneously.

### GONDI Pools

* **gETH/WETH | Base Rate:** stETH
* **gUSDC/USDC | Base Rate:** aUSDC

## Smart Contracts

Each pool comprises three smart contracts:

* **Pool contract:** Utilizes the ERC-4626 standard. Each Pool token is akin to a liquid credit position in the pool.
* **Base Rate contract**: GONDI Pools feature 'deposit rebalancing.' When pool supply exceed the outstanding debt, idle deposits are rebalanced into the selected base rate token. [Read more](/content-with-pools/gondi-pools/base-rate-contract/).
* **Parameter Setter contract**: Contains the list of supported NFT collections, along with the principal and APR for each duration. [Read more](/content-with-pools/gondi-pools/offer-handler/).

For more information on GONDI V3 contracts, refer to their respective sections.

## Interest Rates Model

A GONDI Pool interest rate model is defined by: ( U \* K ) + min\_apr

* **U:**  Utilization rate (availability of capital within the pool).
* **K =** 1.1
* **min\_apr =** 5%

The interest rate model follows a simple heuristic: when capital is available, low interest rates are available. When capital is scarce, interest rates increase.
